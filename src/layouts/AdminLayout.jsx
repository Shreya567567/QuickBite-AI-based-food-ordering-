import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import "./AdminLayout.css";

const SIDEBAR_LINKS = [
  { section: "Overview" },
  { label: "Dashboard",    to: "/admin/dashboard",    icon: "space_dashboard", key: "dashboard" },

  { section: "Management" },
  { label: "Users",         to: "/admin/users",        icon: "group",           key: "users" },
  { label: "Restaurants",   to: "/admin/restaurants",  icon: "store",           key: "restaurants" },
  { label: "Categories",    to: "/admin/categories",   icon: "category",        key: "categories" },

  { section: "System" },
  { label: "Settings",      to: "/admin/settings",     icon: "settings",        key: "settings" },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div className="admin-layout">
      {/* Overlay */}
      <div
        className={`admin-sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ─── Sidebar ─── */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-logo-icon">
            <span className="material-symbols-outlined filled">admin_panel_settings</span>
          </div>
          <div className="admin-sidebar-logo-text">
            <span className="admin-sidebar-logo-name">QuickBite</span>
            <span className="admin-sidebar-logo-tag">Admin Panel</span>
          </div>
        </div>

        <nav className="admin-sidebar-nav">
          {SIDEBAR_LINKS.map((item, i) => {
            if (item.section) {
              return (
                <div key={`section-${i}`} className="admin-sidebar-section-label">
                  {item.section}
                </div>
              );
            }
            const isActive = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`admin-sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="admin-sidebar-footer">
          <button className="admin-sidebar-logout" onClick={handleLogout}>
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              className="admin-topbar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "#64748b" }}>
                {sidebarOpen ? "close" : "menu"}
              </span>
            </button>
            <span className="admin-topbar-title">
              {SIDEBAR_LINKS.find((l) => l.to && (pathname === l.to || pathname.startsWith(l.to + "/")))?.label || "Admin"}
            </span>
          </div>
          <div className="admin-topbar-right">
            <div className="admin-topbar-badge">
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>shield</span>
              Admin
            </div>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
