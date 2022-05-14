const express = require("express")
const router = express.Router();
const { getGames, getGame } = require("../database/tables/games");

router.get('/', async (req, res) => {
    const games = await getGames();
    res.send(games)
});

router.get('/:gameId', async (req, res) => {
    const game = await getGame(req.params.gameId);
    res.send(game)
});


module.exports = router;