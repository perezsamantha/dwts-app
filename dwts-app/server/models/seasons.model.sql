
CREATE TABLE IF NOT EXISTS seasons(
    id SERIAL NOT NULL,
    cover_pic TEXT,
    number SMALLINT,
    extra TEXT,
    PRIMARY KEY(id),
    UNIQUE (number)
);

-- num weeks?
-- peak viewers? or do viewers per ep?
-- host(s) ? would need to be its own table
-- 