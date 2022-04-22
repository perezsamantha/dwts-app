import pool from '../api/pool.js';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';

export const addCeleb = async (req, res) => {
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
            INSERT INTO celebs (
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

export const fetchAllCelebs = async (req, res) => {
    try {
        const celebs = await pool.query(
            `
            SELECT * 
            FROM celebs
            `
        );

        res.status(200).json(celebs.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findCelebById = async (req, res) => {
    const { id } = req.params;

    try {
        const celeb = await pool.query(
            `
            SELECT * 
            FROM celebs 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json(celeb.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCeleb = async (req, res) => {
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

        const result = await pool.query(
            `
            UPDATE celebs 
            SET first_name = $1, 
                last_name = $2, 
                birthday = $3, 
                height = $4, 
                gender = $5, 
                twitter = $6, 
                instagram = $7, 
                tiktok = $8, 
                is_junior = $9
            WHERE id = $10
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
                id,
            ]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setCelebPic = async (req, res) => {
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
                UPDATE celebs 
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

export const deleteCeleb = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM celebs 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Celeb successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
