
CREATE TABLE IF NOT EXISTS tours(
    id SERIAL NOT NULL,
    cover_pic TEXT,
    name VARCHAR(50) NOT NULL,
    season_id INT NOT NULL,
    first_show DATE,
    last_show DATE,
    extra VARCHAR(250),
    PRIMARY KEY(id),
    UNIQUE (season_id),
    CONSTRAINT fk_season
        FOREIGN KEY(season_id)
            REFERENCES seasons(id)
            ON DELETE CASCADE
);

-- pictures !!!!!