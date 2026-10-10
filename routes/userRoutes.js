const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { checkAdminRole } = require("../middleware/checkrole");
const { about, services, employee, Clients } = require("../public/data");

// Auth routes
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

// Admin session check (used by the React app to skip the login form / guard the dashboard)
router.get("/admin/session", checkAdminRole, (req, res) => res.json({ ok: true, role: req.user.role }));

// Dashboard API
router.get("/dashboard-stats", checkAdminRole, userController.getDashboardStats);
router.get("/all-users", checkAdminRole, userController.getAllUsers);

// Service management
router.post("/services", checkAdminRole, userController.addService);
router.get("/services", checkAdminRole, userController.getAllServices);
router.put("/services/:id", checkAdminRole, userController.updateService);
router.delete("/services/:id", checkAdminRole, userController.deleteService);

// Public JSON data (replaces the data that used to be injected into EJS templates)
router.get("/public-data", (req, res) => res.json({ about, services, employee, Clients }));
router.get("/service/:slug", userController.getServiceBySlug);

module.exports = router;
