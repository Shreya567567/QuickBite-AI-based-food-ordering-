import { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { indianFoodItems } from "../data/foodData";
import { topRestaurants } from "../data/restaurantData";
import cachedNearby from "../data/nearbyRestaurantsCache.json";
import "./CustomerLayout.css";

const NAV_LINKS = [
  { label: "Explore", to: "/home", key: "home" },
  { label: "AI Suggest", to: "/ai-suggest", key: "ai-suggest" },
];

const BOTTOM_ITEMS = [
  { label: "Home", to: "/home", icon: "home", key: "home" },
  { label: "Search", to: "/home", icon: "search", key: "search" },
  { label: "AI Suggest", to: "/ai-suggest", icon: "auto_awesome", key: "ai-suggest" },
  { label: "Orders", to: "/orders", icon: "shopping_bag", key: "orders" },
  { label: "Profile", to: "/profile", icon: "person", key: "profile" },
];

const getDynamicRestaurantForDish = (dish) => {
  const index = indianFoodItems.indexOf(dish);
  const realRestros = [
    ...topRestaurants.map(r => ({ id: r.id.toString(), name: r.name })),
    ...cachedNearby.map(r => ({ id: r.properties.place_id, name: r.properties.name })).filter(r => r.name)
  ];
  if (realRestros.length > 0) {
    return realRestros[(index + dish.name.length) % realRestros.length];
  }
  return { id: "1", name: dish.restaurant };
};

function CustomerNavbar() {
  const { pathname } = useLocation();
  const { user, profile } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState({ restaurants: [], dishes: [] });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Address Dropdown state
  const defaultMockupAddresses = [
    { id: '1', type: 'Home', text: '123, Boring Road, Near crossing, Patna, 800001', isDefault: true },
    { id: '2', type: 'Work', text: 'TCS Gitanjali Park, Newtown, Kolkata, 700156', isDefault: false }
  ];
  const addressesList = profile?.addresses || defaultMockupAddresses;

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const addressDropdownRef = useRef(null);

  const activeAddress = addressesList.find(addr => addr.id === selectedAddressId) || 
                        addressesList.find(addr => addr.isDefault) || 
                        addressesList[0];

  const getShortAddressText = (addressText) => {
    if (!addressText) return "Patna, Bihar";
    const words = addressText.split(/[\s,]+/).filter(Boolean);
    if (words.length > 0) {
      return words.slice(0, 3).join(" ");
    }
    return addressText;
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions({ restaurants: [], dishes: [] });
      return;
    }

    const query = searchQuery.toLowerCase();

    // Filter restaurants
    const matchedStaticRestros = topRestaurants.filter(r => 
      r.name.toLowerCase().includes(query) || r.cuisine.toLowerCase().includes(query)
    ).map(r => ({ id: r.id.toString(), name: r.name, type: 'restaurant', category: r.cuisine }));

    const matchedNearbyRestros = cachedNearby.filter(r => 
      r.properties.name && r.properties.name.toLowerCase().includes(query)
    ).map(r => ({ 
      id: r.properties.place_id, 
      name: r.properties.name, 
      type: 'restaurant', 
      category: r.properties.address_line2 || r.properties.formatted || "Indian Cuisine" 
    }));

    const matchedRestros = [...matchedStaticRestros, ...matchedNearbyRestros].slice(0, 5);

    // Filter dishes
    const matchedDishes = indianFoodItems.filter(item => 
      item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
    ).slice(0, 5).map(item => {
      const restro = getDynamicRestaurantForDish(item);
      return {
        id: item.id,
        name: item.name,
        type: 'dish',
        price: item.price,
        restaurantName: restro.name,
        restaurantId: restro.id
      };
    });

    setSuggestions({ restaurants: matchedRestros, dishes: matchedDishes });
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (addressDropdownRef.current && !addressDropdownRef.current.contains(event.target)) {
        setShowAddressDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="customer-navbar">
      <div className="customer-navbar-inner">
        {/* Left: Logo + Location */}
        <div className="customer-nav-left" ref={addressDropdownRef} style={{ position: 'relative' }}>
          <Link to="/home" className="customer-logo-group" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.55rem" }}>
            <div className="customer-logo-icon" style={{
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
          <div className="customer-location-pill" onClick={() => setShowAddressDropdown(!showAddressDropdown)}>
            <span className="material-symbols-outlined" style={{ fontSize: "15px", color: "var(--primary)" }}>location_on</span>
            <span>{getShortAddressText(activeAddress?.text)}</span>
            <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>expand_more</span>
          </div>

          {/* Address Dropdown */}
          {showAddressDropdown && (
            <div className="address-dropdown-container">
              <div className="address-dropdown-header">
                <span className="address-dropdown-title">Select Delivery Location</span>
              </div>
              <div className="address-dropdown-list">
                {addressesList.map((addr) => {
                  const isCurrent = (activeAddress && activeAddress.id === addr.id);
                  return (
                    <div
                      key={addr.id}
                      className={`address-dropdown-item ${isCurrent ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedAddressId(addr.id);
                        setShowAddressDropdown(false);
                      }}
                    >
                      <span className="material-symbols-outlined address-item-icon">
                        {addr.type.toLowerCase() === 'home' ? 'home' : (addr.type.toLowerCase() === 'work' ? 'work' : 'location_on')}
                      </span>
                      <div className="address-item-details">
                        <div className="address-item-type">{addr.type}</div>
                        <div className="address-item-text">{addr.text}</div>
                      </div>
                      {isCurrent && (
                        <span className="material-symbols-outlined address-check-icon">check_circle</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <Link
                to="/profile"
                className="address-dropdown-manage"
                onClick={() => setShowAddressDropdown(false)}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>settings</span>
                Manage Addresses
              </Link>
            </div>
          )}
        </div>

        {/* Center: Search */}
        <div className="customer-search-wrapper" ref={dropdownRef}>
          <div className="customer-search-icon">
            <span className="material-symbols-outlined" style={{ color: "var(--on-surface-variant)", fontSize: "18px" }}>search</span>
          </div>
          <input
            className="customer-search-input"
            type="text"
            placeholder="Search food or restaurants..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setShowDropdown(true); }}
            onFocus={() => setShowDropdown(true)}
          />
          <div className="customer-search-ai">
            <span className="material-symbols-outlined" style={{ color: "var(--ai-glow)", fontSize: "17px" }}>auto_awesome</span>
          </div>

          {/* Suggestions Dropdown */}
          {showDropdown && (suggestions.restaurants.length > 0 || suggestions.dishes.length > 0) && (
            <div className="search-dropdown-container">
              {suggestions.restaurants.length > 0 && (
                <div className="search-dropdown-section">
                  <h4 className="search-dropdown-section-title">Restaurants</h4>
                  {suggestions.restaurants.map((r) => (
                    <div
                      key={r.id}
                      className="search-dropdown-item"
                      onClick={() => {
                        navigate(`/restaurant/${r.id}`);
                        setSearchQuery("");
                        setShowDropdown(false);
                      }}
                    >
                      <span className="material-symbols-outlined search-item-icon">storefront</span>
                      <div className="search-item-details">
                        <div className="search-item-name">{r.name}</div>
                        <div className="search-item-meta">{r.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {suggestions.dishes.length > 0 && (
                <div className="search-dropdown-section" style={{ borderTop: suggestions.restaurants.length > 0 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <h4 className="search-dropdown-section-title">Dishes</h4>
                  {suggestions.dishes.map((d) => (
                    <div
                      key={d.id}
                      className="search-dropdown-item"
                      onClick={() => {
                        navigate(`/restaurant/${d.restaurantId}?item=${d.id}`);
                        setSearchQuery("");
                        setShowDropdown(false);
                      }}
                    >
                      <span className="material-symbols-outlined search-item-icon" style={{ color: 'var(--primary-container)' }}>restaurant</span>
                      <div className="search-item-details">
                        <div className="search-item-name">{d.name} <span className="search-item-price">₹{d.price}</span></div>
                        <div className="search-item-meta">from {d.restaurantName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Nav + Actions */}
        <div className="customer-nav-right">
          <nav className="customer-nav-links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                to={link.to}
                className={`customer-nav-link ${pathname.startsWith(link.to) ? "active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
          <Link to="/cart" className="customer-nav-icon-btn" style={{ textDecoration: "none" }}>
            <span className="material-symbols-outlined" style={{ color: "var(--on-surface-variant)", fontSize: "22px" }}>shopping_cart</span>
            {totalItems > 0 && <span className="customer-cart-badge">{totalItems}</span>}
          </Link>



          {/* Avatar */}
          <Link to="/profile" className="customer-avatar-link">
            <img
              src={profile?.profileImage || user?.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"}
              alt="Profile"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

function CustomerBottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="customer-bottom-nav">
      {BOTTOM_ITEMS.map((item) => {
        const isActive = pathname === item.to || pathname.startsWith(item.to + "/");
        return (
          <Link
            key={item.key}
            to={item.to}
            className={`customer-bottom-item ${isActive ? "active" : ""}`}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "24px",
                fontVariationSettings: isActive
                  ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
                  : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
              }}
            >{item.icon}</span>
            <span className="label">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function CustomerLayout() {
  return (
    <div className="customer-layout">
      <CustomerNavbar />
      <main className="customer-content">
        <Outlet />
      </main>
      <CustomerBottomNav />
    </div>
  );
}
