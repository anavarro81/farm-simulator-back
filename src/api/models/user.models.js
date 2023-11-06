const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    parcel: [{type:Schema.Types.ObjectId, ref: "parcel"}],
    invoice: [{type:Schema.Types.ObjectId, ref: "invoice"}],
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("Users", userSchema);

module.exports = user;
