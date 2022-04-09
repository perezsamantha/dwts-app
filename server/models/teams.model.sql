
CREATE TABLE IF NOT EXISTS teams(
    id SERIAL NOT NULL,
    cover_pic TEXT,
    celeb_id INT NOT NULL,
    pro_id INT NOT NULL, 
    mentor_id INT,
    season_id REAL NOT NULL,
    placement SMALLINT,
    team_name VARCHAR(30),
    pictures TEXT[],
    extra VARCHAR(255),
    PRIMARY KEY(id),
    UNIQUE (celeb_id, pro_id, season_id),
    CONSTRAINT fk_celeb
        FOREIGN KEY(celeb_id)
            REFERENCES celebs(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pro
        FOREIGN KEY(pro_id)
            REFERENCES pros(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_mentor
        FOREIGN KEY(pro_id)
            REFERENCES pros(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_season
        FOREIGN KEY(season_id)
            REFERENCES seasons(id)
            ON DELETE CASCADE
);