import pool from "../api/pool.js";

export const addDancer = async (req, res) => {
    try {
        const {
            dance_id,
            team_id,
            pro_id,
            celeb_id,
            extra,
            is_background
        } = req.body;

        const result = await pool.query(`INSERT INTO dancers (dance_id, team_id, pro_id, celeb_id, extra, is_background) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`, [dance_id, team_id, pro_id, celeb_id, extra, is_background]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchAllDancers = async (req, res) => {
    try {
        const dancers = await pool.query('SELECT * FROM dancers');

        res.status(200).json(dancers.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findDancersByDance = async (req, res) => {
    const { id } = req.params;

    try {
        const dancer = await pool.query('SELECT * FROM dancers WHERE dance_id = $1', [id]);

        res.status(200).json(dancer.rows);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateDancer = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            dance_id,
            team_id,
            pro_id,
            celeb_id,
            extra,
            is_background
        } = req.body;

        const result = await pool.query('UPDATE dancers SET dance_id = $1, team_id = $2, pro_id = $3, celeb_id = $4, extra = $5, is_background = $6 WHERE dancer_id = $7 RETURNING *', [dance_id, team_id, pro_id, celeb_id, extra, is_background, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteDancer = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM dancers WHERE dancer_id = $1', [id]);

        res.status(200).json({ message: "Dancer successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}