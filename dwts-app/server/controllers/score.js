import pool from "../api/pool.js";

export const addScore = async (req, res) => {
    try {
        const {
            dance_id,
            judge_id,
            score,
            position,
            is_guest
        } = req.body;

        const result = await pool.query(`INSERT INTO scores (dance_id, judge_id, score, position, is_guest) VALUES($1, $2, $3, $4, $5) RETURNING *`, [dance_id, judge_id, score, position, is_guest]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchAllScores = async (req, res) => {
    try {
        const scores = await pool.query('SELECT * FROM scores');

        res.status(200).json(scores.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const findScoreById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const score = await pool.query('SELECT * FROM scores WHERE score_id = $1', [id]);

//         res.status(200).json(score.rows[0]);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

export const findScoresByDance = async (req, res) => {
    const { id } = req.params;

    try {
        const score = await pool.query('SELECT * FROM scores WHERE dance_id = $1', [id]);

        res.status(200).json(score.rows);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateScore = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            dance_id,
            judge_id,
            score,
            position,
            is_guest
        } = req.body;

        const result = await pool.query('UPDATE scores SET dance_id = $1, judge_id = $2, score = $3, position = $4, is_guest = $5 WHERE score_id = $6 RETURNING *', [dance_id, judge_id, score, position, is_guest, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteScore = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM scores WHERE score_id = $1', [id]);

        res.status(200).json({ message: "Score successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}