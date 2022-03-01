
CREATE TABLE IF NOT EXISTS seasons(
    id SERIAL NOT NULL,
    cover_pic TEXT,
    number SMALLINT,
    extra TEXT,
    PRIMARY KEY(id),
    UNIQUE (number)
);

-- testing where id = season number (0 for juniors)
-- working !!
CREATE TABLE IF NOT EXISTS seasons(
    id SMALLINT NOT NULL,
    cover_pic TEXT,
    extra TEXT,
    PRIMARY KEY(id)
);

-- num weeks?
-- peak viewers? or do viewers per ep?
-- host(s) ? would need to be its own table. unless host and cohost fields
-- 