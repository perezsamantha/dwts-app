import pool from '../api/pool.js';

export const addScore = async (req, res) => {
    try {
        const { dance_id, judge_id, value, order, is_guest } = req.body;

        const result = await pool.query(
            `INSERT INTO scores (dance_id, judge_id, value, "order", is_guest) VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [dance_id, judge_id, value, order, is_guest]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchScores = async (req, res) => {
    try {
        const scores = await pool.query('SELECT * FROM scores');

        res.status(200).json(scores.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findScoreById = async (req, res) => {
    const { id } = req.params;

    try {
        const score = await pool.query('SELECT * FROM scores WHERE id = $1', [
            id,
        ]);

        res.status(200).json(score.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// export const findScoresByDance = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const score = await pool.query('SELECT * FROM scores WHERE dance_id = $1', [id]);

//         res.status(200).json(score.rows);
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }

export const updateScore = async (req, res) => {
    const { id } = req.params;

    try {
        const { dance_id, judge_id, value, order, is_guest } = req.body;

        const result = await pool.query(
            'UPDATE scores SET dance_id = $1, judge_id = $2, value = $3, "order" = $4, is_guest = $5 WHERE id = $6 RETURNING *',
            [dance_id, judge_id, value, order, is_guest, id]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteScore = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM scores WHERE id = $1', [id]);

        res.status(200).json({ message: 'Score successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// daily dance scores

export const setUserScore = async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthenticated' });
        }

        const query = await pool.query(
            `SELECT EXISTS(
                SELECT 1 
                FROM user_scores 
                WHERE dance_id = $1 
                    AND user_id = $2)
            `,
            [id, req.userId]
        );

        // const user = await pool.query(
        //     `
        //     SELECT id, username
        //     FROM users u
        //     WHERE id = $1
        //     `,
        //     [req.userId]
        // );

        if (query.rows[0].exists) {
            await pool.query(
                `UPDATE user_scores
                SET value = $1
                WHERE dance_id = $2
                    AND user_id = $3`,
                [value, id, req.userId]
            );
        } else {
            await pool.query(
                `INSERT INTO user_scores 
                    (dance_id, user_id, value) 
                VALUES($1, $2, $3)`,
                [id, req.userId, value]
            );
        }

        res.status(200).json({ id, value });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
