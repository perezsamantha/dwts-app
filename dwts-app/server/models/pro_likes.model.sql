
CREATE TABLE IF NOT EXISTS pro_likes(
    pro_id INT,
    user_id INT,
    UNIQUE (pro_id, user_id),
    CONSTRAINT fk_pro
        FOREIGN KEY(pro_id)
            REFERENCES pros(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
            REFERENCES users(id)
            ON DELETE CASCADE
);