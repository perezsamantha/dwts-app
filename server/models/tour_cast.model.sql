
CREATE TABLE IF NOT EXISTS tour_cast(
    id SERIAL NOT NULL,
    tour_id INT NOT NULL,
    pro_id INT,
    celeb_id INT,
    is_swing BOOLEAN,
    extra VARCHAR(100),
    PRIMARY KEY(id),
    UNIQUE(tour_id, pro_id),
    UNIQUE(tour_id, celeb_id),
    CONSTRAINT fk_tour
        FOREIGN KEY(tour_id)
            REFERENCES tours(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_pro
        FOREIGN KEY(pro_id)
            REFERENCES pros(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_celeb
        FOREIGN KEY(celeb_id)
            REFERENCES celebs(id)
            ON DELETE CASCADE
);

-- 