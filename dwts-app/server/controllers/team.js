
import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4';
import pool from "../api/pool.js";

export const addTeam = async (req, res) => {
    try {
        const {
            cover_pic,
            celeb_id,
            pro_id,
            mentor_id,
            season_id,
            placement,
            team_name,
            extra
        } = req.body;

        const result = await pool.query(`INSERT INTO teams (celeb_id, pro_id, mentor_id, season_id, placement, team_name, extra) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [celeb_id, pro_id, mentor_id, season_id, placement, team_name, extra]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchAllTeams = async (req, res) => {
    try {
        const teams = await pool.query('SELECT * FROM teams');

        res.status(200).json(teams.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findTeamById = async (req, res) => {
    const { id } = req.params;

    try {
        const team = await pool.query('SELECT * FROM teams WHERE team_id = $1', [id]);

        res.status(200).json(team.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const searchTeams = async (req, res) => {
    const { search } = req.body;
    //const nameQuery = ("SELECT celeb_id FROM celebs WHERE first_name || ' ' || last_name ILIKE $1", [`%${search}%`]);

    try {
        const teams = await pool.query('SELECT * FROM teams WHERE celeb_id IN (' + `SELECT celeb_id FROM celebs WHERE first_name || ' ' || last_name ILIKE '%${search}%'` + ')');

        res.status(200).json(teams.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

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
            extra
        } = req.body;

        const result = await pool.query(`UPDATE teams SET celeb_id = $1, pro_id = $2, mentor_id = $3, season_id = $4, placement = $5, team_name = $6, extra = $7 WHERE team_id = $8 RETURNING *`, [celeb_id, pro_id, mentor_id, season_id, placement, team_name, extra, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

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
                    firebaseStorageDownloadTokens: uuid
                }
            }
        })

        blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;

            const result = await pool.query('UPDATE teams SET cover_pic = $1 WHERE team_id = $2 RETURNING *', [publicUrl, req.params.id]);

            res.status(200).json(result.rows[0]);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteTeam = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM teams WHERE team_id = $1', [id]);

        res.status(200).json({ message: "Team successfully deleted." });
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

            const result = await pool.query('UPDATE teams SET pictures = array_append(pictures, $1) WHERE team_id = $2 RETURNING *', [publicUrl, req.params.id]);

            res.status(200).json(result.rows[0]);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// TODO
export const likeTeam = async (req, res, next) => {
    
}

// TODO
export const getFavoriteTeams = async (req, res, next) => {
    
}