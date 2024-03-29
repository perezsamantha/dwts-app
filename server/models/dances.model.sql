
CREATE TABLE IF NOT EXISTS dances(
    id SERIAL NOT NULL,
    episode_id INT NOT NULL,
    style VARCHAR(30) NOT NULL,
    running_order smallint,
    song_title VARCHAR(100),
    song_artist VARCHAR(100),
    is_main BOOLEAN,
    link VARCHAR(255),
    daily_date DATE UNIQUE,
    extra VARCHAR(255),
    pictures TEXT[],
    PRIMARY KEY(id),
    UNIQUE (episode_id, running_order),
    CONSTRAINT fk_episode
        FOREIGN KEY(episode_id)
            REFERENCES episodes(id)
            ON DELETE CASCADE
);

-- cover pic?
-- boolean/type to distinguish between main dances, group numbers, and bumpers?