import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usePageTitle from "../usePageTitle.js";
import { api } from "../api.js";
import "./admin.css";

const NAV = [
  { id: "overview", label: "📊 Overview" },
  { id: "users", label: "👥 Manage Users" },
  { id: "adduser", label: "➕ Add User" },
  { id: "services", label: "🔧 Manage Services" },
  { id: "addservice", label: "➕ Add Service" },
  { id: "settings", label: "⚙️ Settings" },
];

const fmtDate = (d) => new Date(d).toLocaleDateString("en-IN");

export default function AdminDashboard() {
  usePageTitle("Admin Dashboard - Home Service");
  const navigate = useNavigate();

  const [section, setSection] = useState("overview");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState(null);
  const [services, setServices] = useState(null);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);
  const adminName = localStorage.getItem("adminName") || "Admin";

  const showToast = useCallback((text, type) => {
    setToast({ text, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  // A 401/403 means the session expired or the account isn't admin
  const guard = useCallback((res) => {
    if (res.status === 401 || res.status === 403) {
      navigate("/admin/login", { replace: true });
      return false;
    }
    return res.ok;
  }, [navigate]);

  const loadStats = useCallback(async () => {
    try { const res = await api.get("/dashboard-stats"); if (guard(res)) setStats(res.data); }
    catch (e) { console.error(e); }
  }, [guard]);

  const loadUsers = useCallback(async () => {
    try { const res = await api.get("/all-users"); if (guard(res)) setUsers(res.data.users || []); }
    catch (e) { console.error(e); }
  }, [guard]);

  const loadServices = useCallback(async () => {
    try { const res = await api.get("/services"); if (guard(res)) setServices(res.data.services || []); }
    catch (e) { console.error(e); }
  }, [guard]);

  useEffect(() => { loadStats(); loadUsers(); loadServices(); }, [loadStats, loadUsers, loadServices]);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const logout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    await api.get("/logout");
    localStorage.removeItem("adminName");
    navigate("/admin/login");
  };

  return (
    <div className="dash-root">
      {toast && <div className={`toast-msg ${toast.type}`}>{toast.text}</div>}

      <div className="dashboard-wrap">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-brand">
            🏠 <span>Home Service</span><br />
            <small style={{ fontSize: "0.75rem", color: "#64748b" }}>Admin Panel</small>
          </div>
          <ul className="sidebar-menu">
            {NAV.map((n) => (
              <li key={n.id} className={section === n.id ? "active" : ""}>
                <a href="#" onClick={(e) => { e.preventDefault(); setSection(n.id); }}>{n.label}</a>
              </li>
            ))}
          </ul>
          <div className="sidebar-footer">
            <button className="btn btn-sm btn-outline-danger w-100" onClick={logout}>🚪 Logout</button>
          </div>
        </aside>

        {/* Main */}
        <div className="main-content">
          <div className="page-header">
            <h1>Admin Dashboard</h1>
            <div className="d-flex align-items-center gap-3">
              <span className="admin-badge">👤 {adminName}</span>
              <Link to="/" className="btn btn-sm btn-outline-secondary">🏠 View Site</Link>
            </div>
          </div>

          {section === "overview" && <Overview stats={stats} />}
          {section === "users" && <UsersTable users={users} showToast={showToast} />}
          {section === "adduser" && (
            <AddUser showToast={showToast} onAdded={() => { loadUsers(); loadStats(); }} />
          )}
          {section === "services" && (
            <ServicesTable services={services} showToast={showToast} reload={loadServices} />
          )}
          {section === "addservice" && <AddService showToast={showToast} onAdded={loadServices} />}
          {section === "settings" && <Settings logout={logout} />}
        </div>
      </div>
    </div>
  );
}

/* ---------- Overview ---------- */
function Overview({ stats }) {
  const val = (v) => (stats ? v ?? 0 : "—");
  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card blue"><div className="label">Total Users</div><div className="value">{val(stats?.totalUsers)}</div></div>
        <div className="stat-card purple"><div className="label">Admin Accounts</div><div className="value">{val(stats?.totalAdmins)}</div></div>
        <div className="stat-card green"><div className="label">Regular Users</div><div className="value">{val(stats?.totalRegularUsers)}</div></div>
        <div className="stat-card amber">
          <div className="label">System Status</div>
          <div className="value" style={{ fontSize: "1.1rem", color: "#16a34a" }}>✅ Active</div>
        </div>
      </div>

      <div className="section-panel">
        <h2>Recent Registrations</h2>
        <div className="table-responsive">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th></tr></thead>
            <tbody>
              {!stats ? (
                <EmptyRow cols={4} text="Loading..." />
              ) : stats.recentUsers?.length ? (
                stats.recentUsers.map((u) => (
                  <tr key={u._id}>
                    <td>{u.fullname}</td>
                    <td>{u.email}</td>
                    <td><RoleBadge role={u.role} /></td>
                    <td>{fmtDate(u.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <EmptyRow cols={4} text="No users yet" />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- Users ---------- */
function UsersTable({ users, showToast }) {
  return (
    <div className="section-panel">
      <h2>All Users</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Actions</th></tr></thead>
          <tbody>
            {!users ? (
              <EmptyRow cols={5} text="Loading..." />
            ) : users.length ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.fullname}</td>
                  <td>{u.email}</td>
                  <td><RoleBadge role={u.role} /></td>
                  <td>{fmtDate(u.createdAt)}</td>
                  <td>
                    <button className="btn-edit" onClick={() => showToast("Edit user feature coming soon!", "success")}>Edit</button>
                    <button className="btn-delete" onClick={() => showToast("Delete user feature coming soon!", "success")}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <EmptyRow cols={5} text="No users found" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddUser({ showToast, onAdded }) {
  const empty = { fullname: "", email: "", password: "", role: "" };
  const [form, setForm] = useState(empty);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/register", form);
      if (data.user) { showToast("User added successfully!", "success"); setForm(empty); onAdded(); }
      else showToast(data.message || "Error adding user", "error");
    } catch { showToast("Server error", "error"); }
  };

  return (
    <div className="form-card">
      <h2>➕ Add New User</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name *</label>
          <input type="text" className="form-control" name="fullname" placeholder="Enter full name" required value={form.fullname} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email *</label>
          <input type="email" className="form-control" name="email" placeholder="user@example.com" required value={form.email} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Password *</label>
          <input type="password" className="form-control" name="password" placeholder="Create password" required value={form.password} onChange={onChange} />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Role *</label>
          <select className="form-select" name="role" required value={form.role} onChange={onChange}>
            <option value="">Select role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-dark w-100">Add User</button>
      </form>
    </div>
  );
}

/* ---------- Services ---------- */
function ServicesTable({ services, showToast, reload }) {
  const remove = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      const { data } = await api.del("/services/" + id);
      if (data.message) { showToast("Service deleted!", "success"); reload(); }
      else showToast("Error deleting service", "error");
    } catch { showToast("Server error", "error"); }
  };

  return (
    <div className="section-panel">
      <h2>All Services</h2>
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr><th>Title</th><th>Description</th><th>Price (₹)</th><th>Duration</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {!services ? (
              <EmptyRow cols={6} text="Loading..." />
            ) : services.length ? (
              services.map((s) => (
                <tr key={s._id}>
                  <td>{s.title}</td>
                  <td>{s.description || "—"}</td>
                  <td>₹{s.price}</td>
                  <td>{s.duration}</td>
                  <td><span className={`badge-role ${s.status === "active" ? "badge-active" : "badge-inactive"}`}>{s.status}</span></td>
                  <td>
                    <button className="btn-edit" onClick={() => showToast("Edit feature coming soon!", "success")}>Edit</button>
                    <button className="btn-delete" onClick={() => remove(s._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <EmptyRow cols={6} text="No services found" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AddService({ showToast, onAdded }) {
  const empty = { title: "", description: "", image: "", price: "", duration: "" };
  const [form, setForm] = useState(empty);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/services", { ...form, price: parseFloat(form.price) });
      if (data.service) { showToast("Service added successfully!", "success"); setForm(empty); onAdded(); }
      else showToast(data.message || "Error adding service", "error");
    } catch { showToast("Server error", "error"); }
  };

  return (
    <div className="form-card">
      <h2>➕ Add New Service</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Service Title *</label>
          <input type="text" className="form-control" name="title" placeholder="e.g., Plumbing Repair" required value={form.title} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <input type="text" className="form-control" name="description" placeholder="Brief description of the service" value={form.description} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Image URL</label>
          <input type="text" className="form-control" name="image" placeholder="/images/plumbing.jpg" value={form.image} onChange={onChange} />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Price (₹) *</label>
          <input type="number" className="form-control" name="price" min="0" placeholder="500" required value={form.price} onChange={onChange} />
        </div>
        <div className="mb-4">
          <label className="form-label fw-semibold">Duration *</label>
          <input type="text" className="form-control" name="duration" placeholder="e.g., 1 hour, 2–3 hours" required value={form.duration} onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-dark w-100">Add Service</button>
      </form>
    </div>
  );
}

/* ---------- Settings ---------- */
function Settings({ logout }) {
  return (
    <div className="form-card">
      <h2>⚙️ Admin Settings</h2>
      <h6 className="fw-bold mt-3">System Info</h6>
      <p><strong>Status:</strong> <span style={{ color: "#16a34a" }}>Active</span></p>
      <p><strong>Session:</strong> Valid</p>
      <hr />
      <h6 className="fw-bold">Quick Links</h6>
      <div className="d-flex gap-2 flex-wrap">
        <Link to="/" className="btn btn-outline-dark btn-sm">🏠 View Website</Link>
        <Link to="/service" className="btn btn-outline-primary btn-sm">🔧 Services Page</Link>
        <button className="btn btn-outline-danger btn-sm" onClick={logout}>🚪 Logout</button>
      </div>
    </div>
  );
}

/* ---------- Small helpers ---------- */
function RoleBadge({ role }) {
  return <span className={`badge-role ${role === "admin" ? "badge-admin" : "badge-user"}`}>{role}</span>;
}

function EmptyRow({ cols, text }) {
  return <tr><td colSpan={cols} className="table-empty">{text}</td></tr>;
}
