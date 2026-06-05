# ReservaApp — Workspace Reservation System

## Description

Single Page Application (SPA) built with Vanilla JavaScript and Vite for managing shared workspace reservations. Includes authentication, role-based access control, session persistence, and full CRUD operations against a mock REST API powered by json-server.

## Technologies Used

- HTML5 / CSS3 (inline styles via JS templates)
- JavaScript ES6 Modules
- Vite (bundler)
- json-server (mock REST API)
- localStorage (session persistence)
- History API (SPA routing)

## Installation

```bash
npm install
```

## Running the Project

```bash
npm run dev
```

This command starts both Vite (http://localhost:5173) and json-server (http://localhost:3001) concurrently.

## Running json-server Manually (optional)

```bash
npx json-server --watch db.json --port 3001
```

## Test Users

| Role  | Email           | Password |
|-------|-----------------|----------|
| Admin | admin@test.com  | A123456  |
| User  | user@test.com   | A123456  |
| User  | user2@test.com  | A123456  |

## Project Structure

```
src/
  api/           → http.js (fetch wrapper)
  components/    → Sidebar.js, ReservationCard.js
  controllers/   → login.controller.js, home.controller.js, admin.controller.js
  router/        → router.js (History API routing + route guards)
  services/      → reservation.service.js (CRUD methods)
  views/         → loginView.js, homeView.js, adminView.js, notFound.js
  utils.js       → session helpers (save, get, remove, isAuthenticated, isAdmin)
  main.js        → entry point
db.json          → json-server database (users + reservations)
```

## Role Permissions

### Admin
- View all reservations
- Create / Edit / Delete any reservation
- Approve or reject reservations

### User
- Create reservations (status starts as "pending")
- View only their own reservations
- Edit their own pending reservations
- Cancel their own pending or approved reservations

## Technical Decisions

- **No render() pattern**: views return HTML strings directly, controllers attach events via `setTimeout` after DOM injection.
- **History API routing**: `navigateTo()` uses `history.pushState` + router re-evaluation for clean URLs without page reload.
- **Route guards in router**: authentication and role checks are centralized in `router.js`, not scattered across views.
- **Inline styles**: avoids Tailwind compilation dependency, keeping the project straightforward and portable.
- **Session in localStorage**: persists across page refreshes; only stores id, name, and role (never the password).
