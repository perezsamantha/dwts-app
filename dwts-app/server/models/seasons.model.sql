
CREATE TABLE IF NOT EXISTS seasons(
    season_id SERIAL NOT NULL,
    number SMALLINT,
    poster TEXT,
    extra TEXT,
    PRIMARY KEY(season_id),
    UNIQUE (number)
);