# 🍔 QuickBite

### Discover. Decide. Order. — A Smarter Way to Find Your Next Meal.

QuickBite is a **location-aware, AI-assisted food discovery and ordering platform** built to make food selection faster, more personalized, and more convenient.

Instead of simply showing users a list of restaurants, QuickBite focuses on a more important question:

> **"What should I eat right now?"**

Users can discover nearby restaurants, explore menus, get personalized food suggestions through the **AI Suggest** experience, manage their cart, place orders, and manage their profiles.

At the same time, QuickBite provides dedicated experiences for **customers, restaurant partners, and administrators**, creating a complete food-tech ecosystem within a single application.

---

## 🚀 Why QuickBite?

Traditional food ordering often requires users to:

1. Search for restaurants
2. Browse multiple menus
3. Compare food items
4. Decide what they are craving
5. Finally place an order

QuickBite focuses on reducing this decision-making effort.

### 💡 The Core Idea

QuickBite combines:

**📍 Location Awareness**  
+  
**🤖 Personalized Food Suggestions**  
+  
**🍽️ Restaurant Discovery**  
+  
**🛒 Seamless Ordering**  
+  
**👥 Role-Based Platform Architecture**

into one unified experience.

> **Less searching. Less decision fatigue. Faster food discovery.**

---

# ✨ Features

## 👤 Customer Experience

### 📍 Nearby Restaurant Discovery

Discover restaurants based on the user's current location using **Geoapify APIs**.

- Location-based restaurant search
- Nearby restaurant discovery
- Browser location integration
- Restaurant and food exploration

### 🤖 AI Suggest — Personalized Food Discovery

One of QuickBite's core differentiators is the **AI Suggest** experience.

Instead of forcing users to manually search through multiple restaurants, QuickBite guides them through preference-based questions such as:

- What's your vibe today?
- Veg or non-veg?
- Healthy, spicy, sweet, or surprise?
- What's your spending mood?
- When do you want your meal?

These preferences are used to provide more relevant food and restaurant suggestions.

### Example

> **"I'm hungry, want something spicy, non-veg, and under ₹500."**

Instead of manually exploring multiple restaurants, QuickBite uses these preferences as the starting point for food discovery.

---

### 🍽️ Restaurant & Menu Discovery

Users can:

- Browse restaurants
- Explore restaurant details
- View menus
- Explore food categories
- Check available menu items
- Select items for ordering

---

### 🛒 Cart & Checkout

Customers can:

- Add food items to their cart
- Modify cart selections
- Review their order
- Proceed through checkout
- Place orders

---

### 📦 Order History

Customers can access their previous orders and manage their ordering activity from their account.

---

### 👤 Profile Management

Users can manage their personal profile information through a dedicated customer profile experience.

---

# 🏪 Restaurant Partner Experience

QuickBite is not only designed for customers.

Restaurant partners receive a dedicated platform experience to manage their business.

### 🏪 Restaurant Management

Partners can:

- Add restaurant information
- Manage restaurant profiles
- Update restaurant details
- Access restaurant settings

### 🍴 Menu Management

Partners can:

- Add menu items
- Update menu items
- Manage item availability
- Maintain their restaurant menu

### 📦 Order Management

Restaurant partners can:

- View incoming orders
- Manage restaurant orders
- Access order-related workflows

This creates a complete restaurant-side operational experience within the same application.

---

# 🛡️ Administration

QuickBite includes a dedicated administrator experience for managing the overall platform.

Administrators can:

- 📊 Access the admin dashboard
- 👥 Manage users
- 🏪 Manage restaurants
- 🍔 Manage food categories
- ⚙️ Manage platform settings

Administrative routes are protected using **role-based access control**.

---

# 🔐 Role-Based Architecture

QuickBite uses a role-aware architecture to separate experiences between different types of users.

### Supported Roles

| Role | Access |
|------|--------|
| 👤 `customer` | Food discovery, AI suggestions, cart, checkout, orders, profile |
| 🏪 `partner` | Restaurant management, menu management, orders, settings |
| 🛡️ `admin` | Platform administration, users, restaurants, categories, settings |

After authentication, QuickBite retrieves the user's profile from Firestore and determines the appropriate application experience based on the user's `role`.

### Why this matters

Instead of exposing every page to every user, QuickBite provides:

- Role-specific navigation
- Role-specific layouts
- Protected routes
- Separated workflows
- Better scalability
- Better maintainability

---

# 🧠 What Makes QuickBite Different?

QuickBite is built around a simple observation:

> **People don't always know what they want to eat — they know how they feel.**

Traditional restaurant search starts with:

```text
Restaurant → Menu → Food → Decision

## Technology Stack

- **Frontend:** React 19
- **Build tool:** Vite 8
- **Routing:** React Router DOM 7
- **Authentication and database:** Firebase Authentication and Cloud Firestore
- **Location and restaurant discovery:** Geoapify APIs
- **Code quality:** ESLint

## Prerequisites

Install the following before running the project:

- Node.js 18 or newer
- npm
- A Firebase project with Authentication and Cloud Firestore enabled
- A Geoapify API key for location and nearby restaurant search

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root. Vite exposes only variables prefixed with `VITE_` to the browser, so use the following names:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_GEOAPIFY_API_KEY=your_geoapify_api_key
```

Get the Firebase values from **Firebase Console > Project settings > Your apps**. Get the Geoapify value from the Geoapify dashboard.

Do not commit `.env` files or API keys to source control. Restart the Vite server after changing environment variables.

### 3. Configure Firebase

In Firebase Console:

1. Create or select a Firebase project.
2. Register a web application and copy its configuration values into `.env`.
3. Enable the sign-in providers used by the application, including email/password and Google authentication when Google sign-in is enabled for the project.
4. Create a Cloud Firestore database.
5. Configure Firestore security rules appropriate for your deployment. The application expects user profiles and operational data to be available to the authenticated roles.

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Application Routes

### Public routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page with role-aware redirection |
| `/home` | Restaurant and food discovery |
| `/restaurant/:id` | Restaurant details and menu |
| `/ai-suggest` | Food and restaurant suggestions |
| `/login` | Customer login |
| `/signup` | Customer registration |
| `/partner-login` | Restaurant partner login |
| `/partner-signup` | Restaurant partner registration |

### Customer routes

`/cart`, `/orders`, `/checkout`, and `/profile` require the `customer` role.

### Restaurant partner routes

The partner area includes `/restaurant/dashboard`, `/restaurant/add`, `/restaurant/menu/:restaurantId`, `/restaurant/panel`, `/restaurant/orders`, `/restaurant/settings`, and `/restaurant/profile`. These routes require the `partner` role.

### Admin routes

The admin area includes `/admin/dashboard`, `/admin/users`, `/admin/restaurants`, `/admin/categories`, and `/admin/settings`. These routes require the `admin` role.

Unauthenticated or unauthorized users are redirected through the protected route components, with fallback pages at `/unauthorized` and for unknown routes.

## Project Structure

```text
src/
├── components/       Reusable UI components and forms
├── context/          Authentication and cart state providers
├── data/             Seed and cached restaurant/food data
├── firebase/         Firebase app, Auth, and Firestore initialization
├── hooks/            Shared React hooks
├── layouts/          Guest, customer, partner, and admin layouts
├── pages/            Route-level screens grouped by user role
├── routes/           Application routes and role protection
├── services/         Firebase, Geoapify, restaurant, menu, and user APIs
├── App.jsx           Root application component
├── App.css           Application-level styles
└── index.css         Global styles and design tokens
```

## Data and Roles

Authentication is handled by Firebase Authentication. After sign-in, QuickBite listens to the signed-in user's Firestore profile and uses its `role` field to determine access. The supported roles are:

- `customer`
- `partner`
- `admin`

Restaurant records are stored in the `restaurants` Firestore collection. User profiles and menu/order data are accessed through the service modules in `src/services`. Keep Firestore rules aligned with these role boundaries before deploying publicly.

## Development Notes

- Public browsing routes can render without a signed-in user, but customer, partner, and admin workflows are protected.
- Nearby restaurant search requires browser location permission and a valid Geoapify key.
- Firebase configuration is read at build time through `import.meta.env`.
- The `src/data/` directory contains local food and restaurant data used by parts of the discovery experience and cached data flows.

## Production Build

Build and locally preview the application with:

```bash
npm run build
npm run preview
```

For deployment, configure the same environment variables in the hosting provider and rewrite application routes to `index.html` so React Router can handle direct navigation to nested routes.

## Troubleshooting

### Firebase configuration errors

Verify that all `VITE_FIREBASE_*` values are present, the Firebase web app is registered, and the required authentication provider is enabled. Restart the development server after editing `.env`.

### Nearby restaurants do not load

Check that `VITE_GEOAPIFY_API_KEY` is valid, the browser has location permission, and the Geoapify account allows the requested API calls.

### A protected page redirects unexpectedly

Confirm that the signed-in user's profile exists in the Firestore `users` collection and that its `role` field is exactly `customer`, `partner`, or `admin` as appropriate.

## License

No license has been specified for this project yet.
