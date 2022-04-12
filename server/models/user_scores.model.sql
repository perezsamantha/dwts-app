
CREATE TABLE IF NOT EXISTS user_scores(
    dance_id INT NOT NULL,
    user_id INT NOT NULL,
    value REAL NOT NULL,
    scored_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
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