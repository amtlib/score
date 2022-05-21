const express = require("express")
const router = express.Router();
const { getGuestbookEntries, getGuestbookEntry, createGuestbookEntry, deleteGuestbookEntry } = require("../database/tables/guestbookEntries");

router.get('/', async (req, res) => {
    const entries = await getGuestbookEntries();
    res.send(entries)
});

router.get('/:entryId', async (req, res) => {
    const entry = await getGuestbookEntry(req.params.entryId);
    res.send(entry)
});

router.delete('/:entryId', async (req, res) => {
    const entry = await deleteGuestbookEntry(req.params.entryId);
    res.send(entry)
});

router.post('/', async (req, res) => {
    const { guestName, entry } = req.body;
    const newEntry = await createGuestbookEntry(guestName, entry);
    res.send(newEntry);
})


module.exports = router;