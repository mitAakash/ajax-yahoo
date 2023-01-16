import mongoose from "mongoose";
const dataSchema = new mongoose.Schema({
  product: { type: String },
  qty: { type: String},
  NetPrice : { type: Number  },
  Delivery : {type:Number},



});

const dataModals = new mongoose.model("data", dataSchema);
export default dataModals;
