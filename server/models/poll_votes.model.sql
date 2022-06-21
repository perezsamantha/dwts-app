CREATE TABLE IF NOT EXISTS poll_votes(
    id SERIAL NOT NULL,
    option_id INT NOT NULL,
    user_id INT,
    PRIMARY KEY(id),
    UNIQUE(option_id, user_id),
    CONSTRAINT fk_option
        FOREIGN KEY(option_id)
            REFERENCES poll_options(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);