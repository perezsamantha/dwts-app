CREATE TABLE IF NOT EXISTS polls(
    id SERIAL NOT NULL,
    title VARCHAR(100) NOT NULL,
    expires DATE NOT NULL,
    PRIMARY KEY(id)
);