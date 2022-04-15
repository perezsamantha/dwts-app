import { CLIENT_ORIGIN } from '../config.js';

export const verify = (token) => ({
    subject: 'Verify Email',
    html: `
            <a href='${CLIENT_ORIGIN}/verify/${token}'>
                Click to verify your email.
            </a>
        `,
    text: `Copy and paste this link: ${CLIENT_ORIGIN}/verify/${token}`,
});
