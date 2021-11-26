import pool from "../api/pool.js";

export const addEpisode = async (req, res) => {
    try {
        const {
            season_id,
            week,
            night,
            date,
        } = req.body;

        const result = await pool.query(`INSERT INTO episodes (season_id, week, night, date) VALUES($1, $2, $3, $4) RETURNING *`, [season_id, week, night, date]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchAllEpisodes = async (req, res) => {
    try {
        const episodes = await pool.query('SELECT * FROM episodes');

        res.status(200).json(episodes.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findEpisodeById = async (req, res) => {
    const { id } = req.params;

    try {
        const episode = await pool.query('SELECT * FROM episodes WHERE episode_id = $1', [id]);

        res.status(200).json(episode.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateEpisode = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            season_id,
            week,
            night,
            date,
        } = req.body;

        const result = await pool.query('UPDATE episodes SET season_id = $1, week = $2, night = $3, date = $4 WHERE episode_id = $5 RETURNING *', [season_id, week, night, date, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteEpisode = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM episodes WHERE episode_id = $1', [id]);

        res.status(200).json({ message: "Episode successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}