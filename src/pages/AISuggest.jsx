import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { indianFoodItems } from '../data/foodData';

const questionsData = [
  {
    id: "vibe",
    question: "What's your vibe today?",
    options: [
      { label: "Need Comfort", icon: "sentiment_satisfied", desc: "Warm and cozy food to make you feel good", color: "#EF4444" },
      { label: "Feeling Energetic", icon: "bolt", desc: "High protein or power meals to fuel your day", color: "#F59E0B" },
      { label: "Celebrating Something", icon: "celebration", desc: "Treats and premium desserts for party vibes", color: "#EC4899" },
      { label: "Just Hungry", icon: "restaurant", desc: "No fuss, quick and filling delicious food", color: "#FF6B35" }
    ]
  },
  {
    id: "preference",
    question: "What's on your plate today?",
    options: [
      { label: "Veg Goodness", icon: "spa", desc: "Pure green vegetarian delicious choices", color: "#22C55E" },
      { label: "Non-Veg Lover", icon: "kebab_dining", desc: "Delicious, savory chicken and meat options", color: "#EF4444" },
      { label: "Doesn't Matter", icon: "restaurant_menu", desc: "Show me a mix of everything delicious", color: "#5E6AD2" }
    ]
  },
  {
    id: "craving",
    question: "What kind of experience are you craving?",
    options: [
      { label: "Keep It Healthy", icon: "fitness_center", desc: "Lighter ingredients, low-fat, high nutrition", color: "#10B981" },
      { label: "Want Spicy", icon: "local_fire_department", desc: "Flavors that bring the heat and kick", color: "#EF4444" },
      { label: "Happy Sweet", icon: "cake", desc: "Desserts, sweet snacks, and shakes", color: "#EC4899" },
      { label: "Surprise Me", icon: "auto_awesome", desc: "Let our smart AI curate a mystery favorite", color: "#5E6AD2" }
    ]
  },
  {
    id: "spending",
    question: "What's your spending mood?",
    options: [
      { label: "Budget Bites", icon: "savings", desc: "Easy on the pocket, high on satisfaction", color: "#10B981" },
      { label: "Great Value", icon: "payments", desc: "The perfect balance of price and portions", color: "#3B82F6" },
      { label: "Treat Yourself", icon: "dinner_dining", desc: "Gourmet delights from the top chef kitchens", color: "#8B5CF6" },
      { label: "No Limit today", icon: "diamond", desc: "Unrestricted cravings, go all out!", color: "#F59E0B" }
    ]
  },
  {
    id: "time",
    question: "When should we satisfy your craving?",
    options: [
      { label: "ASAP! I'm Hungry", icon: "speed", desc: "Delivery at lightning-fast speed", color: "#EF4444" },
      { label: "Within 30 Minutes", icon: "alarm", desc: "Standard quick preparation and delivery", color: "#F59E0B" },
      { label: "Within an Hour", icon: "schedule", desc: "Perfect for planning a relaxed meal", color: "#3B82F6" },
      { label: "No Rush", icon: "snooze", desc: "Take your time, we are flexible", color: "#10B981" }
    ]
  }
];

export default function AISuggest() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { cartItems, addItem, totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!showResults && !isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showResults, isLoading]);

  const handleSelectOption = (value) => {
    const key = questionsData[step - 1].id;
    setAnswers(prev => ({ ...prev, [key]: value }));

    if (step < questionsData.length) {
      setStep(prev => prev + 1);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({});
    setShowResults(false);
    setIsLoading(false);
  };

  const handleAddToCart = (item) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      img: item.img,
      restaurant: item.restaurant,
      isVeg: item.isVeg,
    });
  };

  const getSuggestions = () => {
    let filtered = [...indianFoodItems];

    // 1. Veg/Non-Veg
    const vegPref = answers.preference;
    if (vegPref === 'Veg Goodness') {
      filtered = filtered.filter(item => item.isVeg);
    } else if (vegPref === 'Non-Veg Lover') {
      filtered = filtered.filter(item => !item.isVeg);
    }

    // 2. Spending Mood
    const spending = answers.spending;
    if (spending === 'Budget Bites') {
      filtered = filtered.filter(item => item.price < 150);
    } else if (spending === 'Great Value') {
      filtered = filtered.filter(item => item.price >= 150 && item.price <= 300);
    } else if (spending === 'Treat Yourself') {
      filtered = filtered.filter(item => item.price > 300);
    } // "No Limit today" includes all items

    // 3. Craving
    const craving = answers.craving;
    if (craving === 'Keep It Healthy') {
      filtered = filtered.filter(item => 
        item.category === 'South Indian' || 
        item.name.toLowerCase().includes('dosa') || 
        item.desc.toLowerCase().includes('healthy') ||
        item.desc.toLowerCase().includes('fresh') ||
        item.desc.toLowerCase().includes('salad')
      );
    } else if (craving === 'Want Spicy') {
      filtered = filtered.filter(item => 
        item.category === 'Biryani' || 
        item.desc.toLowerCase().includes('spicy') || 
        item.desc.toLowerCase().includes('masala') || 
        item.desc.toLowerCase().includes('chilli') ||
        item.desc.toLowerCase().includes('tandoori')
      );
    } else if (craving === 'Happy Sweet') {
      filtered = filtered.filter(item => 
        item.category === 'Desserts' || 
        item.category === 'Beverages' ||
        item.desc.toLowerCase().includes('sweet') || 
        item.desc.toLowerCase().includes('cream') ||
        item.desc.toLowerCase().includes('shake')
      );
    } // "Surprise Me" includes all items

    // Fallback if no matching item is found
    if (filtered.length === 0) {
      filtered = indianFoodItems.filter(item => {
        if (vegPref === 'Veg Goodness') return item.isVeg;
        if (vegPref === 'Non-Veg Lover') return !item.isVeg;
        return true;
      });
    }

    // Sort by rating desc
    filtered.sort((a, b) => b.rating - a.rating);

    // Limit to 3 items and map to layout shape
    return filtered.slice(0, 3).map((item, idx) => {
      let badge = 'Match';
      if (idx === 0) badge = 'Best Match';
      else if (item.isVeg) badge = 'Vegetarian';
      else badge = 'Highly Rated';

      let tag = 'AI Choice';
      if (answers.vibe === 'Need Comfort') tag = 'Comfort Food';
      else if (answers.vibe === 'Feeling Energetic') tag = 'Power Meal';
      else if (answers.vibe === 'Celebrating Something') tag = 'Celebration Special';
      else if (answers.vibe === 'Just Hungry') tag = 'Hunger Buster';

      return {
        id: item.id,
        name: item.name,
        restaurant: item.restaurant || 'Partner Kitchen',
        price: item.price,
        rating: item.rating.toString(),
        tag: tag,
        badge: badge,
        time: answers.time === "ASAP! I'm Hungry" ? '15-20 min' : (answers.time === 'Within 30 Minutes' ? '25-30 min' : '40-45 min'),
        img: item.img || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
        isVeg: item.isVeg,
        desc: item.desc || 'A delicious meal prepared with fresh ingredients.'
      };
    });
  };

  const activeQuestionData = questionsData[step - 1];

  return (
    <div style={{ backgroundColor: 'var(--background)', fontFamily: 'Inter, sans-serif' }}>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 1rem 3rem 1rem' }}>
        
        {/* Wizard Section */}
        {!showResults && !isLoading && (
          <section style={{ position: 'relative', padding: '1rem 0', overflow: 'hidden' }}>
            {/* Background Atmosphere Glows */}
            <div style={{ position: 'absolute', top: 0, left: '25%', width: '24rem', height: '24rem', backgroundColor: 'rgba(171,53,0,0.06)', borderRadius: '50%', filter: 'blur(120px)', zIndex: -1 }}></div>
            <div style={{ position: 'absolute', bottom: 0, right: '25%', width: '24rem', height: '24rem', backgroundColor: 'rgba(94,106,210,0.06)', borderRadius: '50%', filter: 'blur(120px)', zIndex: -1 }}></div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'var(--primary-fixed)', color: 'var(--on-primary-fixed)', marginBottom: '0.75rem' }}>
                <span className="material-symbols-outlined filled" style={{ fontSize: '16px' }}>auto_awesome</span>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Culinary Concierge</span>
              </div>
              
              <h1 style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--on-surface)', marginBottom: '1rem', letterSpacing: '-0.02em', maxWidth: '36rem', margin: '0 auto 1rem' }}>
                {activeQuestionData.question}
              </h1>
              
              {/* Progress Bar */}
              <div style={{ width: '100%', maxWidth: '24rem', margin: '0 auto', height: '5px', backgroundColor: 'var(--surface-container)', borderRadius: '9999px', overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  height: '100%', backgroundColor: 'var(--primary)',
                  width: `${(step / questionsData.length) * 100}%`,
                  transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 0 12px rgba(171,53,0,0.4)'
                }}></div>
              </div>
              <div style={{ marginTop: '0.4rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--on-surface-variant)' }}>
                Question {step} of {questionsData.length}
              </div>
            </div>

            <div style={{ maxWidth: '36rem', margin: '0 auto', minHeight: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* Options Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '0.85rem',
                width: '100%',
                boxSizing: 'border-box'
              }}>
                {activeQuestionData.options.map(option => (
                  <button 
                    key={option.label}
                    onClick={() => handleSelectOption(option.label)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      padding: '1rem 1.25rem',
                      backgroundColor: '#ffffff',
                      border: '1.5px solid var(--border-subtle)',
                      borderRadius: '1.25rem',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                      textAlign: 'left',
                      boxSizing: 'border-box'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = option.color;
                      e.currentTarget.style.boxShadow = `0 6px 18px ${option.color}12`;
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      const iconContainer = e.currentTarget.querySelector('.icon-container');
                      if (iconContainer) iconContainer.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                      const iconContainer = e.currentTarget.querySelector('.icon-container');
                      if (iconContainer) iconContainer.style.transform = 'scale(1)';
                    }}
                    onMouseDown={e => {
                      e.currentTarget.style.transform = 'translateY(-1px) scale(0.98)';
                    }}
                    onMouseUp={e => {
                      e.currentTarget.style.transform = 'translateY(-3px) scale(1)';
                    }}
                  >
                    <div 
                      className="icon-container"
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '0.75rem',
                        backgroundColor: `${option.color}12`,
                        color: option.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '0.5rem',
                        transition: 'transform 0.2s ease'
                      }}
                    >
                      <span className="material-symbols-outlined filled" style={{ fontSize: '20px' }}>{option.icon}</span>
                    </div>
                    <span style={{ fontWeight: '800', color: 'var(--on-surface)', fontSize: '0.95rem', display: 'block', marginBottom: '0.15rem' }}>
                      {option.label}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--on-surface-variant)', lineHeight: 1.35 }}>
                      {option.desc}
                    </span>
                  </button>
                ))}
              </div>

              {/* Navigation Controls */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-subtle)',
                width: '100%'
              }}>
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.2rem',
                      backgroundColor: '#ffffff',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '0.75rem',
                      color: 'var(--on-surface-variant)',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--surface-container-low)'; }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#ffffff'; }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
                    Back
                  </button>
                ) : (
                  <div /> // Spacer
                )}

                <button
                  onClick={handleReset}
                  style={{
                    padding: '0.6rem 1.2rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--on-surface-variant)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    opacity: 0.7,
                    transition: 'opacity 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; }}
                >
                  Restart
                </button>
              </div>

            </div>
          </section>
        )}

        {/* Loading Screen */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6rem 0', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '6rem', height: '6rem', marginBottom: '1.5rem' }}>
              <div style={{ position: 'absolute', inset: 0, border: '4px solid rgba(171, 53, 0, 0.2)', borderRadius: '50%' }}></div>
              <div style={{ position: 'absolute', inset: 0, border: '4px solid var(--primary)', borderRadius: '50%', borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}></div>
              <span className="material-symbols-outlined" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '2rem', animation: 'pulse-glow 2s infinite' }}>auto_awesome</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--on-surface)', marginBottom: '0.5rem' }}>Analyzing Options &amp; Cooking Up Recommendations...</h3>
            <p style={{ color: 'var(--on-surface-variant)', maxWidth: '24rem', margin: 0, fontSize: '0.95rem' }}>Matching your mood, vibe, and appetite to curating the perfect plate.</p>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <section style={{ animation: 'fade-in 0.5s ease-out' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--on-surface)', margin: 0 }}>AI Suggested for You</h2>
              
              <div style={{
                padding: '1.25rem', backgroundColor: 'rgba(94, 106, 210, 0.08)',
                border: '1px solid rgba(94, 106, 210, 0.15)', borderRadius: '1.25rem',
                display: 'flex', alignItems: 'flex-start', gap: '0.75rem', maxWidth: '42rem'
              }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--ai-glow)', fontSize: '22px' }}>auto_awesome</span>
                <p style={{ color: 'var(--on-surface)', fontWeight: '600', margin: 0, fontSize: '0.95rem', lineHeight: 1.4 }}>
                  Curated for your <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{answers.vibe}</span> vibe today! We found top-rated <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{answers.preference === 'Veg Goodness' ? 'Veg' : (answers.preference === 'Non-Veg Lover' ? 'Non-Veg' : 'delicious')}</span> options matching your <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{answers.craving}</span> craving under <span style={{ color: 'var(--primary)', fontWeight: '800' }}>{answers.spending}</span> budget.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {getSuggestions().map(item => {
                return (
                  <div key={item.id} style={{
                    backgroundColor: '#fff', border: '1px solid var(--border-subtle)',
                    borderRadius: '2rem', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s'
                  }} className="restaurant-card">
                    
                    <div style={{ position: 'relative', height: '15rem', overflow: 'hidden' }}>
                      <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      
                      <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {/* Veg/Non-Veg Dot badge */}
                        <div style={{ backgroundColor: 'rgba(255,255,255,0.92)', padding: '0.35rem', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{
                            width: '0.75rem', height: '0.75rem', border: `2px solid ${item.isVeg ? 'var(--success)' : 'var(--error)'}`,
                            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1px'
                          }}>
                            <div style={{ width: '100%', height: '100%', backgroundColor: item.isVeg ? 'var(--success)' : 'var(--error)', borderRadius: '50%' }} />
                          </div>
                        </div>

                        {/* Recommendation badge */}
                        <span style={{ padding: '0.25rem 0.75rem', backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: '800', color: 'var(--primary)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>{item.badge}</span>
                      </div>

                      <span style={{ position: 'absolute', bottom: '1rem', left: '1rem', padding: '0.35rem 0.75rem', backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>schedule</span>
                        {item.time}
                      </span>

                      <button style={{
                        position: 'absolute', top: '1rem', right: '1rem', width: '2.5rem', height: '2.5rem',
                        backgroundColor: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }}>
                        <span className="material-symbols-outlined" style={{ color: 'var(--on-surface-variant)', fontSize: '20px' }}>favorite</span>
                      </button>
                    </div>

                    <div style={{ padding: '1.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                        <div>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--on-surface)', margin: '0 0 0.15rem 0' }}>{item.name}</h3>
                          <p style={{ color: 'var(--on-surface-variant)', margin: 0, fontSize: '0.85rem' }}>{item.restaurant}</p>
                        </div>
                        <span style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--primary)' }}>₹{item.price}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: 'var(--tertiary-fixed)', color: 'var(--on-tertiary-fixed)', padding: '0.15rem 0.5rem', borderRadius: '0.5rem' }}>
                          <span className="material-symbols-outlined filled" style={{ fontSize: '14px' }}>star</span>
                          <span style={{ fontSize: '0.8rem', fontWeight: '700' }}>{item.rating}</span>
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', fontWeight: '600' }}>• {item.tag}</span>
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)', margin: '0 0 1.25rem 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.desc}
                      </p>

                      <button 
                        onClick={() => handleAddToCart(item)}
                        style={{
                          width: '100%', backgroundColor: 'var(--primary)', color: '#fff',
                          padding: '1rem', borderRadius: '1rem', fontWeight: '700', fontSize: '0.95rem',
                          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
                          justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s',
                          boxShadow: '0 4px 0 var(--primary-dark)'
                        }}
                        onMouseDown={e => { e.currentTarget.style.transform = 'translateY(2px)'; e.currentTarget.style.boxShadow = 'none'; }}
                        onMouseUp={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 0 var(--primary-dark)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 0 var(--primary-dark)'; }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add_shopping_cart</span>
                        {(cartItems[item.id]?.qty || 0) > 0 ? `Added (${cartItems[item.id].qty})` : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button 
                onClick={handleReset}
                style={{
                  padding: '0.75rem 2rem', border: '1px solid var(--border-subtle)',
                  borderRadius: '1rem', backgroundColor: '#fff', color: 'var(--on-surface)',
                  fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-container-low)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#fff'}
              >
                Modify Preferences
              </button>
              {totalItems > 0 && (
                <button
                  onClick={() => navigate('/cart')}
                  style={{
                    padding: '0.75rem 2rem', border: 'none',
                    borderRadius: '1rem', backgroundColor: 'var(--primary)', color: '#fff',
                    fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(171,53,0,0.25)', transition: 'all 0.2s',
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>shopping_cart</span>
                  View Cart ({totalItems})
                </button>
              )}
            </div>
          </section>
        )}

      </main>

    </div>
  );
}
