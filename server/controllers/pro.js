import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

import pool from '../api/pool.js';

export const addPro = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            birthday,
            height,
            gender,
            twitter,
            instagram,
            tiktok,
            is_junior,
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO pros (
                first_name, 
                last_name, 
                birthday, 
                height, 
                gender, 
                twitter, 
                instagram, 
                tiktok, 
                is_junior
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *
            `,
            [
                first_name,
                last_name,
                birthday,
                height,
                gender,
                twitter,
                instagram,
                tiktok,
                is_junior,
            ]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchAllPros = async (req, res) => {
    try {
        const pros = await pool.query(
            `
            SELECT p.*, 
                COALESCE((ARRAY_AGG(t.teams))[1], '[]') AS teams,
                COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
            FROM pros p 
            LEFT JOIN (
                SELECT t.pro_id,
                    COALESCE(JSON_AGG(t) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM (
                    SELECT t.*,
                        ROW_TO_JSON(c) AS celeb
                    FROM teams t
                    LEFT JOIN celebs c
                    ON t.celeb_id = c.id
                    GROUP BY t.id, c.id
                    ORDER BY t.season_id
                ) t
                GROUP BY t.pro_id
            ) t
            ON p.id = t.pro_id
            LEFT JOIN (
                SELECT p.id AS pro_id,
                    COALESCE(JSON_AGG(d2) FILTER (WHERE d2.id IS NOT NULL), '[]') AS dances
                FROM dancers d1
                LEFT JOIN pros p
                ON p.id = ( 
                    SELECT pro_id 
                    FROM teams t 
                    WHERE t.id = d1.team_id 
                )
                LEFT JOIN (
                    SELECT d2.*,
                        COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores
                    FROM dances d2
                    LEFT JOIN scores s
                    ON d2.id = s.dance_id
                    GROUP BY d2.id
                ) d2
                ON d1.dance_id = d2.id
                GROUP BY p.id
            ) d
            ON p.id = d.pro_id
            LEFT JOIN (
                SELECT pl.pro_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM pro_likes pl
                LEFT JOIN users u
                ON pl.user_id = u.id
                GROUP BY pl.pro_id
            ) l
            ON p.id = l.pro_id 
            GROUP BY p.id
            ORDER BY first_name ASC
            `
        );

        res.status(200).json(pros.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findProById = async (req, res) => {
    const { id } = req.params;

    try {
        const pro = await pool.query(
            `
            SELECT p.*, 
                COALESCE((ARRAY_AGG(t.teams))[1], '[]') AS teams,
                COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
            FROM pros p 
            LEFT JOIN (
                SELECT t.pro_id,
                    COALESCE(JSON_AGG(t) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                FROM (
                    SELECT t.*,
                        ROW_TO_JSON(c) AS celeb
                    FROM teams t
                    LEFT JOIN celebs c
                    ON t.celeb_id = c.id
                    GROUP BY t.id, c.id
                    ORDER BY t.season_id
                ) t
                GROUP BY t.pro_id
            ) t
            ON p.id = t.pro_id
            LEFT JOIN (
                SELECT p.id AS pro_id,
                    COALESCE(JSON_AGG(d2) FILTER (WHERE d2.id IS NOT NULL), '[]') AS dances
                FROM dancers d1
                LEFT JOIN pros p
                ON p.id = ( 
                    SELECT pro_id 
                    FROM teams t 
                    WHERE t.id = d1.team_id 
                )
                LEFT JOIN (
                    SELECT d2.*,
                        COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores
                    FROM dances d2
                    LEFT JOIN scores s
                    ON d2.id = s.dance_id
                    GROUP BY d2.id
                ) d2
                ON d1.dance_id = d2.id
                GROUP BY p.id
            ) d
            ON p.id = d.pro_id
            LEFT JOIN (
                SELECT pl.pro_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM pro_likes pl
                LEFT JOIN users u
                ON pl.user_id = u.id
                GROUP BY pl.pro_id
            ) l
            ON p.id = l.pro_id 
            WHERE p.id = $1
            GROUP BY p.id
            `,
            [id]
        );

        res.status(200).json(pro.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchPros = async (req, res) => {
    const { search } = req.body;

    try {
        const pros = await pool.query(
            `
            SELECT p.*, 
                COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
            FROM pros p 
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
            ON p.id = ( 
                SELECT pro_id 
                FROM teams t 
                WHERE t.id = d.team_id 
            )
            LEFT JOIN (
                SELECT pl.pro_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM pro_likes pl
                LEFT JOIN users u
                ON pl.user_id = u.id
                GROUP BY pl.pro_id
            ) l
            ON p.id = l.pro_id
            WHERE first_name || ' ' || last_name ILIKE $1
            GROUP BY p.id
            `,
            [`%${search}%`]
        );

        res.status(200).json(pros.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updatePro = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            first_name,
            last_name,
            birthday,
            height,
            gender,
            twitter,
            instagram,
            tiktok,
            is_junior,
        } = req.body;

        await pool.query(
            'UPDATE pros SET first_name = $1, last_name = $2, birthday = $3, height = $4, gender = $5, twitter = $6, instagram = $7, tiktok = $8, is_junior = $9 WHERE id = $10 RETURNING *',
            [
                first_name,
                last_name,
                birthday,
                height,
                gender,
                twitter,
                instagram,
                tiktok,
                is_junior,
                id,
            ]
        );

        const result = await pool.query(
            `
            SELECT p.*, 
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
            FROM pros p 
            LEFT JOIN (
                SELECT pl.pro_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM pro_likes pl
                LEFT JOIN users u
                ON pl.user_id = u.id
                GROUP BY pl.pro_id
            ) l
            ON p.id = l.pro_id 
            WHERE p.id = $1
            GROUP BY p.id
            `,
            [id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setProPic = async (req, res) => {
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
                UPDATE pros 
                SET cover_pic = $1 
                WHERE id = $2 
                RETURNING *
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

export const deletePro = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM pros 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Pro successfully deleted.' });
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
                UPDATE pros 
                SET pictures = array_append(pictures, $1) 
                WHERE id = $2
                `,
                [publicUrl, id]
            );

            const result = await pool.query(
                `
                SELECT p.*, 
                    COALESCE((ARRAY_AGG(t.teams))[1], '[]') AS teams,
                    COALESCE((ARRAY_AGG(d.dances))[1], '[]') AS dances,
                    COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
                FROM pros p 
                LEFT JOIN (
                    SELECT t.pro_id,
                        COALESCE(JSON_AGG(t) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams
                    FROM (
                        SELECT t.*,
                            ROW_TO_JSON(c) AS celeb
                        FROM teams t
                        LEFT JOIN celebs c
                        ON t.celeb_id = c.id
                        GROUP BY t.id, c.id
                        ORDER BY t.season_id
                    ) t
                    GROUP BY t.pro_id
                ) t
                ON p.id = t.pro_id
                LEFT JOIN (
                    SELECT p.id AS pro_id,
                        COALESCE(JSON_AGG(d2) FILTER (WHERE d2.id IS NOT NULL), '[]') AS dances
                    FROM dancers d1
                    LEFT JOIN pros p
                    ON p.id = ( 
                        SELECT pro_id 
                        FROM teams t 
                        WHERE t.id = d1.team_id 
                    )
                    LEFT JOIN (
                        SELECT d2.*,
                            COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores
                        FROM dances d2
                        LEFT JOIN scores s
                        ON d2.id = s.dance_id
                        GROUP BY d2.id
                    ) d2
                    ON d1.dance_id = d2.id
                    GROUP BY p.id
                ) d
                ON p.id = d.pro_id
                LEFT JOIN (
                    SELECT pl.pro_id,
                        COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                    FROM pro_likes pl
                    LEFT JOIN users u
                    ON pl.user_id = u.id
                    GROUP BY pl.pro_id
                ) l
                ON p.id = l.pro_id 
                WHERE p.id = $1
                GROUP BY p.id
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

export const likePro = async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }

        const query = await pool.query(
            `
            SELECT EXISTS(
                SELECT 1 
                FROM pro_likes 
                WHERE pro_id = $1 
                    AND user_id = $2
            )`,
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
                DELETE FROM pro_likes 
                WHERE pro_id = $1 
                    AND user_id = $2
                `,
                [id, req.userId]
            );
            res.status(200).json({ user: user.rows[0], type: 'unlike' });
        } else {
            const liked_at = new Date();

            await pool.query(
                `
                INSERT INTO pro_likes (
                    pro_id, 
                    user_id,
                    liked_at
                ) 
                VALUES($1, $2, $3)`,
                [id, req.userId, liked_at]
            );
            res.status(200).json({ user: user.rows[0], type: 'like' });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
