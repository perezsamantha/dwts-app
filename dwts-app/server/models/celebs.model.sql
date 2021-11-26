
CREATE TABLE IF NOT EXISTS celebs(
    celeb_id SERIAL NOT NULL,
    cover_pic TEXT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    birthday DATE,
    height VARCHAR(10),
    gender VARCHAR(10),
    twitter VARCHAR(30),
    instagram VARCHAR(30),
    tiktok VARCHAR(30),
    is_junior BOOLEAN,
    PRIMARY KEY(celeb_id),
    UNIQUE (first_name, last_name)
);