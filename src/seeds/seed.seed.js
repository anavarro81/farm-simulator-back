const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const User = require("../api/models/user.models");


const arrayUsers = [    
    {
        "name": "marta",
        "email": "marta@miweb.com",
        "password": "aA123456", 
        "role": "admin",
    },
    {
        "name": "miguel",
        "email": "miguel@miweb.com",
        "password": "aA123456", 
        "role": "user",
    },
    

];

const arrayCalendar = [    

    {
        "week": 31,
        "dayOfWeek": "miercoles",
        "hourOfDay": "15:00",
        "state": "solicitado",
    },
    
]

const arrayInvoice = [ 

 {   "year": 2023,
    "month":"Agosto",
    "file": "https://www.holded.com/wp-content/uploads/2019/09/ticket.jpg",
}
    

]

const arrayParcel = [ 

    {
        "plant": "Cebolla",
        "has": 3,
        "img": "https://thumbs.dreamstime.com/z/plan-simple-de-un-mapa-la-ciudad-con-informaci%C3%B3n-catastral-sobre-el-catastro-parcela-y-hoja-ruta-vacante-270882994.jpg",

      }

]
const DB_URL= process.env.DB_URL;


console.log(DB_URL)
mongoose.connect(DB_URL)

// la parte de user 
.then(async()=> {
    const allUser = await User.find();
    if (allUser.length > 0) {
        await User.collection.drop();
        console.log("Usuarios borrados");
    }
})
.catch((error)=> console.log("Error al borrar los usuarios",error))
.then(async ()=> {
    const usersMap = arrayUsers.map((user) => new User(user));
    await User.insertMany(usersMap);
    console.log("Usuarios insertados correctamente");
})
.catch((error) => console.log("Error al insertar los usuarios", error))

// la parte de calendar 

.then(async()=> {
    const allCalendar = await Calendar.find();
    if (allCalendar.length > 0) {
        await Calendar.collection.drop();
        console.log("Calendario borradao");
    }
})
.catch((error)=> console.log("Error al borrar el calendario",error))
.then(async ()=> {
    const calendarMap = arrayCalendar.map((calendar) => new Calendar(calendar));
    await Calendar.insertMany(calendarMap);
    console.log("Calendario insertado correctamente");
})
.catch((error) => console.log("Error al insertar calendario", error))


// la parte de invoice

.then(async()=> {
    const allInvoice = await Invoice.find();
    if (allInvoice.length > 0) {
        await Invoice.collection.drop();
        console.log("Invoice borrados");
    }
})
.catch((error)=> console.log("Error al borrar los Invoice",error))
.then(async ()=> {
    const invoiceMap = arrayInvoice.map((invoice) => new Invoice(invoice));
    await Invoice.insertMany(invoiceMap);
    console.log("Invoice insertados correctamente");
})
.catch((error) => console.log("Error al insertar los Invoice", error))

// la parte de parcel

.then(async()=> {
    const allParcel = await Parcel.find();
    if (allParcel.length > 0) {
        await Parcel.collection.drop();
        console.log("Parcel insertado");
    }
})
.catch((error)=> console.log("Error al borrar los Parcel",error))
.then(async ()=> {
    const parcelMap = arrayParcel.map((parcel) => new Parcel(parcel));
    await Parcel.insertMany(parcelMap);
    console.log("Parcel insertados correctamente");
})
.catch((error) => console.log("Error al insertar los Parcel", error))

// desconectar 

.finally(()=> mongoose.disconnect());