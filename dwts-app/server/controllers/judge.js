import pool from "../api/pool.js";

export const addJudge = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            birthday,
        } = req.body;

        const result = await pool.query(`INSERT INTO judges (first_name, last_name, birthday) VALUES($1, $2, $3) RETURNING *`, [first_name, last_name, birthday]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchAllJudges = async (req, res) => {
    try {
        const judges = await pool.query('SELECT * FROM judges');

        res.status(200).json(judges.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findJudgeById = async (req, res) => {
    const { id } = req.params;

    try {
        const judge = await pool.query('SELECT * FROM judges WHERE judge_id = $1', [id]);

        res.status(200).json(judge.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateJudge = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            first_name,
            last_name,
            birthday,
        } = req.body;

        const result = await pool.query('UPDATE judges SET first_name = $1, last_name = $2, birthday = $3 WHERE judge_id = $4 RETURNING *', [first_name, last_name, birthday, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteJudge = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM judges WHERE judge_id = $1', [id]);

        res.status(200).json({ message: "Judge successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}