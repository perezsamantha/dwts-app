
CREATE TABLE IF NOT EXISTS dancers(
    dancer_id SERIAL NOT NULL,
    dance_id INT,
    team_id INT,
    pro_id INT,
    celeb_id INT,
    extra VARCHAR(20),
    is_background BOOLEAN,
    PRIMARY KEY(dancer_id),
    CONSTRAINT fk_dance
        FOREIGN KEY(dance_id)
            REFERENCES dances(dance_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_team
        FOREIGN KEY(team_id)
            REFERENCES teams(team_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pro
        FOREIGN KEY(pro_id)
            REFERENCES pros(pro_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_celeb
        FOREIGN KEY(celeb_id)
            REFERENCES celebs(celeb_id)
            ON DELETE CASCADE
);