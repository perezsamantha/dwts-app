import pool from '../api/pool.js';

export const fetchRecentLikes = async (req, res) => {
    try {
        const result = await pool.query(
            `
            SELECT tb.*,
                (
                    SELECT JSON_BUILD_OBJECT('id', u.id, 'cover_pic', u.cover_pic, 'username', u.username)
                    FROM users u
                    WHERE u.id = tb.user_id
                ) AS user,
                (
                    SELECT ROW_TO_JSON(d)
                    FROM (
                        SELECT d.*, 
                        (
                            SELECT ROW_TO_JSON(e.*)
                            FROM episodes e
                            WHERE e.id = d.episode_id
                        ) AS episode
                        FROM dances d
                    ) d
                    WHERE d.id = tb.dance_id
                        AND tb.dance_id IS NOT NULL
                ) AS dance,
                (
                    SELECT ROW_TO_JSON(t)
                    FROM (
                        SELECT t.*, 
                        (
                            SELECT ROW_TO_JSON(c.*)
                            FROM celebs c
                            WHERE c.id = t.celeb_id
                        ) AS celeb,
                        (
                            SELECT ROW_TO_JSON(p.*)
                            FROM pros p
                            WHERE p.id = t.pro_id
                        ) AS pro
                        FROM teams t
                    ) t
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
