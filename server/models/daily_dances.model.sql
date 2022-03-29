
CREATE TABLE IF NOT EXISTS daily_dances(
    date DATE UNIQUE,
    dance_id INT UNIQUE,
    CONSTRAINT fk_dance
        FOREIGN KEY(dance_id)
            REFERENCES dances(id)
            ON DELETE CASCADE
);