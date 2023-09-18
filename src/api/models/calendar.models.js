const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const calendarSchema = new Schema(
      {
        // month:{type:String, required:true}, enum: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
        // day:{type:String, required:true, enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]},
        dayOfWeek: {type:String, required:true, enum: ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"]},
        StartHour:{type:String, required:true, enum: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]},
        EndHour:{type:String, required:true, enum: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]},
        state: {type:String, required:true, enum: ["solicitado", "aprobado", "regado", "denegado: impago", "denegado: presión", "denegado: incompatibilidad", "cancelado"]},
      },{
        timestamps:true
      }
)

const calendar = mongoose.model("calendar", calendarSchema)

module.exports = calendar;