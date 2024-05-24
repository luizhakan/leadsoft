CREATE TYPE role_enum AS ENUM ('ADMIN', 'BASIC');

CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role role_enum NOT NULL
);

INSERT INTO "User" (username, password, role) VALUES ('leadsoft', 'softlead', 'ADMIN');

CREATE TABLE "Anime" (
    id SERIAL PRIMARY KEY,
    gender VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    source VARCHAR(255) NOT NULL,
    userId INT NOT NULL,
    CONSTRAINT FK_Anime_User FOREIGN KEY (userId) REFERENCES "User"(id)
);

CREATE TABLE "Item" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId INT NOT NULL,
    CONSTRAINT FK_Item_User FOREIGN KEY (userId) REFERENCES "User"(id)
);

CREATE TABLE "Role" (
    value role_enum NOT NULL
);
