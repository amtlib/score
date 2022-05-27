const crypto = require('crypto');
const { getUserByEmail } = require('../../database/helpers/users');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

const pushAuthToken = (email, role, token) => authTokens.push({email, role, token});

const getUserByAuthToken = async (token) => {
    const foundUser = authTokens.find(pair => pair.token === token);
    if (!foundUser) {
        return null;
    }
    return await getUserByEmail(foundUser.email);
};

const isLoggedInMiddleware = (req, res, next) => {
    const {AuthToken} = req.cookies;
    const user = authTokens.find(user => user.token === AuthToken);
    if (user) {
        next();
    }
}

const isAdminMiddleware = (req, res, next) => {
    const {authtoken} = req.headers
    const user = authTokens.find(user => user.token === authtoken);
    if (!user) {
        res.send({status: "error", code: 401, message: "not authorized"});
        return;
    }
    if (user.role === "admin") {
        next();
        return;
    }
    res.send({status: "error", code: 401, message: "not authorized"});
}

const authTokens = [];

module.exports = {
    getHashedPassword,
    generateAuthToken,
    pushAuthToken,
    getUserByAuthToken,
    isLoggedInMiddleware,
    isAdminMiddleware
}