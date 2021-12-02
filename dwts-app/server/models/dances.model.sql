
CREATE TABLE IF NOT EXISTS dances(
    id SERIAL NOT NULL,
    cover_pic TEXT,
    style VARCHAR(30) NOT NULL,
    episode_id INT,
    theme VARCHAR(30),
    running_order smallint,
    song_title VARCHAR(100),
    song_artist VARCHAR(100),
    link VARCHAR(255),
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