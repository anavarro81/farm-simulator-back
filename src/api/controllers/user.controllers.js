const User = require("../models/user.models");
const Parcel = require("../models/parcel.models");
const Invoice = require("../models/invoice.models");
const Calendar = require("../models/calendar.models");

const bcrypt = require("bcrypt");
const {
  validateEmail,
  validatePassword,
  usedEmail,
} = require("../../utils/validators");
const { generateSign } = require("../../utils/jwt");
const parcel = require("../models/parcel.models");

const register = async (req, res) => {
  
  
  
  try {
    const newUser = new User(req.body);
    if (!validateEmail(newUser.email)) {
      return res.status(400).json({ message: " email invalido" });
    }
    if (!validatePassword(newUser.password)) {
      return res.status(400).json({ message: " password invalido" });
    }
    if (await usedEmail(newUser.email)) {
      return res.status(400).json({ message: " email introducido ya existe" });
    }

    newUser.password = bcrypt.hashSync(newUser.password, 10);
    const createdUser = await newUser.save();

    return res.status(201).json(createdUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const login = async (req, res) => {
  try {
  
    const userInfo = await User.findOne({ email: req.body.email })
      .populate("parcel")
      .populate("invoice");

    console.log(userInfo);

    if (!userInfo) {
      return res.status(404).json({ message: "email no encontrado" });
    }

    if (!bcrypt.compareSync(req.body.password, userInfo.password)) {
      return res.status(404).json({ message: "password incorrecto" });
    }

    

    const token = generateSign(userInfo._id, userInfo.email);

     userInfo.password = undefined

    return res.status(200).json({ user: userInfo, token: token, role: userInfo.role, id: userInfo._id});
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addParcel = async (req, res) => {
  console.log(req.body.parcel);
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { parcel: req.body.parcel } },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addInvoice = async (req, res) => {
  console.log(req.body.invoice);
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $addToSet: { invoice: req.body.invoice } },
      { new: true }
    );
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllParcels = async (req, res) => {
  const parcels = [];
  const calendar = [];

  try {
    const { id } = req.params;
    const userInfo = await User.findById(id);
    // console.log("está llegando el id" , id);
    // console.log(userInfo);
    // console.log(userInfo.parcel);
    for (let index=0; index<userInfo.parcel.length; index++){
      const userParcelInfo = await Parcel.findById(userInfo.parcel[index]);
      parcels.push(userParcelInfo)
      console.log(userInfo)
      // for (let j=0; j<userParcelInfo.calendar.length; j++){
      //   const calendarInfo= await Calendar.findById(userParcelInfo.calendar[j]);
      //   calendar.push(calendarInfo)
      //   console.log(calendar)
        
      // }
    }
    return res.status(200).json(parcels);
  } catch (error) {
    return res.status(500).json(error);
  }
};


const getUser = async (req, res) => {
    try {
      const allUser = await User.find().populate("parcel").populate("invoice");
      return res.status(200).json(allUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  };

const getUserDetail = async (req, res) => {
  try {
    const {id} = req.params;
    const userInfo = await User.findById(id);
    console.log("id", id)
    console.log(userInfo)
    return res.status(200).json(userInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const postUser = async (req, res) => {
    try {
      const newUser = new User(req.body);
      if (req.file) {
        newUser.img = req.file.path;
      }
      const createdUser = await newUser.save();
  
      return res.status(201).json(createdUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  
  const putUser = async (req, res) => {
    try {
      const { id } = req.params;
      // const putUser = new User(req.body);
      // putUser._id = id;
      // putParcel.img = req.file.path;
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            name: req.body.name,
            email: req.body.email
          }
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "no existe este id de usuario" });
      }
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  const deleteUser = async (req, res) => {
    try {
      const {id} = req.params;
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
          return res.status(404).json({message:"este id no existe"})
      }
      return res.status(200).json(deletedUser);
    } catch (error) {
      return res.status(500).json(error)
    }
  };

  // Devuelve todas las facturas del usuario

const getAllInvoices = async (req, res) => {
  try {
    
    const {id} = req.params;

    console.log('Estoy llegando con el id =', id);


    const userInfo = await User.findOne({ _id: id });
    console.log("Hago la consulta y devuelvo = ", userInfo);
    
    console.log("Llego en con id: ", id);
    // console.log(userInfo);
    console.log("Tengo las facturas: ", userInfo.invocice);
    
    return res.status(200).json(userInfo.invoice);
  } catch (error) {
    console.log("Doy error", error);
    return res.status(500).json(error);
  }
};


// Devuelve todos los usuarios de un rol. 
const getUserbyRol = async (req, res) => {

  const {role} = req.params;

  try {
    const allUser = await User.find( { role: role } )
    
    
    return res.status(200).json(allUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Devuelve todos los calendarios de las paracelsas de un usuario. 
const getParcelsAndCalendars = async (req, res) => {

  console.log('Estoy en: getParcelsAndCalendar');

  try {


    const { id } = req.params;
    const userInfo = await User.findById(id);
    arrayParcelsCalendar = []
    let obj = { "parcel_id": 0, "calendars": [] };

    console.log(' Consulto con el id = ', id);

    // console.log ('Parcel = ', userInfo.parcel);

    for (const parcel of userInfo.parcel) {
      // console.log ('Parcel = ', parcel);

      const userParcel = await Parcel.findById(parcel);
      obj.parcel_id = parcel;

      for (const calendar of userParcel.calendar) {

        console.log("Parcela = " + parcel + ", Calendar = " + calendar)
        obj.calendars.push(calendar);
      }
      arrayParcelsCalendar.push(obj);
      obj = { "parcel_id": 0, "calendars": [] };
    }

    console.log(arrayParcelsCalendar)
    return res.status(200).json(arrayParcelsCalendar);

  } catch (error) {
    console.log('Error en: getParcelsAndCalendar =>', error);
  }


}


module.exports = { register, login, addParcel, addInvoice, getAllParcels, getUser, postUser, putUser, deleteUser, getAllInvoices, getUserDetail, getUserbyRol, getParcelsAndCalendars };
