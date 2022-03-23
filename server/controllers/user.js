import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4';
import pool from '../api/pool.js';
import ac from '../roles.js';

import { sendEmail } from '../email/sendEmail.js';
import { messages } from '../email/messages.js';
import { verify } from '../email/emailTemplate.js';

export const signUp = async (req, res) => {
    try {
        const { username, email, password, confirm_password } = req.body;

        // return message if email and/or username already exists in database

        if (password != confirm_password)
            return res.status(400).json({ message: 'Passwords do not match.' });

        const hashed_password = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `INSERT INTO users (username, email, password, email_verified, user_role) VALUES($1, $2, $3, default, default) RETURNING *`,
            [username, email, hashed_password]
        );

        sendEmail(email, verify(result.rows[0].id));

        res.status(200).json({ message: messages.verify });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existing_user = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (existing_user.rows.length === 0)
            return res.status(404).json({ message: 'User does not exist.' });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existing_user.rows[0].password
        );

        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Incorrect password.' });

        if (existing_user.rows[0].email_verified) {
            const user = await pool.query(
                `
                SELECT u.*,
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
                        COALESCE(JSON_AGG(ROW_TO_JSON(p)) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                    FROM pro_likes pl
                    LEFT JOIN pros p
                    ON pl.pro_id = p.id
                    WHERE pl.user_id = $1
                    GROUP BY pl.user_id
                ) pl 
                ON u.id = pl.user_id
                LEFT JOIN (
                    SELECT tl.user_id,
                        COALESCE(JSON_AGG(ROW_TO_JSON(t)) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
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
                        COALESCE(JSON_AGG(ROW_TO_JSON(d)) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
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

            const new_login = new Date();

            await pool.query('UPDATE users SET last_login = $1 WHERE id = $2', [
                new_login,
                user.rows[0].id,
            ]);

            const token = jwt.sign(
                {
                    username: user.rows[0].username,
                    id: user.rows[0].id,
                },
                process.env.SECRET_STRING,
                { expiresIn: '1h' }
            );

            //res.status(200).json({ result: user.rows[0], token });
            res.cookie('da_jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            })
                .status(200)
                .json({ message: 'Login successful' });
        } else {
            res.status(200).json({ message: messages.notVerified });
        }

        // const token = jwt.sign(
        //     {
        //         username: existing_user.rows[0].username,
        //         id: existing_user.rows[0].id,
        //     },
        //     process.env.SECRET_STRING,
        //     { expiresIn: '1h' }
        // );

        // res.status(200).json({ result: existing_user.rows[0], token });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const verifyEmail = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [
            id,
        ]);

        if (user.rows.length === 0)
            return res.status(404).json({ message: 'User does not exist.' });

        if (user.rows[0].email_verified === true) {
            // email already verified
            const token = jwt.sign(
                {
                    username: user.rows[0].username,
                    id: user.rows[0].id,
                },
                process.env.SECRET_STRING,
                { expiresIn: '1h' }
            );

            // res.status(200).json({
            //     result: user.rows[0],
            //     token,
            //     message: messages.alreadyVerified,
            // });

            res.cookie('da_jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            })
                .status(200)
                .json({ message: messages.alreadyVerified });

            return;
        }

        const result = await pool.query(
            'UPDATE users SET email_verified = $1 WHERE id = $2 RETURNING *',
            [true, id]
        );

        const token = jwt.sign(
            {
                username: result.rows[0].username,
                id: result.rows[0].id,
            },
            process.env.SECRET_STRING,
            { expiresIn: '1h' }
        );

        // res.status(200).json({
        //     result: result.rows[0],
        //     token,
        //     message: messages.verified,
        // });

        res.cookie('da_jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })
            .status(200)
            .json({ message: messages.verified });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchAuthData = async (req, res) => {
    //const { id } = req.params;
    const id = req.userId;

    try {
        // const user = await pool.query('SELECT * FROM users WHERE id = $1', [
        //     id,
        // ]);

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
                u.birthday,
                u.user_role,
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
                    COALESCE(JSON_AGG(ROW_TO_JSON(p)) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM pro_likes pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                WHERE pl.user_id = $1
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t)) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
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
                    COALESCE(JSON_AGG(ROW_TO_JSON(d)) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
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
            .json({ message: 'Logout Successful' });
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
            confirm_password,
            nickname,
            watching_since,
            twitter,
            instagram,
            tiktok,
            birthday,
        } = req.body;

        // return message if email and/or username already exists in database

        if (password != confirm_password)
            return res.status(400).json({ message: 'Passwords do not match.' });

        const hashed_password = await bcrypt.hash(password, 12);

        const result = await pool.query(
            `INSERT INTO users (username, email, password, nickname, email_verified, watching_since, twitter, instagram, tiktok, birthday, user_role) VALUES($1, $2, $3, $4, default, $5, $6, $7, $8, $9, default) RETURNING *`,
            [
                username,
                email,
                hashed_password,
                nickname,
                watching_since,
                twitter,
                instagram,
                tiktok,
                birthday,
            ]
        );

        sendEmail(email, verify(result.rows[0].id));

        res.status(200).json({
            result: result.rows[0],
            message: messages.verify,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchUsers = async (req, res) => {
    try {
        // const users = await pool.query('SELECT * FROM users');

        const users = await pool.query(
            `
            SELECT u.*, 
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
                    COALESCE(JSON_AGG(ROW_TO_JSON(p)) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM pro_likes pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t)) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM team_likes tl
                LEFT JOIN teams t
                ON tl.team_id = t.id
                GROUP BY tl.user_id
            ) tl 
            ON u.id = tl.user_id
            LEFT JOIN (
                SELECT dl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(d)) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
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

// TODO: find by username in addition?
export const findUserById = async (req, res) => {
    const { id } = req.params;

    try {
        // const user = await pool.query('SELECT * FROM users WHERE id = $1', [
        //     id,
        // ]);

        const user = await pool.query(
            `
            SELECT u.id, 
                u.cover_pic, 
                u.username, 
                u.nickname, 
                u.watching_since, 
                u.twitter, 
                u.instagram, 
                u.birthday,
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
                    COALESCE(JSON_AGG(ROW_TO_JSON(p)) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM pro_likes pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                WHERE pl.user_id = $1
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t)) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
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
                    COALESCE(JSON_AGG(ROW_TO_JSON(d)) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
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

        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TODO: remove is null if you end up requiring nicknames
export const searchUsers = async (req, res) => {
    const { search } = req.body;

    try {
        // const users = await pool.query(
        //     `SELECT * FROM users WHERE username || ' ' || nickname ILIKE $1 OR nickname IS NULL ORDER BY username`,
        //     [`%${search}%`]
        // );

        const users = await pool.query(
            `
            SELECT u.*, 
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
                    COALESCE(JSON_AGG(ROW_TO_JSON(p)) FILTER (WHERE p.id IS NOT NULL), '[]') AS pros
                FROM pro_likes pl
                LEFT JOIN pros p
                ON pl.pro_id = p.id
                GROUP BY pl.user_id
            ) pl 
            ON u.id = pl.user_id
            LEFT JOIN (
                SELECT tl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(t)) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM team_likes tl
                LEFT JOIN teams t
                ON tl.team_id = t.id
                GROUP BY tl.user_id
            ) tl 
            ON u.id = tl.user_id
            LEFT JOIN (
                SELECT dl.user_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(d)) FILTER (WHERE d.id IS NOT NULL), '[]') AS dances
                FROM dance_likes dl
                LEFT JOIN dances d
                ON dl.dance_id = d.id
                GROUP BY dl.user_id
            ) dl 
            ON u.id = dl.user_id
            WHERE username || ' ' || nickname ILIKE $1 OR nickname IS NULL
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

export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            cover_pic,
            username,
            email,
            password,
            confirm_password,
            nickname,
            email_verified,
            watching_since,
            twitter,
            instagram,
            tiktok,
            birthday,
            user_role,
        } = req.body;

        const result = await pool.query(
            `UPDATE users SET username = $1, email = $2, nickname = $3, email_verified = $4, watching_since = $5, twitter = $6, instagram = $7, tiktok = $8, birthday = $9, user_role = $10 WHERE id = $11 RETURNING *`,
            [
                username,
                email,
                nickname,
                email_verified,
                watching_since,
                twitter,
                instagram,
                tiktok,
                birthday,
                user_role,
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

        let uuid = UUID();

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
                'UPDATE users SET cover_pic = $1 WHERE id = $2 RETURNING *',
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
        await pool.query('DELETE FROM users WHERE id = $1', [id]);

        res.status(200).json({ message: 'User successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const grantAccess = function (action, resource) {
    return async (req, res, next) => {
        try {
            const user = await pool.query('SELECT * FROM users WHERE id = $1', [
                req.userId,
            ]);

            const permission = ac.can(user.rows[0].user_role)[action](resource);

            if (!permission.granted) {
                return res.status(401).json({ message: 'Invalid permission' });
            }
            next();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };
};