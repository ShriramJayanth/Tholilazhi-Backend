import Customer from "../models/Customer.js";

export const getCustomerBookings = async (req, res) => {
    try {
      const { userId } = req.params;
      const Mybookings = await Customer.find({ userId });
      res.status(200).json(Mybookings);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  export const DeleteBooking = async (req, res) => {
    try {
      const { userId,workerID } = req.params;
      const Mybookings = await Customer.find({ userId });
      Mybookings=Mybookings.workers.filter((id)=>id!=workerID);
      res.status(200).json({message:"Booking removed successfully"});
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  