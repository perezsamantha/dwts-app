
CREATE TABLE IF NOT EXISTS episodes(
    id SERIAL NOT NULL,
    season_id REAL NOT NULL,
    week SMALLINT NOT NULL,
    night SMALLINT,
    theme VARCHAR(30),
    date DATE,
    extra VARCHAR(250),
    PRIMARY KEY(id),
    UNIQUE (season_id, week, night),
    CONSTRAINT fk_season
        FOREIGN KEY(season_id)
            REFERENCES seasons(id)
            ON DELETE CASCADE
);
