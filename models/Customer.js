import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    phone:Number,
    age: Number,
    gender:{
      type: String,
      enum:["Male","Female","Other"],
      required:true
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    address: String,
    occupation: String,
    workers:{
      type: Array,
      default:[],
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", UserSchema);
export default Customer;