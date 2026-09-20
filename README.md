# QuickBite

> Discover what you are craving. Decide with confidence. Order without the guesswork.

QuickBite is a smart, personalized food discovery and ordering platform designed to make choosing what to eat as effortless as ordering it.

Unlike traditional food delivery platforms that focus primarily on restaurant listings, QuickBite brings **personalized food suggestions, preference-based discovery, location-aware restaurant search, and seamless ordering** into one unified experience.

Built with **React and Vite**, QuickBite uses **Firebase** for authentication and application data, while **Geoapify** powers location-aware restaurant discovery and nearby food search.

## Contents

- [What Makes QuickBite Unique](#what-makes-quickbite-unique)
- [Features](#features)
- [How It Works](#how-it-works)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Application Routes](#application-routes)
- [Project Structure](#project-structure)
- [Authentication and Roles](#authentication-and-roles)
- [Available Scripts](#available-scripts)
- [Production Build](#production-build)
- [Troubleshooting](#troubleshooting)
- [Project Vision](#project-vision)

## What Makes QuickBite Unique

### AI-Powered Food Discovery

QuickBite helps users answer the familiar question, **"What should I eat?"**, through its **AI Suggest** experience. Suggestions are shaped around the user's mood, cravings, food preferences, budget, and occasion.

### Personalized Recommendations

Instead of asking users to browse endless restaurant and menu listings, QuickBite lets them describe what they want right now:

| Preference | Available choices |
| --- | --- |
| **Mood** | Need Comfort, Feeling Energetic, Celebrating Something, Just Hungry |
| **Food preference** | Veg Goodness, Non-Veg Lover |
| **Experience** | Keep It Healthy, Turn Up the Spice, Satisfy My Sweet Tooth, Surprise Me |
| **Budget** | Budget Bites, Great Value, Treat Yourself, Money Doesn't Matter |

This turns food ordering from a basic search task into a personalized food discovery experience.

### Location-Based Restaurant Discovery

QuickBite uses the user's location to surface nearby restaurants and food options, making discovery more relevant to where they are.

### Discover, Decide, Order

QuickBite connects the complete food journey:

**Discover restaurants -> Explore menus -> Get personalized suggestions -> Add to cart -> Checkout**

### A More Personal Customer Experience

Customers can manage their profile, cart, preferences, and order history in one place, creating a consistent experience from discovery through ordering.

## Features

### Customer Features

- Browse restaurants and food categories without signing in
- Discover nearby restaurants through location-based search
- Explore restaurant details and menu items
- Get personalized food and restaurant recommendations through **AI Suggest**
- Find food based on mood, cravings, dietary preferences, occasion, and budget
- Add meals to the cart and complete checkout
- View previous orders and order history
- Manage personal profile information

### Restaurant Partner Features

- Register and sign in as a restaurant partner
- Add and manage restaurant information
- Manage menu items and item availability
- View and manage incoming orders
- Access restaurant profile and settings

### Admin Features

- View the administrator dashboard
- Manage users, restaurants, and food categories
- Access platform settings
- Protect administrative workflows with role-based routing

## How It Works

1. **Discover:** Browse food categories, restaurants, and nearby options.
2. **Describe your craving:** Select preferences such as mood, food type, experience, and budget.
3. **Decide:** Review suggestions and explore the recommended restaurant or menu.
4. **Order:** Add items to the cart and complete checkout.
5. **Track your history:** Review previous orders and manage your profile.

## Technology Stack

- **Frontend:** React 19
- **Build tool:** Vite 8
- **Routing:** React Router DOM 7
- **Authentication:** Firebase Authentication
- **Application data:** Cloud Firestore
- **Location and nearby search:** Geoapify APIs
- **Architecture:** Single-page application (SPA)
- **Code quality:** ESLint

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js 18 or newer
- npm
- A Firebase project with Authentication and Cloud Firestore enabled
- A Geoapify API key for location and nearby restaurant search

### Installation

Clone the repository, move into the project directory, and install dependencies:

```bash
git clone <repository-url>
cd quickbite
npm install
```

### Configure Firebase and Geoapify

Create a `.env` file in the project root using the variables below, then start the development server:

```bash
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

## Environment Variables

Create `.env` in the project root:

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

> Never commit `.env` files or API keys to source control. Restart the Vite server after changing environment variables because they are read at build time.

### Firebase Setup

1. Create or select a Firebase project.
2. Register a web application and copy its configuration values into `.env`.
3. Enable the authentication providers used by the application, including email/password and Google authentication when Google sign-in is enabled for the project.
4. Create a Cloud Firestore database.
5. Configure Firestore security rules for the customer, partner, and admin access patterns used by your deployment.

## Application Routes

### Public Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page with role-aware redirection |
| `/home` | Restaurant and food discovery |
| `/restaurant/:id` | Restaurant details and menu |
| `/ai-suggest` | Personalized food and restaurant suggestions |
| `/login` | Customer login |
| `/signup` | Customer registration |
| `/partner-login` | Restaurant partner login |
| `/partner-signup` | Restaurant partner registration |

### Customer Routes

| Route | Purpose |
| --- | --- |
| `/cart` | Review selected menu items |
| `/orders` | View order history |
| `/checkout` | Complete an order |
| `/profile` | Manage customer profile |

These routes require the `customer` role.

### Restaurant Partner Routes

| Route | Purpose |
| --- | --- |
| `/restaurant/dashboard` | Partner dashboard |
| `/restaurant/add` | Add a restaurant |
| `/restaurant/menu/:restaurantId` | Manage a restaurant menu |
| `/restaurant/panel` | Restaurant operations panel |
| `/restaurant/orders` | Manage incoming orders |
| `/restaurant/settings` | Restaurant settings |
| `/restaurant/profile` | Restaurant partner profile |

These routes require the `partner` role.

### Admin Routes

| Route | Purpose |
| --- | --- |
| `/admin/dashboard` | Administration dashboard |
| `/admin/users` | Manage users |
| `/admin/restaurants` | Manage restaurants |
| `/admin/categories` | Manage food categories |
| `/admin/settings` | Platform settings |

These routes require the `admin` role. Unauthorized users are redirected to `/unauthorized`, and unknown routes are handled by the not-found page.

## Project Structure

```text
quickbite/
├── public/                 Static public assets
├── src/
│   ├── components/         Reusable UI components and forms
│   ├── context/            Authentication and cart state providers
│   ├── data/               Food, restaurant, and cached discovery data
│   ├── firebase/           Firebase app, Auth, and Firestore setup
│   ├── hooks/              Shared React hooks
│   ├── layouts/            Guest, customer, partner, and admin layouts
│   ├── pages/              Route-level screens grouped by role
│   ├── routes/             Application routes and role protection
│   ├── services/            Firebase, Geoapify, restaurant, menu, and user APIs
│   ├── App.jsx             Root application component
│   ├── App.css             Application-level styles
│   └── index.css           Global styles and design tokens
├── index.html              SPA entry HTML
├── package.json             Dependencies and npm scripts
├── vite.config.js           Vite configuration
└── eslint.config.js         ESLint configuration
```

## Authentication and Roles

Firebase Authentication handles sign-in and registration. After authentication, QuickBite listens to the signed-in user's profile in the Firestore `users` collection and uses the `role` field to determine access.

Supported roles:

- `customer` - Can browse, order, manage a cart, and view order history.
- `partner` - Can manage restaurants, menus, orders, and partner settings.
- `admin` - Can manage users, restaurants, categories, and platform settings.

Restaurant records are stored in the `restaurants` Firestore collection. Menu, user, and order operations are organized in the service modules under `src/services`. Keep Firestore security rules aligned with these role boundaries before deploying publicly.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server with hot module replacement |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Production Build

Build and preview the production bundle locally:

```bash
npm run build
npm run preview
```

For deployment:

- Configure the same `VITE_*` environment variables in the hosting provider.
- Rewrite application routes to `index.html` so React Router can handle direct navigation to nested routes.
- Configure Firebase Authentication domains and Firestore security rules for the deployed domain.
- Restrict and monitor Geoapify API usage according to the deployment requirements.

## Troubleshooting

### Firebase configuration errors

Check that every `VITE_FIREBASE_*` value is present, the Firebase web app is registered, and the required authentication provider is enabled. Restart the development server after editing `.env`.

### Nearby restaurants do not load

Check that `VITE_GEOAPIFY_API_KEY` is valid, the browser has location permission, and the Geoapify account permits the requested API calls.

### A protected page redirects unexpectedly

Confirm that the signed-in user's profile exists in the Firestore `users` collection and that its `role` field is exactly `customer`, `partner`, or `admin`.

### Direct links return a 404 after deployment

Configure the hosting provider to serve `index.html` for unknown application routes. This is required for client-side routing in a single-page application.

## Project Vision

QuickBite aims to go beyond traditional food ordering by becoming a **personalized food companion** that understands what users want to eat and helps them discover the right food at the right time.

## License

No license has been specified for this project yet.
