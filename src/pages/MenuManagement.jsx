import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import MenuForm from "../components/MenuForm";

import {
  addMenu,
  getMenusByRestaurant,
} from "../services/menuService";

function MenuManagement() {

  const { restaurantId } = useParams();

  const [menus, setMenus] = useState([]);

  const loadMenus = async () => {
    const data = await getMenusByRestaurant(restaurantId);
    setMenus(data);
  };

  useEffect(() => {
    loadMenus();
  }, []);

  const handleAddMenu = async (menu) => {

    await addMenu({
      ...menu,
      restaurantId,
    });

    await loadMenus();

  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Menu Management</h1>

      <MenuForm onSubmit={handleAddMenu} />

      <hr />

      <h2>Food Items</h2>

      {menus.length === 0 ? (
        <p>No food added yet.</p>
      ) : (
        menus.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <h3>{item.foodName}</h3>

            <p>{item.description}</p>

            <p>₹ {item.price}</p>

            <p>{item.category}</p>

            <p>{item.isVeg ? "Veg" : "Non-Veg"}</p>

          </div>
        ))
      )}

    </div>
  );
}

export default MenuManagement;