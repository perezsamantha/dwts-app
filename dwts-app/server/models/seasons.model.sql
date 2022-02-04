
CREATE TABLE IF NOT EXISTS seasons(
    id SERIAL NOT NULL,
    cover_pic TEXT,
    number SMALLINT,
    extra TEXT,
    PRIMARY KEY(id),
    UNIQUE (number)
);