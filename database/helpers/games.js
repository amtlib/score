const { getRandomId, readDatabase, writeDatabase } = require("./helpers");

const getGames = async () => {
    return await readDatabase("games");
}

const getGame = async (gameId) => {
    const existingGames = await readDatabase("games");
    return existingGames.find(game => game.id === gameId);
}

const deleteGame = async (gameId) => {
    const existingGames = await readDatabase("games");
    const gameToDelete = existingGames.find(game => game.id === gameId)
    writeDatabase("games", existingGames.filter(game => game.id !== gameId));
    return gameToDelete
}

const createGame = async (name, released, description, coverImageUrl, producer, genres = [], platforms = [], screenshots = []) => {
    const existingGames = await readDatabase("games");
    const newGame = { id: getRandomId(), name, released, description, coverImageUrl, genres, platforms, screenshots, producer, favouriteBy: [] };
    await writeDatabase("games", [...existingGames, newGame]);
    return newGame;
}

const updateGame = async (gameId, override) => {
    const existingGames = await readDatabase("games");
    const gameToUpdate = existingGames.find(game => game.id === gameId);
    const updatedGame = {...gameToUpdate, ...override };
    await writeDatabase("games", [...existingGames.filter(game => game.id !== gameId), updatedGame]);
    return updatedGame;
}

module.exports = {
    getGames,
    getGame,
    createGame,
    deleteGame,
    updateGame
}