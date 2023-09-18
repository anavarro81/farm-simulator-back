const express = require("express")
const {getInvoice, postInvoice, putInvoice, deleteInvoice, getAllInvoices} = require("../controllers/invoice.controllers")
const {isAuth, isAdmin} = require("../../middlewares/auth")

const invoiceRoutes = express.Router();

invoiceRoutes.get("", [isAuth], getInvoice);
// invoiceRoutes.get("/getInvoide/:id", getInvoiceById)
invoiceRoutes.get("/getAllInvoices/:id", getAllInvoices)
invoiceRoutes.post("/",postInvoice);
invoiceRoutes.put("/:id", putInvoice);
invoiceRoutes.delete("/delete/:id/:user", deleteInvoice);
invoiceRoutes.delete("/getAllInvoices:id", [isAdmin], deleteInvoice);


module.exports= invoiceRoutes;