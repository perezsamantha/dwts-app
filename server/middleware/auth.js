import jwt from 'jsonwebtoken';
import { messages } from '../messages.js';
import { OAuth2Client } from 'google-auth-library';
import pool from '../api/pool.js';

const client = new OAuth2Client(process.env.OAUTH_CLIENT_ID2);

const auth = async (req, res, next) => {
    try {
        if (req.cookies.da_token) {
            const token = req.cookies.da_token;

            const isCustomAuth = token.length < 500;

            if (token && isCustomAuth) {
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

                req.userId = id;
            } else {
                const ticket = await client.verifyIdToken({
                    idToken: token,
                    audience: process.env.OAUTH_CLIENT_ID2,
                });

                const { email } = ticket.getPayload();

                const existing_user = await pool.query(
                    `
                    SELECT id
                    FROM users 
                    WHERE email = $1
                    `,
                    [email]
                );

                if (existing_user.rows.length === 0)
                    return res
                        .status(401)
                        .json({ message: messages.invalidUser });

                req.userId = existing_user.rows[0].id;
            }
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
            .status(401)
            .json({ message: 'Token expired' });
    }
};

export default auth;
