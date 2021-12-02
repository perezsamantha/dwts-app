
CREATE TABLE IF NOT EXISTS seasons(
    id SERIAL NOT NULL,
    number SMALLINT,
    poster TEXT,
    extra TEXT,
    PRIMARY KEY(id),
    UNIQUE (number)
);