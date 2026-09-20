import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser, googleLogin, logoutUser } from "../services/authService";
import { createUserProfile, getUserProfile } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Signup() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const result = await registerUser(email, password);

      // Create Customer profile in Firestore
      await createUserProfile(result.user, name, "customer");

      alert("Customer account created successfully!");
      navigate("/home");
    } catch (err) {
      setError(err.message || "Failed to create account.");
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
        if (existingProfile.role !== "customer") {
          await logoutUser();
          setError("This account is registered as a Partner. Please use the Partner Portal to sign in.");
          setLoading(false);
          return;
        }
        // Existing customer — AuthContext will pick up user + profile and useEffect redirects
      } else {
        // New Google user — create customer profile, AuthContext snapshot will fire redirect
        await createUserProfile(result.user, result.user.displayName || "Google User", "customer");
      }
      // Do NOT manually navigate — the useEffect watching user+profile handles it
    } catch (err) {
      setError(err.message || "Google sign-in failed.");
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Side: Marketing/Visuals */}
      <section className="auth-left">
        <img
          alt="Premium Healthy Salad"
          className="auth-bg-img"
          src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=1200"
        />
        <div className="auth-overlay" />
        <div className="auth-left-content">
          <h1 className="auth-left-title">
            Start Your Culinary<br />Journey Today.
          </h1>
          <p className="auth-left-desc">
            Create an account to unlock personalized AI-driven menus and real-time smart logistics.
          </p>
          <div className="auth-features">
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <span className="material-symbols-outlined text-white">neurology</span>
              </div>
              <span className="auth-feature-text">Personalized Taste Profile</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <span className="material-symbols-outlined text-white">map</span>
              </div>
              <span className="auth-feature-text">Real-time Order Tracking</span>
            </div>
            <div className="auth-feature-item">
              <div className="auth-feature-icon">
                <span className="material-symbols-outlined text-white">loyalty</span>
              </div>
              <span className="auth-feature-text">Exclusive Reward Points</span>
            </div>
          </div>
        </div>
      </section>

      {/* Right Side: Registration Form */}
      <section className="auth-right">
        <div className="auth-card" style={{ padding: "2rem 2.5rem" }}>
          <button className="auth-close-btn" type="button" onClick={() => navigate("/")} aria-label="Go back">
            <span className="material-symbols-outlined">close</span>
          </button>
          <header className="auth-header">
            <div className="auth-logo-container">
              <span className="material-symbols-outlined auth-logo-icon">restaurant_menu</span>
            </div>
            <h2 className="auth-title">QuickBite</h2>
            <p className="auth-subtitle">Discover culinary excellence today</p>
          </header>

          {/* Tab Switcher */}
          <div className="auth-tabs" role="tablist">
            <Link to="/login" className="auth-tab inactive" role="tab" aria-selected="false">
              Login
            </Link>
            <button className="auth-tab active" role="tab" aria-selected="true" type="button">
              Sign Up
            </button>
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
          <form className="auth-form" onSubmit={handleSignup}>
            <div className="form-group">
              <label className="form-label" htmlFor="fullName">Full Name</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">person</span>
                <input
                  className="auth-input"
                  id="fullName"
                  placeholder="Enter your name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">mail</span>
                <input
                  className="auth-input"
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">lock</span>
                <input
                  className="auth-input"
                  id="password"
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

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <span className="material-symbols-outlined input-icon">lock</span>
                <input
                  className="auth-input"
                  id="confirmPassword"
                  placeholder="••••••••"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                />
                <button
                  className="input-toggle-btn"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  <span className="material-symbols-outlined">
                    {showConfirmPassword ? "visibility" : "visibility_off"}
                  </span>
                </button>
              </div>
            </div>

            <button className="auth-submit-btn" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
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
            <Link to="/partner-signup" style={{ color: "var(--primary)", fontWeight: "700", textDecoration: "none", fontSize: "0.85rem" }}>
              Are you a Restaurant Partner? Sign up here
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}