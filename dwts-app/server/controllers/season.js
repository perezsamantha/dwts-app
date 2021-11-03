import pool from "../api/pool.js";

// export const getSeasons = () => {
//     return new Promise(function(resolve, reject) {
//         pool.query('SELECT * FROM seasons ORDER BY id ASC', (error, results) => {
//             if (error)  {
//                 reject(error)
//             }
//             resolve(results.rows);
//         })
//     })
// }

export const addSeason = async (req, res) => {
    try {
        const { number } = req.body;
        const result = await pool.query('INSERT INTO seasons (number) VALUES($1) RETURNING *', [number]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}  

export const fetchSeasons = async (req, res) => {
    try {
        const seasons = await pool.query('SELECT * FROM seasons');

        res.status(200).json(seasons.rows);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const findSeasonById = async (req, res) => {
    const { id } = req.params;

    try {
        const season = await pool.query('SELECT * FROM seasons WHERE id = $1', [id]);

        res.status(200).json(season.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const searchSeasons = async (req, res) => {
    //
}

export const updateSeason = async (req, res) => {
    const { id } = req.params;
    const { number } = req.body;

    try {
        const result = await pool.query('UPDATE seasons SET number = $1 WHERE id = $2 RETURNING number', [number, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const deleteSeason = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM seasons WHERE id = $1', [id]);

        res.status(200).json({ message: "Season successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}