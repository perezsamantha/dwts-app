
CREATE TABLE IF NOT EXISTS team_likes(
    team_like_id SERIAL NOT NULL,
    team_id INT,
    user_id INT,
    PRIMARY KEY(team_like_id),
    CONSTRAINT fk_team
        FOREIGN KEY(team_id)
            REFERENCES teams(team_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
)