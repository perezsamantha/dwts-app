
import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4'

import pool from "../api/pool.js";

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
            is_junior
        } = req.body;

        const result = await pool.query(`INSERT INTO pros (first_name, last_name, birthday, height, gender, twitter, instagram, tiktok, is_junior) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [first_name, last_name, birthday, height, gender, twitter, instagram, tiktok, is_junior]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchAllPros = async (req, res) => {
    try {
        const pros = await pool.query('SELECT * FROM pros');

        res.status(200).json(pros.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findProById = async (req, res) => {
    const { id } = req.params;

    try {
        const pro = await pool.query('SELECT * FROM pros WHERE id = $1', [id]);

        res.status(200).json(pro.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const searchPros = async (req, res) => {
    const { search } = req.body;

    try {
        const pros = await pool.query("SELECT * FROM pros WHERE first_name || ' ' || last_name ILIKE $1", [`%${search}%`]);

        res.status(200).json(pros.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
            is_junior
        } = req.body;

        const result = await pool.query('UPDATE pros SET first_name = $1, last_name = $2, birthday = $3, height = $4, gender = $5, twitter = $6, instagram = $7, tiktok = $8, is_junior = $9 WHERE id = $10 RETURNING *', [first_name, last_name, birthday, height, gender, twitter, instagram, tiktok, is_junior, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const setProPic = async (req, res) => {
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
                    firebaseStorageDownloadTokens: uuid
                }
            }
        })

        blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;

            const result = await pool.query('UPDATE pros SET cover_pic = $1 WHERE id = $2 RETURNING *', [publicUrl, req.params.id]);

            res.status(200).json(result.rows[0]);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deletePro = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM pros WHERE id = $1', [id]);

        res.status(200).json({ message: "Pro successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addPic = async (req, res) => {
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
                    firebaseStorageDownloadTokens: uuid
                }
            }
        })

        blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;

            const result = await pool.query('UPDATE pros SET pictures = array_append(pictures, $1) WHERE id = $2 RETURNING *', [publicUrl, req.params.id]);

            res.status(200).json(result.rows[0]);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// TODO
export const likePro = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.userId) {
            return res.status(401).json({ message: "Unauthenticated" });
        }

        // check if like is in table
        if (pool.query(`exists(SELECT 1 FROM pro_likes WHERE id = ${id}, user_id = ${userId}`)) {
            await pool.query(`DELETE FROM pro_likes WHERE id = ${id}, user_id = ${userId}`);
            // json message
        } else {
            const result = await pool.query(`INSERT INTO pros (id, user_id) VALUES($1, $2)`, [id, userId]);
            // json message with resulting row ?? row[0]
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// need to conver
// export const getFavoritePros = async (req, res, next) => {
//     const { userId } = req;

//     try {
//         const pros = await Pro.find({ likes: { $in: userId } });

//         res.status(200).json(pros);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }