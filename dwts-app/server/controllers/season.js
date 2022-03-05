import pool from '../api/pool.js';
import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4';

// export const getSeasons = () => {
//     return new Promise(function(resolve, reject) {
//         pool.query('SELECT * FROM seasons ORDER BY id ASC', (error, results) => {
//             if (error)  {
//                 reject(error)
//             }
//             resolve(results.rows);
//         })
//     })
// }

// export const addSeason = async (req, res) => {
//     try {
//         const { cover_pic, number, extra } = req.body;
//         const result = await pool.query('INSERT INTO seasons (number, extra) VALUES($1, $2) RETURNING *', [number, extra]);

//         res.status(200).json(result.rows[0]);
//     } catch (error) {
//         res.status(500).json({ message: error });
//     }
// }

export const addSeason = async (req, res) => {
    try {
        const { id, extra } = req.body;
        const result = await pool.query(
            'INSERT INTO seasons (id, extra) VALUES($1, $2) RETURNING *',
            [id, extra]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchAllSeasons = async (req, res) => {
    try {
        const seasons = await pool.query(
            'SELECT * FROM seasons ORDER BY id DESC'
        );

        res.status(200).json(seasons.rows);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const findSeasonById = async (req, res) => {
    const { id } = req.params;

    try {
        const season = await pool.query('SELECT * FROM seasons WHERE id = $1', [
            id,
        ]);

        res.status(200).json(season.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const searchSeasons = async (req, res) => {
    //
};

export const updateSeason = async (req, res) => {
    const { id } = req.params;
    const { cover_pic, extra } = req.body;

    try {
        const result = await pool.query(
            'UPDATE seasons SET id = $1, extra = $2 WHERE id = $3 RETURNING *',
            [req.body.id, extra, id]
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
                'UPDATE seasons SET cover_pic = $1 WHERE id = $2 RETURNING *',
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
        await pool.query('DELETE FROM seasons WHERE id = $1', [id]);

        res.status(200).json({ message: 'Season successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
