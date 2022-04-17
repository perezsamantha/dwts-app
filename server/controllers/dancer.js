import pool from '../api/pool.js';

export const addDancer = async (req, res) => {
    try {
        const { dance_id, team_id, pro_id, celeb_id, extra, is_background } =
            req.body;

        const result = await pool.query(
            `
            INSERT INTO dancers (
                dance_id, 
                team_id, 
                pro_id, 
                celeb_id, 
                extra, 
                is_background
            ) 
            VALUES($1, $2, $3, $4, $5, $6) 
            RETURNING *
            `,
            [dance_id, team_id, pro_id, celeb_id, extra, is_background]
        );

        const dancer = await pool.query(
            `
            SELECT dr.*,
                ROW_TO_JSON(p) AS pro,
                ROW_TO_JSON(c) AS celeb,
                (ARRAY_AGG(ROW_TO_JSON(t)))[1] AS team,
                COALESCE((ARRAY_AGG(ROW_TO_JSON(d)))[1], '[]') AS dance 
            FROM dancers dr
            LEFT JOIN pros p
            ON dr.pro_id = p.id
            LEFT JOIN celebs c
            ON dr.celeb_id = c.id
            LEFT JOIN (
                SELECT t.*,
                    ROW_TO_JSON(p) AS pro,
                    ROW_TO_JSON(c) AS celeb
                FROM teams t
                LEFT JOIN pros p
                ON t.pro_id = p.id
                LEFT JOIN celebs c
                ON t.celeb_id = c.id
                GROUP BY t.id, p.id, c.id
            ) t
            ON dr.team_id = t.id
            LEFT JOIN (
                SELECT d.*,
                        ROW_TO_JSON(e) AS episode
                    FROM dances d
                    LEFT JOIN episodes e
                    ON d.episode_id = e.id
                    GROUP BY d.id, e.id
            ) d
            ON dr.dance_id = d.id
            WHERE dr.id = $1
            GROUP BY dr.id, p.id, c.id
            `,
            [result.rows[0].id]
        );

        res.status(200).json(dancer.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export const fetchDancers = async (req, res) => {
    try {
        const dancers = await pool.query(`
            SELECT dr.*,
                ROW_TO_JSON(p) AS pro,
                ROW_TO_JSON(c) AS celeb,
                (ARRAY_AGG(ROW_TO_JSON(t)))[1] AS team,
                COALESCE((ARRAY_AGG(ROW_TO_JSON(d)))[1], '[]') AS dance 
            FROM dancers dr
            LEFT JOIN pros p
            ON dr.pro_id = p.id
            LEFT JOIN celebs c
            ON dr.celeb_id = c.id
            LEFT JOIN (
                SELECT t.*,
                    ROW_TO_JSON(p) AS pro,
                    ROW_TO_JSON(c) AS celeb
                FROM teams t
                LEFT JOIN pros p
                ON t.pro_id = p.id
                LEFT JOIN celebs c
                ON t.celeb_id = c.id
                GROUP BY t.id, p.id, c.id
            ) t
            ON dr.team_id = t.id
            LEFT JOIN (
                SELECT d.*,
                        ROW_TO_JSON(e) AS episode
                    FROM dances d
                    LEFT JOIN episodes e
                    ON d.episode_id = e.id
                    GROUP BY d.id, e.id
            ) d
            ON dr.dance_id = d.id
            GROUP BY dr.id, p.id, c.id
        `);

        res.status(200).json(dancers.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const findDancerById = async (req, res) => {
    const { id } = req.params;

    try {
        const dancer = await pool.query(
            `
            SELECT dr.*,
                ROW_TO_JSON(p) AS pro,
                ROW_TO_JSON(c) AS celeb,
                (ARRAY_AGG(ROW_TO_JSON(t)))[1] AS team,
                COALESCE((ARRAY_AGG(ROW_TO_JSON(d)))[1], '[]') AS dance 
            FROM dancers dr
            LEFT JOIN pros p
            ON dr.pro_id = p.id
            LEFT JOIN celebs c
            ON dr.celeb_id = c.id
            LEFT JOIN (
                SELECT t.*,
                    ROW_TO_JSON(p) AS pro,
                    ROW_TO_JSON(c) AS celeb
                FROM teams t
                LEFT JOIN pros p
                ON t.pro_id = p.id
                LEFT JOIN celebs c
                ON t.celeb_id = c.id
                GROUP BY t.id, p.id, c.id
            ) t
            ON dr.team_id = t.id
            LEFT JOIN (
                SELECT d.*,
                        ROW_TO_JSON(e) AS episode
                    FROM dances d
                    LEFT JOIN episodes e
                    ON d.episode_id = e.id
                    GROUP BY d.id, e.id
            ) d
            ON dr.dance_id = d.id
            WHERE dr.id = $1
            GROUP BY dr.id, p.id, c.id
            `,
            [id]
        );

        res.status(200).json(dancer.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDancer = async (req, res) => {
    const { id } = req.params;

    try {
        const { dance_id, team_id, pro_id, celeb_id, extra, is_background } =
            req.body;

        const result = await pool.query(
            `
            UPDATE dancers 
            SET dance_id = $1, 
                team_id = $2, 
                pro_id = $3, 
                celeb_id = $4, 
                extra = $5, 
                is_background = $6 
            WHERE id = $7 
            RETURNING *
            `,
            [dance_id, team_id, pro_id, celeb_id, extra, is_background, id]
        );

        const dancer = await pool.query(
            `
            SELECT dr.*,
                ROW_TO_JSON(p) AS pro,
                ROW_TO_JSON(c) AS celeb,
                (ARRAY_AGG(ROW_TO_JSON(t)))[1] AS team,
                COALESCE((ARRAY_AGG(ROW_TO_JSON(d)))[1], '[]') AS dance 
            FROM dancers dr
            LEFT JOIN pros p
            ON dr.pro_id = p.id
            LEFT JOIN celebs c
            ON dr.celeb_id = c.id
            LEFT JOIN (
                SELECT t.*,
                    ROW_TO_JSON(p) AS pro,
                    ROW_TO_JSON(c) AS celeb
                FROM teams t
                LEFT JOIN pros p
                ON t.pro_id = p.id
                LEFT JOIN celebs c
                ON t.celeb_id = c.id
                GROUP BY t.id, p.id, c.id
            ) t
            ON dr.team_id = t.id
            LEFT JOIN (
                SELECT d.*,
                        ROW_TO_JSON(e) AS episode
                    FROM dances d
                    LEFT JOIN episodes e
                    ON d.episode_id = e.id
                    GROUP BY d.id, e.id
            ) d
            ON dr.dance_id = d.id
            WHERE dr.id = $1
            GROUP BY dr.id, p.id, c.id
            `,
            [result.rows[0].id]
        );

        res.status(200).json(dancer.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDancer = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query(
            `
            DELETE FROM dancers 
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({ message: 'Dancer successfully deleted.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
