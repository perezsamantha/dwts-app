
CREATE TABLE IF NOT EXISTS episodes(
    id SERIAL NOT NULL,
    season_id INT NOT NULL,
    week SMALLINT NOT NULL,
    night SMALLINT,
    theme VARCHAR(30),
    date DATE,
    PRIMARY KEY(id),
    UNIQUE (season_id, week, night),
    CONSTRAINT fk_season
        FOREIGN KEY(season_id)
            REFERENCES seasons(id)
            ON DELETE CASCADE
);

-- extra?
-- viewership?