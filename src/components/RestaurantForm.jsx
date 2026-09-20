import { useState } from "react";
import { searchRestaurants } from "../services/geoapifyService";
import "./RestaurantForm.css";

function RestaurantForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    restaurantName: initialData.restaurantName || "",
    ownerName: initialData.ownerName || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    cuisine: initialData.cuisine || "",
    address: initialData.address || "",
    city: initialData.city || "",
    state: initialData.state || "",
    pincode: initialData.pincode || "",
    latitude: initialData.latitude || "",
    longitude: initialData.longitude || "",
    geoapifyPlaceId: initialData.geoapifyPlaceId || "",
    openingTime: initialData.openingTime || "",
    closingTime: initialData.closingTime || "",
    deliveryTime: initialData.deliveryTime || "",
    image: initialData.image || "",
  });

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const handleRestaurantSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setLoadingSearch(true);
      const results = await searchRestaurants(value);
      setSearchResults(results);
    } catch (error) {
      console.error("Location search failed:", error);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSelectSuggestion = (place) => {
    const props = place.properties;
    setFormData((prev) => ({
      ...prev,
      restaurantName: props.name || prev.restaurantName,
      address: props.address_line1 || props.street || prev.address,
      city: props.city || prev.city,
      state: props.state || prev.state,
      pincode: props.postcode || prev.pincode,
      latitude: props.lat || prev.latitude,
      longitude: props.lon || prev.longitude,
      geoapifyPlaceId: props.place_id || prev.geoapifyPlaceId,
    }));
    setSearch("");
    setSearchResults([]);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-container">
      {/* Geocoding Auto-fill Search Bar */}
      <div className="search-section">
        <label className="search-label" htmlFor="geoapifySearch">Auto-fill Address / Location</label>
        <div className="search-input-wrapper">
          <span className="material-symbols-outlined search-icon">search</span>
          <input
            id="geoapifySearch"
            type="text"
            className="search-bar-input"
            placeholder="Type your restaurant name or address to search..."
            value={search}
            onChange={handleRestaurantSearch}
          />
          {loadingSearch && (
            <span 
              className="material-symbols-outlined spin-slow" 
              style={{ position: "absolute", right: "1rem", color: "var(--primary)" }}
            >
              sync
            </span>
          )}
        </div>

        {/* Suggestion Dropdown */}
        {searchResults.length > 0 && (
          <div className="suggestions-dropdown">
            {searchResults.map((place, idx) => (
              <div
                key={place.properties.place_id || idx}
                className="suggestion-item"
                onClick={() => handleSelectSuggestion(place)}
              >
                <div className="suggestion-name">{place.properties.name || place.properties.formatted.split(",")[0]}</div>
                <div className="suggestion-address">{place.properties.formatted}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Details Form */}
      <form onSubmit={handleSubmit} className="form-grid">
        
        {/* Restaurant Name */}
        <div className="form-group-full text-left">
          <label className="field-label" htmlFor="formRestName">Restaurant Name *</label>
          <input
            id="formRestName"
            name="restaurantName"
            className="input-field"
            placeholder="e.g. Bite Me Bistro"
            value={formData.restaurantName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Owner Details */}
        <div>
          <label className="field-label" htmlFor="formOwnerName">Owner Name *</label>
          <input
            id="formOwnerName"
            name="ownerName"
            className="input-field"
            placeholder="e.g. John Doe"
            value={formData.ownerName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Cuisines */}
        <div>
          <label className="field-label" htmlFor="formCuisine">Cuisines / Categories *</label>
          <input
            id="formCuisine"
            name="cuisine"
            className="input-field"
            placeholder="e.g. Italian • Continental"
            value={formData.cuisine}
            onChange={handleChange}
            required
          />
        </div>

        {/* Contact info */}
        <div>
          <label className="field-label" htmlFor="formEmail">Contact Email *</label>
          <input
            id="formEmail"
            name="email"
            type="email"
            className="input-field"
            placeholder="owner@restaurant.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="formPhone">Contact Phone *</label>
          <input
            id="formPhone"
            name="phone"
            type="tel"
            className="input-field"
            placeholder="e.g. +91 9988776655"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* Address Fields */}
        <div className="form-group-full">
          <label className="field-label" htmlFor="formAddress">Street Address *</label>
          <input
            id="formAddress"
            name="address"
            className="input-field"
            placeholder="e.g. 452 Silver Lake Blvd"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="formCity">City *</label>
          <input
            id="formCity"
            name="city"
            className="input-field"
            placeholder="e.g. Patna"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="formState">State / Province *</label>
          <input
            id="formState"
            name="state"
            className="input-field"
            placeholder="e.g. Bihar"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="formPincode">Postal / Pincode *</label>
          <input
            id="formPincode"
            name="pincode"
            className="input-field"
            placeholder="e.g. 800001"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image Input */}
        <div>
          <label className="field-label" htmlFor="formImage">Restaurant Banner Image URL</label>
          <input
            id="formImage"
            name="image"
            className="input-field"
            placeholder="https://images.unsplash.com/..."
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        {/* Opening/Closing times */}
        <div className="form-group-full">
          <div className="time-row">
            <div>
              <label className="field-label" htmlFor="formOpenTime">Opening Time</label>
              <input
                id="formOpenTime"
                name="openingTime"
                type="time"
                className="input-field"
                value={formData.openingTime}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="formCloseTime">Closing Time</label>
              <input
                id="formCloseTime"
                name="closingTime"
                type="time"
                className="input-field"
                value={formData.closingTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Delivery Time info */}
        <div className="form-group-full">
          <label className="field-label" htmlFor="formDelTime">Avg. Delivery Time (Minutes)</label>
          <input
            id="formDelTime"
            name="deliveryTime"
            className="input-field"
            placeholder="e.g. 30-40 min"
            value={formData.deliveryTime}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <div className="form-group-full">
          <button type="submit" className="submit-btn">
            Save Restaurant Details
          </button>
        </div>

      </form>
    </div>
  );
}

export default RestaurantForm;