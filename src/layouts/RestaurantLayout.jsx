import { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import "./RestaurantLayout.css";

const SIDEBAR_LINKS = [
  { section: "Main" },
  { label: "Dashboard",  to: "/restaurant/dashboard", icon: "dashboard",    key: "dashboard" },
  { label: "My Restaurants", to: "/restaurant/panel",  icon: "storefront",   key: "panel" },

  { section: "Operations" },
  { label: "Add Restaurant", to: "/restaurant/add",    icon: "add_business", key: "add" },
  { label: "Menu Management", to: "/restaurant/menu",  icon: "menu_book",    key: "menu" },
  { label: "Orders",         to: "/restaurant/orders", icon: "receipt_long",  key: "orders" },

  { section: "Business" },
  { label: "Settings",       to: "/restaurant/settings", icon: "settings",   key: "settings" },
  { label: "Profile",        to: "/restaurant/profile",  icon: "person",     key: "profile" },
];

export default function RestaurantLayout() {
  const { pathname } = useLocation();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <div className="restaurant-layout">
      {/* Overlay (mobile) */}
      <div
        className={`restaurant-sidebar-overlay ${sidebarOpen ? "visible" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* ─── Sidebar ─── */}
      <aside className={`restaurant-sidebar ${sidebarOpen ? "open" : ""}`}>
        {/* Logo */}
        <div className="restaurant-sidebar-header">
          <div className="restaurant-sidebar-logo-icon">
            <span className="material-symbols-outlined filled">restaurant</span>
          </div>
          <div className="restaurant-sidebar-logo-text">
            <span className="restaurant-sidebar-logo-name">QuickBite</span>
            <span className="restaurant-sidebar-logo-tag">Partner Portal</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="restaurant-sidebar-nav">
          {SIDEBAR_LINKS.map((item, i) => {
            if (item.section) {
              return (
                <div key={`section-${i}`} className="restaurant-sidebar-section-label">
                  {item.section}
                </div>
              );
            }
            const isActive = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.key}
                to={item.to}
                className={`restaurant-sidebar-link ${isActive ? "active" : ""}`}
                onClick={() => setSidebarOpen(false)}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="restaurant-sidebar-footer">
          <button className="restaurant-sidebar-logout" onClick={handleLogout}>
            <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <div className="restaurant-main">
        {/* Top bar */}
        <header className="restaurant-topbar">
          <div className="restaurant-topbar-left">
            <button
              className="restaurant-topbar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "22px", color: "var(--on-surface-variant)" }}>
                {sidebarOpen ? "close" : "menu"}
              </span>
            </button>
            <span className="restaurant-topbar-title">
              {SIDEBAR_LINKS.find((l) => l.to && (pathname === l.to || pathname.startsWith(l.to + "/")))?.label || "Dashboard"}
            </span>
          </div>

          <div className="restaurant-topbar-right">
            <button className="restaurant-topbar-icon-btn">
              <span className="material-symbols-outlined" style={{ color: "var(--on-surface-variant)", fontSize: "22px" }}>notifications</span>
            </button>
            <div className="restaurant-topbar-avatar">
              <img
                src={profile?.profileImage || user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
                alt="Profile"
              />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="restaurant-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
