
CREATE TABLE IF NOT EXISTS team_likes(
    team_id INT,
    user_id INT,
    UNIQUE(team_id, user_id),
    CONSTRAINT fk_team
        FOREIGN KEY(team_id)
            REFERENCES teams(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);