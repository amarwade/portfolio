CREATE TABLE IF NOT EXISTS app_user (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS project (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    tech TEXT,
    github_link VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS contact_message (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(120) NOT NULL,
    message VARCHAR(2000) NOT NULL,
    created_at TIMESTAMP
);
