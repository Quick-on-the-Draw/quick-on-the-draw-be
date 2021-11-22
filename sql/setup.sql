DROP TABLE IF EXISTS drawings;

CREATE TABLE drawings (
    id SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(128) NOT NULL,
    created_date INT NOT NULL,
    timer_setting INT NOT NULL,
    url VARCHAR(19000) NOT NULL
)
