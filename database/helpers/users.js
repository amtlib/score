const { getRandomId, readDatabase, writeDatabase } = require("./helpers");

const createUser = async ({ email, hashedPassword, role }) => {
    const existingUsers = await readDatabase("users");
    return writeDatabase("users", [...existingUsers, { id: getRandomId(), hashedPassword, email, role: role || "regular"}])
};

const getUsers = async () => {
    return await readDatabase("users");
}

const getUserById = async (userId) => {
    const existingUsers = await readDatabase("users");
    return existingUsers.find(user => user.id === userId);
}

const getUserByEmail = async (userEmail) => {
    const existingUsers = await readDatabase("users");
    return existingUsers.find(user => user.email === userEmail);
}

const updateUser = async (userId, override) => {
    const existingUsers = await readDatabase("users");
    const userToUpdate = existingUsers.find(user => user.id === userId);
    const updatedUser = {...userToUpdate, ...override};
    writeDatabase("users", [...existingUsers.filter(user => user.id !== userId), updatedUser]);
    return updatedUser;
}

const deleteUser = async (userId) => {
    const existingUsers = await readDatabase("users");
    return writeDatabase("users", [...existingUsers.filter(user => user.id !== userId)])
}
module.exports = {
    getUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}