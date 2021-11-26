
CREATE TABLE IF NOT EXISTS teams(
    team_id SERIAL NOT NULL,
    cover_pic TEXT,
    celeb_id INT,
    pro_id INT, 
    mentor_id INT,
    season_id INT,
    placement SMALLINT,
    team_name VARCHAR(30),
    pictures TEXT[],
    extra VARCHAR(255),
    PRIMARY KEY(team_id),
    UNIQUE (celeb_id, pro_id, season_id),
    CONSTRAINT fk_celeb
        FOREIGN KEY(celeb_id)
            REFERENCES celebs(celeb_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pro
        FOREIGN KEY(pro_id)
            REFERENCES pros(pro_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_mentor
        FOREIGN KEY(pro_id)
            REFERENCES pros(pro_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_season
        FOREIGN KEY(season_id)
            REFERENCES seasons(season_id)
            ON DELETE CASCADE
);