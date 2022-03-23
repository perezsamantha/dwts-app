
CREATE TABLE IF NOT EXISTS season_likes(
    id SERIAL NOT NULL,
    season_id INT,
    user_id INT,
    PRIMARY KEY(id),
    CONSTRAINT fk_season
        FOREIGN KEY(season_id)
            REFERENCES seasons(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
)