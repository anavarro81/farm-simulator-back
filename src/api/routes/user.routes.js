const express = require("express");
const {register,login, getUser, putUser, postUser, deleteUser } = require("../controllers/user.controllers");
const {isAuth, isAdmin} = require("../../middlewares/auth");
const userRoutes = express.Router();

// register, login, postUser, putUser, deleteUser


userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/", getUser);

userRoutes.put("/:id", putUser);
userRoutes.post("", postUser);
userRoutes.delete("/:id", deleteUser);




module.exports= userRoutes;