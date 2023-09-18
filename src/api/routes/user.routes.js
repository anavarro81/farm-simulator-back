const express = require("express");
const {register,login, addParcel, addInvoice, getAllParcels, getUser, putUser, postUser, deleteUser, getAllInvoices, getUserDetail, getUserbyRol, getParcelsAndCalendars} = require("../controllers/user.controllers");
const {isAuth, isAdmin} = require("../../middlewares/auth");
const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.put("/userParcel/:id", [isAuth], addParcel);
userRoutes.put("/userInvoice/:id", [isAuth], addInvoice);
userRoutes.get("/userAllParcels/:id", getAllParcels);
userRoutes.get("/", getUser);
userRoutes.get("/:id",getUserDetail);
userRoutes.put("/:id", putUser);
userRoutes.post("", postUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.get("/getUserByRol/:role", getUserbyRol);
// Facturas Invoices
userRoutes.get("/getAllInvoices/:id", getAllInvoices);
userRoutes.get("/getParcelsAndCalendars/:id", getParcelsAndCalendars);



module.exports= userRoutes;