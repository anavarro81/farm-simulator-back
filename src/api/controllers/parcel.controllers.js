const Parcel = require("../models/parcel.models");
const User = require("../models/user.models");

const getParcel = async (req, res) => {
  try {
    const allParcel = await Parcel.find().populate("calendar");
    return res.status(200).json(allParcel);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Devuelve información de la parcela por id. 
const getParcelInfo = async (req, res) => {
  try {
    const {id} = req.params;
    const userParcelInfo = await Parcel.findById(id).populate("calendar");
    console.log("id", id)
    console.log(userParcelInfo)
    return res.status(200).json(userParcelInfo);
  } catch (error) {
    return res.status(500).json(error);
  }
};


const postParcel = async (req, res) => {
  try {
    const newParcel = new Parcel(req.body);
    if (req.file) {
      // newParcel.img = req.file.path;
    }
    const createdParcel = await newParcel.save();
    const updatedUser = await User.findByIdAndUpdate(req.body.user,
      { $addToSet: { parcel: createdParcel._id } },
      { new: true }
    );

    return res.status(201).json(createdParcel);
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

const updateParcel = async (req, res) => {
  try {
    const { id } = req.params;
    // const putUser = new User(req.body);
    // putUser._id = id;
    // putParcel.img = req.file.path;
    const updatedParcel = await Parcel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          plant: req.body.plant,
          has: req.body.has,
          img: req.body.img
        }
      },
      { new: true }
    );
    if (!updatedParcel) {
      return res.status(404).json({ message: "no existe este id de parcel" });
    }
    return res.status(200).json(updatedParcel);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//asocia calendario a parcela
const putParcel = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    // const putParcel = new Parcel(req.body);
    // putParcel._id = id;

  console.log(req.body);
  console.log(req.body.calendar);
  const parcel = await Parcel.findByIdAndUpdate (id, { $addToSet: { calendar: req.body.calendar } },
    { new: true })
    
    if (!parcel) {
      return res.status(404).json({ message: "no existe este id de parcela" });
    }
    return res.status(200).json(parcel);
  } catch (error) {
    return res.status(500).json(error);
  }
};


const deleteParcel = async (req, res) => {
  try {
    const {id, user} = req.params;
    console.log(' Se va a borrar la parcela con id = ', id)
    console.log(' EL usuario es = ', user)
    const deletedParcel = await Parcel.findByIdAndDelete(id)

    const deleteUserParcel = await User.updateOne( { _id: user }, { $pull: { parcel: id } } )

    console.log('El resultado del borrar en usuarios es: ', deleteUserParcel)
   
    return res.status(200).json(deletedParcel);
  } catch (error) {

    console.log(' Error borrando la parcela. ERROR = ', error)

    return res.status(500).json(error)
  }
};

//añade el calendario que nos llega por id a la parcela 

const addCalendarToParcel =async (req, res) => {

  const {parcelId, calendarId} = req.body;
  const parcel = await Parcel.findByIdAndUpdate (req.body.parcelId, 
    { $addToSet: { calendar: req.body.calendarId } },
    { new: true } )
}

module.exports = { getParcel, getParcelInfo, postParcel, putParcel, deleteParcel, addCalendarToParcel, updateParcel };
