import Worker from "../models/Worker.js";

export const getWorkers=async(req,res)=>{
    try{
    const WorkData=await Worker.find({status:true});
    res.status(203).json(WorkData);
    }
    catch(err){
        res.status(404).json(err);
    }
}