
CREATE TABLE IF NOT EXISTS episodes(
    id SERIAL NOT NULL,
    season_id INT NOT NULL,
    week SMALLINT NOT NULL,
    night SMALLINT,
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
-- !!! theme ?? !!! instead of in dances model? only if every dance
-- (including bumpers) would fall under that same umbrella