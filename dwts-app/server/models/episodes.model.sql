
CREATE TABLE IF NOT EXISTS episodes(
    episode_id SERIAL NOT NULL,
    season_id INT,
    week SMALLINT,
    night SMALLINT,
    date DATE,
    PRIMARY KEY(episode_id),
    UNIQUE (season_id, week, night),
    CONSTRAINT fk_season
        FOREIGN KEY(season_id)
            REFERENCES seasons(season_id)
            ON DELETE CASCADE
);