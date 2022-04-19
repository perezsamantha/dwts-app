
CREATE TABLE IF NOT EXISTS seasons(
    id REAL NOT NULL,
    cover_pic TEXT,
    host VARCHAR(30),
    cohost VARCHAR (30),
    weeks SMALLINT,
    extra TEXT,
    PRIMARY KEY(id)
);
