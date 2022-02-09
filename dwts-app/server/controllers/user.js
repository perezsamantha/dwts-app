import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { Storage } from '@google-cloud/storage';
import UUID from 'uuid-v4';
import pool from "../api/pool.js";
import ac from '../roles.js';

export const signUp = async (req, res) => {
    try {
        const {
            cover_pic,
            username,
            email,
            password,
            confirm_password,
            nickname,
            email_verified,
            watching_since,
            twitter,
            instagram,
            user_role
        } = req.body;

        if (password != confirm_password) return res.status(400).json({ message: "Passwords do not match." });

        const hashed_password = await bcrypt.hash(password, 12);

        const result = await pool.query(`INSERT INTO users (username, email, password, nickname, email_verified, watching_since, twitter, instagram, user_role) VALUES($1, $2, $3, $4, default, $5, $6, $7, default) RETURNING *`, [username, email, hashed_password, nickname, watching_since, twitter, instagram]);

        const token = jwt.sign({ username: result.rows[0].username, id: result.rows[0].id }, process.env.SECRET_STRING, { expiresIn: "1h" });
        
        res.status(200).json({ result: result.rows[0], token});
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const signIn = async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;

        const existing_user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        
        if (existing_user.rows.length === 0) return res.status(404).json({ message: "User does not exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existing_user.rows[0].password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect password." });

        const token = jwt.sign({ username: existing_user.rows[0].username, id: existing_user.rows[0].id }, process.env.SECRET_STRING, { expiresIn: "1h" });

        res.status(200).json({ result: existing_user.rows[0], token });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const fetchUsers = async (req, res) => {
    try {
        const users = await pool.query('SELECT * FROM users');

        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const findUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

        res.status(200).json(user.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const searchUsers = async (req, res) => {
    const { search } = req.body;

    try {
        const users = await pool.query(`SELECT * FROM users WHERE username || ' ' || nickname ILIKE '%${search}%'`);

        res.status(200).json(users.rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            cover_pic,
            username,
            email,
            password,
            nickname,
            email_verified,
            watching_since,
            twitter,
            instagram,
            user_role
        } = req.body;

        const result = await pool.query(`UPDATE users SET username = $1, email = $2, nickname = $3, email_verified = $4, watching_since = $5, twitter = $6, instagram = $7, user_role = $8 WHERE id = $9 RETURNING *`, [username, email, nickname, email_verified, watching_since, twitter, instagram, user_role, id]);

        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export const setUserPic = async (req, res) => {
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

            const result = await pool.query('UPDATE users SET cover_pic = $1 WHERE id = $2 RETURNING *', [publicUrl, req.params.id]);

            res.status(200).json(result.rows[0]);
        })

        blobWriter.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM users WHERE id = $1', [id]);

        res.status(200).json({ message: "User successfully deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const user = await pool.query('SELECT * FROM users WHERE id = $1', [req.userId]);

            const permission = ac.can(user.rows[0].role)[action](resource);
            
            if (!permission.granted) {
                return res.status(401).json({ message: "Invalid permission"});
            }
            next();
        } catch (error) {
            res.status(500).json({ message: error });
        }
    } 
}