# QuickBite

QuickBite is a React-based food discovery and ordering platform. Customers can discover nearby restaurants, browse menus, get meal suggestions, manage a cart, place orders, and update their profile. Restaurant partners can manage their restaurants, menus, orders, and settings, while administrators can manage users, restaurants, categories, and platform settings.

The application is built as a Vite single-page application and uses Firebase for authentication and application data. Geoapify powers location-based restaurant search and nearby restaurant discovery.

## Features

### Customer experience

- Browse restaurants and food categories without signing in
- Search and discover nearby restaurants using the current location
- View restaurant details and menu items
- Use the AI Suggest experience to get food and restaurant recommendations
- Add items to a cart and complete checkout
- View order history and manage personal profile information

### Restaurant partner experience

- Register and sign in as a restaurant partner
- Add and manage restaurant information
- Manage restaurant menu items and availability
- View and manage incoming orders
- Access restaurant profile and settings pages

### Administration

- View the administrator dashboard
- Manage users, restaurants, and food categories
- Access platform settings
- Protect administrative pages with role-based routing

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
