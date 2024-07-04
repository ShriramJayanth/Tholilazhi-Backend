import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema(
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
    country:String,
    state:String,
    district:String,
    desc:{
      type:String,
      default:"Experienced domestic worker specializing in thorough cleaning, precise sweeping, and meticulous dishwashing"
    },
    status:{
      type:Boolean,
      default:true
    },
    phone:Number,
    age:Number,
    language:String,
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
    skillset:{
      type:Array,
      required:true,
      default:[]
    },
    exp:Number,
    customers:{
        type:Array,
        default:[]
    },
    hrate:Number,
    wrate:Number,
    mrate:Number,

  },
  { timestamps: true }
);

const Worker = mongoose.model("Worker", WorkerSchema);
export default Worker;