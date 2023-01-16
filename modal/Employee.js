import mongoose from "mongoose";
const EmployeeSchema = new mongoose.Schema({
  Name: { type: String ,required : true},
  desc: { type: String,required :true },
  img : { data:Buffer,contentType:String },


});

const EmployeeModals = new mongoose.model("Employee", EmployeeSchema);
export default EmployeeModals;
