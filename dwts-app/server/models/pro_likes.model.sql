
CREATE TABLE IF NOT EXISTS pro_likes(
    pro_like_id SERIAL NOT NULL,
    pro_id INT,
    user_id INT,
    PRIMARY KEY(pro_like_id),
    CONSTRAINT fk_pro
        FOREIGN KEY(pro_id)
            REFERENCES pros(pro_id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(user_id)
            ON DELETE CASCADE
)