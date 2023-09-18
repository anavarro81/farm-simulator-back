const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const parcelSchema = new Schema(
      {
        name:{type:String, required:true},
        plant:{type:String, required:true},
        has:{type:Number, required:true},
        img:{type:String, required:false},
        calendar: [{type:Schema.Types.ObjectId, ref: "calendar"}]

      },{
        timestamps:true
      }
)

const parcel = mongoose.model("parcel", parcelSchema)

module.exports = parcel;