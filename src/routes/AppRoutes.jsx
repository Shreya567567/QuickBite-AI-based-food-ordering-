import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Layouts
import GuestOrCustomerLayout from "../layouts/GuestOrCustomerLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import RestaurantLayout from "../layouts/RestaurantLayout";
import AdminLayout from "../layouts/AdminLayout";

// Route protection
import RoleRoute from "./RoleRoute";

// ─── Guest / Public Pages ───
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PartnerLogin from "../pages/PartnerLogin";
import PartnerSignup from "../pages/PartnerSignup";

// ─── Customer Pages ───
import Home from "../pages/Home";
import Restaurant from "../pages/Restaurant";
import AISuggest from "../pages/AISuggest";
import Cart from "../pages/Cart";
import Profile from "../pages/Profile";
import Orders from "../pages/customer/Orders";
import Checkout from "../pages/customer/Checkout";
import PrivacySecurity from "../pages/PrivacySecurity";
import PaymentMethods from "../pages/PaymentMethods";

// ─── Restaurant Partner Pages ───
import RestaurantDashboard from "../pages/RestaurantDashboard";
import AddRestaurant from "../pages/AddRestaurant";
import MenuManagement from "../pages/MenuManagement";
import RestaurantPanel from "../pages/RestaurantPanel";
import RestaurantOrders from "../pages/restaurant/RestaurantOrders";
import RestaurantSettings from "../pages/restaurant/RestaurantSettings";
import RestaurantProfile from "../pages/restaurant/RestaurantProfile";

// ─── Admin Pages ───
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageRestaurants from "../pages/admin/ManageRestaurants";
import ManageCategories from "../pages/admin/ManageCategories";
import AdminSettings from "../pages/admin/AdminSettings";

// ─── Shared Pages ───
import Unauthorized from "../pages/shared/Unauthorized";
import NotFound from "../pages/shared/NotFound";

/**
 * SmartLanding — redirects logged-in users to their role-specific home,
 * guests see the landing page.
 */
function SmartLanding() {
  const { user, role } = useAuth();

  if (user && role === "partner") return <Navigate to="/restaurant/dashboard" replace />;
  if (user && role === "admin") return <Navigate to="/admin/dashboard" replace />;
  if (user && role === "customer") return <Navigate to="/home" replace />;

  return <Landing />;
}

/**
 * GuestOnly — redirects logged-in users away from login/signup pages.
 */
function GuestOnly({ children }) {
  const { user, role } = useAuth();

  if (user) {
    if (role === "partner") return <Navigate to="/restaurant/dashboard" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* ═══════════════════════════════════════════════
          GUEST / PUBLIC ROUTES (GuestLayout)
          ═══════════════════════════════════════════════ */}
      <Route element={<GuestOrCustomerLayout />}>
        <Route path="/" element={<SmartLanding />} />
        {/* Public browsing — accessible to everyone */}
        <Route path="/home" element={<Home />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
        <Route path="/ai-suggest" element={<AISuggest />} />
      </Route>

      {/* Auth pages — full-screen, no layout wrapper */}
      <Route path="/login" element={<GuestOnly><Login /></GuestOnly>} />
      <Route path="/signup" element={<GuestOnly><Signup /></GuestOnly>} />
      <Route path="/partner-login" element={<GuestOnly><PartnerLogin /></GuestOnly>} />
      <Route path="/partner-signup" element={<GuestOnly><PartnerSignup /></GuestOnly>} />

      {/* ═══════════════════════════════════════════════
          CUSTOMER ROUTES (CustomerLayout + RoleRoute)
          ═══════════════════════════════════════════════ */}
      <Route
        element={
          <RoleRoute allowedRoles={["customer"]}>
            <CustomerLayout />
          </RoleRoute>
        }
      >
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/privacy-security" element={<PrivacySecurity />} />
        <Route path="/profile/payment-methods" element={<PaymentMethods />} />
      </Route>

      {/* ═══════════════════════════════════════════════
          RESTAURANT PARTNER ROUTES (RestaurantLayout + RoleRoute)
          ═══════════════════════════════════════════════ */}
      <Route
        element={
          <RoleRoute allowedRoles={["partner"]}>
            <RestaurantLayout />
          </RoleRoute>
        }
      >
        <Route path="/restaurant/dashboard" element={<RestaurantDashboard />} />
        <Route path="/restaurant/add" element={<AddRestaurant />} />
        <Route path="/restaurant/menu/:restaurantId" element={<MenuManagement />} />
        <Route path="/restaurant/panel" element={<RestaurantPanel />} />
        <Route path="/restaurant/orders" element={<RestaurantOrders />} />
        <Route path="/restaurant/settings" element={<RestaurantSettings />} />
        <Route path="/restaurant/profile" element={<RestaurantProfile />} />
      </Route>

      {/* ═══════════════════════════════════════════════
          ADMIN ROUTES (AdminLayout + RoleRoute)
          ═══════════════════════════════════════════════ */}
      <Route
        element={
          <RoleRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </RoleRoute>
        }
      >
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<ManageUsers />} />
        <Route path="/admin/restaurants" element={<ManageRestaurants />} />
        <Route path="/admin/categories" element={<ManageCategories />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
      </Route>

      {/* ═══════════════════════════════════════════════
          SHARED / FALLBACK ROUTES
          ═══════════════════════════════════════════════ */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
