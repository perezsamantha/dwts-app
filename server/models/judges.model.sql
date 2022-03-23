
CREATE TABLE IF NOT EXISTS judges(
    id SERIAL NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    birthday DATE,
    PRIMARY KEY(id),
    UNIQUE (first_name, last_name)
);

-- is junior?
-- gender?
-- instagram?