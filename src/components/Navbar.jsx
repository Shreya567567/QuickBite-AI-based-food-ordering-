import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ activePage, showSearch = false }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { user, profile } = useAuth();

  const isPartner = profile?.role === "partner";
  const navLinks = isPartner
    ? [
        { label: "Dashboard", page: "dashboard", to: "/restaurant-dashboard" },
        { label: "Add Restaurant", page: "add-restaurant", to: "/add-restaurant" },
        { label: "Partner Panel", page: "restaurant-panel", to: "/restaurant-panel" },
      ]
    : [
        { label: "Explore", page: "home", to: "/home" },
        { label: "AI Suggest", page: "ai-suggest", to: "/ai-suggest" },
        { label: "Cart", page: "cart", to: "/cart" },
      ];

  return (
    <header style={{
      backgroundColor: 'rgba(249,249,249,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      position: 'sticky',
      top: 0,
      zIndex: 60,
      width: '100%',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: showSearch ? '1fr auto 1fr' : '1fr auto',
        alignItems: 'center',
        maxWidth: '1200px', margin: '0 auto',
        height: showSearch ? '3.75rem' : '4rem',
        padding: '0 1.25rem',
        gap: '1rem',
      }}>

        {/* Left: Logo + Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <Link to="/" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
            <div style={{
              width: "2.1rem", height: "2.1rem", borderRadius: "0.6rem",
              backgroundColor: "var(--primary)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 10px rgba(171, 53, 0, 0.22)",
              flexShrink: 0
            }}>
              <span className="material-symbols-outlined filled" style={{ fontSize: "18px", color: "#fff" }}>restaurant</span>
            </div>
            <span style={{
              fontWeight: "900",
              fontSize: "1.45rem",
              color: "var(--primary)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              whiteSpace: "nowrap"
            }}>QuickBite</span>
          </Link>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.2rem',
            backgroundColor: 'var(--surface-container-low)', padding: '0.3rem 0.6rem',
            borderRadius: '9999px', border: '1px solid var(--border-subtle)',
            cursor: 'pointer', transition: 'background-color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-container)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--surface-container-low)'}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '15px', color: 'var(--primary)' }}>location_on</span>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--on-surface-variant)' }}>Patna, Bihar</span>
            <span className="material-symbols-outlined" style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>expand_more</span>
          </div>
        </div>

        {/* Center: Search bar (only on Home) */}
        {showSearch && (
          <div style={{ position: 'relative', width: '100%', maxWidth: '480px' }}>
            <div style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)', fontSize: '18px' }}>search</span>
            </div>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search food or restaurants..."
              style={{
                width: '100%', height: '2.4rem', paddingLeft: '2.6rem', paddingRight: '2.6rem',
                backgroundColor: 'var(--surface-container-low)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '9999px', fontSize: '0.85rem', outline: 'none',
                fontFamily: 'Inter, sans-serif', color: 'var(--on-surface)',
                boxSizing: 'border-box', transition: 'box-shadow 0.2s, border-color 0.2s',
              }}
              onFocus={e => { e.target.style.boxShadow = '0 0 0 2px rgba(171,53,0,0.15)'; e.target.style.borderColor = 'rgba(171,53,0,0.3)'; }}
              onBlur={e => { e.target.style.boxShadow = 'none'; e.target.style.borderColor = 'var(--border-subtle)'; }}
            />
            <div style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
              <span className="material-symbols-outlined" style={{ color: 'var(--ai-glow)', fontSize: '17px', animation: 'pulse-glow 2s infinite' }}>auto_awesome</span>
            </div>
          </div>
        )}

        {/* Right: Nav links + actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: showSearch ? '1.25rem' : '2rem' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: showSearch ? '1.25rem' : '2rem' }}>
            {navLinks.map(link => (
              <Link
                key={link.page}
                to={link.to}
                style={{
                  color: activePage === link.page ? 'var(--primary)' : 'var(--on-surface-variant)',
                  fontWeight: activePage === link.page ? '700' : '500',
                  fontSize: showSearch ? '0.82rem' : '1rem',
                  borderBottom: activePage === link.page ? '2px solid var(--primary)' : '2px solid transparent',
                  paddingBottom: '0.2rem',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >{link.label}</Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', transition: 'background-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-container-high)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)', fontSize: '22px' }}>notifications</span>
            </button>
            {user ? (
              <Link to="/profile" style={{ width: '2.2rem', height: '2.2rem', borderRadius: '9999px', overflow: 'hidden', border: '2px solid var(--primary-fixed-dim)', cursor: 'pointer', display: 'block', flexShrink: 0 }}>
                <img
                  src={profile?.photoURL || user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
                  alt="User profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Link>
            ) : (
              <Link to="/login" style={{
                backgroundColor: 'var(--primary-container)', color: '#fff',
                padding: '0.4rem 1.25rem', borderRadius: '9999px', fontWeight: '700',
                fontSize: '0.8rem', textDecoration: 'none', boxShadow: '0 2px 8px rgba(171,53,0,0.3)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >Login</Link>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
