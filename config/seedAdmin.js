const bcrypt = require("bcryptjs");
const User = require("../models/User");

const seedAdmin = async () => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminFullname = process.env.ADMIN_FULLNAME || "System Admin";

  if (!adminEmail || !adminPassword) {
    console.warn("Admin seed skipped: ADMIN_EMAIL or ADMIN_PASSWORD missing");
    return;
  }

  const existing = await User.findOne({ email: adminEmail });

  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
      console.log("Existing user upgraded to admin");
    }
    return;
  }

  const hashed = await bcrypt.hash(adminPassword, 10);
  await User.create({ fullname: adminFullname, email: adminEmail, password: hashed, role: "admin" });
  console.log("Default admin created");
};

module.exports = seedAdmin;
