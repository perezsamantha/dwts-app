
CREATE TABLE IF NOT EXISTS poll_options(
    id SERIAL NOT NULL,
    poll_id INT NOT NULL,
    data VARCHAR(50) NOT NULL,
    PRIMARY KEY(id),
    UNIQUE (poll_id, data),
    CONSTRAINT fk_poll
        FOREIGN KEY(poll_id)
            REFERENCES polls(id)
            ON DELETE CASCADE
);

-- bool option if doing trivia?