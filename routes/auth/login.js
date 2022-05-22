const express = require("express");
const router = express.Router();
const { getUserByEmail } = require("../../database/helpers/users")
const { getHashedPassword, pushAuthToken, generateAuthToken } = require("./helpers");

router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = getHashedPassword(password);
    const user = await getUserByEmail(email);
    if(!user) {
        res.send({ status: "error", code: 402, message: "user does not exist"});
        return;
    }
    if(user.hashedPassword !== hashedPassword) {
        res.send({ status: "error", code: 403, message: "wrong password"});
        return;
    }
    
    const authToken = generateAuthToken();
    pushAuthToken(email, user.role, authToken);
    res.cookie('AuthToken', authToken);
    res.send({ status: "ok", code: 200, message: "login successfull", token: authToken});
});

module.exports = router;