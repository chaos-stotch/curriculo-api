const usersModels = require('../models/usersModels')

const getAll = async(req, res) => {
    allUsers = await usersModels.getAll()
    return res.status(200).json(allUsers);
};

const createUser = async(req, res) => {
    const {body} = req;
    const username = body.username;
    await usersModels.createUser(username);
    return res.status(200).json({message: "user created"});
};

const deleteUser = async(req, res) => {
    const {body} = req;
    const userid = body.userid
    await usersModels.deleteUser(userid);
    return res.status(200).json({message: "user deleted"});
};

const updateUser = async(req, res) => {
    const {body} = req;
    await usersModels.updateUser(body.userid, body.username.trim());
    return res.status(200).json({message: "user updated"});
}

module.exports = {
    getAll,
    createUser,
    deleteUser,
    updateUser
};
