import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";
import { api } from "../api.js";
import AuthScene from "../components/AuthScene.jsx";

export default function Login() {
  usePageTitle("User Login - Home Service");
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: "Signing in...", type: "" });
    try {
      const { data: result } = await api.post("/login", form);
      if (result.users) {
        if (result.users.role === "admin") {
          localStorage.setItem("adminName", result.users.fullname);
          setMsg({ text: "Admin detected. Redirecting to dashboard...", type: "success" });
          setTimeout(() => navigate("/admin/dashboard"), 1000);
        } else {
          setMsg({ text: "Login successful! Redirecting...", type: "success" });
          setTimeout(() => navigate("/"), 1000);
        }
      } else {
        setMsg({ text: result.message || result.error || "Login failed. Please try again.", type: "error" });
      }
    } catch {
      setMsg({ text: "Network error. Please try again.", type: "error" });
    }
  };

  return (
    <AuthScene alt="Login background">
      <h1 className="admin-login-title">User Login</h1>
      <p className="admin-login-subtitle">Sign in to manage your bookings</p>

      <form className="admin-login-form" onSubmit={onSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="user@example.com" required value={form.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Enter password" required value={form.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-dark w-100">Login</button>
      </form>

      <div className={`admin-login-message mt-3 ${msg.type}`}>{msg.text}</div>
      <p className="mt-3" style={{ color: "#fff", textShadow: "0 1px 8px rgba(0,0,0,.55)" }}>
        Don't have an account? <Link to="/signup" style={{ color: "#93c5fd" }}>Sign up</Link>
      </p>
    </AuthScene>
  );
}
