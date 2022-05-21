const express = require("express")
const router = express.Router();
const { getGenres, createGenre, getGenre, deleteGenre } = require("../database/tables/genres");

router.get('/', async (req, res) => {
    const genres = await getGenres();
    res.send(genres)
});

router.get('/:genreId', async (req, res) => {
    const genre = await getGenre(req.params.genreId);
    res.send(genre)
});

router.delete('/:genreId', async (req, res) => {
    const genre = await deleteGenre(req.params.genreId);
    res.send(genre)
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    const newGenre = await createGenre(name);
    res.send(newGenre);
})


module.exports = router;