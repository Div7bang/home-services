import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";
import { api } from "../api.js";
import AuthScene from "../components/AuthScene.jsx";

export default function AdminLogin() {
  usePageTitle("Admin Login - Home Service");
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });

  // Mirrors the old server-side check: already-logged-in admins skip the login form
  useEffect(() => {
    api.get("/admin/session").then(({ ok }) => { if (ok) navigate("/admin/dashboard", { replace: true }); });
  }, [navigate]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: "Checking credentials...", type: "" });
    try {
      const { ok, data: result } = await api.post("/login", { email: form.email.trim(), password: form.password });

      if (!ok || result.error) {
        setMsg({ text: result.error || "Unable to login right now.", type: "error" });
        return;
      }
      if (result.users && result.users.role === "admin") {
        localStorage.setItem("adminName", result.users.fullname);
        setMsg({ text: "Admin login successful. Redirecting to dashboard...", type: "success" });
        setTimeout(() => navigate("/admin/dashboard"), 1000);
        return;
      }
      setMsg({ text: "Access denied. This account is not an admin.", type: "error" });
    } catch {
      setMsg({ text: "Network error while logging in.", type: "error" });
    }
  };

  return (
    <AuthScene alt="Admin login background">
      <p className="admin-login-kicker mb-1">🏠 Home Service</p>
      <h1 className="admin-login-title">Admin Login</h1>
      <p className="admin-login-subtitle">Enter your admin credentials to access the dashboard</p>

      <form className="admin-login-form" onSubmit={onSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="admin@homeservice.com" required value={form.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" required value={form.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-dark w-100">Login as Admin</button>
      </form>

      <div className={`admin-login-message mt-3 ${msg.type}`}>{msg.text}</div>
    </AuthScene>
  );
}
