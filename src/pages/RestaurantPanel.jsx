import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const initialOrders = [
  {
    id: '#QB-8291',
    status: 'Preparing',
    statusBg: 'rgba(34, 197, 94, 0.1)',
    statusColor: 'var(--success)',
    items: '2x Spicy Chicken Zinger, 1x Coke Large',
    customer: 'Rahul K.',
    time: '2 mins ago',
    avatarText: 'RK'
  },
  {
    id: '#QB-8289',
    status: 'Pickup',
    statusBg: 'rgba(194, 146, 36, 0.1)',
    statusColor: 'var(--tertiary-container)',
    items: '1x Paneer Tikka Bowl, 2x Garlic Naan',
    customer: 'Anjali S.',
    time: '8 mins ago',
    avatarText: 'AS'
  },
  {
    id: '#QB-8285',
    status: 'Completed',
    statusBg: 'var(--secondary-container)',
    statusColor: 'var(--on-secondary-container)',
    items: '3x Veggie Supreme Pizza (Med)',
    customer: 'Sumit V.',
    time: '15 mins ago',
    avatarText: 'SV'
  }
];

export default function RestaurantPanel() {
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [chartView, setChartView] = useState('Month');
  const [orders, setOrders] = useState(initialOrders);
  const [highlightFirst, setHighlightFirst] = useState(false);
  const [aiApplied, setAiApplied] = useState(false);

  // Simulate Live Feed updates (highlight first item every 8s)
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightFirst(true);
      setTimeout(() => {
        setHighlightFirst(false);
      }, 1000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleApplySuggestion = () => {
    setAiApplied(true);
    setTimeout(() => {
      alert("Combo deal suggestion applied successfully!");
    }, 100);
  };

  const navItems = [
    { label: 'Dashboard', icon: 'dashboard' },
    { label: 'Menu', icon: 'restaurant_menu' },
    { label: 'Orders', icon: 'receipt_long', badge: true },
    { label: 'Analytics', icon: 'monitoring' },
    { label: 'Settings', icon: 'settings' }
  ];

  return (
    <div style={{ backgroundColor: 'var(--surface)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SideNavBar Shell */}
      <aside style={{
        position: 'fixed', left: 0, top: 0, height: '100vh', width: '16rem',
        backgroundColor: 'var(--surface-container-low)', borderRight: '1px solid var(--border-subtle)',
        flexDirection: 'column', zIndex: 50, transition: 'all 0.3s'
      }} className="sidebar-nav">
        
        <div style={{ padding: '2rem 1.5rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.04em' }}>QuickBite</span>
          
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3TsUcITJrFh11izERt-bDGHBqnBNFShNTDhK9y1zJyhbEzWE0lJ8fqUu-mc14XBv3tC8Qb8JikjTewasrsmEk9vsyaqb0cq0Nx0Wo4aEYFRBbZNbvE3BdXKht8SSI5-N7htlfNRR0FYANJiObVwYy_NUccRoVkZJqBDYDulJvCIlIotmXurgGtQV4FAkIH3BA0kO8lKu_TG6NQTwEe2cLf_nJjyhgEYPrUsyBBtFSMoqaJpMAKOxyp562WDfei0EuX1tbFLsNVw"
              alt="Restaurant Owner"
              style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-fixed-dim)' }}
            />
            <div>
              <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--on-surface)', margin: 0 }}>QuickBite Partner</p>
              <p style={{ fontSize: '10px', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Patna Branch</p>
            </div>
          </div>
        </div>

        <nav style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '1rem' }}>
          {navItems.map(item => {
            const isActive = activeMenu === item.label;
            return (
              <button
                key={item.label}
                onClick={() => setActiveMenu(item.label)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
                  backgroundColor: isActive ? 'var(--primary-container)' : 'transparent',
                  color: isActive ? '#fff' : 'var(--on-secondary-container)',
                  border: 'none', borderRadius: '0.75rem', margin: '0 0.5rem',
                  fontWeight: isActive ? '700' : '500', cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.2s', position: 'relative'
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '0.85rem' }}>{item.label}</span>
                {item.badge && !isActive && (
                  <span style={{ position: 'absolute', right: '1rem', width: '8px', height: '8px', backgroundColor: 'var(--primary)', borderRadius: '50%' }}></span>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ padding: '1rem', backgroundColor: 'rgba(255, 107, 53, 0.08)', margin: '1rem', borderRadius: '1rem' }}>
          <button style={{
            width: '100%', backgroundColor: 'var(--primary)', color: '#fff', border: 'none',
            padding: '0.625rem', borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.85rem',
            cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            Go Online
          </button>
        </div>

        <div style={{ borderTop: '1px solid var(--border-subtle)', padding: '0.5rem' }}>
          <Link to="/home" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
            color: 'var(--on-secondary-container)', textDecoration: 'none', borderRadius: '0.75rem',
            fontWeight: '600', fontSize: '0.85rem'
          }}>
            <span className="material-symbols-outlined">help</span>
            Customer App
          </Link>
          <Link to="/" style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem',
            color: 'var(--error)', textDecoration: 'none', borderRadius: '0.75rem',
            fontWeight: '600', fontSize: '0.85rem'
          }}>
            <span className="material-symbols-outlined">logout</span>
            Logout
          </Link>
        </div>

      </aside>

      {/* Main Content Canvas */}
      <main style={{ padding: '2rem 1.5rem', transition: 'margin-left 0.3s' }} className="panel-main-content">
        
        {/* Header Controls */}
        <header className="panel-header">
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--on-surface)', margin: '0 0 0.25rem 0', letterSpacing: '-0.03em' }}>Store Overview</h1>
            <p style={{ color: 'var(--on-surface-variant)', margin: 0, fontSize: '0.95rem' }}>
              Good morning! Your store is currently <span style={{ color: isStoreOpen ? 'var(--success)' : 'var(--error)', fontWeight: '700' }}>{isStoreOpen ? 'Open' : 'Closed'}</span>.
            </p>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#fff',
            padding: '0.5rem 1rem', borderRadius: '1rem', border: '1px solid var(--border-subtle)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
          }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--on-surface)' }}>Store Status</span>
            
            {/* Custom Checkbox Toggle Switch */}
            <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={isStoreOpen}
                onChange={() => setIsStoreOpen(!isStoreOpen)}
                style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
              />
              <div style={{
                width: '3.5rem', height: '2rem', borderRadius: '9999px',
                backgroundColor: isStoreOpen ? 'var(--success)' : 'var(--surface-container-highest)',
                position: 'relative', transition: 'background-color 0.2s'
              }}>
                <div style={{
                  width: '1.5rem', height: '1.5rem', borderRadius: '50%', backgroundColor: '#fff',
                  position: 'absolute', top: '0.25rem', left: isStoreOpen ? '1.75rem' : '0.25rem',
                  transition: 'left 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}></div>
              </div>
            </label>
          </div>
        </header>

        {/* KPI Bento Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          
          {/* Revenue KPI */}
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--primary-fixed)', borderRadius: '1rem', color: 'var(--primary)', display: 'flex' }}>
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span style={{ color: 'var(--success)', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>trending_up</span>
                12.5%
              </span>
            </div>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Revenue</p>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--on-surface)', margin: '0.25rem 0 0 0' }}>₹12,450.80</h2>
            <div style={{ marginTop: '1rem', height: '4px', backgroundColor: 'var(--surface-container)', borderRadius: '9999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', backgroundColor: 'var(--primary)', width: '75%' }}></div>
            </div>
          </div>

          {/* Pending Orders KPI */}
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--secondary-container)', borderRadius: '1rem', color: 'var(--on-secondary-container)', display: 'flex' }}>
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
              <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.8rem', fontWeight: '700' }}>Today</span>
            </div>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Pending Orders</p>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--on-surface)', margin: '0.25rem 0 0 0' }}>18</h2>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.35rem' }}>
              {['JB', 'RK', 'AS'].map((init, i) => (
                <div 
                  key={init} 
                  style={{
                    width: '1.75rem', height: '1.75rem', borderRadius: '50%',
                    backgroundColor: i === 0 ? 'var(--surface-container-highest)' : (i === 1 ? 'var(--primary-fixed)' : 'var(--secondary-fixed)'),
                    color: i === 1 ? 'var(--primary)' : 'var(--on-surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: '700', border: '2px solid #fff'
                  }}
                >{init}</div>
              ))}
              <div style={{
                width: '1.75rem', height: '1.75rem', borderRadius: '50%',
                backgroundColor: 'var(--surface-container-low)', color: 'var(--on-surface-variant)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: '700', border: '2px solid #fff'
              }}>+15</div>
            </div>
          </div>

          {/* Total Orders KPI */}
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: 'var(--tertiary-fixed)', borderRadius: '1rem', color: 'var(--on-tertiary-fixed-variant)', display: 'flex' }}>
                <span className="material-symbols-outlined">local_mall</span>
              </div>
              <span style={{ color: 'var(--error)', fontSize: '0.8rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>trending_down</span>
                3%
              </span>
            </div>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Total Orders</p>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--on-surface)', margin: '0.25rem 0 0 0' }}>1,240</h2>
            <p style={{ color: 'var(--on-surface-variant)', fontSize: '0.75rem', margin: '0.5rem 0 0 0' }}>Average 42 orders / day</p>
          </div>

        </div>

        {/* Charts & Recent Activity Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }} className="lg-grid-2col">
          
          {/* Sales Trend Chart */}
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '1.5rem', border: '1px solid var(--border-subtle)', boxShadow: '0 1px 4px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--on-surface)', margin: 0 }}>Sales Trend</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => setChartView('Week')}
                  style={{
                    padding: '0.35rem 1rem', borderRadius: '9999px', border: '1px solid var(--border-subtle)',
                    backgroundColor: chartView === 'Week' ? 'var(--primary)' : 'var(--surface-container-high)',
                    color: chartView === 'Week' ? '#fff' : 'var(--on-surface)',
                    fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer'
                  }}
                >Week</button>
                <button 
                  onClick={() => setChartView('Month')}
                  style={{
                    padding: '0.35rem 1rem', borderRadius: '9999px', border: '1px solid var(--border-subtle)',
                    backgroundColor: chartView === 'Month' ? 'var(--primary)' : 'var(--surface-container-high)',
                    color: chartView === 'Month' ? '#fff' : 'var(--on-surface)',
                    fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer'
                  }}
                >Month</button>
              </div>
            </div>

            {/* Mock Chart Visualization */}
            <div style={{
              position: 'relative', height: '16rem', display: 'flex', alignItems: 'end',
              justifyContent: 'space-between', padding: '0 0.5rem',
              background: 'linear-gradient(180deg, rgba(255, 107, 53, 0.05) 0%, rgba(255, 107, 53, 0) 100%)',
              borderRadius: '1rem'
            }}>
              <div style={{ width: '8%', backgroundColor: 'rgba(171, 53, 0, 0.2)', borderRadius: '0.5rem 0.5rem 0 0', height: chartView === 'Month' ? '40%' : '55%' }}></div>
              <div style={{ width: '8%', backgroundColor: 'rgba(171, 53, 0, 0.2)', borderRadius: '0.5rem 0.5rem 0 0', height: chartView === 'Month' ? '60%' : '30%' }}></div>
              <div style={{ width: '8%', backgroundColor: 'rgba(171, 53, 0, 0.2)', borderRadius: '0.5rem 0.5rem 0 0', height: chartView === 'Month' ? '45%' : '75%' }}></div>
              <div style={{ width: '8%', backgroundColor: 'rgba(171, 53, 0, 0.2)', borderRadius: '0.5rem 0.5rem 0 0', height: chartView === 'Month' ? '75%' : '85%' }}></div>
              <div style={{
                width: '8%', backgroundColor: 'var(--primary)', borderRadius: '0.5rem 0.5rem 0 0',
                height: chartView === 'Month' ? '90%' : '95%',
                boxShadow: '0 -4px 12px rgba(171, 53, 0, 0.2)'
              }}></div>
              <div style={{ width: '8%', backgroundColor: 'rgba(171, 53, 0, 0.2)', borderRadius: '0.5rem 0.5rem 0 0', height: chartView === 'Month' ? '65%' : '45%' }}></div>
              <div style={{ width: '8%', backgroundColor: 'rgba(171, 53, 0, 0.2)', borderRadius: '0.5rem 0.5rem 0 0', height: chartView === 'Month' ? '55%' : '60%' }}></div>
              <div style={{ width: '8%', backgroundColor: 'rgba(171, 53, 0, 0.2)', borderRadius: '0.5rem 0.5rem 0 0', height: chartView === 'Month' ? '80%' : '70%' }}></div>
            </div>

            <div style={{
              display: 'flex', justifyContent: 'space-between', marginTop: '1rem',
              color: 'var(--on-surface-variant)', fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em'
            }}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span>
            </div>
          </div>

          {/* Recent Orders Feed */}
          <div style={{
            backgroundColor: '#fff', borderRadius: '1.5rem', border: '1px solid var(--border-subtle)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
          }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, color: 'var(--on-surface)' }}>Recent Orders</h3>
              <span className="live-pulse" style={{ backgroundColor: 'var(--primary-fixed)', color: 'var(--primary)', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '10px', fontWeight: '700' }}>LIVE</span>
            </div>

            <div style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '25rem', padding: '0.5rem' }}>
              {orders.map((ord, idx) => {
                const isHighlight = idx === 0 && highlightFirst;
                return (
                  <div 
                    key={ord.id}
                    style={{
                      padding: '1rem', borderRadius: '1rem', cursor: 'pointer', border: '1px solid transparent',
                      marginBottom: '0.25rem', transition: 'all 0.5s',
                      backgroundColor: isHighlight ? 'rgba(255, 107, 53, 0.15)' : 'transparent',
                      borderColor: isHighlight ? 'var(--primary)' : 'transparent'
                    }}
                    className="hover-card-bg"
                    onMouseEnter={e => { if(!isHighlight) e.currentTarget.style.backgroundColor = 'var(--surface-container-low)'; }}
                    onMouseLeave={e => { if(!isHighlight) e.currentTarget.style.backgroundColor = 'transparent'; }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700' }}>{ord.id}</span>
                      <span style={{ fontSize: '10px', padding: '0.15rem 0.5rem', borderRadius: '9999px', backgroundColor: ord.statusBg, color: ord.statusColor, fontWeight: '700', textTransform: 'uppercase' }}>{ord.status}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--on-surface)', fontWeight: '500', margin: '0 0 0.5rem 0' }}>{ord.items}</p>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                          width: '1.5rem', height: '1.5rem', borderRadius: '50%',
                          backgroundColor: 'var(--surface-container-highest)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700'
                        }}>{ord.avatarText}</div>
                        <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{ord.customer}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--on-surface-variant)' }}>{ord.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button style={{
              width: '100%', padding: '1rem', border: 'none', borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'transparent', color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem',
              cursor: 'pointer', transition: 'background-color 0.2s'
            }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255, 107, 53, 0.05)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              View All Orders
            </button>
          </div>

        </div>

        {/* Floating AI Insights Card */}
        <div style={{
          marginTop: '2.5rem', padding: '1.5rem', borderRadius: '1.5rem',
          background: 'rgba(255, 255, 255, 0.8)', border: '2px solid rgba(171, 53, 0, 0.1)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          gap: '1.5rem', alignItems: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.04)'
        }} className="glass ai-insights-card">
          
          <div style={{
            width: '4rem', height: '4rem', backgroundColor: 'var(--primary-container)',
            borderRadius: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', flexShrink: 0
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>auto_awesome</span>
          </div>

          <div style={{ flexGrow: 1, textAlign: 'left' }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 0.25rem 0' }}>AI Suggest Insights</h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--on-surface)', margin: 0, lineHeight: 1.4 }}>
              Based on local trends, your <span style={{ fontWeight: '700' }}>"Spicy Chicken"</span> items are peaking. Consider adding a 'Combo Deal' for lunch hours to increase average order value by ~15%.
            </p>
          </div>

          <button 
            onClick={handleApplySuggestion}
            disabled={aiApplied}
            style={{
              backgroundColor: aiApplied ? 'var(--success)' : 'var(--primary-container)', 
              color: '#fff', border: 'none',
              padding: '0.75rem 1.5rem', borderRadius: '1rem', fontWeight: '700',
              fontSize: '0.9rem', cursor: aiApplied ? 'default' : 'pointer', flexShrink: 0,
              transition: 'all 0.2s'
            }}
          >
            {aiApplied ? 'Applied ✓' : 'Apply Suggestion'}
          </button>
        </div>

      </main>

      {/* BottomNavBar for Mobile */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 50,
        display: 'flex', justifyContent: 'space-around', alignItems: 'center',
        padding: '0.75rem 1rem', borderTop: '1px solid var(--border-subtle)',
        backgroundColor: 'rgba(249, 249, 249, 0.95)', backdropFilter: 'blur(10px)',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
      }} className="mobile-only">
        
        <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'var(--primary)', transform: 'scale(1.1)', fontWeight: '700' }}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span style={{ fontSize: '10px', marginTop: '0.125rem' }}>Home</span>
        </Link>
        <Link to="/home" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined">search</span>
          <span style={{ fontSize: '10px', marginTop: '0.125rem' }}>Explore</span>
        </Link>
        <Link to="/restaurant-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: 'var(--on-surface-variant)' }}>
          <span className="material-symbols-outlined">receipt_long</span>
          <span style={{ fontSize: '10px', marginTop: '0.125rem' }}>Orders</span>
        </Link>
      </nav>

    </div>
  );
}
