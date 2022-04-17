import pool from '../api/pool.js';

export const addScore = async (req, res) => {
    try {
        const { dance_id, judge_id, value, order, is_guest } = req.body;

        const result = await pool.query(
            `
            INSERT INTO scores (
                dance_id, 
                judge_id, 
                value, 
                "order", 
                is_guest) 
            VALUES($1, $2, $3, $4, $5) 
            RETURNING *
            `,
            [dance_id, judge_id, value, order, is_guest]
        );

        const score = await pool.query(
            `
            SELECT s.*,
                ROW_TO_JSON(j) AS judge,
                COALESCE((ARRAY_AGG(ROW_TO_JSON(d)))[1], '[]') AS dance 
            FROM scores s
            LEFT JOIN judges j
            ON s.judge_id = j.id
            LEFT JOIN (
                SELECT d.*,
                        ROW_TO_JSON(e) AS episode
                    FROM dances d
                    LEFT JOIN episodes e
                    ON d.episode_id = e.id
                    GROUP BY d.id, e.id
            ) d
            ON s.dance_id = d.id
            WHERE s.id = $1
            GROUP BY s.id, j.id
            `,
            [result.rows[0].id]
        );

        res.status(200).json(score.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchScores = async (req, res) => {
    try {
        const scores = await pool.query(`
        SELECT s.*,
            ROW_TO_JSON(j) AS judge,
            COALESCE((ARRAY_AGG(ROW_TO_JSON(d)))[1], '[]') AS dance 
        FROM scores s
        LEFT JOIN judges j
        ON s.judge_id = j.id
        LEFT JOIN (
            SELECT d.*,
                    ROW_TO_JSON(e) AS episode
                FROM dances d
                LEFT JOIN episodes e
                ON d.episode_id = e.id
                GROUP BY d.id, e.id
        ) d
        ON s.dance_id = d.id
        GROUP BY s.id, j.id
        `);

        res.status(200).json(scores.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findScoreById = async (req, res) => {
    const { id } = req.params;

    try {
        const score = await pool.query(
            `
            SELECT s.*,
                ROW_TO_JSON(j) AS judge,
                COALESCE((ARRAY_AGG(ROW_TO_JSON(d)))[1], '[]') AS dance 
            FROM scores s
            LEFT JOIN judges j
            ON s.judge_id = j.id
            LEFT JOIN (
                SELECT d.*,
                        ROW_TO_JSON(e) AS episode
                    FROM dances d
                    LEFT JOIN episodes e
                    ON d.episode_id = e.id
                    GROUP BY d.id, e.id
            ) d
            ON s.dance_id = d.id
            WHERE s.id = $1
            GROUP BY s.id, j.id
            `,
            [id]
        );

        res.status(200).json(score.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateScore = async (req, res) => {
    const { id } = req.params;

    try {
        const { dance_id, judge_id, value, order, is_guest } = req.body;

        const result = await pool.query(
            `
            UPDATE scores 
            SET dance_id = $1, 
                judge_id = $2, 
                value = $3, 
                "order" = $4, 
                is_guest = $5 
            WHERE id = $6 
            RETURNING *`,
            [dance_id, judge_id, value, order, is_guest, id]
        );

        const score = await pool.query(
            `
            SELECT s.*,
                ROW_TO_JSON(j) AS judge,
                COALESCE((ARRAY_AGG(ROW_TO_JSON(d)))[1], '[]') AS dance 
            FROM scores s
            LEFT JOIN judges j
            ON s.judge_id = j.id
            LEFT JOIN (
                SELECT d.*,
                        ROW_TO_JSON(e) AS episode
                    FROM dances d
                    LEFT JOIN episodes e
                    ON d.episode_id = e.id
                    GROUP BY d.id, e.id
            ) d
            ON s.dance_id = d.id
            WHERE s.id = $1
            GROUP BY s.id, j.id
            `,
            [result.rows[0].id]
        );

        res.status(200).json(score.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteScore = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM scores 
            WHERE id = $1
            `,
            [id]
        );

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

        const scored_at = new Date();

        if (query.rows[0].exists) {
            await pool.query(
                `UPDATE user_scores
                SET value = $1, 
                    scored_at = $2
                WHERE dance_id = $3
                    AND user_id = $4`,
                [value, scored_at, id, req.userId]
            );
        } else {
            await pool.query(
                `INSERT INTO user_scores 
                    (dance_id, user_id, value, scored_at) 
                VALUES($1, $2, $3, $4)`,
                [id, req.userId, value, scored_at]
            );
        }

        res.status(200).json({ id, value });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
