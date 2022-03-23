export const PORT = process.env.PORT || 5000;

export const CLIENT_ORIGIN =
    process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_ORIGIN
        : 'http://localhost:3000';
