const User = require("../api/users/users.model");
const { verifyJwt } = require("../utils/jwt.js");

const isRegistered = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization;
    if (!token) {
      return next("Unauthorized");
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET);
    const userLogued = await User.findById(validToken.id);

    userLogued.password = null;
    req.user = userLogued;
    next();

  } catch (error) {
    return next(error);
  }
};

const isUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next("Unauthorized");
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET);
    const userLogued = await User.findById(validToken.id);

    if (userLogued.rol === "user") {
      
      userLogued.password = null;
      req.user = userLogued;
      next();

    } else {
      return next("no eres user");
    }

  } catch (error) {
    return next(error);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next("Unauthorized");
    }
    const parsedToken = token.replace("Bearer ", "");
    const validToken = verifyJwt(parsedToken, process.env.JWT_SECRET);
    const userLogued = await User.findById(validToken.id);

    if (userLogued.rol === "admin") {
      
      userLogued.password = null;
      req.user = userLogued;
      next();

    } else {
      return next("no eres admin");
    }

  } catch (error) {
    return next(error);
  }
};



module.exports = { isUser, isAdmin, isRegistered };