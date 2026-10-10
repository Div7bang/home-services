const User = require("../models/User");
const Service = require("../models/Service");
const { services: publicServices } = require("../public/data");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.json({ message: "User already exists" });
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashpassword, role: role || "user" });
    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await User.findOne({ email });
    if (!users) return res.json({ message: "Invalid Email" });
    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) return res.json({ message: "Invalid Password" });
    const token = jwt.sign({ id: users._id, role: users.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    req.session.token = token;
    res.json({ message: "Login successful", token, users });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ message: "Logout successful" });
  });
};

// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalRegularUsers = await User.countDocuments({ role: "user" });
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    res.json({ totalUsers, totalAdmins, totalRegularUsers, recentUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Service
exports.addService = async (req, res) => {
  try {
    const { title, description, image, price, duration } = req.body;
    if (!title) return res.status(400).json({ message: "Service title is required" });
    const newService = await Service.create({
      title,
      description: description || "",
      image: image || "/images/home_service.jpg",
      price: price || 0,
      duration: duration || "1 hour"
    });
    res.json({ message: "Service added successfully", service: newService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json({ services });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Service
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, price, duration, status } = req.body;
    const updated = await Service.findByIdAndUpdate(id, { title, description, image, price, duration, status }, { new: true });
    if (!updated) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service updated successfully", service: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Service
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Service.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Single service by slug (JSON for the React booking page)
exports.getServiceBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    let service = publicServices.find(item => item.slug === slug);
    if (!service) service = await Service.findOne({ slug });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
