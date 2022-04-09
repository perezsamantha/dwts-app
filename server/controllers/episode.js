import pool from '../api/pool.js';

export const addEpisode = async (req, res) => {
    try {
        const { season_id, week, night, theme, date, extra } = req.body;

        const result = await pool.query(
            `
            INSERT INTO episodes (
                season_id, 
                week, 
                night, 
                theme, 
                date, 
                extra
            ) 
            VALUES($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
            [season_id, week, night, theme, date, extra]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchAllEpisodes = async (req, res) => {
    try {
        const episodes = await pool.query(
            `
            SELECT * 
            FROM episodes
            ORDER BY season_id DESC, week DESC
            `
        );

        res.status(200).json(episodes.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findEpisodeById = async (req, res) => {
    const { id } = req.params;

    try {
        const episode = await pool.query(
            `
            SELECT * 
            FROM episodes 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json(episode.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateEpisode = async (req, res) => {
    const { id } = req.params;

    try {
        const { season_id, week, night, theme, date, extra } = req.body;

        const result = await pool.query(
            `
            UPDATE episodes 
            SET season_id = $1, 
                week = $2, 
                night = $3, 
                theme = $4, 
                date = $5,
                 extra = $6 
            WHERE id = $7 
            RETURNING *
            `,
            [season_id, week, night, theme, date, extra, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteEpisode = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM episodes 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Episode successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
