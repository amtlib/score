const express = require("express");
const router = express.Router();
const { getUserByEmail, createUser } = require("../../database/tables/users")
const { getHashedPassword } = require("./helpers");

router.post('/', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password === confirmPassword) {
        if (await getUserByEmail(email)) {
            res.send({status: "error", code: 400, message: "user already exists"})
            return;
        }

        const hashedPassword = getHashedPassword(password);
        await createUser({email, hashedPassword})
        res.send({status: "ok", code: 200, message: "registration finished successfully"});
    } else {
        res.send({status: "error", code: 401, message: "passwords don't match"});
    }
});

module.exports = router;