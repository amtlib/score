const express = require("express")
const router = express.Router();
const { getGames, getGame, createGame, deleteGame, updateGame } = require("../database/helpers/games");
const { isAdminMiddleware } = require("./auth/helpers");

router.get('/', async (req, res) => {
    const games = await getGames();
    res.send(games)
});

router.get('/:gameId', async (req, res) => {
    const game = await getGame(req.params.gameId);
    res.send(game)
});

router.delete('/:gameId', isAdminMiddleware, async (req, res) => {
    const game = await deleteGame(req.params.gameId);
    res.send(game)
});

router.put('/:gameId', isAdminMiddleware, async (req, res) => {
    const override = req.body;
    const gameId = req.params.gameId;
    return await updateGame(gameId, override);
});

router.post('/', isAdminMiddleware, async (req, res) => {
    const { name, description, released, coverImageUrl } = req.body;
    const newGame = await createGame(name, released, description, coverImageUrl);
    res.send(newGame);
});

module.exports = router;