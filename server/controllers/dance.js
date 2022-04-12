import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

import pool from '../api/pool.js';

export const addDance = async (req, res) => {
    try {
        const {
            style,
            episode_id,
            running_order,
            song_title,
            song_artist,
            is_main,
            daily_date,
            link,
            extra,
        } = req.body;

        const result = await pool.query(
            `
            INSERT INTO dances (
                style, 
                episode_id, 
                running_order, 
                song_title, 
                song_artist, 
                is_main, 
                daily_date, 
                link, 
                extra
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) 
            RETURNING *
            `,
            [
                style,
                episode_id,
                running_order,
                song_title,
                song_artist,
                is_main,
                daily_date,
                link,
                extra,
            ]
        );

        const dance = await pool.query(
            `
            SELECT d.*,
                (
                    SELECT ROW_TO_JSON(e.*)
                    FROM episodes e
                    WHERE e.id = d.episode_id
                ) AS episode,
                COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
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
                WHERE dc2.dance_id = $1
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
                WHERE s1.dance_id = $1
                GROUP BY s1.dance_id
            ) s
            ON d.id = s.dance_id
            LEFT JOIN (
                SELECT dl.dance_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM dance_likes dl
                LEFT JOIN users u
                ON dl.user_id = u.id
                WHERE dl.dance_id = $1
                GROUP BY dl.dance_id
            ) l
            ON d.id = l.dance_id
            WHERE d.id = $1
            GROUP BY d.id
            `,
            [result.rows[0].id]
        );

        res.status(200).json(dance.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const fetchAllDances = async (req, res) => {
    try {
        const dances = await pool.query(
            `
            SELECT d.*,
                (
                    SELECT ROW_TO_JSON(e.*)
                    FROM episodes e
                    WHERE e.id = d.episode_id
                ) AS episode,
                COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
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
            LEFT JOIN (
                SELECT dl.dance_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM dance_likes dl
                LEFT JOIN users u
                ON dl.user_id = u.id
                GROUP BY dl.dance_id
            ) l
            ON d.id = l.dance_id
            GROUP BY d.id
            `
        );

        res.status(200).json(dances.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findDanceById = async (req, res) => {
    const { id } = req.params;

    try {
        const dance = await pool.query(
            `
            SELECT d.*,
                (
                    SELECT ROW_TO_JSON(e.*)
                    FROM episodes e
                    WHERE e.id = d.episode_id
                ) AS episode,
                COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
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
                WHERE dc2.dance_id = $1
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
                WHERE s1.dance_id = $1
                GROUP BY s1.dance_id
            ) s
            ON d.id = s.dance_id
            LEFT JOIN (
                SELECT dl.dance_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM dance_likes dl
                LEFT JOIN users u
                ON dl.user_id = u.id
                WHERE dl.dance_id = $1
                GROUP BY dl.dance_id
            ) l
            ON d.id = l.dance_id
            WHERE d.id = $1
            GROUP BY d.id
            `,
            [id]
        );

        res.status(200).json(dance.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchDances = async (req, res) => {
    const { search } = req.body;

    try {
        let dances;
        // returns all if empty string
        // temp solution to help return dances where song or artist is null
        if (search === '') {
            dances = await pool.query(
                `
                SELECT d.*,
                    (
                        SELECT ROW_TO_JSON(e.*)
                        FROM episodes e
                        WHERE e.id = d.episode_id
                    ) AS episode,
                    COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                    COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers,
                    COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
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
                LEFT JOIN (
                    SELECT dl.dance_id,
                        COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                    FROM dance_likes dl
                    LEFT JOIN users u
                    ON dl.user_id = u.id
                    GROUP BY dl.dance_id
                ) l
                ON d.id = l.dance_id
                GROUP BY d.id
                `
            );
        } else {
            dances = await pool.query(
                `
                SELECT d.*,
                (
                    SELECT ROW_TO_JSON(e.*)
                    FROM episodes e
                    WHERE e.id = d.episode_id
                ) AS episode,
                    COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                    COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers,
                    COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
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
                LEFT JOIN (
                    SELECT dl.dance_id,
                        COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                    FROM dance_likes dl
                    LEFT JOIN users u
                    ON dl.user_id = u.id
                    GROUP BY dl.dance_id
                ) l
                ON d.id = l.dance_id
                WHERE song_title || ' ' || song_artist ILIKE $1
                GROUP BY d.id
                `,
                [`%${search}%`]
            );

            // TODO: won't pattern match if one of song/artist is null
        }

        res.status(200).json(dances.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDance = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            style,
            episode_id,
            running_order,
            song_title,
            song_artist,
            is_main,
            daily_date,
            link,
            extra,
        } = req.body;

        await pool.query(
            `
            UPDATE dances 
            SET style = $1, 
                episode_id = $2, 
                running_order = $3, 
                song_title = $4, 
                song_artist = $5, 
                is_main = $6, 
                daily_date = $7, 
                link = $8, 
                extra = $9 
            WHERE id = $10
            `,
            [
                style,
                episode_id,
                running_order,
                song_title,
                song_artist,
                is_main,
                daily_date,
                link,
                extra,
                id,
            ]
        );

        const result = await pool.query(
            `
            SELECT d.*,
                (
                    SELECT ROW_TO_JSON(e.*)
                    FROM episodes e
                    WHERE e.id = d.episode_id
                ) AS episode,
                COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers,
                COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
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
                WHERE dc2.dance_id = $1
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
                WHERE s1.dance_id = $1
                GROUP BY s1.dance_id
            ) s
            ON d.id = s.dance_id
            LEFT JOIN (
                SELECT dl.dance_id,
                    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                FROM dance_likes dl
                LEFT JOIN users u
                ON dl.user_id = u.id
                WHERE dl.dance_id = $1
                GROUP BY dl.dance_id
            ) l
            ON d.id = l.dance_id
            WHERE d.id = $1
            GROUP BY d.id
            `,
            [id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDance = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM dances 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Dance successfully deleted.' });
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
                UPDATE dances 
                SET pictures = array_append(pictures, $1) 
                WHERE id = $2
                `,
                [publicUrl, req.params.id]
            );

            const result = await pool.query(
                `
                SELECT d.*,
                    (
                        SELECT ROW_TO_JSON(e.*)
                        FROM episodes e
                        WHERE e.id = d.episode_id
                    ) AS episode,
                    COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                    COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers,
                    COALESCE((ARRAY_AGG(l.users))[1], '[]') AS likes
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
                    WHERE dc2.dance_id = $1
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
                    WHERE s1.dance_id = $1
                    GROUP BY s1.dance_id
                ) s
                ON d.id = s.dance_id
                LEFT JOIN (
                    SELECT dl.dance_id,
                        COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id', u.id, 'username', u.username)) FILTER (WHERE u.id IS NOT NULL), '[]') AS users
                    FROM dance_likes dl
                    LEFT JOIN users u
                    ON dl.user_id = u.id
                    WHERE dl.dance_id = $1
                    GROUP BY dl.dance_id
                ) l
                ON d.id = l.dance_id
                WHERE d.id = $1
                GROUP BY d.id
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

export const likeDance = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }

        const query = await pool.query(
            `
            SELECT EXISTS(
                SELECT 1 
                FROM dance_likes 
                WHERE dance_id = $1 
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
                DELETE FROM dance_likes 
                WHERE dance_id = $1 
                AND user_id = $2
                `,
                [id, req.userId]
            );
            res.status(200).json({ user: user.rows[0], type: 'unlike' });
        } else {
            const liked_at = new Date();

            await pool.query(
                `
                INSERT INTO dance_likes (
                    dance_id, 
                    user_id,
                    liked_at
                ) 
                VALUES($1, $2, $3)
                `,
                [id, req.userId, liked_at]
            );
            res.status(200).json({ user: user.rows[0], type: 'like' });
        }

        //res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const findDailyDance = async (req, res) => {
    let { day } = req.body;

    try {
        const dance = await pool.query(
            `
            SELECT d.*,
                (
                    SELECT ROW_TO_JSON(e.*)
                    FROM episodes e
                    WHERE e.id = d.episode_id
                ) AS episode,
                COALESCE((ARRAY_AGG(s.scores))[1], '[]') AS scores,
                COALESCE(JSON_AGG(dc) FILTER (WHERE dc.id IS NOT NULL), '[]') AS dancers,
                (
                    SELECT value
                    FROM user_scores us
                    WHERE us.dance_id = d.id
                        AND us.user_id = $1
                ) as user_score,
                COALESCE((ARRAY_AGG(us.scores))[1], '[]') AS user_scores
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
            LEFT JOIN (
                SELECT us1.dance_id,
                    COALESCE(JSON_AGG(ROW_TO_JSON(us1)) FILTER (WHERE us1.dance_id IS NOT NULL), '[]') AS scores
                FROM user_scores us1
                GROUP BY us1.dance_id
            ) us
            ON d.id = us.dance_id
            WHERE daily_date = 
                CASE WHEN $2='today' THEN now()::date
                ELSE now()::date - 1
                END
            GROUP BY d.id
            `,
            [req.userId, day]
        );

        res.status(200).json(
            typeof dance.rows[0] === 'undefined' ? {} : dance.rows[0]
        );
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
