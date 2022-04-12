import pool from '../api/pool.js';

export const fetchRecentLikes = async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT tb.*,
                (
                    SELECT JSON_BUILD_OBJECT('id', u.id, 'username', u.username)
                    FROM users u
                    WHERE u.id = tb.user_id
                ) AS user,
                (
                    SELECT ROW_TO_JSON(d)
                    FROM dances d
                    WHERE d.id = tb.dance_id
                        AND tb.dance_id IS NOT NULL
                ) AS dance,
                (
                    SELECT ROW_TO_JSON(t)
                    FROM teams t
                    WHERE t.id = tb.team_id
                        AND tb.team_id IS NOT NULL
                ) AS team,
                (
                    SELECT ROW_TO_JSON(p)
                    FROM pros p
                    WHERE p.id = tb.pro_id
                        AND tb.pro_id IS NOT NULL
                ) AS pro
            FROM (
                dance_likes
                NATURAL FULL OUTER JOIN 
                team_likes 
                NATURAL FULL OUTER JOIN
                pro_likes
            ) tb
            ORDER BY liked_at DESC
            LIMIT 10
            `
        );

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
