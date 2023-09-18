const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const invoiceSchema = new Schema(
      {
        year:{type:Number, required:true},
        month:{type:String, required:true},
        file:{type:String, required:false},


      },{
        timestamps:true
      }
)

const invoice = mongoose.model("invoice", invoiceSchema)

module.exports = invoice;