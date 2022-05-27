const express = require("express");
const router = express.Router();

const { getUserByAuthToken } = require("./helpers");

router.post('/', async (req, res) => {
    const { AuthToken } = req.body;
    console.log(AuthToken)
    res.send(JSON.stringify(await getUserByAuthToken(AuthToken)));
});

module.exports = router;