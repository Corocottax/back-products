const UserRoutes = require('express').Router();
const { postNewUser, loginUser, logoutUser, getUser, patchUser, deleteUser, getUsers, checksession } = require('./users.controller');
const { isAdmin, isRegistered } = require("../../middlewares/auth");

UserRoutes.post('/', [isAdmin], postNewUser);
UserRoutes.post('/login', loginUser);
UserRoutes.post('/logout', logoutUser);
UserRoutes.get('/', getUsers);
UserRoutes.get('/:id', [isRegistered], getUser);
UserRoutes.patch('/:id', [isRegistered], patchUser);
UserRoutes.delete('/:id', [isAdmin], deleteUser);
UserRoutes.post("/checksession", [isRegistered], checksession);

module.exports = UserRoutes;