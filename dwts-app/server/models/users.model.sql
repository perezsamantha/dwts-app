
CREATE TYPE role AS ENUM ('fan', 'pro', 'admin');

CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL,
    profile_pic TEXT,
    username VARCHAR(30) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    nickname VARCHAR(30),
    email_verified BOOLEAN DEFAULT 'false',
    watching_since SMALLINT,
    twitter VARCHAR(30),
    instagram VARCHAR(30),
    user_role ROLE DEFAULT 'fan',
    PRIMARY KEY(id)
);

-- change watching since to FK season_id ??
-- have not testing default of false
-- timestamps?