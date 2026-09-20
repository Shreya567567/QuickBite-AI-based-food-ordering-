import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import "./Profile.css";

const defaultMockupAddresses = [
  {
    id: "addr_home",
    type: "Home",
    text: "452 Silver Lake Blvd, Echo Park, Los Angeles, CA 90026",
    isDefault: true
  },
  {
    id: "addr_office",
    type: "Office",
    text: "One Culprit Square, Suite 400, Santa Monica, CA 90401",
    isDefault: false
  }
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(false);

  // Profile Details Edit States
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editDob, setEditDob] = useState("");

  // Address Modal States
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [addressType, setAddressType] = useState("Home");
  const [addressText, setAddressText] = useState("");
  const [editingAddressId, setEditingAddressId] = useState(null);

  // If no user is logged in, redirect to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Sync inputs with profile data when it loads/changes
  useEffect(() => {
    if (profile) {
      setEditName(profile.name || user?.displayName || "");
      setEditPhone(profile.phone || "");
      setEditDob(profile.dob || "");
    } else if (user) {
      setEditName(user.displayName || "");
    }
  }, [profile, user]);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 1024 * 1024 * 2) {
      alert("Image size should be less than 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result;
      try {
        setLoading(true);
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { photoURL: base64String }, { merge: true });
        alert("Profile picture updated successfully!");
      } catch (err) {
        alert("Failed to update profile picture: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveDetails = async (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: editName,
        phone: editPhone,
        dob: editDob,
        email: user.email,
        updatedAt: new Date().toISOString()
      }, { merge: true });

      setIsEditing(false);
      alert("Profile details updated successfully!");
    } catch (err) {
      alert("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditName(profile?.name || user?.displayName || "");
    setEditPhone(profile?.phone || "");
    setEditDob(profile?.dob || "");
    setIsEditing(false);
  };

  // Addresses Logic
  const addressesList = profile?.addresses || defaultMockupAddresses;

  const handleStartAddAddress = () => {
    setEditingAddressId(null);
    setAddressType("Home");
    setAddressText("");
    setShowAddressModal(true);
  };

  const handleStartEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddressType(addr.type);
    setAddressText(addr.text);
    setShowAddressModal(true);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    if (!addressText.trim()) {
      alert("Address details cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      let updatedAddresses = [...addressesList];

      if (editingAddressId) {
        // Edit existing address
        updatedAddresses = updatedAddresses.map((addr) =>
          addr.id === editingAddressId
            ? { ...addr, type: addressType, text: addressText }
            : addr
        );
      } else {
        // Add new address
        const newAddress = {
          id: "addr_" + Date.now(),
          type: addressType,
          text: addressText,
          isDefault: addressesList.length === 0
        };
        updatedAddresses.push(newAddress);
      }

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { addresses: updatedAddresses }, { merge: true });

      setShowAddressModal(false);
      alert(editingAddressId ? "Address updated successfully!" : "Address added successfully!");
    } catch (err) {
      alert("Failed to save address: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefaultAddress = async (id) => {
    try {
      setLoading(true);
      const updatedAddresses = addressesList.map((addr) => ({
        ...addr,
        isDefault: addr.id === id
      }));

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { addresses: updatedAddresses }, { merge: true });
    } catch (err) {
      alert("Failed to set default address: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (!editingAddressId) return;

    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      setLoading(true);
      let updatedAddresses = addressesList.filter((addr) => addr.id !== editingAddressId);

      // If we deleted the default address, set default to the first remaining one
      if (updatedAddresses.length > 0 && !updatedAddresses.some(addr => addr.isDefault)) {
        updatedAddresses[0].isDefault = true;
      }

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, { addresses: updatedAddresses }, { merge: true });

      setShowAddressModal(false);
      alert("Address deleted successfully!");
    } catch (err) {
      alert("Failed to delete address: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      alert("Logged out successfully!");
      navigate("/");
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  };

  if (!user) {
    return null;
  }

  // Display fields fallback
  const displayName = profile?.name || user.displayName || "QuickBite Foodie";
  const displayEmail = user.email || "foodie@quickbite.com";
  const displayPhone = profile?.phone || "Not provided";
  const displayDob = profile?.dob || "Not provided";
  const displayAvatar = profile?.photoURL || user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300";

  return (
    <div style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>

      {/* Hidden File Input for Avatar */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Main Container */}
      <main className="profile-main">
        <div className="profile-layout">
          
          {/* LEFT COLUMN: Header Card & Details */}
          <div className="profile-left-col">
            {/* Header Card */}
            <div className="profile-card">
              <div className="avatar-wrapper" onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
                <img
                  className="profile-avatar"
                  src={displayAvatar}
                  alt="User Profile"
                />
                <button
                  className="avatar-edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAvatarClick();
                  }}
                  aria-label="Edit profile picture"
                  disabled={loading}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>edit</span>
                </button>
              </div>

              <h1 className="profile-name">{displayName}</h1>
              <p className="profile-tag">
                {profile?.role === "partner" ? "QuickBite Partner" : "Member"}
              </p>


            </div>

            {/* Personal Details Section */}
            <div className="details-section">
              <h2 className="details-title">Personal Details</h2>
              
              {isEditing ? (
                <form onSubmit={handleSaveDetails} className="details-list">
                  <div className="form-group">
                    <label className="details-info-label" htmlFor="editName">Full Name</label>
                    <input
                      id="editName"
                      className="details-input"
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Enter your name"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label className="details-info-label">Email Address</label>
                    <input
                      className="details-input"
                      type="email"
                      value={displayEmail}
                      disabled
                      style={{ opacity: 0.7, cursor: "not-allowed" }}
                    />
                  </div>

                  <div className="form-group">
                    <label className="details-info-label" htmlFor="editPhone">Phone Number</label>
                    <input
                      id="editPhone"
                      className="details-input"
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 0123-4567"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label className="details-info-label" htmlFor="editDob">Date of Birth</label>
                    <input
                      id="editDob"
                      className="details-input"
                      type="text"
                      value={editDob}
                      onChange={(e) => setEditDob(e.target.value)}
                      placeholder="e.g. January 14, 1995"
                      disabled={loading}
                    />
                  </div>

                  <div className="edit-actions-row">
                    <button type="submit" className="details-save-btn" disabled={loading}>
                      Save
                    </button>
                    <button type="button" className="details-cancel-btn" onClick={handleCancelEdit} disabled={loading}>
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="details-list">
                  <div className="details-item">
                    <span className="material-symbols-outlined details-icon">mail</span>
                    <div>
                      <p className="details-info-label">Email Address</p>
                      <p className="details-info-val">{displayEmail}</p>
                    </div>
                  </div>

                  <div className="details-item">
                    <span className="material-symbols-outlined details-icon">phone_iphone</span>
                    <div>
                      <p className="details-info-label">Phone Number</p>
                      <p className="details-info-val">{displayPhone}</p>
                    </div>
                  </div>

                  <div className="details-item">
                    <span className="material-symbols-outlined details-icon">cake</span>
                    <div>
                      <p className="details-info-label">Date of Birth</p>
                      <p className="details-info-val">{displayDob}</p>
                    </div>
                  </div>

                  <button
                    className="details-edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Personal Info
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Addresses & Settings */}
          <div className="profile-right-col">
            {/* Saved Addresses */}
            {profile?.role !== "partner" && (
              <section>
                <div className="section-header">
                  <h2 className="section-title">Saved Addresses</h2>
                  <button
                    className="add-address-btn"
                    onClick={handleStartAddAddress}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>add</span>
                    Add New
                  </button>
                </div>

                <div className="address-grid">
                  {addressesList.map((addr) => {
                    const iconName = addr.type.toLowerCase() === "home" ? "home" :
                                     addr.type.toLowerCase() === "office" ? "work" : "location_on";
                    const iconClass = addr.type.toLowerCase() === "home" ? "home" : "work";

                    return (
                      <div className="address-card" key={addr.id}>
                        <div className={`address-icon-box ${iconClass}`}>
                          <span className="material-symbols-outlined">{iconName}</span>
                        </div>
                        <div className="address-details">
                          <h3 className="address-type">{addr.type}</h3>
                          <p className="address-text">{addr.text}</p>
                          <div className="address-actions">
                            {addr.isDefault ? (
                              <span style={{ fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase", color: "var(--primary)" }}>Default</span>
                            ) : (
                              <button
                                className="address-action-btn primary"
                                onClick={() => handleSetDefaultAddress(addr.id)}
                                disabled={loading}
                              >
                                Set as Default
                              </button>
                            )}
                            <button
                              className="address-action-btn secondary"
                              onClick={() => handleStartEditAddress(addr)}
                              disabled={loading}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* App Settings */}
            <section>
              <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>App Settings</h2>
              <div className="settings-grid">
                
                {/* Privacy & Security Link */}
                <Link to="/profile/privacy-security" className="settings-card settings-card-link">
                  <div className="settings-label-group">
                    <span className="material-symbols-outlined settings-icon">security</span>
                    <span className="settings-label">Privacy &amp; Security</span>
                  </div>
                  <span className="material-symbols-outlined settings-icon">chevron_right</span>
                </Link>

                {/* Payment Methods Link */}
                <Link to="/profile/payment-methods" className="settings-card settings-card-link">
                  <div className="settings-label-group">
                    <span className="material-symbols-outlined settings-icon">payments</span>
                    <span className="settings-label">Payment Methods</span>
                  </div>
                  <span className="material-symbols-outlined settings-icon">chevron_right</span>
                </Link>
              </div>
            </section>

            {/* Action Zone */}
            <div className="action-zone">
              <div>
                <h3 className="action-title">Manage Account</h3>
                <p className="action-desc">Update your security settings or sign out of your account.</p>
              </div>
              <button className="logout-action-btn" onClick={handleLogout}>
                <span className="material-symbols-outlined">logout</span>
                Logout
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* Address Modal Dialog Overlay */}
      {showAddressModal && (
        <div className="modal-overlay">
          <div className="address-modal">
            <h3 className="modal-title">{editingAddressId ? "Edit Address" : "Add New Address"}</h3>
            <form onSubmit={handleSaveAddress} className="modal-form">
              <div className="form-group">
                <label className="details-info-label" htmlFor="modalAddressType">Address Type</label>
                <select
                  id="modalAddressType"
                  className="select-input"
                  value={addressType}
                  onChange={(e) => setAddressType(e.target.value)}
                  disabled={loading}
                >
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label className="details-info-label" htmlFor="modalAddressText">Address Details</label>
                <textarea
                  id="modalAddressText"
                  className="textarea-input"
                  rows="3"
                  value={addressText}
                  onChange={(e) => setAddressText(e.target.value)}
                  placeholder="Enter full address details (street name, building name, CA, etc.)"
                  required
                  disabled={loading}
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="modal-save-btn" disabled={loading}>
                  Save
                </button>
                {editingAddressId && (
                  <button
                    type="button"
                    className="modal-cancel-btn"
                    style={{ borderColor: "var(--error)", color: "var(--error)" }}
                    onClick={handleDeleteAddress}
                    disabled={loading}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="button"
                  className="modal-cancel-btn"
                  onClick={() => setShowAddressModal(false)}
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
