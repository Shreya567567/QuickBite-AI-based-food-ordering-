// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { addRestaurant } from "../services/restaurantService";
// import { useAuth } from "../context/AuthContext";

// export default function AddRestaurant() {
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   const [name, setName] = useState("");
//   const [cuisine, setCuisine] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !cuisine) {
//       alert("Please fill in required fields.");
//       return;
//     }

//     try {
//       setLoading(true);
//       await addRestaurant({
//         name,
//         cuisine,
//         address,
//         ownerId: user.uid,
//         img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400"
//       });
//       alert("Restaurant added successfully!");
//       navigate("/restaurant-dashboard");
//     } catch (err) {
//       alert("Error adding restaurant: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "30px", maxWidth: "500px", margin: "0 auto", textAlign: "left" }}>
//       <h1>Add Restaurant</h1>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
//         <div>
//           <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Restaurant Name *</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
//           />
//         </div>
//         <div>
//           <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Cuisine *</label>
//           <input
//             type="text"
//             value={cuisine}
//             onChange={(e) => setCuisine(e.target.value)}
//             placeholder="e.g. Indian, Chinese, Italian"
//             required
//             style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
//           />
//         </div>
//         <div>
//           <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Address</label>
//           <input
//             type="text"
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
//           />
//         </div>
//         <button type="submit" disabled={loading} style={{ padding: "12px", backgroundColor: "var(--primary-container)", color: "white", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
//           {loading ? "Adding..." : "Add Restaurant"}
//         </button>
//       </form>
//     </div>
//   );
// }


import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import RestaurantForm from "../components/RestaurantForm";
import { addRestaurant } from "../services/restaurantService";

function AddRestaurant() {

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleAddRestaurant = async (formData) => {

    try {

      await addRestaurant({
        ...formData,
        ownerId: user.uid,
        verified: false,
        rating: 0,
        totalReviews: 0,
        isOpen: true,
      });

      alert("Restaurant Added Successfully");

      navigate("/restaurant/dashboard");

    } catch (error) {

      alert(error.message);

    }

  };

  return (

    <div style={{ padding: "30px" }}>

      <h1>Add Restaurant</h1>

      <RestaurantForm
        onSubmit={handleAddRestaurant}
      />

    </div>

  );

}

export default AddRestaurant;