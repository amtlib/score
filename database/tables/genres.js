const db = require("../database");

const getGenres = () => {
    return new Promise((res, rej) => {
        db.all("select * from genres", (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const getGenre = (genreId) => {
    return new Promise((res, rej) => {
        db.all(`select * from genres where id=${genreId}`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const createGenre = (name) => {
    return new Promise((res, rej) => {
        db.all(`insert into genres (name) values ("${name}")`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const deleteGenre = (genreId) => {
    return new Promise((res, rej) => {
        db.all(`delete from genres where id=${genreId}`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const getGenresByGameId = (gameId) => {
    return new Promise((res, rej) => {
        db.all(`select id, name from genres INNER JOIN games_genres ON games_genres.genre_id = genres.id WHERE game_id=${gameId}`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            console.log(rows)
            res(rows)
        })
    })
}

module.exports = {
    getGenres,
    getGenresByGameId,
    createGenre,
    deleteGenre,
    getGenre
}

