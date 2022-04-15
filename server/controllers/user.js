import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import pool from '../api/pool.js';
import ac from '../roles.js';

import { sendEmail } from '../email/sendEmail.js';
import { messages } from '../messages.js';
import { verify } from '../email/emailTemplate.js';

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID2);

export const signUp = async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;

        if (!username || !email || !password || !confirm_password)
            return res.status(404).json({ message: messages.missingFields });

        const existing_username = await pool.query(
            `
            SELECT username
            FROM users 
            WHERE username = $1
            `,
            [username]
        );

        if (existing_username.rows.length !== 0) {
            return res.status(409).json({ message: messages.existingUsername });
        }

        const existing_email = await pool.query(
            `
            SELECT email
            FROM users 
            WHERE email = $1
            `,
            [email]
        );

        if (existing_email.rows.length !== 0) {
            return res.status(409).json({ message: messages.existingEmail });
        }

        if (password != confirm_password)
            return res.status(400).json({ message: messages.passwordMismatch });

        const hashed_password = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `
            INSERT INTO users (
                username, 
                email, 
                password, 
                email_verified, 
                "role"
            ) 
            VALUES($1, $2, $3, default, default) 
            RETURNING id
            `,
            [username, email, hashed_password]
        );

        sendEmail(email, verify(result.rows[0].id));

        res.status(200).json({ message: messages.verify });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(404).json({ message: messages.missingFields });

        const existing_user = await pool.query(
            `
            SELECT id,
                password, 
                email_verified 
            FROM users 
            WHERE username = $1
            `,
            [username]
        );

        if (existing_user.rows.length === 0)
            return res
                .status(404)
                .json({ message: messages.invalidCredentials });

        if (!existing_user.rows[0].password)
            return res.status(404).json({ message: messages.needOAuth });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existing_user.rows[0].password
        );

        if (!isPasswordCorrect)
            return res
                .status(400)
                .json({ message: messages.invalidCredentials });

        if (existing_user.rows[0].email_verified) {
            const user = await pool.query(
                `
                SELECT u.id, 
                    u.cover_pic, 
                    u.username, 
                    u.email,
                    u.email_verified,
                    u.nickname, 
                    u.watching_since, 
                    u.twitter, 
                    u.instagram, 
                    u.tiktok,
                    u.birthday_month,
                    u.birthday_day,
                    u.role,
                    JSON_BUILD_OBJECT('pros', 
                        COALESCE((ARRAY_AGG(pl.pros))[1], '[]'), 
                        'teams', 
                        COALESCE((ARRAY_AGG(tl.teams))[1], '[]'),
                        'dances', 
                        COALESCE((ARRAY_AGG(dl.dances))[1], '[]')) 
                    AS likes
                FROM users u 
                LEFT JOIN (
                    SELECT pl.user_id,
                        COALESCE(JSON_AGG(ROW_TO_JSON(p) ORDER BY pl.liked_at ASC) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                    FROM pro_likes pl
                    LEFT JOIN pros p
                    ON pl.pro_id = p.id
                    WHERE pl.user_id = $1
                    GROUP BY pl.user_id
                ) pl 
                ON u.id = pl.user_id
                LEFT JOIN (
                    SELECT tl.user_id,
                        COALESCE(JSON_AGG(ROW_TO_JSON(t) ORDER BY tl.liked_at ASC) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                    FROM team_likes tl
                    LEFT JOIN (
                        SELECT t.*, 
                            ROW_TO_JSON(p) AS pro, 
                            ROW_TO_JSON(c) AS celeb 
                        FROM teams t 
                        LEFT JOIN pros p 
                        ON t.pro_id = p.id 
                        LEFT JOIN celebs c 
                        ON t.celeb_id = c.id 
                        GROUP BY t.id, p.id, c.id 
                    ) t
                    ON tl.team_id = t.id
                    WHERE tl.user_id = $1
                    GROUP BY tl.user_id
                ) tl 
                ON u.id = tl.user_id
                LEFT JOIN (
                    SELECT dl.user_id,
                        COALESCE(JSON_AGG(ROW_TO_JSON(d) ORDER BY dl.liked_at ASC) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
                    FROM dance_likes dl
                    LEFT JOIN dances d
                    ON dl.dance_id = d.id
                    WHERE dl.user_id = $1
                    GROUP BY dl.user_id
                ) dl 
                ON u.id = dl.user_id
                WHERE u.id = $1
                GROUP BY u.id
                `,
                [existing_user.rows[0].id]
            );

            const token = jwt.sign(
                {
                    id: user.rows[0].id,
                },
                process.env.SECRET_STRING,
                { expiresIn: '1h' }
            );

            res.cookie('da_jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            })
                .status(200)
                .json(user.rows[0]);
        } else {
            res.status(401).json({ message: messages.notVerified });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const googleAuth = async (req, res) => {
    try {
        const { token, username, signup } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_CLIENT_ID2,
        });

        const { email } = ticket.getPayload();

        const existing_user = await pool.query(
            `
            SELECT id
            FROM users 
            WHERE email = $1
            `,
            [email]
        );

        let user_id;

        if (signup) {
            if (existing_user.rows.length !== 0)
                return res.status(404).json({
                    message: messages.existingEmail,
                });

            if (!username)
                return res.status(404).json({
                    message: messages.oauthUser,
                });

            const username_available = await pool.query(
                `
                SELECT id
                FROM users 
                WHERE username = $1
                `,
                [username]
            );

            if (username_available.rows.length !== 0)
                return res
                    .status(404)
                    .json({ message: messages.oauthUsername });

            // create user
            const result = await pool.query(
                `
                INSERT INTO users (
                    username, 
                    email, 
                    email_verified, 
                    "role"
                ) 
                VALUES($1, $2, true, default) 
                RETURNING id
                `,
                [username, email]
            );

            user_id = result.rows[0].id;
        } else {
            if (existing_user.rows.length == 0)
                return res.status(404).json({
                    message: messages.oauthEmail,
                });
            user_id = existing_user.rows[0].id;
        }

        const user = await pool.query(
            `
                SELECT u.id, 
                    u.cover_pic, 
                    u.username, 
                    u.email,
                    u.email_verified,
                    u.nickname, 
                    u.watching_since, 
                    u.twitter, 
                    u.instagram, 
                    u.tiktok,
                    u.birthday_month,
                    u.birthday_day,
                    u.role,
                    JSON_BUILD_OBJECT('pros', 
                        COALESCE((ARRAY_AGG(pl.pros))[1], '[]'), 
                        'teams', 
                        COALESCE((ARRAY_AGG(tl.teams))[1], '[]'),
                        'dances', 
                        COALESCE((ARRAY_AGG(dl.dances))[1], '[]')) 
                    AS likes
                FROM users u 
                LEFT JOIN (
                    SELECT pl.user_id,
                        COALESCE(JSON_AGG(ROW_TO_JSON(p) ORDER BY pl.liked_at ASC) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                    FROM pro_likes pl
                    LEFT JOIN pros p
                    ON pl.pro_id = p.id
                    WHERE pl.user_id = $1
                    GROUP BY pl.user_id
                ) pl 
                ON u.id = pl.user_id
                LEFT JOIN (
                    SELECT tl.user_id,
                        COALESCE(JSON_AGG(ROW_TO_JSON(t) ORDER BY tl.liked_at ASC) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                    FROM team_likes tl
                    LEFT JOIN (
                        SELECT t.*, 
                            ROW_TO_JSON(p) AS pro, 
                            ROW_TO_JSON(c) AS celeb 
                        FROM teams t 
                        LEFT JOIN pros p 
                        ON t.pro_id = p.id 
                        LEFT JOIN celebs c 
                        ON t.celeb_id = c.id 
                        GROUP BY t.id, p.id, c.id 
                    ) t
                    ON tl.team_id = t.id
                    WHERE tl.user_id = $1
                    GROUP BY tl.user_id
                ) tl 
                ON u.id = tl.user_id
                LEFT JOIN (
                    SELECT dl.user_id,
                        COALESCE(JSON_AGG(ROW_TO_JSON(d) ORDER BY dl.liked_at ASC) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
                    FROM dance_likes dl
                    LEFT JOIN dances d
                    ON dl.dance_id = d.id
                    WHERE dl.user_id = $1
                    GROUP BY dl.user_id
                ) dl 
                ON u.id = dl.user_id
                WHERE u.id = $1
                GROUP BY u.id
                `,
            [user_id]
        );

        const new_token = jwt.sign(
            {
                id: user.rows[0].id,
            },
            process.env.SECRET_STRING,
            { expiresIn: '1h' }
        );

        res.cookie('da_jwt', new_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })
            .status(200)
            .json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { id } = req.params;

    try {
        const existing_user = await pool.query(
            `
            SELECT id, 
                email_verified
            FROM users 
            WHERE id = $1
            `,
            [id]
        );

        if (existing_user.rows.length === 0)
            return res.status(404).json({ message: messages.invalidUser });

        if (existing_user.rows[0].email_verified !== true) {
            await pool.query(
                `
                UPDATE users 
                SET email_verified = true 
                WHERE id = $1 
                `,
                [id]
            );
        }

        const user = await pool.query(
            `
            SELECT u.id, 
                u.cover_pic, 
                u.username, 
                u.email,
                u.email_verified,
                u.nickname, 
                u.watching_since, 
                u.twitter, 
                u.instagram, 
                u.tiktok,
                u.birthday_month,
                u.birthday_day,
                u.role,
                JSON_BUILD_OBJECT('pros', 
                    COALESCE((ARRAY_AGG(pl.pros))[1], '[]'), 
                    'teams', 
                    COALESCE((ARRAY_AGG(tl.teams))[1], '[]'),
                    'dances', 
                    COALESCE((ARRAY_AGG(dl.dances))[1], '[]')) 
                AS likes
            FROM users u 
            LEFT JOIN (
                SELECT pl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(p) ORDER BY pl.liked_at ASC) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM pro_likes pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                WHERE pl.user_id = $1
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t) ORDER BY tl.liked_at ASC) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM team_likes tl
                LEFT JOIN (
                    SELECT t.*, 
                        ROW_TO_JSON(p) AS pro, 
                        ROW_TO_JSON(c) AS celeb 
                    FROM teams t 
                    LEFT JOIN pros p 
                    ON t.pro_id = p.id 
                    LEFT JOIN celebs c 
                    ON t.celeb_id = c.id 
                    GROUP BY t.id, p.id, c.id 
                ) t
                ON tl.team_id = t.id
                WHERE tl.user_id = $1
                GROUP BY tl.user_id
            ) tl 
            ON u.id = tl.user_id
            LEFT JOIN (
                SELECT dl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(d) ORDER BY dl.liked_at ASC) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
                FROM dance_likes dl
                LEFT JOIN dances d
                ON dl.dance_id = d.id
                WHERE dl.user_id = $1
                GROUP BY dl.user_id
            ) dl 
            ON u.id = dl.user_id
            WHERE u.id = $1
            GROUP BY u.id
            `,
            [id]
        );

        const token = jwt.sign(
            {
                id: user.rows[0].id,
            },
            process.env.SECRET_STRING,
            { expiresIn: '1h' }
        );

        res.cookie('da_jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })
            .status(200)
            .json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchAuthData = async (req, res) => {
    const id = req.userId;

    try {
        const user = await pool.query(
            `
            SELECT u.id, 
                u.cover_pic, 
                u.username, 
                u.email,
                u.nickname, 
                u.watching_since, 
                u.twitter, 
                u.instagram, 
                u.tiktok,
                u.birthday_month,
                u.birthday_day,
                u.role,
                JSON_BUILD_OBJECT('pros', 
                    COALESCE((ARRAY_AGG(pl.pros))[1], '[]'), 
                    'teams', 
                    COALESCE((ARRAY_AGG(tl.teams))[1], '[]'),
                    'dances', 
                    COALESCE((ARRAY_AGG(dl.dances))[1], '[]')) 
                AS likes
            FROM users u 
            LEFT JOIN (
                SELECT pl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(p) ORDER BY pl.liked_at ASC) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM (
                    SELECT *
                    FROM pro_likes
                    WHERE user_id = $1
                    ORDER BY liked_at ASC
                ) pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                WHERE pl.user_id = $1
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t) ORDER BY tl.liked_at ASC) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM (
                    SELECT *
                    FROM team_likes
                    WHERE user_id = $1
                    ORDER BY liked_at ASC
                ) tl
                LEFT JOIN (
                    SELECT t.*, 
                        ROW_TO_JSON(p) AS pro, 
                        ROW_TO_JSON(c) AS celeb 
                    FROM teams t 
                    LEFT JOIN pros p 
                    ON t.pro_id = p.id 
                    LEFT JOIN celebs c 
                    ON t.celeb_id = c.id 
                    GROUP BY t.id, p.id, c.id 
                ) t
                ON tl.team_id = t.id
                WHERE tl.user_id = $1
                GROUP BY tl.user_id
            ) tl 
            ON u.id = tl.user_id
            LEFT JOIN (
                SELECT dl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(d) ORDER BY dl.liked_at ASC) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
                FROM dance_likes dl
                LEFT JOIN (
                    SELECT d.*,
                        (
                            SELECT ROW_TO_JSON(e.*)
                            FROM episodes e
                            WHERE e.id = d.episode_id
                        ) AS episode,
                        COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                        COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers
                    FROM dances d
                    LEFT JOIN (
                        SELECT dc2.*, 
                            ROW_TO_JSON(t) AS team, 
                            ROW_TO_JSON(p) AS pro, 
                            ROW_TO_JSON(c) AS celeb 
                        FROM dancers dc2 
                        LEFT JOIN (
                            SELECT t2.*, 
                                ROW_TO_JSON(p) AS pro, 
                                ROW_TO_JSON(c) AS celeb 
                            FROM teams t2 
                            LEFT JOIN pros p 
                            ON t2.pro_id = p.id 
                            LEFT JOIN celebs c 
                            ON t2.celeb_id = c.id 
                            GROUP BY t2.id, p.id, c.id
                        ) t 
                        ON t.id = dc2.team_id 
                        LEFT JOIN pros p 
                        ON p.id = dc2.pro_id 
                        LEFT JOIN celebs c 
                        ON c.id = dc2.celeb_id 
                        GROUP BY dc2.id, dc2.dance_id, t.*, p.id, c.id
                    ) dc
                    ON d.id = dc.dance_id
                    LEFT JOIN (
                        SELECT s1.dance_id,
                            COALESCE(JSON_AGG(ROW_TO_JSON(s2)) FILTER (WHERE s2.id IS NOT NULL), '[]') AS scores
                        FROM scores s1
                        LEFT JOIN (
                            SELECT s.*,
                                ROW_TO_JSON(j) AS judge
                            FROM scores s
                            LEFT JOIN judges j
                            ON s.judge_id = j.id
                            GROUP BY s.id, j.id 
                        ) s2
                        ON s1.id = s2.id
                        GROUP BY s1.dance_id
                    ) s
                    ON d.id = s.dance_id
                    GROUP BY d.id
                ) d
                ON dl.dance_id = d.id
                WHERE dl.user_id = $1
                GROUP BY dl.user_id
            ) dl 
            ON u.id = dl.user_id
            WHERE u.id = $1
            GROUP BY u.id
            `,
            [id]
        );

        const new_activity = new Date();

        await pool.query(
            `
            UPDATE users 
            SET last_active = $1 
            WHERE id = $2
            `,
            [new_activity, id]
        );

        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie('da_jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })
            .status(200)
            .json({ message: messages.logoutSuccess });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// general CRUD for users

export const addUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            nickname,
            watching_since,
            twitter,
            instagram,
            tiktok,
            birthday_month,
            birthday_day,
        } = req.body;

        const existing_email = await pool.query(
            `
            SELECT id
            FROM users 
            WHERE email = $1
            `,
            [email]
        );

        if (existing_email.rows.length !== 0) {
            return res.status(409).json({ message: messages.existingEmail });
        }

        const existing_username = await pool.query(
            `
            SELECT id
            FROM users 
            WHERE username = $1
            `,
            [username]
        );

        if (existing_username.rows.length !== 0) {
            return res.status(409).json({ message: messages.existingUsername });
        }

        const hashed_password = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `
            INSERT INTO users (
                username, 
                email, 
                password, 
                nickname, 
                email_verified, 
                watching_since, 
                twitter, 
                instagram, 
                tiktok, 
                birthday_month,
                birthday_day, 
                "role"
            ) 
            VALUES($1, $2, $3, $4, default, $5, $6, $7, $8, $9, $10, default) 
            RETURNING id, 
                cover_pic, 
                username, 
                email,
                email_verified,
                nickname, 
                watching_since, 
                twitter, 
                instagram, 
                tiktok,
                birthday_month,
                birthday_day,
                role
            `,
            [
                username,
                email,
                hashed_password,
                nickname,
                watching_since,
                twitter,
                instagram,
                tiktok,
                birthday_month,
                birthday_day,
            ]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const fetchUsers = async (req, res) => {
    try {
        const users = await pool.query(
            `
            SELECT u.id, 
                u.cover_pic, 
                u.username, 
                u.email,
                u.email_verified,
                u.nickname, 
                u.watching_since, 
                u.twitter, 
                u.instagram, 
                u.tiktok,
                u.birthday_month,
                u.birthday_day,
                u.role, 
                JSON_BUILD_OBJECT('pros', 
                    COALESCE((ARRAY_AGG(pl.pros))[1], '[]'), 
                    'teams', 
                    COALESCE((ARRAY_AGG(tl.teams))[1], '[]'),
                    'dances', 
                    COALESCE((ARRAY_AGG(dl.dances))[1], '[]')) 
                AS likes
            FROM users u 
            LEFT JOIN (
                SELECT pl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(p) ORDER BY pl.liked_at ASC) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM pro_likes pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t) ORDER BY tl.liked_at ASC) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM team_likes tl
                LEFT JOIN teams t
                ON tl.team_id = t.id
                GROUP BY tl.user_id
            ) tl 
            ON u.id = tl.user_id
            LEFT JOIN (
                SELECT dl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(d) ORDER BY dl.liked_at ASC) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
                FROM dance_likes dl
                LEFT JOIN dances d
                ON dl.dance_id = d.id
                GROUP BY dl.user_id
            ) dl 
            ON u.id = dl.user_id
            GROUP BY u.id
            `
        );

        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await pool.query(
            `
            SELECT u.id, 
                u.cover_pic, 
                u.username, 
                u.email,
                u.email_verified,
                u.nickname, 
                u.watching_since, 
                u.twitter, 
                u.instagram, 
                u.tiktok,
                u.birthday_month,
                u.birthday_day,
                u.role
            FROM users u 
            WHERE u.id = $1
            GROUP BY u.id
            `,
            [id]
        );

        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findUserByUsername = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await pool.query(
            `
            SELECT u.id, 
                u.cover_pic, 
                u.username, 
                u.nickname, 
                u.watching_since, 
                u.twitter, 
                u.instagram, 
                u.tiktok,
                u.birthday_month,
                u.birthday_day,
                u.role,
                JSON_BUILD_OBJECT('pros', 
                    COALESCE((ARRAY_AGG(pl.pros))[1], '[]'), 
                    'teams', 
                    COALESCE((ARRAY_AGG(tl.teams))[1], '[]'),
                    'dances', 
                    COALESCE((ARRAY_AGG(dl.dances))[1], '[]')) 
                AS likes
            FROM users u 
            LEFT JOIN (
                SELECT pl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(p) ORDER BY pl.liked_at ASC) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM pro_likes pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t) ORDER BY tl.liked_at ASC) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM team_likes tl
                LEFT JOIN (
                    SELECT t.*, 
                        ROW_TO_JSON(p) AS pro, 
                        ROW_TO_JSON(c) AS celeb 
                    FROM teams t 
                    LEFT JOIN pros p 
                    ON t.pro_id = p.id 
                    LEFT JOIN celebs c 
                    ON t.celeb_id = c.id 
                    GROUP BY t.id, p.id, c.id 
                ) t
                ON tl.team_id = t.id
                GROUP BY tl.user_id
            ) tl 
            ON u.id = tl.user_id
            LEFT JOIN (
                SELECT dl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(d) ORDER BY dl.liked_at ASC) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
                FROM dance_likes dl
                LEFT JOIN (
                    SELECT d.*,
                        (
                            SELECT ROW_TO_JSON(e.*)
                            FROM episodes e
                            WHERE e.id = d.episode_id
                        ) AS episode,
                        COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                        COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers
                    FROM dances d
                    LEFT JOIN (
                        SELECT dc2.*, 
                            ROW_TO_JSON(t) AS team, 
                            ROW_TO_JSON(p) AS pro, 
                            ROW_TO_JSON(c) AS celeb 
                        FROM dancers dc2 
                        LEFT JOIN (
                            SELECT t2.*, 
                                ROW_TO_JSON(p) AS pro, 
                                ROW_TO_JSON(c) AS celeb 
                            FROM teams t2 
                            LEFT JOIN pros p 
                            ON t2.pro_id = p.id 
                            LEFT JOIN celebs c 
                            ON t2.celeb_id = c.id 
                            GROUP BY t2.id, p.id, c.id
                        ) t 
                        ON t.id = dc2.team_id 
                        LEFT JOIN pros p 
                        ON p.id = dc2.pro_id 
                        LEFT JOIN celebs c 
                        ON c.id = dc2.celeb_id 
                        GROUP BY dc2.id, dc2.dance_id, t.*, p.id, c.id
                    ) dc
                    ON d.id = dc.dance_id
                    LEFT JOIN (
                        SELECT s1.dance_id,
                            COALESCE(JSON_AGG(ROW_TO_JSON(s2)) FILTER (WHERE s2.id IS NOT NULL), '[]') AS scores
                        FROM scores s1
                        LEFT JOIN (
                            SELECT s.*,
                                ROW_TO_JSON(j) AS judge
                            FROM scores s
                            LEFT JOIN judges j
                            ON s.judge_id = j.id
                            GROUP BY s.id, j.id 
                        ) s2
                        ON s1.id = s2.id
                        GROUP BY s1.dance_id
                    ) s
                    ON d.id = s.dance_id
                    GROUP BY d.id
                ) d
                ON dl.dance_id = d.id
                GROUP BY dl.user_id
            ) dl 
            ON u.id = dl.user_id
            WHERE u.username = $1
            GROUP BY u.id
            `,
            [username]
        );

        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchUsers = async (req, res) => {
    const { search } = req.body;

    try {
        const users = await pool.query(
            `
            SELECT u.id, 
                u.cover_pic, 
                u.username, 
                u.nickname, 
                u.birthday_month,
                u.birthday_day, 
                JSON_BUILD_OBJECT('pros', 
                    COALESCE((ARRAY_AGG(pl.pros))[1], '[]'), 
                    'teams', 
                    COALESCE((ARRAY_AGG(tl.teams))[1], '[]'),
                    'dances', 
                    COALESCE((ARRAY_AGG(dl.dances))[1], '[]')) 
                AS likes
            FROM users u 
            LEFT JOIN (
                SELECT pl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(p) ORDER BY pl.liked_at ASC) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM pro_likes pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t) ORDER BY tl.liked_at ASC) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM team_likes tl
                LEFT JOIN teams t
                ON tl.team_id = t.id
                GROUP BY tl.user_id
            ) tl 
            ON u.id = tl.user_id
            LEFT JOIN (
                SELECT dl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(d) ORDER BY dl.liked_at ASC) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
                FROM dance_likes dl
                LEFT JOIN dances d
                ON dl.dance_id = d.id
                GROUP BY dl.user_id
            ) dl 
            ON u.id = dl.user_id
            WHERE email_verified = true AND username || ' ' || nickname ILIKE $1 
                OR nickname IS NULL
            GROUP BY u.id
            ORDER BY username
            `,
            [`%${search}%`]
        );

        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateAuth = async (req, res) => {
    const id = req.userId;

    try {
        const {
            username,
            email,
            nickname,
            watching_since,
            twitter,
            instagram,
            tiktok,
            birthday_month,
            birthday_day,
        } = req.body;

        const result = await pool.query(
            `
            UPDATE users 
            SET username = $1, 
                email = $2, 
                nickname = $3, 
                watching_since = $4, 
                twitter = $5, 
                instagram = $6, 
                tiktok = $7, 
                birthday_month = $8, 
                birthday_day = $9
            WHERE id = $10
            RETURNING id
            `,
            [
                username,
                email,
                nickname,
                watching_since,
                twitter,
                instagram,
                tiktok,
                birthday_month,
                birthday_day,
                id,
            ]
        );

        const user = await pool.query(
            `
            SELECT u.id, 
                u.cover_pic, 
                u.username, 
                u.email,
                u.nickname, 
                u.watching_since, 
                u.twitter, 
                u.instagram, 
                u.tiktok,
                u.birthday_month,
                u.birthday_day,
                u.role,
                JSON_BUILD_OBJECT('pros', 
                    COALESCE((ARRAY_AGG(pl.pros))[1], '[]'), 
                    'teams', 
                    COALESCE((ARRAY_AGG(tl.teams))[1], '[]'),
                    'dances', 
                    COALESCE((ARRAY_AGG(dl.dances))[1], '[]')) 
                AS likes
            FROM users u 
            LEFT JOIN (
                SELECT pl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(p) ORDER BY pl.liked_at ASC) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM (
                    SELECT *
                    FROM pro_likes
                    WHERE user_id = $1
                    ORDER BY liked_at ASC
                ) pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                WHERE pl.user_id = $1
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t) ORDER BY tl.liked_at ASC) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM (
                    SELECT *
                    FROM team_likes
                    WHERE user_id = $1
                    ORDER BY liked_at ASC
                ) tl
                LEFT JOIN (
                    SELECT t.*, 
                        ROW_TO_JSON(p) AS pro, 
                        ROW_TO_JSON(c) AS celeb 
                    FROM teams t 
                    LEFT JOIN pros p 
                    ON t.pro_id = p.id 
                    LEFT JOIN celebs c 
                    ON t.celeb_id = c.id 
                    GROUP BY t.id, p.id, c.id 
                ) t
                ON tl.team_id = t.id
                WHERE tl.user_id = $1
                GROUP BY tl.user_id
            ) tl 
            ON u.id = tl.user_id
            LEFT JOIN (
                SELECT dl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(d) ORDER BY dl.liked_at ASC) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
                FROM dance_likes dl
                LEFT JOIN (
                    SELECT d.*,
                        (
                            SELECT ROW_TO_JSON(e.*)
                            FROM episodes e
                            WHERE e.id = d.episode_id
                        ) AS episode,
                        COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                        COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers
                    FROM dances d
                    LEFT JOIN (
                        SELECT dc2.*, 
                            ROW_TO_JSON(t) AS team, 
                            ROW_TO_JSON(p) AS pro, 
                            ROW_TO_JSON(c) AS celeb 
                        FROM dancers dc2 
                        LEFT JOIN (
                            SELECT t2.*, 
                                ROW_TO_JSON(p) AS pro, 
                                ROW_TO_JSON(c) AS celeb 
                            FROM teams t2 
                            LEFT JOIN pros p 
                            ON t2.pro_id = p.id 
                            LEFT JOIN celebs c 
                            ON t2.celeb_id = c.id 
                            GROUP BY t2.id, p.id, c.id
                        ) t 
                        ON t.id = dc2.team_id 
                        LEFT JOIN pros p 
                        ON p.id = dc2.pro_id 
                        LEFT JOIN celebs c 
                        ON c.id = dc2.celeb_id 
                        GROUP BY dc2.id, dc2.dance_id, t.*, p.id, c.id
                    ) dc
                    ON d.id = dc.dance_id
                    LEFT JOIN (
                        SELECT s1.dance_id,
                            COALESCE(JSON_AGG(ROW_TO_JSON(s2)) FILTER (WHERE s2.id IS NOT NULL), '[]') AS scores
                        FROM scores s1
                        LEFT JOIN (
                            SELECT s.*,
                                ROW_TO_JSON(j) AS judge
                            FROM scores s
                            LEFT JOIN judges j
                            ON s.judge_id = j.id
                            GROUP BY s.id, j.id 
                        ) s2
                        ON s1.id = s2.id
                        GROUP BY s1.dance_id
                    ) s
                    ON d.id = s.dance_id
                    GROUP BY d.id
                ) d
                ON dl.dance_id = d.id
                WHERE dl.user_id = $1
                GROUP BY dl.user_id
            ) dl 
            ON u.id = dl.user_id
            WHERE u.id = $1
            GROUP BY u.id
            `,
            [result.rows[0].id]
        );

        res.status(200).json(user.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            username,
            email,
            nickname,
            email_verified,
            watching_since,
            twitter,
            instagram,
            tiktok,
            birthday_month,
            birthday_day,
            role,
        } = req.body;

        const result = await pool.query(
            `
            UPDATE users 
            SET username = $1, 
                email = $2, 
                nickname = $3, 
                email_verified = $4, 
                watching_since = $5, 
                twitter = $6, 
                instagram = $7, 
                tiktok = $8, 
                birthday_month = $9, 
                birthday_day = $10,
                "role" = $11 
            WHERE id = $12
            RETURNING id, 
                cover_pic, 
                username, 
                email,
                email_verified,
                nickname, 
                watching_since, 
                twitter, 
                instagram, 
                tiktok,
                birthday_month,
                birthday_day,
                role
            `,
            [
                username,
                email,
                nickname,
                email_verified,
                watching_since,
                twitter,
                instagram,
                tiktok,
                birthday_month,
                birthday_day,
                role,
                id,
            ]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const setUserPic = async (req, res) => {
    const storage = new Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
    });

    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

    try {
        const blob = bucket.file(req.file.originalname);

        let uuid = uuidv4();

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: uuid,
                },
            },
        });

        blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
                bucket.name
            }/o/${encodeURI(blob.name)}?alt=media`;

            const result = await pool.query(
                `
                UPDATE users 
                SET cover_pic = $1 
                WHERE id = $2 
                RETURNING id, 
                    cover_pic, 
                    username, 
                    email,
                    email_verified,
                    nickname, 
                    watching_since, 
                    twitter, 
                    instagram, 
                    tiktok,
                    birthday_month,
                    birthday_day,
                    role
                `,
                [publicUrl, req.params.id]
            );

            res.status(200).json(result.rows[0]);
        });

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM users 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'User successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAuth = async (req, res) => {
    const id = req.userId;

    try {
        await pool.query(
            `
            DELETE FROM users 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'User successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const user = await pool.query(
                `
                SELECT username, role 
                FROM users 
                WHERE id = $1
                `,
                [req.userId]
            );

            let modifiedAction = action;

            // if (
            //     req.userId === Number(req.params.id) &&
            //     user.rows[0].role === 'fan'
            // ) {
            //     modifiedAction = action.replace('Any', 'Own');
            // }

            const permission = ac
                .can(user.rows[0].role)
                [modifiedAction](resource);

            if (!permission.granted) {
                return res.status(403).json({ message: 'Invalid permission' });
            }
            next();
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    };
};
