import { CLIENT_ORIGIN } from '../config.js';

export const verify = (token) => ({
    subject: 'Verify Email',
    html: `
            <a href='${CLIENT_ORIGIN}/verify/${token}'>
                Click to verify your email.
            </a>
        `,
    text: `Click to verify your email.`,
});

export const reset = (token) => ({
    subject: 'Reset Password',
    html: `
            <a href='${CLIENT_ORIGIN}/reset/${token}'>
                Click to reset your password.
            </a>
        `,
    text: `Click to reset your password.`,
});
