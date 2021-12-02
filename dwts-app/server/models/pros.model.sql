
CREATE TABLE IF NOT EXISTS pros(
    id SERIAL NOT NULL,
    cover_pic TEXT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30),
    birthday DATE,
    height VARCHAR(10),
    gender VARCHAR(30),
    twitter VARCHAR(30),
    instagram VARCHAR(30),
    tiktok VARCHAR(30),
    is_junior BOOLEAN,
    pictures TEXT[],
    PRIMARY KEY(id),
    UNIQUE (first_name, last_name)
);