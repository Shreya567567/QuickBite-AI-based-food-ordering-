import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function EmptyCart({ onBrowse }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', minHeight: '60vh', textAlign: 'center', padding: '2rem',
    }}>
      <div style={{
        width: '7rem', height: '7rem', borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--primary-fixed), var(--secondary-container))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.5rem', boxShadow: '0 8px 32px rgba(171,53,0,0.12)',
      }}>
        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--primary)' }}>
          shopping_cart
        </span>
      </div>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--on-surface)', marginBottom: '0.5rem' }}>
        Your cart is empty
      </h2>
      <p style={{ color: 'var(--on-surface-variant)', fontSize: '1rem', maxWidth: '22rem', lineHeight: 1.6, marginBottom: '2rem' }}>
        Looks like you haven't added anything yet. Explore our menu and discover something delicious!
      </p>
      <button
        onClick={onBrowse}
        style={{
          backgroundColor: 'var(--primary)', color: '#fff', padding: '0.875rem 2.5rem',
          borderRadius: '1rem', fontWeight: '700', fontSize: '1rem', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
          boxShadow: '0 4px 0 var(--primary-dark, #832600)', transition: 'all 0.15s',
        }}
        onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '0 2px 0 var(--primary-dark, #832600)'; }}
        onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 0 var(--primary-dark, #832600)'; }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>explore</span>
        Browse Restaurants
      </button>
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, updateQty, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const deliveryFee = totalPrice > 0 ? (totalPrice >= 499 ? 0 : 49) : 0;
  const platformFee = totalPrice > 0 ? 5 : 0;
  const grandTotal = totalPrice + deliveryFee + platformFee;

  const handlePlaceOrder = () => {
    setPlacingOrder(true);
    setTimeout(() => {
      setPlacingOrder(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: '2rem',
        }}>
          <div style={{
            width: '8rem', height: '8rem', borderRadius: '50%',
            backgroundColor: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', marginBottom: '1.5rem',
            boxShadow: '0 0 0 16px rgba(34,197,94,0.06)',
          }}>
            <span className="material-symbols-outlined filled" style={{ fontSize: '4rem', color: 'var(--success)' }}>
              check_circle
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--on-surface)', marginBottom: '0.5rem' }}>
            Order Placed! 🎉
          </h1>
          <p style={{ color: 'var(--on-surface-variant)', fontSize: '1rem', maxWidth: '24rem', lineHeight: 1.6, marginBottom: '0.5rem' }}>
            Your food is being prepared. Estimated delivery time: <strong>25-35 mins</strong>.
          </p>
          <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '12px', color: 'var(--primary)', fontWeight: '700', marginBottom: '2rem' }}>
            ORDER ID: #QB-{Math.floor(Math.random() * 9000) + 1000}
          </p>
          <button
            onClick={() => navigate('/home')}
            style={{
              backgroundColor: 'var(--primary)', color: '#fff', padding: '0.875rem 2.5rem',
              borderRadius: '1rem', fontWeight: '700', fontSize: '1rem', border: 'none',
              cursor: 'pointer', boxShadow: '0 4px 12px rgba(171,53,0,0.25)',
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      <main style={{ maxWidth: '1080px', margin: '0 auto', padding: '1.25rem 1rem 4rem' }}>

        {/* Page header */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.35rem',
              color: 'var(--on-surface-variant)', fontWeight: '600', fontSize: '0.85rem',
              marginBottom: '0.75rem', padding: 0,
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
            Back
          </button>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--on-surface)', margin: 0, letterSpacing: '-0.02em' }}>
                Your Cart
              </h1>
              {totalItems > 0 && (
                <p style={{ color: 'var(--on-surface-variant)', margin: '0.15rem 0 0', fontSize: '0.85rem', fontWeight: '500' }}>
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} · ₹{totalPrice.toLocaleString()}
                </p>
              )}
            </div>
            {totalItems > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: 'none', border: '1px solid var(--error)', color: 'var(--error)',
                  padding: '0.35rem 0.75rem', borderRadius: '0.5rem', fontWeight: '600',
                  fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--error)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = 'var(--error)'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>delete_sweep</span>
                Clear Cart
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {totalItems === 0 && <EmptyCart onBrowse={() => navigate('/home')} />}

        {/* Cart content */}
        {totalItems > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }} className="cart-layout">
            
            {/* Items list */}
            <div>
              {/* Free delivery progress bar */}
              {deliveryFee > 0 && (
                <div style={{
                  backgroundColor: '#fff', borderRadius: '1rem', padding: '1rem',
                  border: '1px solid var(--border-subtle)', marginBottom: '0.85rem',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--on-surface)' }}>
                      Add ₹{499 - totalPrice} more for free delivery
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700' }}>₹499</span>
                  </div>
                  <div style={{ height: '5px', backgroundColor: 'var(--surface-container)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', backgroundColor: 'var(--primary)',
                      width: `${Math.min((totalPrice / 499) * 100, 100)}%`,
                      borderRadius: '9999px', transition: 'width 0.5s ease',
                    }} />
                  </div>
                </div>
              )}
              {deliveryFee === 0 && (
                <div style={{
                  backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)',
                  borderRadius: '1rem', padding: '0.75rem 1rem', marginBottom: '0.85rem',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                }}>
                  <span className="material-symbols-outlined filled" style={{ color: 'var(--success)', fontSize: '18px' }}>check_circle</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--success)' }}>
                    You've unlocked Free Delivery! 🎉
                  </span>
                </div>
              )}

              {/* Cart items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.entries(cartItems).map(([id, item]) => (
                  <div
                    key={id}
                    style={{
                      backgroundColor: '#fff', borderRadius: '1rem', padding: '0.75rem',
                      border: '1px solid var(--border-subtle)', boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                      display: 'flex', gap: '0.75rem', alignItems: 'center',
                      transition: 'box-shadow 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.06)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.03)'}
                  >
                    {/* Image */}
                    <div style={{
                      width: '4.25rem', height: '4.25rem', flexShrink: 0, borderRadius: '0.75rem',
                      overflow: 'hidden', backgroundColor: 'var(--surface-container)',
                    }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.15rem' }}>
                        <div style={{
                          width: '0.65rem', height: '0.65rem',
                          border: `1.5px solid ${item.isVeg ? 'var(--success)' : 'var(--error)'}`,
                          borderRadius: '2px', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', flexShrink: 0,
                        }}>
                          <div style={{
                            width: '0.3rem', height: '0.3rem', borderRadius: '50%',
                            backgroundColor: item.isVeg ? 'var(--success)' : 'var(--error)',
                          }} />
                        </div>
                        {item.restaurant && (
                          <span style={{ fontSize: '0.65rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                            {item.restaurant}
                          </span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--on-surface)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </h4>
                      <p style={{ fontSize: '0.9rem', fontWeight: '900', color: 'var(--primary)', margin: '0.15rem 0 0' }}>
                        ₹{(item.price * item.qty).toLocaleString()}
                      </p>
                    </div>

                    {/* Qty controls */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem', flexShrink: 0 }}>
                      <button
                        onClick={() => removeItem(id)}
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer', padding: '0.15rem',
                          color: 'var(--on-surface-variant)', transition: 'color 0.2s', display: 'flex',
                        }}
                        title="Remove item"
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--error)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--on-surface-variant)'}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '15px' }}>delete</span>
                      </button>
                      <div style={{
                        display: 'flex', alignItems: 'center', backgroundColor: 'var(--surface-container-low)',
                        borderRadius: '9999px', padding: '0.15rem',
                      }}>
                        <button
                          onClick={() => updateQty({ id, ...item }, -1)}
                          style={{
                            width: '1.5rem', height: '1.5rem', borderRadius: '50%', border: 'none',
                            background: item.qty === 1 ? 'var(--error-container)' : 'none',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: '700', color: item.qty === 1 ? 'var(--on-error-container)' : 'var(--on-surface-variant)',
                            fontSize: '0.95rem', transition: 'all 0.15s',
                          }}
                        >
                          {item.qty === 1 ? (
                            <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>delete</span>
                          ) : '−'}
                        </button>
                        <span style={{ padding: '0 0.5rem', fontWeight: '700', fontSize: '0.8rem', minWidth: '1.2rem', textAlign: 'center' }}>
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty({ id, ...item }, 1)}
                          style={{
                            width: '1.5rem', height: '1.5rem', borderRadius: '50%', border: 'none',
                            backgroundColor: 'var(--primary)', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: '700', color: '#fff', fontSize: '0.95rem',
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add more items */}
              <button
                onClick={() => navigate('/home')}
                style={{
                  marginTop: '0.85rem', width: '100%', padding: '0.65rem',
                  border: '2px dashed var(--border-subtle)', borderRadius: '1rem',
                  backgroundColor: 'transparent', color: 'var(--primary)', fontWeight: '700',
                  fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '0.35rem', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.backgroundColor = 'rgba(171,53,0,0.03)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add_circle</span>
                Add more items
              </button>
            </div>

            {/* Order summary */}
            <div style={{
              backgroundColor: '#fff', borderRadius: '1rem', padding: '1.25rem',
              border: '1px solid var(--border-subtle)', boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
              height: 'fit-content', position: 'sticky', top: '5rem',
            }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: '800', color: 'var(--on-surface)', margin: '0 0 1rem' }}>
                Order Summary
              </h3>

              {/* Line items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.82rem' }}>
                    Items ({totalItems})
                  </span>
                  <span style={{ fontWeight: '700', color: 'var(--on-surface)', fontSize: '0.85rem' }}>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.82rem' }}>Delivery Fee</span>
                    {deliveryFee === 0 && (
                      <span style={{ fontSize: '0.65rem', backgroundColor: 'rgba(34,197,94,0.1)', color: 'var(--success)', fontWeight: '700', padding: '0.05rem 0.35rem', borderRadius: '9999px' }}>FREE</span>
                    )}
                  </div>
                  <span style={{ fontWeight: '700', color: deliveryFee === 0 ? 'var(--success)' : 'var(--on-surface)', fontSize: '0.85rem', textDecoration: deliveryFee === 0 ? 'line-through' : 'none' }}>
                    {deliveryFee === 0 ? '₹49' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--on-surface-variant)', fontSize: '0.82rem' }}>Platform Fee</span>
                  <span style={{ fontWeight: '700', color: 'var(--on-surface)', fontSize: '0.85rem' }}>₹{platformFee}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px dashed var(--border-subtle)', paddingTop: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: '800', color: 'var(--on-surface)', fontSize: '0.9rem' }}>Grand Total</span>
                  <span style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '1.2rem' }}>
                    ₹{grandTotal.toLocaleString()}
                  </span>
                </div>
                {deliveryFee === 0 && (
                  <p style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: '600', marginTop: '0.15rem' }}>
                    🎉 You saved ₹49 on delivery!
                  </p>
                )}
              </div>

              {/* Coupon */}
              <div style={{
                display: 'flex', gap: '0.4rem', marginBottom: '1rem',
                padding: '0.5rem 0.75rem', backgroundColor: 'var(--surface-container-low)',
                borderRadius: '0.75rem', border: '1px solid var(--border-subtle)',
              }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--primary)', fontSize: '18px' }}>redeem</span>
                <input
                  placeholder="Enter coupon code"
                  style={{
                    border: 'none', background: 'none', outline: 'none', flex: 1,
                    fontSize: '0.8rem', color: 'var(--on-surface)', fontFamily: 'Inter, sans-serif',
                  }}
                />
                <button style={{
                  background: 'none', border: 'none', color: 'var(--primary)',
                  fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer',
                }}>Apply</button>
              </div>

              {/* Payment info */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1rem',
                padding: '0.5rem 0.75rem', backgroundColor: 'rgba(94,106,210,0.05)',
                borderRadius: '0.75rem', border: '1px solid rgba(94,106,210,0.12)',
              }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--ai-glow)', fontSize: '18px' }}>payments</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--on-surface)', fontWeight: '600' }}>
                  Pay on Delivery (Cash/UPI)
                </span>
              </div>

              {/* Place order button */}
              <button
                onClick={() => navigate('/checkout')}
                style={{
                  width: '100%', backgroundColor: 'var(--primary)',
                  color: '#fff',
                  padding: '0.8rem', borderRadius: '0.75rem', fontWeight: '800', fontSize: '0.9rem',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  boxShadow: '0 3px 0 var(--primary-dark, #832600)',
                  transition: 'all 0.2s',
                }}
                onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = '0 1px 0 var(--primary-dark, #832600)'; }}
                onMouseUp={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 3px 0 var(--primary-dark, #832600)'; }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>shopping_cart_checkout</span>
                Proceed to Checkout · ₹{grandTotal.toLocaleString()}
              </button>

              {/* Safe checkout note */}
              <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--on-surface-variant)', marginTop: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>lock</span>
                Secure & encrypted checkout
              </p>
            </div>

          </div>
        )}
      </main>

      {/* Cart layout responsive style */}
      <style>{`
        @media (min-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr 320px !important;
          }
        }
        /* Hide scrollbars for the entire page while on the cart page */
        ::-webkit-scrollbar {
          display: none !important;
        }
        * {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
      `}</style>

    </div>
  );
}
