CREATE TABLE IF NOT EXISTS games (
    id INTEGER PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    released DATE NOT NULL,
    description TEXT DEFAULT "",
    background_image_url TEXT default ""
);

CREATE TABLE IF NOT EXISTS platforms (
    id INTEGER PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
    id INTEGER PRIMARY KEY,
    name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS screenshots (
    id INTEGER PRIMARY KEY,
    game_id INTEGER NOT NULL,
    screenshot_url TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS games_platforms (
    platform_id INTEGER PRIMARY KEY,
    game_id INTEGER NOT NULL,
    released DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS favourites (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT_NULL,
    game_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    password_hash TEXT NOT NULL,
    email VARCHAR(128) NOT NULL,
    role VARCHAR(32)
);

CREATE TABLE IF NOT EXISTS guestbook_entries (
    id INTEGER PRIMARY KEY,
    guest_name VARCHAR(128) NOT NULL,
    entry TEXT NOT NULL
);