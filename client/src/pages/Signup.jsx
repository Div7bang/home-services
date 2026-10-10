import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";
import { api } from "../api.js";
import AuthScene from "../components/AuthScene.jsx";

export default function Signup() {
  usePageTitle("Sign Up - Home Service");
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg({ text: "Creating your account...", type: "" });
    try {
      const { data: result } = await api.post("/register", { ...form, role: "user" });
      if (result.user) {
        setMsg({ text: "Account created! Redirecting to login...", type: "success" });
        setTimeout(() => navigate("/login"), 1200);
      } else {
        setMsg({ text: result.message || result.error || "Signup failed. Try again.", type: "error" });
      }
    } catch {
      setMsg({ text: "Network error while signing up.", type: "error" });
    }
  };

  return (
    <AuthScene alt="Signup background">
      <h1 className="admin-login-title">Create Account</h1>
      <p className="admin-login-subtitle">Register to book home services</p>

      <form className="admin-login-form" onSubmit={onSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="fullname" name="fullname" placeholder="Enter full name" required value={form.fullname} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="user@example.com" required value={form.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" placeholder="Create a password" required value={form.password} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-dark w-100">Sign Up</button>
      </form>

      <div className={`admin-login-message mt-3 ${msg.type}`}>{msg.text}</div>
      <p className="mt-3" style={{ color: "#fff", textShadow: "0 1px 8px rgba(0,0,0,.55)" }}>
        Already have an account? <Link to="/login" style={{ color: "#93c5fd" }}>Login</Link>
      </p>
    </AuthScene>
  );
}
