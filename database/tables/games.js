const db = require("../database");
const { getGenresByGameId } = require("./genres");

const getGames = async () => {
    let response = {};
    return new Promise(async (res, rej) => {
        db.all("select * from games", async (err, rows) => {
            if (err) {
                rej(err)
                return;
            }
            response = Promise.all(rows.map(async row => {
                const gameId = row.id;
                const genres = await getGenresByGameId(gameId);
                return {...row, genres }
            }))
            console.log(response)
            res(response)
        })
    })
}

const getGame = (gameId) => {
    return new Promise((res, rej) => {
        db.all(`select * from games where id=${gameId}`, (err, rows) => {
            if (err) {
                rej(err)
                return;
            }
            res(rows)
        })
    })
}

const deleteGame = (gameId) => {
    return new Promise((res, rej) => {
        db.all(`delete from games where id=${gameId}`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const createGame = (name, released, description, coverImageUrl) => {
    return new Promise((res, rej) => {
        db.all(`insert into games (name, released, description, cover_image_url) values ("${name}", "${released}", "${description}", "${coverImageUrl}")`, (err, rows) => {
            if (err) {
                rej(err)
                return;
            }
            res(rows)
        })
    })
}

module.exports = {
    getGames,
    getGame,
    createGame,
    deleteGame
}