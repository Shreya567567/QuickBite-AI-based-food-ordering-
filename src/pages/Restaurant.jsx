import { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { topRestaurants } from '../data/restaurantData';
import { getFoodItemsForRestaurant } from '../data/foodData';
import { getCurrentLocation } from '../services/locationService';
import { fetchNearbyRestaurants } from '../services/nearbyRestaurantService';
import cachedNearby from '../data/nearbyRestaurantsCache.json';

export default function Restaurant() {
  const { id } = useParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { cartItems, updateQty, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const locationState = useLocation();
  const searchParams = new URLSearchParams(locationState.search);
  const targetItemId = searchParams.get('item');

  useEffect(() => {
    async function loadRestaurantDetails() {
      try {
        setLoading(true);
        setError(null);

        // 1. Check if it's one of the top static restaurants
        const staticMatch = topRestaurants.find(r => r.id.toString() === id);
        if (staticMatch) {
          setRestaurant(staticMatch);
          const items = getFoodItemsForRestaurant(staticMatch.name).map(item => ({
            ...item,
            isAiSuggested: item.rating >= 4.8
          }));
          setMenuItems(items);
          setLoading(false);
          return;
        }

        // 2. Otherwise, fetch nearby restaurants to find the match by place_id
        let nearby = [];
        try {
          const location = await getCurrentLocation();
          nearby = await fetchNearbyRestaurants(location.latitude, location.longitude);
        } catch (locationErr) {
          console.warn("Could not get current location or fresh restaurants, checking project cache:", locationErr);
        }

        let matchedRestro = nearby.find(r => r.properties.place_id === id);

        // If not found in the fresh nearby list, check the cached nearby restaurants from the project as a fallback
        if (!matchedRestro) {
          matchedRestro = cachedNearby.find(r => r.properties.place_id === id);
        }

        if (matchedRestro) {
          const name = matchedRestro.properties.name || "Unnamed Restaurant";
          const resData = {
            id: id,
            name: name,
            cuisine: matchedRestro.properties.address_line2 || matchedRestro.properties.formatted || "Indian Cuisine",
            rating: (4.0 + Math.random() * 0.9).toFixed(1), // Random-ish premium rating
            time: "30-40 min",
            status: "Open",
            img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
          };
          setRestaurant(resData);
          const items = getFoodItemsForRestaurant(name).map(item => ({
            ...item,
            isAiSuggested: item.rating >= 4.8
          }));
          setMenuItems(items);
        } else {
          // If not found in nearby list, construct fallback properties based on id or default
          const fallbackName = id.startsWith("fall_1") ? "Burger Central" : (id.startsWith("fall_2") ? "Dosa Plaza" : "Nearby Restaurant");
          const resData = {
            id: id,
            name: fallbackName,
            cuisine: "Fast Food • Indian • Local Specialties",
            rating: "4.5",
            time: "20-25 min",
            status: "Open",
            img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600",
          };
          setRestaurant(resData);
          const items = getFoodItemsForRestaurant(fallbackName).map(item => ({
            ...item,
            isAiSuggested: item.rating >= 4.8
          }));
          setMenuItems(items);
        }
      } catch (err) {
        console.error("Error fetching restaurant details:", err);
        setError("Could not load restaurant details.");
      } finally {
        setLoading(false);
      }
    }

    loadRestaurantDetails();
  }, [id]);

  useEffect(() => {
    setActiveCategory('All');
  }, [menuItems]);

  useEffect(() => {
    if (targetItemId && menuItems.length > 0) {
      const targetItem = menuItems.find(item => item.id.toString() === targetItemId.toString());
      if (targetItem) {
        setActiveCategory('All');
        
        setTimeout(() => {
          const element = document.getElementById(`menu-item-${targetItemId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.classList.add('item-glow');
            setTimeout(() => {
              element.classList.remove('item-glow');
            }, 3000);
          }
        }, 400);
      }
    }
  }, [targetItemId, menuItems]);

  const handleUpdateQty = (item, delta) => {
    if (!restaurant) return;
    updateQty({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      isVeg: item.isVeg,
      restaurant: restaurant.name,
      desc: item.desc,
    }, delta);
  };

  // Get unique categories from the loaded menu items
  const categories = menuItems.length > 0 
    ? ['All', ...new Set(menuItems.map(item => item.category))] 
    : ['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'];

  // Filter items based on active category
  const filteredItems = menuItems.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  // Get qty from global cart
  const getQty = (itemId) => cartItems[itemId]?.qty || 0;

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: 'var(--background)', gap: '1rem' }}>
        <div style={{ width: '3rem', height: '3rem', border: '4px solid var(--border-subtle)', borderTop: '4px solid var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} className="spin-slow"></div>
        <p style={{ fontWeight: '600', color: 'var(--on-surface-variant)', fontSize: '1rem' }}>Finding restaurant details and preparing menu...</p>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: 'var(--background)', padding: '2rem', textAlign: 'center' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--error)', marginBottom: '1rem' }}>error</span>
        <h2 style={{ color: 'var(--on-surface)', marginBottom: '0.5rem' }}>Oops! Failed to load</h2>
        <p style={{ color: 'var(--on-surface-variant)', marginBottom: '1.5rem' }}>{error || "Restaurant details could not be found."}</p>
        <button onClick={() => navigate('/home')} style={{ backgroundColor: 'var(--primary)', color: '#fff', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '9999px', fontWeight: '700', cursor: 'pointer' }}>Go Back Home</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      <main style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '8rem' }}>
        
        {/* Hero Section */}
        <section style={{ position: 'relative', height: '400px', width: '100%', overflow: 'hidden', borderBottomLeftRadius: '1.5rem', borderBottomRightRadius: '1.5rem' }}>
          <img 
            src={restaurant.img} 
            alt={restaurant.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 100%)' }}></div>
          
          {/* Glassmorphism Info Overlay */}
          <div style={{
            position: 'absolute', bottom: '2rem', left: '1rem', right: '1rem',
            padding: '1.5rem', borderRadius: '1rem', maxWidth: '42rem',
            background: 'rgba(255, 255, 255, 0.75)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
          }} className="glass-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: 'var(--success)', color: '#fff', fontSize: '10px', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Open Now</span>
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)' }}>
                  <span className="material-symbols-outlined filled" style={{ fontSize: '14px' }}>star</span>
                  <span style={{ fontWeight: '700', fontSize: '0.8rem', marginLeft: '0.25rem', color: 'var(--on-surface)' }}>{restaurant.rating} (500+ Reviews)</span>
                </div>
              </div>
              
              <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{restaurant.name}</h1>
              <p style={{ color: 'var(--on-surface-variant)', fontWeight: '600', fontSize: '0.9rem', margin: 0 }}>
                {restaurant.cuisine}
              </p>
              {restaurant.address && (
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.35rem 0 0', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--primary)' }}>location_on</span>
                  {restaurant.address}
                </p>
              )}
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>schedule</span>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>{restaurant.time}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '1rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>distance</span>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>2.4 km</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderLeft: '1px solid rgba(0,0,0,0.1)', paddingLeft: '1rem' }}>
                  <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>verified</span>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>QuickBite Verified</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Navigation (Sticky) */}
        <nav style={{
          position: 'sticky', top: '4rem', zIndex: 30, padding: '1rem',
          backgroundColor: 'rgba(249, 249, 249, 0.95)', backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <div className="hide-scrollbar" style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {categories.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    whiteSpace: 'nowrap', padding: '0.5rem 1.25rem', borderRadius: '9999px',
                    border: isActive ? 'none' : '1px solid var(--border-subtle)',
                    backgroundColor: isActive ? 'var(--primary)' : '#fff',
                    color: isActive ? '#fff' : 'var(--on-surface-variant)',
                    fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
                    boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.35rem'
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Menu Section */}
        <div style={{ padding: '0 1rem', marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--on-surface)', margin: 0 }}>{activeCategory}</h2>
            <span style={{ color: 'var(--on-surface-variant)', fontWeight: '600' }}>{filteredItems.length} Items</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredItems.map(item => {
              const qty = getQty(item.id);
              return (
                <div key={item.id} id={`menu-item-${item.id}`} style={{
                  backgroundColor: '#fff', borderRadius: '1.25rem', padding: '1rem',
                  border: item.isAiSuggested ? '2px solid rgba(94, 106, 210, 0.25)' : '1px solid var(--border-subtle)',
                  boxShadow: item.isAiSuggested ? '0 8px 24px rgba(94, 106, 210, 0.06)' : '0 1px 4px rgba(0,0,0,0.04)',
                  display: 'flex', gap: '1rem', position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s'
                }} className="menu-card">
                  
                  {item.isAiSuggested && (
                    <div style={{
                      position: 'absolute', right: '-1rem', top: '-1rem', width: '2.5rem', height: '2.5rem',
                      backgroundColor: 'rgba(94, 106, 210, 0.1)', transform: 'rotate(45deg)',
                      display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '0.25rem'
                    }}>
                      <span className="material-symbols-outlined filled" style={{ fontSize: '10px', color: 'var(--ai-glow)' }}>auto_awesome</span>
                    </div>
                  )}

                  <div style={{ position: 'relative', width: '7.5rem', height: '7.5rem', flexShrink: 0, borderRadius: '0.75rem', overflow: 'hidden', backgroundColor: 'var(--surface-container)' }}>
                    <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '0.375rem', left: '0.375rem', backgroundColor: 'rgba(255,255,255,0.92)', padding: '0.25rem', borderRadius: '0.375rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                      <div style={{
                        width: '0.75rem', height: '0.75rem', border: `2px solid ${item.isVeg ? 'var(--success)' : 'var(--error)'}`,
                        borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1px'
                      }}>
                        <div style={{ width: '100%', height: '100%', backgroundColor: item.isVeg ? 'var(--success)' : 'var(--error)', borderRadius: '50%' }} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 }}>
                    <div>
                      {item.isAiSuggested && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.25rem' }}>
                          <span style={{ fontSize: '9px', fontWeight: '700', color: 'var(--ai-glow)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Suggested</span>
                        </div>
                      )}
                      <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--on-surface)', margin: '0 0 0.25rem 0', lineHeight: '1.2' }}>{item.name}</h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.desc}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary)' }}>₹{item.price}</span>
                      
                      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface-container-low)', padding: '0.25rem', borderRadius: '9999px' }}>
                        {qty > 0 ? (
                          <>
                            <button 
                              onClick={() => handleUpdateQty(item, -1)}
                              style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: 'var(--on-surface-variant)' }}
                            >-</button>
                            <span style={{ padding: '0 0.5rem', fontWeight: '700', fontSize: '0.85rem' }}>{qty}</span>
                            <button 
                              onClick={() => handleUpdateQty(item, 1)}
                              style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', border: 'none', backgroundColor: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#fff' }}
                            >+</button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleUpdateQty(item, 1)}
                            style={{
                              border: 'none', backgroundColor: 'var(--primary)', color: '#fff', 
                              padding: '0.35rem 1rem', borderRadius: '9999px', fontWeight: '700', 
                              fontSize: '0.8rem', cursor: 'pointer', transition: 'background-color 0.2s'
                            }}
                          >Add</button>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Sticky Cart Summary Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%', zIndex: 100,
        backgroundColor: 'var(--primary-container)', padding: '1rem',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.15)',
        transform: totalItems > 0 ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: '900', fontSize: '1rem', lineHeight: 1.1 }}>{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', opacity: 0.9 }}>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div style={{ width: '1px', height: '2rem', backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', uppercase: 'true', letterSpacing: '0.1em', display: 'none' }} className="desktop-only">Ready for Checkout</span>
          </div>

          <button 
            onClick={() => navigate('/cart')}
            style={{
              backgroundColor: '#fff', color: 'var(--primary)', padding: '0.75rem 1.75rem',
              borderRadius: '0.75rem', fontWeight: '700', fontSize: '0.9rem', border: 'none',
              display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'transform 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            View Cart
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        </div>
      </div>

    </div>
  );
}
