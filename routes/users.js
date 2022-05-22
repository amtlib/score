const express = require("express")
const router = express.Router();
const { getUsers, getUserById, deleteUser, createUser } = require("../database/helpers/users");
const { isAdminMiddleware } = require("./auth/helpers");

router.get('/', isAdminMiddleware, async (req, res) => {
    const users = await getUsers();
    res.send(users)
});

router.get('/:userId', isAdminMiddleware, async (req, res) => {
    const user = await getUserById(req.params.userId);
    res.send(user)
});

router.delete('/:userId', isAdminMiddleware, async (req, res) => {
    const user = await deleteUser(req.params.userId);
    res.send(user)
});

router.put('/:userId', isAdminMiddleware, async (req, res) => {
    const override = req.body;
    const userId = req.params.userId;
    return await updateUser(userId, override);
});

router.post('/', isAdminMiddleware, async (req, res) => {
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