const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const MongoStore = require("connect-mongo").default;
const applyBodyParser = require("./middleware/bodyParserMiddleware");
const connectDB = require("./config/db");
const seedAdmin = require("./config/seedAdmin");
const userRouter = require("./routes/userRoutes");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
const CLIENT_DIST = path.join(__dirname, "dist-client");
const INDEX_HTML = path.join(CLIENT_DIST, "index.html");

applyBodyParser(app);
app.use(cookieParser());

// Legacy assets (bootstrap css/js, custom css, images) + built React app
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(CLIENT_DIST, { index: false }));

app.use(
  session({
    secret: process.env.JWT_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 60 * 60 * 1000, httpOnly: true },
  })
);

// JSON API
app.use("/api/auth", userRouter);

// Old EJS page URLs (/api/auth/about, ...) -> new React routes
app.get(/^\/api\/auth(\/.*)?$/, (req, res) => {
  const target = req.path.replace(/^\/api\/auth/, "") || "/";
  res.redirect(target);
});

// Server-side guard for the admin dashboard page (same behaviour as before)
app.get("/admin/dashboard", (req, res, next) => {
  const token = req.session && req.session.token;
  if (!token) return res.redirect("/admin/login");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") return res.redirect("/login");
    return next();
  } catch (error) {
    req.session.destroy(() => res.redirect("/admin/login"));
  }
});

// React SPA fallback: every other GET serves index.html, React Router renders the page / 404
app.use((req, res, next) => {
  if (req.method !== "GET") return next();
  if (!fs.existsSync(INDEX_HTML)) {
    return res
      .status(503)
      .send("React client not built yet. Run: npm run build (or npm run dev:client for development).");
  }
  res.sendFile(INDEX_HTML);
});

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();
    const port = process.env.PORT || 5001;
    app.listen(port, () =>
      console.log("Home Service running at http://localhost:" + port)
    );
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
