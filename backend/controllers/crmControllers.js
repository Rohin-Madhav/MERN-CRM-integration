require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const Customer = require("../models/customerSchema");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user: " + error.message);
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).send("Error logging in user: " + error.message);
  }
};

exports.getCustomer = async (req, res) => {
  try {
    const customersData = await Customer.find(req.query);
    res.status(200).json(customersData);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Error finding data", error: error.message });
  }
};

exports.addCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in adding data", error: error.message });
  }
};
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
