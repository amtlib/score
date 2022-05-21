const db = require("../database");

const getGuestbookEntries = () => {
    return new Promise((res, rej) => {
        db.all("select * from guestbook_entries", (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const getGuestbookEntry = (entryId) => {
    return new Promise((res, rej) => {
        db.all(`select * from guestbook_entries where id=${entryId}`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const createGuestbookEntry = (guestName, entry) => {
    return new Promise((res, rej) => {
        db.all(`insert into guestbook_entries (guest_name, entry) values ("${guestName}", "${entry}")`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

const deleteGuestbookEntry = (entryId) => {
    return new Promise((res, rej) => {
        db.all(`delete from guestbook_entries where id=${entryId}`, (err, rows) => {
            if (err) {
                rej(err);
                return;
            }
            res(rows);
        })
    })
}

module.exports = {
    getGuestbookEntries,
    getGuestbookEntry,
    createGuestbookEntry,
    deleteGuestbookEntry
}

