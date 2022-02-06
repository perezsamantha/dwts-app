
CREATE TABLE IF NOT EXISTS dancers(
    id SERIAL NOT NULL,
    dance_id INT NOT NULL,
    team_id INT,
    pro_id INT,
    celeb_id INT,
    extra VARCHAR(100),
    is_background BOOLEAN,
    PRIMARY KEY(id),
    CONSTRAINT fk_dance
        FOREIGN KEY(dance_id)
            REFERENCES dances(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_team
        FOREIGN KEY(team_id)
            REFERENCES teams(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pro
        FOREIGN KEY(pro_id)
            REFERENCES pros(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_celeb
        FOREIGN KEY(celeb_id)
            REFERENCES celebs(id)
            ON DELETE CASCADE
);

-- 