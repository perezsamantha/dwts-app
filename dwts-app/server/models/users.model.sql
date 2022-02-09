
CREATE TYPE user_role AS ENUM ('fan', 'pro', 'admin');

CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL,
    cover_pic TEXT,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    nickname VARCHAR(30),
    email_verified BOOLEAN DEFAULT FALSE,
    watching_since SMALLINT,
    twitter VARCHAR(30),
    instagram VARCHAR(30),
    user_role user_rolue DEFAULT 'fan',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY(id),
    CONSTRAINT fk_watching_since
        FOREIGN KEY(watching_since)
            REFERENCES seasons(id)
            ON DELETE CASCADE
);

-- timestamps? tz means timezone included
-- last login?
-- birthday?
-- tiktok?