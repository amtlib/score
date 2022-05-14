const crypto = require('crypto');
const { getUserByEmail } = require('../../database/tables/users');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

const pushAuthToken = (email, token) => authTokens.push({email, token});

const getUserByAuthToken = async (token) => {
    const foundUser = authTokens.find(pair => pair.token === token);
    if (!foundUser) {
        return null;
    }
    return await getUserByEmail(foundUser.email);
};

const authTokens = [];

module.exports = {
    getHashedPassword,
    generateAuthToken,
    pushAuthToken,
    getUserByAuthToken
}