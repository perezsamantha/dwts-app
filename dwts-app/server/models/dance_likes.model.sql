
CREATE TABLE IF NOT EXISTS dance_likes(
    id SERIAL NOT NULL,
    dance_id INT,
    user_id INT,
    PRIMARY KEY(dance_like_id),
    CONSTRAINT fk_dance
        FOREIGN KEY(dance_id)
            REFERENCES dances(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
)