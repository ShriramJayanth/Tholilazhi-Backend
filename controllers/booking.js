import Customer from "../models/Customer.js";
import Worker from "../models/Worker.js";
import mongoose from 'mongoose';
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
  .toString()
  .padStart(2, "0")}`;

export const getWorkerBookings = async (req, res) => {
  try {
    const { name, id } = req.body;
    const worker = await Worker.findById(id);
    res.status(200).json(worker.customers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCustomerBookings = async (req, res) => {
  try {
    const { name, id } = req.body;
    const customer = await Customer.findById(id);
    res.status(200).json(customer.workers);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const DeleteBooking = async (req, res) => {
  try {
    const { userId, workerID } = req.body;
    const myBookings = await Customer.findById(userId);
    const workerbookings = await Worker.findById(workerID);
    if (!myBookings || !workerbookings) {
      return res.status(203).json({ message: "User not found" });
    }
    myBookings.workers = myBookings.workers.filter(
      (item) => item.id != workerID
    );
    await myBookings.save();
    workerbookings.customers = workerbookings.customers.filter(
      (item) => item.id != userId
    );
    await workerbookings.save();

    return res.status(200).json({ message: "Booking removed successfully" });
  } catch (err) {
    console.error("Error deleting booking:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const bookWorker = async (req, res) => {
  try {
    const { Wid, Cid } = req.body;
    const worker = await Worker.findById(Wid);
    const customer = await Customer.findById(Cid);
    if (!worker || !customer) {
      return res.status(203).json({ message: "Worker or Customer not found" });
    }
    worker.customers.push({
      id: customer._id,
      name: customer.firstName + " " + customer.lastName,
      address: customer.address,
      phone: customer.phone,
      date: formattedDate,
      work: worker.skillset[0],
      status: false,
    });
    customer.workers.push({
      id: worker._id,
      name: worker.firstName + " " + worker.lastName,
      work: worker.skillset[0],
      phone: worker.phone,
      date: formattedDate,
      status: false,
    });

    await Promise.all([worker.save(), customer.save()]);
    res.status(200).json({ message: "Booking successful" });
  } catch (error) {
    console.error(error);
    res.status(203).json({ message: error.message });
  }
};

export const acceptbookings = async (req, res) => {
  try {
    const { userId, workerID } = req.body;
    const objectId1 = mongoose.Types.ObjectId.createFromHexString(userId);
    const objectId2=mongoose.Types.ObjectId.createFromHexString(workerID);
    const customerBookings =await Customer.findById(userId);
    const workerbookings = await Worker.findById(workerID);
    let index=-1;
    for (let i = 0; i < workerbookings.customers.length; i++) {
      if(workerbookings.customers[i].id.equals(objectId1)){
        index=i;
      }
    }
    let wbooks=workerbookings.customers[index];
    wbooks.status=true;
    workerbookings.customers = workerbookings.customers.filter(
      (item) => !item.id.equals(objectId1)
    );
    workerbookings.customers.push(wbooks);
    let index2=-1;
    for(let i=0;i<customerBookings.workers.length;i++){
      if(customerBookings.workers[i].id.equals(objectId2)){
        index2=i;
      }
    }
    let cbooks=customerBookings.workers[index2];
    cbooks.status=true;
    customerBookings.workers=customerBookings.workers.filter((item)=>!item.id.equals(objectId2));
    customerBookings.workers.push(cbooks);
    await workerbookings.save();
    await customerBookings.save();
    return res.status(203).json({ message: "Booking accepted successfully" });
  } catch (error) {
    console.error("Error accepting booking:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

