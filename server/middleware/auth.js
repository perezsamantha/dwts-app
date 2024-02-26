import jwt from 'jsonwebtoken';
import { messages } from '../messages.js';
import pool from '../api/pool.js';
import { client } from '../controllers/user.js';

const auth = async (req, res, next) => {
    try {
        if (req.cookies.da_token) {
            const token = req.cookies.da_token;

            if (token) {
                const { id, exp } = jwt.verify(
                    token,
                    process.env.SECRET_STRING
                );

                if (exp < Date.now().valueOf() / 1000) {
                    return res
                        .cookie('da_token', '', {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'Strict',
                        })
                        .status(401)
                        .json({ message: 'Token Expired' });
                }

                const new_activity = new Date();

                await pool.query(
                    `
                    UPDATE users 
                    SET last_active = $1 
                    WHERE id = $2
                    `,
                    [new_activity, id]
                );

                req.userId = id;
            }
            next();
        } else if (req.cookies.da_access_token) {
            const token = req.cookies.da_access_token;
            const tokenInfo = await client.getTokenInfo(token);
            const { email } = tokenInfo;

            const existing_user = await pool.query(
                `
                    SELECT id
                    FROM users 
                    WHERE email = $1
                    `,
                [email]
            );

            if (existing_user.rows.length === 0)
                return res.status(401).json({ message: messages.invalidUser });

            const new_activity = new Date();

            await pool.query(
                `
                    UPDATE users 
                    SET last_active = $1 
                    WHERE id = $2
                    `,
                [new_activity, existing_user.rows[0].id]
            );

            req.userId = existing_user.rows[0].id;
            next();
        } else {
            res.status(200).json({});
        }
    } catch (error) {
        res.cookie('da_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        })
            .cookie('da_access_token', '', {
                maxAge: 1000 * 60 * 60 * 24 * 190,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            })
            .status(401)
            .json({ message: 'Token expired' });
    }
};

export default auth;
