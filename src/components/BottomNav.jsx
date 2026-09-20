import { Link } from 'react-router-dom';

export default function BottomNav({ activePage }) {
  const items = [
    { label: 'Home', page: 'home', to: '/', icon: 'home' },
    { label: 'Search', page: 'search', to: '/', icon: 'search' },
    { label: 'AI Suggest', page: 'ai-suggest', to: '/ai-suggest', icon: 'auto_awesome' },
    { label: 'Orders', page: 'orders', to: '/orders', icon: 'shopping_bag' },
    { label: 'Profile', page: 'profile', to: '/profile', icon: 'person' },
  ];

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 50,
      backgroundColor: 'rgba(249,249,249,0.92)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderTop: '1px solid var(--border-subtle)',
      boxShadow: '0 -4px 12px rgba(0,0,0,0.05)',
      display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      padding: '0.75rem 1rem',
      borderRadius: '1rem 1rem 0 0',
    }}>
      {items.map(item => {
        const isActive = activePage === item.page;
        return (
          <Link
            key={item.page}
            to={item.to}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: isActive ? 'var(--primary)' : 'var(--on-surface-variant)',
              fontWeight: isActive ? '700' : '400',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.2s', textDecoration: 'none',
              padding: '0.25rem 0.5rem', borderRadius: '0.75rem',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: '24px',
                fontVariationSettings: isActive ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >{item.icon}</span>
            <span style={{ fontSize: '0.75rem', marginTop: '0.125rem', fontWeight: isActive ? '700' : '500' }}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
