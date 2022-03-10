import pool from '../api/pool.js';
import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4';

export const addTour = async (req, res) => {
    try {
        const { name, season_id, first_show, last_show, num_shows, extra } =
            req.body;

        const result = await pool.query(
            `INSERT INTO tours (name, season_id, first_show, last_show, num_shows, extra) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
            [name, season_id, first_show, last_show, num_shows, extra]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchAllTours = async (req, res) => {
    try {
        // const tours = await pool.query(
        //     'SELECT * FROM tours ORDER BY season_id'
        // );

        const tours = await pool.query(
            `SELECT t.*, COALESCE(ARRAY_AGG(pro_id) filter (where pro_id is not null), '{}') as pros, COALESCE(ARRAY_AGG(celeb_id) filter (where celeb_id is not null), '{}') AS celebs FROM tours t LEFT JOIN tour_cast tc ON t.id = tc.tour_id GROUP BY t.id ORDER BY t.season_id`
        );

        res.status(200).json(tours.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findTourById = async (req, res) => {
    const { id } = req.params;

    try {
        const tour = await pool.query('SELECT * FROM tours WHERE id = $1', [
            id,
        ]);

        res.status(200).json(tour.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTour = async (req, res) => {
    const { id } = req.params;

    try {
        const { name, season_id, first_show, last_show, num_shows, extra } =
            req.body;

        const result = await pool.query(
            'UPDATE tours SET name = $1, season_id = $2, first_show = $3, last_show = $4, num_shows = $5, extra = $6 WHERE id = $7 RETURNING *',
            [name, season_id, first_show, last_show, num_shows, extra, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const setTourPic = async (req, res) => {
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

            const result = await pool.query(
                'UPDATE tours SET cover_pic = $1 WHERE id = $2 RETURNING *',
                [publicUrl, id]
            );

            res.status(200).json(result.rows[0]);
        });

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTour = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM tours WHERE id = $1', [id]);

        res.status(200).json({ message: 'Tour successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// tour_cast controller below

export const addCast = async (req, res) => {
    try {
        const { tour_id, pro_id, celeb_id, is_swing, extra } = req.body;

        const result = await pool.query(
            `INSERT INTO tour_cast (tour_id, pro_id, celeb_id, is_swing, extra) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [tour_id, pro_id, celeb_id, is_swing, extra]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchAllCast = async (req, res) => {
    try {
        const cast = await pool.query('SELECT * FROM tour_cast');

        res.status(200).json(cast.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const findCastById = async (req, res) => {
    const { id } = req.params;

    try {
        const cast = await pool.query('SELECT * FROM tour_cast WHERE id = $1', [
            id,
        ]);

        res.status(200).json(cast.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateCast = async (req, res) => {
    const { id } = req.params;

    try {
        const { tour_id, pro_id, celeb_id, is_swing, extra } = req.body;

        const result = await pool.query(
            'UPDATE tour_cast SET tour_id = $1, pro_id = $2, celeb_id = $3, is_swing = $4, extra = $5 WHERE id = $6 RETURNING *',
            [tour_id, pro_id, celeb_id, is_swing, extra, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteCast = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM tour_cast WHERE id = $1', [id]);

        res.status(200).json({ message: 'Cast member successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
