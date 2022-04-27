import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import pool from '../api/pool.js';

export const addTeam = async (req, res) => {
    try {
        const {
            celeb_id,
            pro_id,
            mentor_id,
            season_id,
            placement,
            team_name,
            extra,
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO teams (celeb_id, pro_id, mentor_id, season_id, placement, team_name, extra) 
            VALUES($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *
            `,
            [
                celeb_id,
                pro_id,
                mentor_id,
                season_id,
                placement,
                team_name,
                extra,
            ]
        );

        const team = await pool.query(
            `
            SELECT t.*,
                ROW_TO_JSON(p) AS pro,
                ROW_TO_JSON(c) AS celeb,
                ROW_TO_JSON(m) AS mentor
            FROM teams t
            LEFT JOIN pros p
            ON t.pro_id = p.id
            LEFT JOIN celebs c
            ON t.celeb_id = c.id
            LEFT JOIN pros m
            ON t.mentor_id = m.id
            WHERE t.id = $1
            GROUP BY t.id, p.id, c.id, m.id
            `,
            [result.rows[0].id]
        );

        res.status(200).json(team.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchAllTeams = async (req, res) => {
    try {
        const teams = await pool.query(
            `
            SELECT t.*,
                ROW_TO_JSON(p) AS pro,
                ROW_TO_JSON(c) AS celeb,
                ROW_TO_JSON(m) AS mentor,
                COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
            FROM teams t
            LEFT JOIN pros p
            ON t.pro_id = p.id
            LEFT JOIN celebs c
            ON t.celeb_id = c.id
            LEFT JOIN pros m
            ON t.mentor_id = m.id
            LEFT JOIN (
                SELECT d1.team_id,
                    COALESCE(JSON_AGG(d2) FILTER (WHERE d2.id IS NOT NULL), '[]') AS dances
                FROM dancers d1
                LEFT JOIN (
                    SELECT d2.*,
                        COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores
                    FROM dances d2
                    LEFT JOIN scores s
                    ON d2.id = s.dance_id
                    GROUP BY d2.id
                ) d2
                ON d1.dance_id = d2.id
                GROUP BY d1.team_id
            ) d
            ON t.id = d.team_id
            LEFT JOIN (
                SELECT tl.team_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM team_likes tl
                LEFT JOIN users u
                ON tl.user_id = u.id
                GROUP BY tl.team_id
            ) l
            ON t.id = l.team_id
            GROUP BY t.id, p.id, c.id, m.id
            ORDER BY c.first_name ASC
            `
        );

        res.status(200).json(teams.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findTeamById = async (req, res) => {
    const { id } = req.params;

    try {
        const team = await pool.query(
            `
            SELECT t.*,
                ROW_TO_JSON(p) AS pro,
                ROW_TO_JSON(c) AS celeb,
                ROW_TO_JSON(m) AS mentor,
                COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
            FROM teams t
            LEFT JOIN pros p
            ON t.pro_id = p.id
            LEFT JOIN celebs c
            ON t.celeb_id = c.id
            LEFT JOIN pros m
            ON t.mentor_id = m.id
            LEFT JOIN (
                SELECT d1.team_id,
                    COALESCE(JSON_AGG(d2) FILTER (WHERE d2.id IS NOT NULL), '[]') AS dances
                FROM dancers d1
                LEFT JOIN (
                    SELECT d2.*,
                        ROW_TO_JSON(e) AS episode,
                        COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores
                    FROM dances d2
                    LEFT JOIN episodes e
                    ON d2.episode_id = e.id
                    LEFT JOIN scores s
                    ON d2.id = s.dance_id
                    WHERE e.id = d2.episode_id
                    GROUP BY d2.id, e.*, e.date
                    ORDER BY e.date ASC, d2.running_order ASC
                ) d2
                ON d1.dance_id = d2.id
                WHERE d1.team_id = $1
                GROUP BY d1.team_id
            ) d
            ON t.id = d.team_id
            LEFT JOIN (
                SELECT tl.team_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM team_likes tl
                LEFT JOIN users u
                ON tl.user_id = u.id
                GROUP BY tl.team_id
            ) l
            ON t.id = l.team_id
            WHERE t.id = $1
            GROUP BY t.id, p.id, c.id, m.id
            `,
            [id]
        );

        res.status(200).json(team.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchTeams = async (req, res) => {
    const { search } = req.body;

    try {
        const teams = await pool.query(
            `
            SELECT t.*,
                ROW_TO_JSON(p) AS pro,
                ROW_TO_JSON(c) AS celeb,
                ROW_TO_JSON(m) AS mentor,
                COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
            FROM teams t
            LEFT JOIN pros p
            ON t.pro_id = p.id
            LEFT JOIN celebs c
            ON t.celeb_id = c.id
            LEFT JOIN pros m
            ON t.mentor_id = m.id
            LEFT JOIN (
                SELECT d1.team_id,
                    COALESCE(JSON_AGG(d2) FILTER (WHERE d2.id IS NOT NULL), '[]') AS dances
                FROM dancers d1
                LEFT JOIN (
                    SELECT d2.*,
                        COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores
                    FROM dances d2
                    LEFT JOIN scores s
                    ON d2.id = s.dance_id
                    GROUP BY d2.id
                ) d2
                ON d1.dance_id = d2.id
                GROUP BY d1.team_id
            ) d
            ON t.id = d.team_id
            LEFT JOIN (
                SELECT tl.team_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM team_likes tl
                LEFT JOIN users u
                ON tl.user_id = u.id
                GROUP BY tl.team_id
            ) l
            ON t.id = l.team_id
            WHERE t.celeb_id IN (
                SELECT id
                FROM celebs
                WHERE first_name || ' ' || last_name ILIKE $1
            ) OR t.pro_id IN (
                SELECT id
                FROM pros
                WHERE first_name || ' ' || last_name ILIKE $1
            )
            GROUP BY t.id, p.id, c.id, m.id
            `,
            [`%${search}%`]
        );

        res.status(200).json(teams.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTeam = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            celeb_id,
            pro_id,
            mentor_id,
            season_id,
            placement,
            team_name,
            extra,
        } = req.body;

        await pool.query(
            `
            UPDATE teams 
            SET celeb_id = $1, 
                pro_id = $2, 
                mentor_id = $3, 
                season_id = $4, 
                placement = $5, 
                team_name = $6, 
                extra = $7 
            WHERE id = $8
            `,
            [
                celeb_id,
                pro_id,
                mentor_id,
                season_id,
                placement,
                team_name,
                extra,
                id,
            ]
        );

        const result = await pool.query(
            `
            SELECT t.*,
                ROW_TO_JSON(p) AS pro,
                ROW_TO_JSON(c) AS celeb,
                ROW_TO_JSON(m) AS mentor,
                COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
            FROM teams t
            LEFT JOIN pros p
            ON t.pro_id = p.id
            LEFT JOIN celebs c
            ON t.celeb_id = c.id
            LEFT JOIN pros m
            ON t.mentor_id = m.id
            LEFT JOIN (
                SELECT d1.team_id,
                    COALESCE(JSON_AGG(d2) FILTER (WHERE d2.id IS NOT NULL), '[]') AS dances
                FROM dancers d1
                LEFT JOIN (
                    SELECT d2.*,
                        COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores
                    FROM dances d2
                    LEFT JOIN scores s
                    ON d2.id = s.dance_id
                    GROUP BY d2.id
                ) d2
                ON d1.dance_id = d2.id
                GROUP BY d1.team_id
            ) d
            ON t.id = d.team_id
            LEFT JOIN (
                SELECT tl.team_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM team_likes tl
                LEFT JOIN users u
                ON tl.user_id = u.id
                GROUP BY tl.team_id
            ) l
            ON t.id = l.team_id
            WHERE t.id = $1
            GROUP BY t.id, p.id, c.id, m.id
            `,
            [id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const setTeamPic = async (req, res) => {
    const { id } = req.params;

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

            await pool.query(
                `
                UPDATE teams 
                SET cover_pic = $1 
                WHERE id = $2 
                RETURNING *
                `,
                [publicUrl, id]
            );

            const result = await pool.query(
                `
                SELECT t.*,
                    ROW_TO_JSON(p) AS pro,
                    ROW_TO_JSON(c) AS celeb,
                    ROW_TO_JSON(m) AS mentor,
                    COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                    COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
                FROM teams t
                LEFT JOIN pros p
                ON t.pro_id = p.id
                LEFT JOIN celebs c
                ON t.celeb_id = c.id
                LEFT JOIN pros m
                ON t.mentor_id = m.id
                LEFT JOIN (
                    SELECT d1.team_id,
                        COALESCE(JSON_AGG(d2) FILTER (WHERE d2.id IS NOT NULL), '[]') AS dances
                    FROM dancers d1
                    LEFT JOIN (
                        SELECT d2.*,
                            COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores
                        FROM dances d2
                        LEFT JOIN scores s
                        ON d2.id = s.dance_id
                        GROUP BY d2.id
                    ) d2
                    ON d1.dance_id = d2.id
                    GROUP BY d1.team_id
                ) d
                ON t.id = d.team_id
                LEFT JOIN (
                    SELECT tl.team_id,
                        COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                    FROM team_likes tl
                    LEFT JOIN users u
                    ON tl.user_id = u.id
                    GROUP BY tl.team_id
                ) l
                ON t.id = l.team_id
                WHERE t.id = $1
                GROUP BY t.id, p.id, c.id, m.id
                `,
                [id]
            );

            res.status(200).json(result.rows[0]);
        });

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTeam = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM teams 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Team successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addPic = async (req, res) => {
    const { id } = req.params;

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

            await pool.query(
                `
                UPDATE teams 
                SET pictures = array_append(pictures, $1) 
                WHERE id = $2 
                RETURNING *
                `,
                [publicUrl, id]
            );

            const result = await pool.query(
                `
                SELECT t.*,
                    ROW_TO_JSON(p) AS pro,
                    ROW_TO_JSON(c) AS celeb,
                    ROW_TO_JSON(m) AS mentor,
                    COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                    COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
                FROM teams t
                LEFT JOIN pros p
                ON t.pro_id = p.id
                LEFT JOIN celebs c
                ON t.celeb_id = c.id
                LEFT JOIN pros m
                ON t.mentor_id = m.id
                LEFT JOIN (
                    SELECT d1.team_id,
                        COALESCE(JSON_AGG(d2) FILTER (WHERE d2.id IS NOT NULL), '[]') AS dances
                    FROM dancers d1
                    LEFT JOIN (
                        SELECT d2.*,
                            COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores
                        FROM dances d2
                        LEFT JOIN scores s
                        ON d2.id = s.dance_id
                        GROUP BY d2.id
                    ) d2
                    ON d1.dance_id = d2.id
                    GROUP BY d1.team_id
                ) d
                ON t.id = d.team_id
                LEFT JOIN (
                    SELECT tl.team_id,
                        COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                    FROM team_likes tl
                    LEFT JOIN users u
                    ON tl.user_id = u.id
                    GROUP BY tl.team_id
                ) l
                ON t.id = l.team_id
                WHERE t.id = $1
                GROUP BY t.id, p.id, c.id, m.id
                `,
                [id]
            );

            res.status(200).json(result.rows[0]);
        });

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const likeTeam = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }

        const query = await pool.query(
            `SELECT EXISTS(
                SELECT 1 
                FROM team_likes 
                WHERE team_id = $1 
                    AND user_id = $2
            )
            `,
            [id, req.userId]
        );

        const user = await pool.query(
            `
            SELECT id, username
            FROM users u
            WHERE id = $1
            `,
            [req.userId]
        );

        if (query.rows[0].exists) {
            await pool.query(
                `
                DELETE FROM team_likes 
                WHERE team_id = $1 
                    AND user_id = $2
                `,
                [id, req.userId]
            );
            res.status(200).json({ user: user.rows[0], type: 'unlike' });
        } else {
            const liked_at = new Date();

            await pool.query(
                `
                INSERT INTO team_likes (
                    team_id, 
                    user_id,
                    liked_at
                ) 
                VALUES($1, $2, $3)
                `,
                [id, req.userId, liked_at]
            );
            res.status(200).json({ user: user.rows[0], type: 'like' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
