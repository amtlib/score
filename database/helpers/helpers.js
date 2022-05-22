const crypto = require("crypto");
const fs = require("fs");

const filePaths = {
    users: "database/data/users.json",
    games: "database/data/games.json",
    guestbook: "database/data/guestbook.json"
}


const readDatabase = (
    store,
    returnJson = true,
    encoding = 'utf8'
) => {
    return new Promise((res, rej) => {
        fs.readFile(filePaths[store], encoding, (err, data) => {
            if (err) {
               rej(err);
            }
            console.log("read database", data)
            res(returnJson ? JSON.parse(data) : data);
        });
    })
};

const writeDatabase = (
    store,
    fileData,
    encoding = 'utf8'
) => {
    return new Promise((res, rej) => {
        fs.writeFile(filePaths[store], typeof fileData === "string" ? fileData : JSON.stringify(fileData, null, 4), encoding, err => {
            if (err) {
                rej(err);
            }
            res();
        });
    })
};

const getRandomId = () => crypto.randomUUID()

module.exports = {
    getRandomId,
    writeDatabase,
    readDatabase
}