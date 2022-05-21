const express = require("express")
const router = express.Router();
const { getPlatforms, createPlatform, getPlatform, deletePlatform } = require("../database/tables/platforms");

router.get('/', async (req, res) => {
    const platforms = await getPlatforms();
    res.send(platforms)
});

router.get('/:platformId', async (req, res) => {
    const platform = await getPlatform(req.params.platformId);
    res.send(platform)
});

router.delete('/:platformId', async (req, res) => {
    const platform = await deletePlatform(req.params.platformId);
    res.send(platform)
});

router.post('/', async (req, res) => {
    const { name } = req.body;
    const newPlatform = await createPlatform(name);
    res.send(newPlatform);
})


module.exports = router;