import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRestaurantsByOwner } from "../services/restaurantService";
import "./RestaurantDashboard.css";

export default function RestaurantDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchRestaurants = async () => {
        try {
          setLoading(true);
          const data = await getRestaurantsByOwner(user.uid);
          setRestaurants(data);
        } catch (err) {
          console.error("Error loading restaurants:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchRestaurants();
    }
  }, [user]);

  const handleManageMenu = (id) => {
    navigate(`/restaurant/menu/${id}`);
  };

  const handleEditRestaurant = (id) => {
    alert("Editing restaurant info is coming soon!");
  };

  return (
    <div style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>

      {/* Main Dashboard Grid */}
      <main className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Restaurant Dashboard</h1>
          {restaurants.length > 0 && (
            <button
              className="add-restaurant-btn"
              onClick={() => navigate("/restaurant/add")}
            >
              <span className="material-symbols-outlined">add</span>
              Add Restaurant
            </button>
          )}
        </header>

        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--on-surface-variant)" }}>
            <p style={{ fontWeight: "600", fontSize: "1.1rem" }}>Loading your restaurants...</p>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="empty-state">
            <span className="material-symbols-outlined empty-state-icon">storefront</span>
            <h2 className="empty-state-title">No Restaurants Added</h2>
            <p className="empty-state-desc">
              Partner with QuickBite today! Add your restaurant to start managing your digital menu and orders.
            </p>
            <button
              className="add-restaurant-btn"
              onClick={() => navigate("/restaurant/add")}
            >
              <span className="material-symbols-outlined">add</span>
              Add Restaurant
            </button>
          </div>
        ) : (
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => {
              const displayImage = restaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400";

              return (
                <div className="dashboard-card" key={restaurant.id}>
                  <div className="card-banner">
                    <img
                      className="card-banner-img"
                      src={displayImage}
                      alt={restaurant.restaurantName}
                    />
                    <span className={`card-status-badge ${restaurant.isOpen ? "open" : "closed"}`}>
                      {restaurant.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>

                  <div className="card-body">
                    <h2 className="card-title">{restaurant.restaurantName}</h2>

                    <div className="card-info">
                      <span className="card-info-item">
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>restaurant</span>
                        {restaurant.cuisine}
                      </span>
                      <span className="card-info-item">
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>location_on</span>
                        {restaurant.city}
                      </span>
                      {restaurant.openingTime && (
                        <span className="card-info-item">
                          <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>schedule</span>
                          {restaurant.openingTime} - {restaurant.closingTime}
                        </span>
                      )}
                    </div>

                    <div className="card-actions">
                      <button
                        className="card-action-btn primary"
                        onClick={() => handleManageMenu(restaurant.id)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>menu_book</span>
                        Manage Menu
                      </button>
                      <button
                        className="card-action-btn secondary"
                        onClick={() => handleEditRestaurant(restaurant.id)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>edit</span>
                        Edit Info
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

    </div>
  );
}