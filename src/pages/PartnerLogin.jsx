import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, googleLogin, logoutUser } from "../services/authService";
import { getUserProfile, createUserProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function PartnerLogin() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && profile) {
      if (profile.role === "partner") {
        navigate("/restaurant/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [user, profile, navigate]);

  if (user && profile) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "var(--background)", color: "var(--on-background)" }}>
        <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>Redirecting...</p>
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const result = await loginUser(email, password);

      // Verify the user is a partner
      const profile = await getUserProfile(result.user.uid);
      if (profile && profile.role !== "partner") {
        await logoutUser();
        setError("This account is registered as a Customer. Please use the Customer Login page.");
        return;
      }

      navigate("/restaurant/dashboard");
    } catch (err) {
      switch (err.code) {
        case "auth/user-not-found":
          setError("No account found with this email.");
          break;
        case "auth/wrong-password":
          setError("Incorrect password.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address.");
          break;
        case "auth/invalid-credential":
          setError("Invalid email or password.");
          break;
        case "auth/too-many-requests":
          setError("Too many failed attempts. Please try again later.");
          break;
        default:
          setError("Unable to login. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      const result = await googleLogin();

      // Check if this Google account already has a profile with a different role
      const existingProfile = await getUserProfile(result.user.uid);
      if (existingProfile) {
        if (existingProfile.role !== "partner") {
          await logoutUser();
          setError("This account is registered as a Customer. Please use the Customer Login page.");
          setLoading(false);
          return;
        }
        // Existing partner — AuthContext will pick up user + profile and useEffect redirects
      } else {
        // New Google user signing up as partner — create partner profile
        await createUserProfile(result.user, result.user.displayName || "Partner Owner", "partner");
      }
      // Do NOT manually navigate — the useEffect watching user+profile handles it
    } catch (err) {
      setError(err.message || "Google Login failed.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side: Partner Marketing/Visuals */}
      <section className="auth-left">
        <img
          alt="Partner Storefront"
          className="auth-bg-img"
          src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=1200"
        />
        <div className="auth-overlay" />
        <div className="auth-left-content">
          <h1 className="auth-left-title">
            Grow Your Business<br />With QuickBite.
          </h1>
          <p className="auth-left-desc">
            Partner with us to reach thousands of local foodies and scale your culinary footprint.
          </p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <span className="material-symbols-outlined text-white">dashboard</span>
              </div>
              <span className="auth-feature-text">Dynamic Menu Management</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <span className="material-symbols-outlined text-white">monitoring</span>
              </div>
              <span className="auth-feature-text">Order Analytics &amp; Reports</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <span className="material-symbols-outlined text-white">support_agent</span>
              </div>
              <span className="auth-feature-text">Dedicated Merchant Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Login Form */}
      <section className="auth-right">
        <div className="auth-card">
          <button className="auth-close-btn" type="button" onClick={() => navigate("/")} aria-label="Go back">
            <span className="material-symbols-outlined">close</span>
          </button>
          <header className="auth-header">
            <div className="auth-logo-container" style={{ backgroundColor: "rgba(171, 53, 0, 0.1)", color: "var(--primary)" }}>
              <span className="material-symbols-outlined auth-logo-icon">storefront</span>
            </div>
            <h2 className="auth-title">Partner Portal</h2>
            <p className="auth-subtitle">Welcome back, culinary partner!</p>
          </header>

          {/* Tab Switcher */}
          <div className="auth-tabs" role="tablist">
            <button className="auth-tab active" role="tab" aria-selected="true" type="button">
              Partner Login
            </button>
            <Link to="/partner-signup" className="auth-tab inactive" role="tab" aria-selected="false">
              Partner Sign Up
            </Link>
          </div>

          {error && (
            <div style={{
              backgroundColor: "var(--error-container)",
              color: "var(--on-error-container)",
              padding: "1rem",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "500",
              marginBottom: "1.5rem",
              textAlign: "left"
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">mail</span>
                <input
                  className="auth-input"
                  id="email"
                  name="email"
                  placeholder="partner@restaurant.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label className="form-label" htmlFor="password">Password</label>
                <button
                  type="button"
                  className="form-forgot-link"
                  onClick={() => alert("Password reset is not implemented yet. Please contact support.")}
                >
                  Forgot?
                </button>
              </div>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">lock</span>
                <input
                  className="auth-input"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  className="input-toggle-btn"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <button className="auth-submit-btn" type="submit" disabled={loading} style={{ backgroundColor: "var(--primary-container)" }}>
              {loading ? "Logging in..." : "Continue to Dashboard"}
            </button>
          </form>

          {/* Divider */}
          <div className="auth-divider">
            <div className="divider-line" />
            <span className="divider-text">Or continue with</span>
            <div className="divider-line" />
          </div>

          {/* Social Logins */}
          <div className="social-grid">
            <button className="social-btn" type="button" onClick={handleGoogleLogin} disabled={loading}>
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span>Google</span>
            </button>
          </div>

          <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem" }}>
            <Link to="/login" style={{ color: "var(--primary)", fontWeight: "700", textDecoration: "none", fontSize: "0.85rem" }}>
              Are you a Customer? Sign in here
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
