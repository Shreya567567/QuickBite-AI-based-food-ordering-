import { Link, useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', overflowX: 'hidden' }}>

      <main>
        {/* Hero Section */}
        <section style={{ position: 'relative', padding: '5rem 1.5rem 8rem', overflow: 'hidden' }}>
          {/* Background glows */}
          <div style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)', width: '16rem', height: '16rem', backgroundColor: 'rgba(171,53,0,0.05)', borderRadius: '9999px', filter: 'blur(100px)', zIndex: 0 }} />
          <div style={{ position: 'absolute', bottom: 0, right: '25%', width: '24rem', height: '24rem', backgroundColor: 'rgba(94,106,210,0.05)', borderRadius: '9999px', filter: 'blur(120px)', zIndex: 0 }} />

          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
            {/* Left: Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--secondary-container)', borderRadius: '9999px', color: 'var(--on-secondary-container)', alignSelf: 'flex-start' }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: '18px' }}>auto_awesome</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }}>The Future of Food Delivery</span>
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.15 }}>
                AI decides what <br />
                <span style={{ color: 'var(--primary)', position: 'relative', display: 'inline-block' }}>
                  you eat today
                  <svg style={{ position: 'absolute', bottom: '-0.5rem', left: 0, width: '100%', height: '0.5rem', color: 'rgba(171,53,0,0.3)' }} viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: '32rem' }}>
                Stop scrolling through endless menus. Our neural engine analyzes your mood, metabolism, and historical cravings to pick the perfect meal from top-rated local kitchens.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <button
                  onClick={() => navigate('/home')}
                  style={{
                    backgroundColor: 'var(--primary)', color: '#fff', padding: '1rem 2rem',
                    borderRadius: '0.75rem', fontWeight: '700', fontSize: '1rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer',
                    boxShadow: '0 4px 0 0 var(--primary-dark)', transition: 'all 0.15s',
                  }}
                  onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '0 2px 0 0 var(--primary-dark)'; }}
                  onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 0 0 var(--primary-dark)'; }}
                >
                  Start Ordering
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_forward</span>
                </button>
                <button
                  onClick={() => navigate('/ai-suggest')}
                  className="glass-card"
                  style={{
                    color: 'var(--primary)', padding: '1rem 2rem', borderRadius: '0.75rem',
                    fontWeight: '700', fontSize: '1rem', display: 'flex', alignItems: 'center',
                    gap: '0.5rem', cursor: 'pointer', position: 'relative', overflow: 'hidden',
                    transition: 'all 0.2s',
                  }}
                >
                  <span className="material-symbols-outlined filled" style={{ fontSize: '20px' }}>auto_awesome</span>
                  Try AI Suggest
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)', maxWidth: '24rem' }}>
                <div style={{ display: 'flex' }}>
                  {[
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuDiz-L3fptvsTeR4ebDyi9LTV67CfoKkqhmDOUhXwuTmDX5iKIGGk8Lp0z9bk3WAFjl8YM95lZaSAbnCsPNnYNwjf9DQ9aNWI1UJExOcpmIml0kujan05jzBjgUWhWogqqbPjwE6Gr1RBOZiNUSybDsEieY59Wih2k-M46tvn2xGgAIdK0IsC0gval06ub_Ylsi-qPOkkBz-ab9VmYTfrMeJL0RoSgHcYURqu-M2QCsutypkHrCS8ihV08eCr5nKSQn3ifrECej8w',
                    'https://lh3.googleusercontent.com/aida-public/AB6AXuCYji2XMI9pASgVB2u9zB9YhwxCfPi0Gt5hC5YJQtNU1lh-UGkEZjTOqqvY85-CWYKIdbqsMiiFV9Wd9zy0oZJeQc9VIIbenKuI71g387rals5gyHFg0woJpZiCrijJ-rhm1amrYC1zjhTh-FbKJu598NEaIHjMDbVNwGaLZjP3b4pK1JCYFf8G2duaFO8caS7jzQwAfFYD89agjKA77GHbLKrDGaBu3heVKd9D-e7gQd8Ga8VXFWy35LIO7ESFsmFUP_CTilEqdw',
                  ].map((src, i) => (
                    <img key={i} src={src} alt="User" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', border: '2px solid var(--background)', objectFit: 'cover', marginLeft: i > 0 ? '-0.75rem' : 0 }} />
                  ))}
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '9999px', border: '2px solid var(--background)', backgroundColor: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#fff', fontWeight: '700', marginLeft: '-0.75rem', fontFamily: '"JetBrains Mono", monospace' }}>12k+</div>
                </div>
                <p style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--on-surface-variant)' }}>Trusted by 12,000+ hungry techies worldwide.</p>
              </div>
            </div>

            {/* Right: Food Bento Collage */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: 'repeat(12, 1fr)', gap: '1rem', height: '600px' }}>
              {/* Main large image */}
              <div className="floating-bento" style={{ gridColumn: '1 / 9', gridRow: '1 / 9', backgroundColor: '#fff', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', position: 'relative', animationDelay: '0s' }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnHNjm7Q-Aoam671LYa2JdCQXSyClIAt0rXIqbR_JnvusijSdZefVAsIOMLz6BBG-UXTAIBio8NQ_55vm0jIz0lrdnwOjBxauPrhm8KUSlXyGnImxWTdjjMpIIe01a1FyQBhpz9CdbZin9s_m6zZdWMVtnwNQF2CF9_C7JkIP-UHjr8zyJlKEWWqPtMLwHUf1uuCDqz-6VR6SlXmckI3JU_ZoGhh01K30OFNkEe5Arr-pyaC3U2Puw-tBs93gdwcPUeKYInAmo3A" alt="Salmon Bowl" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="glass-card" style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', padding: '1rem', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--primary)' }}>AI Recommends</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>Zen Salmon Bowl</p>
                  </div>
                  <div style={{ width: '3rem', height: '3rem', borderRadius: '9999px', backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add_shopping_cart</span>
                  </div>
                </div>
              </div>

              {/* Secondary image */}
              <div className="floating-bento" style={{ gridColumn: '9 / 13', gridRow: '1 / 7', backgroundColor: '#fff', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.08)', animationDelay: '1s' }}>
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiYqo6CzZODYlBg_yMBuEU0STf8utE968rCzuYNLnW3NOfxeFg76KVvnjSlq0f9htgjfkzciVKPc8IQ_lCXZMP4NGTublmltgbwAlUItvYA4otY5ggTS2e3cUPwfSNZ4TZ1gqWZk8gtdHu9aVu4fIkIlBsAnJyf9CNaLjdHfbmOOzCnagFxG8bNQdphF0miy7VPIjEdbmNeWF-9l5sc1Y7kZANYdZeUjnARKYRvHtsNXIB2mzmZmlUuDpioPvIyKVlkdzXrb3kag" alt="Burger" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              {/* Status bento */}
              <div className="glass-card floating-bento" style={{ gridColumn: '9 / 13', gridRow: '7 / 10', borderRadius: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '0.5rem', animationDelay: '2s' }}>
                <div style={{ width: '3rem', height: '3rem', borderRadius: '9999px', backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)' }}>
                  <span className="material-symbols-outlined filled" style={{ fontSize: '24px' }}>check_circle</span>
                </div>
                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>98% Match</p>
                <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--on-surface-variant)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Biometric Sync</p>
              </div>

              {/* AI progress bento */}
              <div className="floating-bento" style={{ gridColumn: '1 / 13', gridRow: '10 / 13', backgroundColor: '#fff', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', animationDelay: '1.5s' }}>
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', padding: '1rem', gap: '1rem' }}>
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb1PtrGVHiNbtWWucbP5xvQX5DUAvDo2CqKGTFe3XwsclJ1YFca-1n1CSCtGqNtasxSOsygBG2eP3Qlu071HWsjCeYARdPID8s6sqUm_YOmfGjjL3Jhe5OjgLli8C167MBEgtsEChZT-N9CMAGGeaEqoJD7n9QFpm1N4BcIpAvjV1-UOBZwqGeObQSnH3-3891JSmP7GUeKVL9LPnyXKDKNFw04d1Neplh9OjU2Cj3Nhjc3l7MSgwP6fgQT8khkzb1E-qyZ-MyUA" alt="Pizza" style={{ width: '5rem', height: '5rem', borderRadius: '1rem', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Analyzing Craving...</span>
                      <span style={{ fontSize: '0.7rem', fontFamily: '"JetBrains Mono", monospace', color: 'var(--primary)', fontWeight: '500' }}>LIVE ENGINE</span>
                    </div>
                    <div style={{ width: '100%', backgroundColor: 'var(--surface-container)', borderRadius: '9999px', height: '0.5rem' }}>
                      <div style={{ height: '100%', borderRadius: '9999px', width: '75%', backgroundColor: 'var(--primary)', animation: 'pulse 2s infinite' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ backgroundColor: 'var(--surface-container-low)', padding: '6rem 1.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {[
              { icon: 'neurology', color: 'var(--primary)', bg: 'rgba(255,107,53,0.08)', title: 'Neural Taste-Mapping', desc: 'We sync with your health data and local weather to suggest meals that optimize your cognitive performance.' },
              { icon: 'bolt', color: 'var(--ai-glow)', bg: 'rgba(94,106,210,0.08)', title: 'Instant Prep-Sync', desc: 'Orders are timed perfectly so they arrive exactly when your next meeting ends. Zero wait time, maximum heat.' },
              { icon: 'eco', color: 'var(--tertiary)', bg: 'rgba(123,88,0,0.08)', title: 'Cradle-to-Table', desc: 'AI optimizes logistics to reduce carbon footprint by 40%, choosing the most sustainable route and packaging.' },
            ].map(({ icon, color, bg, title, desc }) => (
              <div
                key={title}
                className="glass-card"
                style={{ padding: '2rem', borderRadius: '1.5rem', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ width: '3rem', height: '3rem', borderRadius: '1rem', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: '1.5rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>{icon}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: 'var(--surface)', padding: '3rem 1.5rem', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '1.5rem', height: '1.5rem', backgroundColor: 'var(--primary)', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined filled" style={{ color: '#fff', fontSize: '14px' }}>restaurant</span>
            </div>
            <span style={{ fontWeight: '700', color: 'var(--primary)', letterSpacing: '-0.04em' }}>QuickBite</span>
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {[
              { name: 'Privacy', path: '#' },
              { name: 'Terms', path: '#' },
              { name: 'Partners', path: '/partner-login' },
              { name: 'Career', path: '#' }
            ].map(link => (
              <Link key={link.name} to={link.path} style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--on-surface-variant)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--on-surface-variant)'}
              >{link.name}</Link>
            ))}
          </div>
          <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: 'var(--on-surface-variant)' }}>
            © 2026 QUICKBITE NEURAL NETWORKS
          </div>
        </div>
      </footer>
    </div>
  );
}
