const express = require("express")
const router = express.Router();
const { getGames, getGame, createGame, deleteGame } = require("../database/tables/games");

router.get('/', async (req, res) => {
    const games = await getGames();
    res.send(games)
});

router.get('/:gameId', async (req, res) => {
    const game = await getGame(req.params.gameId);
    res.send(game)
});

router.delete('/:gameId', async (req, res) => {
    const game = await deleteGame(req.params.gameId);
    res.send(game)
});

router.post('/', async (req, res) => {
    const { name, description, released, coverImageUrl } = req.body;
    const newGame = await createGame(name, released, description, coverImageUrl);
    res.send(newGame);
})


module.exports = router;