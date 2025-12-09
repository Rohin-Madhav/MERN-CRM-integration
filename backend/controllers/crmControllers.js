require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const Customer = require("../models/customerSchema");
const {
  hashPassword,
  comparePassword,
  generateToken,
} = require("../services/authServices");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // basic validation
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password required" });
    }

    // prevent duplicate registration
    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(409)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customersData = await Customer.find(req.query || {});
    res.status(200).json(customersData);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding data", error: error.message });
  }
};

exports.addCustomer = async (req, res) => {
  try {
    const { name, email, company } = req.body;
    if (!name || !email) {
      return res
        .status(400)
        .json({ message: "Name and email are required" });
    }
    const customer = await Customer.create({ name, email, company });
    res.status(201).json(customer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in adding data", error: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating customer", error: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Data not found" });
    }
    res
      .status(200)
      .json({ message: "Data deleted successfully", data: deletedCustomer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting data", error: error.message });
  }
};
