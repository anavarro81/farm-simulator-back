const Invoice = require("../models/invoice.models");
const User = require("../models/user.models");

// Recupera todas las facturas
const getInvoice = async (req, res) => {
  try {
    const allInvoice = await Invoice.find();
    return res.status(200).json(allInvoice);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getInvoiceById = async (req, res) => {

  console.log('Estoy en getInvoiceById')

  console.log('req.params > ', req.params)
  
  try {
    
    const {id} = req.params;

    console.log('> getInvoiceById ', id)

    const invoiceInfo = await Invoice.findOne({ _id: id });
    
    console.log("Hago la consulta y devuelvo = ", invoiceInfo);
    console.log('Datos de factura')
    console.log('year = ', invoiceInfo.year);
    console.log('month', invoiceInfo.month);
    console.log('file', invoiceInfo.file);    
    
    return res.status(200).json(invoiceInfo);
  } catch (error) {
    console.log("Doy error", error);
    return res.status(500).json(error);
  }

}



const postInvoice = async (req, res) => {
  
  const {  user, year, month, file } = req.body

   try {
    const newInvoice = new Invoice({ year, month, file })
    const createdInvoice = await newInvoice.save();

    const updatedUser = await User.findByIdAndUpdate(
      user,
      { $addToSet: { invoice: createdInvoice._id } },
      { new: true }
    );

    console.log(createdInvoice)

    return res.status(201).json(createdInvoice);
  } catch (error) {
    return res.status(500).json(error);
  }

  

  /* console.log('Cliente: ', customer)

  const updatedUser = await User.findByIdAndUpdate(
    user,
    { $addToSet: { invoice: req.body. } },
    { new: true }
  );*/
  

};

const putInvoice = async (req, res) => {

  
  try {
    const { id } = req.params;
    const putInvoice = new Invoice(req.body);
    putInvoice._id = id;
    const updatedInvoice = await Invoice.findByIdAndUpdate(id, putInvoice, {
      new: true,
    });

    console.log('He podido hacer el INSERT');

    if (!updatedInvoice) {
      return res.status(404).json({ message: "no existe este id de factura" });
    }
    return res.status(200).json(updatedInvoice);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteInvoice = async (req, res) => {

  console.log(' Borrado de factura ')

  try {
    const {id, user} = req.params;
                 
    
    console.log(' Se va a borrar la factura con id = ', id)
    console.log(' EL usuario es = ', user)
    
// Borra la factura de la tabla invoices
    const deletedInvoice = await Invoice.findByIdAndDelete(id)
    
// Borra la relacion de la factura con el usuario. 
    const deleteUserInvoice = await User.updateOne( { _id: user }, { $pull: { invoice: id } }  )

    console.log('El resultado del borrado en usuarios es: ', deleteUserInvoice)
    
    return res.status(200).json(deletedInvoice);

  } catch (error) {
    console.log(' Error borrando la factura. ERROR = ', error)
    return res.status(500).json(error)
  }
};

// Recupera todas las parecerlas de un agricultor. 
const getAllInvoices = async (req, res) => {
  const invoices = [];

  console.log('Estoy en getAllInvoices');

  try {
    
    const { id } = req.params;
    console.log("estÃ¡ llegando el id" , id);
    const userInfo = await User.findById(id);
    
    console.log(userInfo);
    console.log(userInfo.invoice);
    for (let index=0; index<userInfo.invoice.length; index++){
      const userInvoiceInfo = await Invoice.findById(userInfo.invoice[index]);
      invoices.push(userInvoiceInfo)
      console.log(invoices)
    }
    return res.status(200).json(invoices);
  } catch (error) {
    console.log("estoy dando error" , error);
    return res.status(500).json(error);
  }
};






module.exports = { getInvoice, postInvoice, putInvoice, deleteInvoice, getAllInvoices};