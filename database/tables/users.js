const db = require("../database");

const createUser = ({ email, hashedPassword}) => new Promise((res, rej) => {
    db.all(`INSERT INTO users (password_hash, email) VALUES ("${hashedPassword}", "${email}")`, (err, rows) => {
        if (err) {
            rej(err);
            return;
        }
        res(rows);
    });
});

const getUsers = () => {
    return new Promise((res, rej) => {
        db.all("select * from users", (err, rows) => {
            if (err) {
                rej(err)
                return;
            }
            res(rows)
        })
    })
}

const getUserById = (userId) => {
    return new Promise((res, rej) => {
        db.all(`select * from users where id=${userId}`, (err, rows) => {
            if (err) {
                rej(err)
                return;
            }
            res(rows)
        })
    })
}

const getUserByEmail = (userEmail) => {
    return new Promise((res, rej) => {
        db.all(`select * from users where email LIKE '${userEmail}'`, (err, rows) => {
            if (err) {
                rej(err)
                return;
            }
            if (rows.length) {
                res(rows[0]);
            } else {
                res(false)
            }
        })
    })
}

module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser
}