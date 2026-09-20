import { useState } from "react";
import "./MenuForm.css";

function MenuForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    foodName: "",
    description: "",
    category: "",
    price: "",
    image: "",
    isVeg: true,
    available: true,
    preparationTime: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);

    // Reset Form Fields
    setFormData({
      foodName: "",
      description: "",
      category: "",
      price: "",
      image: "",
      isVeg: true,
      available: true,
      preparationTime: "",
    });
  };

  return (
    <div className="menu-form-card">
      <form onSubmit={handleSubmit} className="menu-form-grid">
        
        {/* Food Name */}
        <div className="menu-form-full">
          <label className="menu-label" htmlFor="menuFoodName">Food Item Name *</label>
          <input
            id="menuFoodName"
            name="foodName"
            className="menu-input"
            placeholder="e.g. Margherita Pizza"
            value={formData.foodName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="menu-form-full">
          <label className="menu-label" htmlFor="menuDesc">Description</label>
          <textarea
            id="menuDesc"
            name="description"
            className="menu-textarea"
            placeholder="Describe the taste, ingredients, or size of this food item..."
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Category */}
        <div>
          <label className="menu-label" htmlFor="menuCat">Category / Section</label>
          <input
            id="menuCat"
            name="category"
            className="menu-input"
            placeholder="e.g. Pizza, Appetizers, Drinks"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div>
          <label className="menu-label" htmlFor="menuPrice">Price (₹) *</label>
          <input
            id="menuPrice"
            type="number"
            name="price"
            className="menu-input"
            placeholder="e.g. 299"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Prep Time */}
        <div>
          <label className="menu-label" htmlFor="menuPrep">Prep Time (Minutes)</label>
          <input
            id="menuPrep"
            name="preparationTime"
            className="menu-input"
            placeholder="e.g. 15-20 min"
            value={formData.preparationTime}
            onChange={handleChange}
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="menu-label" htmlFor="menuImg">Food Image URL</label>
          <input
            id="menuImg"
            name="image"
            className="menu-input"
            placeholder="https://images.unsplash.com/..."
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        {/* Checkboxes Veg / Availability */}
        <div className="menu-form-full">
          <div className="checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isVeg"
                className="checkbox-input"
                checked={formData.isVeg}
                onChange={handleChange}
              />
              Veg Item
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="available"
                className="checkbox-input"
                checked={formData.available}
                onChange={handleChange}
              />
              In Stock / Available
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="menu-form-full" style={{ marginTop: "1rem" }}>
          <button type="submit" className="menu-save-btn">
            Save Food Item
          </button>
        </div>

      </form>
    </div>
  );
}

export default MenuForm;