import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import Worker from "../models/Worker.js";

/* REGISTER Customer*/
export const CUSTOMERregister = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNo,
      age,
      gender,
      email,
      password,
      address,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Customer({
      firstName,
      lastName,
      phone:phoneNo,
      age,
      gender,
      email,
      password:passwordHash,
      address,
      occupation,
      workers:[]
    });
    const savedUser = await newUser.save();
    res.status(203).json({message:"user registered successfully"});
  } catch (err) {
    res.status(203).json(err);
  }
};

/* CUSTOMER LOGGING IN */
export const CUSTOMERlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Customer.findOne({ email: email });
    if (!user) return res.status(201).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(202).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* REGISTER Worker */
export const WORKERregister = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      country,
      state,
      district,
      phoneNo,
      age,
      language,
      gender,
      email,
      password,
      skillset,
      experience,
      customers,
      hrate,
      wrate,
      mrate
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new Worker({
      firstName,
      lastName,
      country,
      state,
      district,
      phone:phoneNo,
      age,
      language,
      gender,
      email,
      password:passwordHash,
      skillset,
      exp:experience,
      customers,
      hrate,
      wrate,
      mrate
    });
    const savedUser = await newUser.save();
    res.status(203).json({message:"user registered successfully"});
  } catch (err) {
    res.status(200).json({ error: err });
  }
};

/* Worker logging in*/
export const WORKERlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Worker.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};