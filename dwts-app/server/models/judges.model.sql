
CREATE TABLE IF NOT EXISTS judges(
    judge_id SERIAL NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    birthday DATE,
    PRIMARY KEY(judge_id),
    UNIQUE (first_name, last_name)
);