const usersModels = require('../models/usersModels')

const getAll = async(req, res) => {
    allUsers = await usersModels.getAll()
    return res.status(200).json(allUsers);
};

const createUser = async(req, res) => {
    const {body} = req;
    await usersModels.createUser(body);
    return res.status(200).json({message: "user created"});
};

const deleteUser = async(req, res) => {
    const {id} = req.params;
    await usersModels.deleteUser(id);
    return res.status(200).json({message: "user deleted"});
};

const updateUser = async(req, res) => {
    const {id} = req.params;
    const {body} = req;
    await usersModels.updateUser(id, body);
    return res.status(200).json({message: "user updated"});
}

module.exports = {
    getAll,
    createUser,
    deleteUser,
    updateUser
};
