import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4';
import pool from '../api/pool.js';

export const addTeam = async (req, res) => {
    //console.log(req);
    try {
        const {
            cover_pic,
            celeb_id,
            pro_id,
            mentor_id,
            season_id,
            placement,
            team_name,
            extra,
        } = req.body;

        const result = await pool.query(
            `INSERT INTO teams (celeb_id, pro_id, mentor_id, season_id, placement, team_name, extra) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
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

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchAllTeams = async (req, res) => {
    try {
        // const teams = await pool.query(
        //     'SELECT * FROM teams ORDER BY season_id DESC, placement ASC'
        // );

        const teams = await pool.query(
            "SELECT t.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM teams t LEFT JOIN team_likes l ON t.id = l.team_id GROUP BY t.id"
        );

        res.status(200).json(teams.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findTeamById = async (req, res) => {
    const { id } = req.params;

    try {
        // const team = await pool.query('SELECT * FROM teams WHERE id = $1', [
        //     id,
        // ]);

        const team = await pool.query(
            "SELECT t.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM teams t LEFT JOIN team_likes l ON t.id = l.team_id WHERE t.id = $1 GROUP BY t.id",
            [id]
        );

        res.status(200).json(team.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const searchTeams = async (req, res) => {
    const { search } = req.body;
    //const nameQuery = ("SELECT celeb_id FROM celebs WHERE first_name || ' ' || last_name ILIKE $1", [`%${search}%`]);

    try {
        // const teams = await pool.query(
        //     'SELECT * FROM teams WHERE celeb_id IN (' +
        //         `SELECT id FROM celebs WHERE first_name || ' ' || last_name ILIKE '%${search}%' ` +
        //         ') OR pro_id IN (' +
        //         `SELECT id FROM pros WHERE first_name || ' ' || last_name ILIKE '%${search}%' ` +
        //         ')'
        // );

        const teams = await pool.query(
            "SELECT t.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM teams t LEFT JOIN team_likes l ON t.id = l.team_id WHERE celeb_id IN (SELECT id FROM celebs WHERE first_name || ' ' || last_name ILIKE $1) OR pro_id IN (SELECT id FROM pros WHERE first_name || ' ' || last_name ILIKE $1) GROUP BY t.id",
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
            cover_pic,
            celeb_id,
            pro_id,
            mentor_id,
            season_id,
            placement,
            team_name,
            extra,
        } = req.body;

        await pool.query(
            `UPDATE teams SET celeb_id = $1, pro_id = $2, mentor_id = $3, season_id = $4, placement = $5, team_name = $6, extra = $7 WHERE id = $8`,
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
            "SELECT t.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM teams t LEFT JOIN team_likes l ON t.id = l.team_id WHERE t.id = $1 GROUP BY t.id",
            [id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const setTeamPic = async (req, res) => {
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
                'UPDATE teams SET cover_pic = $1 WHERE id = $2 RETURNING *',
                [publicUrl, req.params.id]
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
        await pool.query('DELETE FROM teams WHERE id = $1', [id]);

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
                'UPDATE teams SET pictures = array_append(pictures, $1) WHERE id = $2 RETURNING *',
                [publicUrl, id]
            );

            const result = await pool.query(
                "SELECT t.*, COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM teams t LEFT JOIN team_likes l ON t.id = l.team_id WHERE t.id = $1 GROUP BY t.id",
                [id]
            );

            res.status(200).json(result.rows[0]);
        });

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// TODO:
export const likeTeam = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }

        const query = await pool.query(
            'select exists(SELECT 1 FROM team_likes WHERE team_id = $1 AND user_id = $2)',
            [id, req.userId]
        );
        let result;

        if (query.rows[0].exists) {
            await pool.query(
                'DELETE FROM team_likes WHERE team_id = $1 AND user_id = $2',
                [id, req.userId]
            );
        } else {
            await pool.query(
                'INSERT INTO team_likes (team_id, user_id) VALUES($1, $2)',
                [id, req.userId]
            );
        }

        result = await pool.query(
            "SELECT COALESCE(ARRAY_AGG(user_id) filter (where user_id is not null), '{}') likes FROM team_likes WHERE team_id = $1",
            [id]
        );

        const team = await pool.query(
            `
            SELECT t.*,
                ROW_TO_JSON(p) AS pro, 
                ROW_TO_JSON(c) AS celeb 
            FROM teams t 
            LEFT JOIN pros p 
            ON t.pro_id = p.id 
            LEFT JOIN celebs c 
            ON t.celeb_id = c.id 
            WHERE t.id = $1
            GROUP BY t.id, p.id, c.id
            `,
            [id]
        );

        //res.status(200).json(result.rows[0]);
        res.status(200).json({
            team: team.rows[0],
            likes: result.rows[0].likes,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};

// TODO:
export const getFavoriteTeams = async (req, res, next) => {};
