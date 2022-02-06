import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4'

import pool from "../api/pool.js";

export const addDance = async (req, res) => {
    //console.log(req);
    try {
        const {
            style,
            episode_id,
            theme,
            running_order,
            song_title,
            song_artist,
            link,
            extra
        } = req.body;

        const result = await pool.query(`INSERT INTO dances (style, episode_id, theme, running_order, song_title, song_artist, link, extra) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [style, episode_id, theme, running_order, song_title, song_artist, link, extra]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

export const fetchDances = async (req, res) => {
    try {
        const dances = await pool.query('SELECT * FROM dances');

        res.status(200).json(dances.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findDanceById = async (req, res) => {
    const { id } = req.params;

    try {
        const dance = await pool.query('SELECT * FROM dances WHERE id = $1', [id]);

        res.status(200).json(dance.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const searchDances = async (req, res) => {
    const { search } = req.body;

    try {
        const dances = await pool.query("SELECT * FROM dances WHERE song_title || ' ' || song_artist ILIKE $1", [`%${search}%`]);

        res.status(200).json(dances.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateDance = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            style,
            episode_id,
            theme,
            running_order,
            song_title,
            song_artist,
            link,
            extra
        } = req.body;

        const result = await pool.query('UPDATE dances SET style = $1, episode_id = $2, theme = $3, running_order = $4, song_title = $5, song_artist = $6, link = $7, extra = $8 WHERE id = $9 RETURNING *', [style, episode_id, theme, running_order, song_title, song_artist, link, extra, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// export const setDancePic = async (req, res) => {
//     const storage = new Storage({
//         projectId: process.env.GCLOUD_PROJECT_ID,
//         keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
//     });

//     const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

//     try {
//         const blob = bucket.file(req.file.originalname);

//         let uuid = UUID();

//         const blobWriter = blob.createWriteStream({
//             metadata: {
//                 contentType: req.file.mimetype,
//                 metadata: {
//                     firebaseStorageDownloadTokens: uuid
//                 }
//             }
//         })

//         blobWriter.on('finish', async () => {
//             const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;

//             // const result = await Dance.findByIdAndUpdate(req.params.id, req.body = { coverPic: publicUrl }, { new: true });

//             // res.status(200).json(result);

//             const result = await pool.query('UPDATE dances SET cover_pic = $1 WHERE id = $2 RETURNING *', [publicUrl, req.params.id]);

//             res.status(200).json(result.rows[0]);
//         })

//         blobWriter.end(req.file.buffer);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

export const deleteDance = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM dances WHERE id = $1', [id]);

        res.status(200).json({ message: "Dance successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addPic = async (req, res) => {
    const storage = new Storage({
        projectId: process.env.GCLOUD_PROJECT_ID,
        keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
    });

    const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

    try {
        const blob = bucket.file(req.file.originalname);

        let uuid = UUID();

        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
                metadata: {
                    firebaseStorageDownloadTokens: uuid
                }
            }
        })

        blobWriter.on('finish', async () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;

            const result = await pool.query('UPDATE dances SET pictures = array_append(pictures, $1) WHERE id = $2 RETURNING *', [publicUrl, req.params.id]);

            res.status(200).json(result.rows[0]);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const likeDance = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.userId) {
            return res.status(401).json({ message: "Unauthenticated" });
        }

        // const dance = await Dance.findById(id);

        // const index = dance.likes.findIndex((id) => id === String(req.userId));

        // if (index === -1) {
        //     dance.likes.push(req.userId);
        // } else {
        //     dance.likes = dance.likes.filter((id) => id !== String(req.userId));
        // }

        // const result = await Dance.findByIdAndUpdate(id, dance, { new: true });
        // res.status(200).json(result);

        // check if like is in table
        if (pool.query(`exists(SELECT 1 FROM dance_likes WHERE id = ${id}, user_id = ${userId}`)) {
            await pool.query(`DELETE FROM dance_likes WHERE id = ${id}, user_id = ${userId}`);
            // json message
        } else {
            const result = await pool.query(`INSERT INTO dances (id, user_id) VALUES($1, $2)`, [id, userId]);
            // json message with resulting row ?? row[0]
        }

    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// need to convert
// export const getFavoriteDances = async (req, res, next) => {
//     const { userId } = req;

//     try {
//         const dances = await Dance.find({ likes: { $in: userId } });

//         res.status(200).json(dances);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }