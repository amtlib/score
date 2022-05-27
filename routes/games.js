const express = require("express")
const router = express.Router();
const { getGames, getGame, createGame, deleteGame, updateGame } = require("../database/helpers/games");
const { getUserByAuthToken } = require("./auth/helpers")
const { isAdminMiddleware } = require("./auth/helpers");

router.get('/', async (req, res) => {
    const games = await getGames();
    res.send(games)
});

router.get('/:gameId', async (req, res) => {
    const game = await getGame(req.params.gameId);
    res.send(game || { status: "error"})
});

// add to favourites
router.post('/:gameId/favourites', async (req, res) => {
    const { AuthToken } = req.body;
    const gameId = req.params.gameId;

    const user = await getUserByAuthToken(AuthToken);
    const game = await getGame(req.params.gameId);
    res.send(await updateGame(gameId, {favouriteBy: [...game.favouriteBy.filter(id => user.id !== id), user.id]}));
});

// remove from favourites
router.delete('/:gameId/favourites', async (req, res) => {
    const { AuthToken } = req.body;
    const gameId = req.params.gameId;
    const user = await getUserByAuthToken(AuthToken);
    const game = await getGame(req.params.gameId);
    res.send(await updateGame(gameId, {favouriteBy: game.favouriteBy.filter(id => id !== user.id)}))
});

router.delete('/:gameId', isAdminMiddleware, async (req, res) => {
    const game = await deleteGame(req.params.gameId);
    res.send(game)
});

router.put('/:gameId', isAdminMiddleware, async (req, res) => {
    const override = req.body;
    const gameId = req.params.gameId;
    console.log(override)
    res.send(await updateGame(gameId, override));
});

router.post('/', isAdminMiddleware, async (req, res) => {
    const { name, description, released, coverImageUrl, genres, producer, platforms, screenshots } = req.body;
    const newGame = await createGame(name, released, description, coverImageUrl, producer, genres, platforms, screenshots);
    res.send(newGame);
});

module.exports = router;