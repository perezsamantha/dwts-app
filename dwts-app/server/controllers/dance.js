import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4';

import pool from '../api/pool.js';

export const addDance = async (req, res) => {
    //console.log(req);
    try {
        const {
            style,
            episode_id,
            theme,
            running_order,
            song_title,
            song_artist,
            link,
            extra,
        } = req.body;

        const result = await pool.query(
            `INSERT INTO dances (style, episode_id, theme, running_order, song_title, song_artist, link, extra) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                style,
                episode_id,
                theme,
                running_order,
                song_title,
                song_artist,
                link,
                extra,
            ]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

export const fetchAllDances = async (req, res) => {
    try {
        //const dances = await pool.query('SELECT * FROM dances');
        // const dances = await pool.query(
        //     "SELECT d.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM dances d LEFT JOIN dance_likes l ON d.id = l.dance_id GROUP BY d.id"
        // );

        const dances = await pool.query(
            `
            SELECT d.*,
                (
                    SELECT ROW_TO_JSON(e.*)
                    FROM episodes e
                    WHERE e.id = d.episode_id
                ) AS episode,
                (
                    SELECT COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]')
                    FROM (
                        SELECT s2.*,
                            ROW_TO_JSON(j) as judge
                        FROM scores s2
                        LEFT JOIN judges j
                        ON s2.judge_id = j.id
                        GROUP BY s2.id, j.id
                    ) s
                    WHERE s.dance_id = d.id
                ) AS scores, 
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
        // const dance = await pool.query('SELECT * FROM dances WHERE id = $1', [
        //     id,
        // ]);

        const dance = await pool.query(
            "SELECT d.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM dances d LEFT JOIN dance_likes l ON d.id = l.dance_id WHERE d.id = $1 GROUP BY d.id",
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
            //dances = await pool.query('SELECT * FROM dances');

            // dances = await pool.query(
            //     "SELECT d.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM dances d LEFT JOIN dance_likes l ON d.id = l.dance_id GROUP BY d.id"
            // );

            dances = await pool.query(
                `
                SELECT d.*,
                    ROW_TO_JSON(e) AS episode,
                    COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores 
                FROM dances d 
                LEFT JOIN episodes e
                ON d.episode_id = e.id
                LEFT JOIN (
                    SELECT s.*, 
                        ROW_TO_JSON(j) AS judge 
                    FROM scores s
                    LEFT JOIN judges j
                    ON s.judge_id = j.id
                    GROUP BY s.id, j.id
                ) s
                ON d.id = s.dance_id
                GROUP BY d.id, e.id
                `
            );
        } else {
            // dances = await pool.query(
            //     "SELECT * FROM dances WHERE song_title || ' ' || song_artist ILIKE $1",
            //     [`%${search}%`]
            // );

            // dances = await pool.query(
            //     "SELECT d.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM dances d LEFT JOIN dance_likes l ON d.id = l.dance_id WHERE song_title || ' ' || song_artist ILIKE $1 GROUP BY d.id",
            //     [`%${search}%`]
            // );
            dances = await pool.query(
                `
                SELECT d.*,
                    ROW_TO_JSON(e) AS episode,
                    COALESCE(JSON_AGG(s) FILTER (WHERE s.id IS NOT NULL), '[]') AS scores 
                FROM dances d 
                LEFT JOIN episodes e
                ON d.episode_id = e.id
                LEFT JOIN (
                    SELECT s.*, 
                        ROW_TO_JSON(j) AS judge 
                    FROM scores s
                    LEFT JOIN judges j
                    ON s.judge_id = j.id
                    GROUP BY s.id, j.id
                ) s
                ON d.id = s.dance_id
                WHERE song_title || ' ' || song_artist ILIKE $1
                GROUP BY d.id, e.id
                `,
                [`%${search}%`]
            );
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
            theme,
            running_order,
            song_title,
            song_artist,
            link,
            extra,
        } = req.body;

        await pool.query(
            'UPDATE dances SET style = $1, episode_id = $2, theme = $3, running_order = $4, song_title = $5, song_artist = $6, link = $7, extra = $8 WHERE id = $9',
            [
                style,
                episode_id,
                theme,
                running_order,
                song_title,
                song_artist,
                link,
                extra,
                id,
            ]
        );

        const result = await pool.query(
            "SELECT d.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM dances d LEFT JOIN dance_likes l ON d.id = l.dance_id WHERE d.id = $1 GROUP BY d.id",
            [id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// export const setDancePic = async (req, res) => {
//     const storage = new Storage({
//         projectId: process.env.GCLOUD_PROJECT_ID,
//         keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
//     });

//     const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

//     try {
//         const blob = bucket.file(req.file.originalname);

//         let uuid = UUID();

//         const blobWriter = blob.createWriteStream({
//             metadata: {
//                 contentType: req.file.mimetype,
//                 metadata: {
//                     firebaseStorageDownloadTokens: uuid
//                 }
//             }
//         })

//         blobWriter.on('finish', async () => {
//             const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;

//             // const result = await Dance.findByIdAndUpdate(req.params.id, req.body = { coverPic: publicUrl }, { new: true });

//             // res.status(200).json(result);

//             const result = await pool.query('UPDATE dances SET cover_pic = $1 WHERE id = $2 RETURNING *', [publicUrl, req.params.id]);

//             res.status(200).json(result.rows[0]);
//         })

//         blobWriter.end(req.file.buffer);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

export const deleteDance = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM dances WHERE id = $1', [id]);

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

            await pool.query(
                'UPDATE dances SET pictures = array_append(pictures, $1) WHERE id = $2',
                [publicUrl, req.params.id]
            );

            const result = await pool.query(
                "SELECT d.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM dances d LEFT JOIN dance_likes l ON d.id = l.dance_id WHERE d.id = $1 GROUP BY d.id",
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
            'select exists(SELECT 1 FROM dance_likes WHERE dance_id = $1 AND user_id = $2)',
            [id, req.userId]
        );
        let result;

        if (query.rows[0].exists) {
            await pool.query(
                'DELETE FROM dance_likes WHERE dance_id = $1 AND user_id = $2',
                [id, req.userId]
            );
        } else {
            await pool.query(
                'INSERT INTO dance_likes (dance_id, user_id) VALUES($1, $2)',
                [id, req.userId]
            );
        }

        result = await pool.query(
            "SELECT COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM dance_likes WHERE dance_id = $1",
            [id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// need to convert
// export const getFavoriteDances = async (req, res, next) => {
//     const { userId } = req;

//     try {
//         const dances = await Dance.find({ likes: { $in: userId } });

//         res.status(200).json(dances);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }
