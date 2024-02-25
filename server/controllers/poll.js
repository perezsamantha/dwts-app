import pool from '../api/pool.js';
import { DateTime } from 'luxon';

export const addPoll = async (req, res) => {
    try {
        const { title, expires_in } = req.body;
        let expires = new Date();
        expires.setDate(expires.getDate() + expires_in);

        const result = await pool.query(
            `
            INSERT INTO polls (
                title,
                expires
            )
            VALUES($1, $2)
            RETURNING *
            `,
            [title, expires]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const addPollOption = async (req, res) => {
    try {
        const { poll_id, data } = req.body;

        const result = await pool.query(
            `
            INSERT INTO poll_options(
                poll_id,
                data
            )
            VALUES($1, $2)
            RETURNING *
            `,
            [poll_id, data]
        );

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// fetch polls with options and votes
// `
//             SELECT p.*,
//                 COALESCE(JSON_AGG(o) FILTER (WHERE o.id IS NOT NULL), '[]') AS options
//             FROM polls p
//             LEFT JOIN poll_options o
//             ON p.id = o.poll_id
//             GROUP BY p.id
//             `

export const fetchPolls = async (req, res) => {
    let { type, day } = req.body;
    let date, localDate;
    //localDate = DateTime.fromISO(day, { setZone: true });
    //date = DateTime.utc(localDate.year, localDate.month, localDate.day).toISO();
    date = day;

    try {
        const polls = await pool.query(
            `
            SELECT p.*,
                COALESCE(JSON_AGG(o) FILTER (WHERE o.id IS NOT NULL), '[]') AS options
            FROM polls p
            LEFT JOIN (
                SELECT o.*,
                    COALESCE(JSON_AGG(v.user_id) FILTER (WHERE v.id IS NOT NULL), '[]') AS votes
                FROM poll_options o
                LEFT JOIN poll_votes v
                ON o.id = v.option_id
                GROUP BY o.id
            ) o
            ON p.id = o.poll_id
            WHERE 
                CASE 
                    WHEN $1 = 'active' THEN expires > $2
                    WHEN $1 = 'expired' THEN expires < $2
                    ELSE expires >= '2022-01-01'
                END
            GROUP BY p.id
            ORDER BY p.id DESC
            `,
            [type, date]
        );

        res.status(200).json(polls.rows);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deletePoll = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM polls
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Poll successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const deletePollOption = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM poll_options
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Option successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const voteOption = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.status(401).json({ message: 'Unauthenticated' });
    }

    try {
        await pool.query(
            `
            INSERT INTO poll_votes (
                option_id,
                user_id
            )
            VALUES($1, $2)
            `,
            [id, req.userId]
        );

        res.status(200).json({ user_id: req.userId });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
