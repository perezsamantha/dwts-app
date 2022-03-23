
CREATE TABLE IF NOT EXISTS dance_likes(
    dance_id INT,
    user_id INT,
    UNIQUE(dance_id, user_id),
    CONSTRAINT fk_dance
        FOREIGN KEY(dance_id)
            REFERENCES dances(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);