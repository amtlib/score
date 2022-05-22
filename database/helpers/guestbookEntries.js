const { getRandomId, readDatabase, writeDatabase } = require("./helpers");
const getGuestbookEntries = async () => {
    return await readDatabase("guestbook");
}

const getGuestbookEntry = async (entryId) => {
    const existingEntries = await readDatabase("guestbook");
    return existingEntries.find(entry => entry.id === entryId);
}

const createGuestbookEntry = async (guestName, entry) => {
    const existingEntries = await readDatabase("guestbook");
    return writeDatabase("guestbook", [...existingEntries, {
        id: getRandomId(),
        guestName,
        entry
    }]);
}

const deleteGuestbookEntry = async (entryId) => {
    const existingEntries = await readDatabase("guestbook");
    return writeDatabase("guestbook", existingEntries.filter(entry => entry.id !== entryId));
}

module.exports = {
    getGuestbookEntries,
    getGuestbookEntry,
    createGuestbookEntry,
    deleteGuestbookEntry
}

