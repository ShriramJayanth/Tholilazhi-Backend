import Customer from "../models/Customer.js";
import Worker from "../models/Worker.js";

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
    if (!myBookings) {
      return res.status(203).json({ message: "User not found" });
    }
    myBookings.workers = myBookings.workers.filter((item) => item.id != workerID);
    await myBookings.save();

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
      work: worker.skillset[0],
    });
    customer.workers.push({
      id: worker._id,
      name: worker.firstName + " " + worker.lastName,
      work: worker.skillset[0],
      phone: worker.phone,
      date: "20/03/24",
      status: false,
    });

    await Promise.all([worker.save(), customer.save()]);
    res.status(200).json({ message: "Booking successful" });
  } catch (error) {
    console.error(error);
    res.status(203).json({ message: error.message });
  }
};
