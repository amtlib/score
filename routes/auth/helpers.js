const crypto = require('crypto');

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

const pushAuthToken = (email, token) => authTokens.push({email, token});

const getUserByAuthToken = (token) => authTokens.find(pair => pair.token === token);

const authTokens = [];

setInterval(() => console.log(authTokens), 3000)

module.exports = {
    getHashedPassword,
    generateAuthToken,
    pushAuthToken,
    getUserByAuthToken
}