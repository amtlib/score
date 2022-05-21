const db = require("../database");

const getPlatforms = () => {
    return new Promise((res, rej) => {
        db.all("select * from platforms", (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const getPlatform = (platformId) => {
    return new Promise((res, rej) => {
        db.all(`select * from platforms where id=${platformId}`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const createPlatform = (name) => {
    return new Promise((res, rej) => {
        db.all(`insert into platform (name) values ("${name}")`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const deletePlatfrom = (platformId) => {
    return new Promise((res, rej) => {
        db.all(`delete from platforms where id=${platformId}`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const getPlatformsByGameId = (gameId) => {
    return new Promise((res, rej) => {
        db.all(`select id, name from platforms INNER JOIN games_platforms ON games_platforms.genre_id = genres.id WHERE game_id=${gameId}`, (err, rows) => {
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
    getPlatforms,
    getPlatformsByGameId,
    createPlatform,
    deletePlatfrom,
    getPlatform
}

