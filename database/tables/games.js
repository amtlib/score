const db = require("../database");

const getGames = () => {
    return new Promise((res, rej) => {
        db.all("select * from games", (err, rows) => {
            if (err) {
                rej(err)
                return;
            }
            console.log(rows)
            res(rows)
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

module.exports = {
    getGames,
    getGame
}