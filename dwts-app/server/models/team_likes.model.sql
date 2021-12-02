
CREATE TABLE IF NOT EXISTS team_likes(
    id SERIAL NOT NULL,
    team_id INT,
    user_id INT,
    PRIMARY KEY(id),
    CONSTRAINT fk_team
        FOREIGN KEY(team_id)
            REFERENCES teams(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
)