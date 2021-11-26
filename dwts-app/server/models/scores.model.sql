
CREATE TABLE IF NOT EXISTS scores(
    score_id SERIAL NOT NULL,
    dance_id INT,
    judge_id INT, 
    score SMALLINT,
    position SMALLINT,
    is_guest BOOLEAN,
    PRIMARY KEY(score_id),
    UNIQUE (dance_id, judge_id),
    CONSTRAINT fk_dance
        FOREIGN KEY(dance_id)
            REFERENCES dances(dance_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_judge
        FOREIGN KEY(judge_id)
            REFERENCES judges(judge_id)
            ON DELETE CASCADE
);