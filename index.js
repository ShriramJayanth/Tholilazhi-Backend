import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Customer from "./models/Customer.js";
import Worker from "./models/Worker.js";
import { CustData,WorkData } from "./data/FakeData.js";
import CustomerAuthRoutes  from "./routes/CustomerAuth.js";
import WorkerAuthRoutes from "./routes/WorkerAuth.js";
import CustomerRoutes from "./routes/Customer.js";
const app = express();
const PORT = 3001;
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }))

// Customer.insertMany(CustData);
// Worker.insertMany(WorkData);

dotenv.config();
app.use(express.json());


app.use("/CAuth",CustomerAuthRoutes);
app.use("/WAuth",WorkerAuthRoutes);
app.use("/Customer",CustomerRoutes);














mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));