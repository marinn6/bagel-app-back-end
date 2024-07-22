DROP DATABASE IF EXISTS bagels_dev;

CREATE DATABASE bagels_dev;

\c bagels_dev;

CREATE TABLE bagels (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    is_gluten_free BOOLEAN,
    is_available BOOLEAN
);