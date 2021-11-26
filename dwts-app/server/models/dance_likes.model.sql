
CREATE TABLE IF NOT EXISTS dance_likes(
    dance_like_id SERIAL NOT NULL,
    dance_id INT,
    user_id INT,
    PRIMARY KEY(dance_like_id),
    CONSTRAINT fk_dance
        FOREIGN KEY(dance_id)
            REFERENCES dances(dance_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
)