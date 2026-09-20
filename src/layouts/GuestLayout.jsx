import { Outlet, Link, useLocation } from "react-router-dom";

import "./GuestLayout.css";

const NAV_LINKS = [
  { label: "Explore", to: "/home", key: "home" },
  { label: "AI Suggest", to: "/ai-suggest", key: "ai-suggest" },
];

export default function GuestLayout() {
  const { pathname } = useLocation();

  return (
    <div className="guest-layout">
      {/* ─── Top Navbar ─── */}
      <header className="guest-navbar">
        <nav className="guest-navbar-inner">
          {/* Logo */}
          <Link to="/" className="guest-logo-group" style={{ textDecoration: "none" }}>
            <div className="guest-logo-icon">
              <span className="material-symbols-outlined filled">restaurant</span>
            </div>
            <span className="guest-logo-text">QuickBite</span>
          </Link>

          {/* Center Links */}
          <div className="guest-nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                to={link.to}
                className={`guest-nav-link ${pathname.startsWith(link.to) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="guest-nav-actions">
            <Link to="/partner-login" className="guest-partner-btn">
              Partner Portal
            </Link>
            <Link to="/login" className="guest-login-btn">
              Login
            </Link>
          </div>
        </nav>
      </header>

      {/* ─── Page Content ─── */}
      <main className="guest-content">
        <Outlet />
      </main>

      {/* ─── Footer ─── */}
      <footer className="guest-footer">
        <p>© {new Date().getFullYear()} QuickBite. All rights reserved.</p>
      </footer>
    </div>
  );
}
