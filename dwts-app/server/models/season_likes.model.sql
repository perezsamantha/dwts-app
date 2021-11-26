
CREATE TABLE IF NOT EXISTS season_likes(
    season_like_id SERIAL NOT NULL,
    season_id INT,
    user_id INT,
    PRIMARY KEY(season_like_id),
    CONSTRAINT fk_season
        FOREIGN KEY(season_id)
            REFERENCES seasons(season_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
)