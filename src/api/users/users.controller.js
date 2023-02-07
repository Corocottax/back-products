const User = require("./users.model");
const bcrypt = require("bcrypt");
const { generateSign } = require("../../utils/jwt.js");

const postNewUser = async (req, res, next) => {
  try {
    const newUser = new User(req.body);
    const userDuplicate = await User.findOne({ email: newUser.email });
    if (userDuplicate) {
      return next("Usuario existente");
    }
    if (newUser.rol === "user") {
      const userDB = await newUser.save();
      return res.status(201).json(userDB);
    } else {
      return next("No te puedes registrar a no ser que tengas rol = user");
    }
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const userDB = await User.findOne({ email: req.body.email });
    if (!userDB) {
      return next(404, "Nombre de usuario incorrecto");
    }
    if (bcrypt.compareSync(req.body.password, userDB.password)) {
      const token = generateSign(userDB._id, userDB.email);
      return res.status(200).json({token, userDB});
    } else {
      return next("Contraseña incorrecta");
    }
  } catch (error) {
    error.message = "error Login";
    return next(error);
  }
};

const logoutUser = (req, res, next) => {
  try {
    const token = null;
    return res.status(200).json(token);
  } catch (error) {
    return next(error);
  }
};

const patchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const patchUser = new User(req.body);
    patchUser._id = id;
    const UserDB = await User.findByIdAndUpdate(id, patchUser);
    if (!UserDB) {
      return next("User not found");
    }
    return res.status(200).json({ new: patchUser, old: UserDB });
  } catch (error) {
    return next("User cant be replaced");
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findById(id);
    if (!userDB) {
      return next("User not found");
    }
    return res.status(200).json(userDB);
  } catch (error) {
    return next("User server fail");
  }
};

const getUsers = async (req, res, next) => {
  try {
    const userDB = await User.find();
    return res.status(200).json(userDB);
  } catch (error) {
    return next("User server fail");
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userDB = await User.findByIdAndRemove(id);
    if (!userDB) {
      return next("Error deleting user");
    }
    return res.status(200).json(userDB);
  } catch (error) {
    return next("User cant be removed");
  }
};

const checksession = async (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  postNewUser,
  loginUser,
  logoutUser,
  patchUser,
  getUser,
  deleteUser,
  getUsers,
  checksession
};
