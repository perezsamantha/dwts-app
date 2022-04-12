import pool from '../api/pool.js';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

export const addSeason = async (req, res) => {
    try {
        const { id, host, cohost, extra } = req.body;
        const result = await pool.query(
            `
            INSERT INTO seasons (id, host, cohost, extra) 
            VALUES($1, $2, $3, $4) 
            RETURNING *
            `,
            [id, host, cohost, extra]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchAllSeasons = async (req, res) => {
    try {
        const seasons = await pool.query(
            `
            SELECT s.*, 
                COALESCE(json_agg(t) FILTER (WHERE t.id IS NOT NULL), '[]') AS teams 
            FROM seasons s 
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
                ORDER BY t.placement
            ) t 
            ON s.id = t.season_id 
            GROUP BY s.id 
            ORDER BY s.id DESC
            `
        );

        res.status(200).json(seasons.rows);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const findSeasonById = async (req, res) => {
    const { id } = req.params;

    try {
        const season = await pool.query(
            `
            SELECT * 
            FROM seasons 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json(season.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const updateSeason = async (req, res) => {
    const { id } = req.params;
    const { host, cohost, extra } = req.body;

    try {
        const result = await pool.query(
            `UPDATE seasons 
            SET id = $1, host = $2, cohost = $3, extra = $4 
            WHERE id = $5 
            RETURNING * 
            `,
            [req.body.id, host, cohost, extra, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const setSeasonPic = async (req, res) => {
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
                UPDATE seasons 
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

export const deleteSeason = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM seasons 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Season successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
