
CREATE TABLE IF NOT EXISTS scores(
    id SERIAL NOT NULL,
    dance_id INT,
    judge_id INT, 
    score SMALLINT,
    position SMALLINT,
    is_guest BOOLEAN,
    PRIMARY KEY(id),
    UNIQUE (dance_id, judge_id),
    CONSTRAINT fk_dance
        FOREIGN KEY(dance_id)
            REFERENCES dances(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_judge
        FOREIGN KEY(judge_id)
            REFERENCES judges(id)
            ON DELETE CASCADE
);