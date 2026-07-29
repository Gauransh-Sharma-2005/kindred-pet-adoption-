# Kindred — Smart Pet Adoption Platform

Converted from the original single-file HTML/Babel prototype into a proper
two-service project:

```
kindred/
├── backend/    Express API + SQLite database (better-sqlite3)
└── frontend/   Vite + React app (component-per-file)
```

## What changed from the original prototype

- **Data**: the hardcoded `petData` array now lives in a SQLite database
  (`backend/kindred.db`), seeded from `backend/seed.js`. The backend uses
  Node's built-in `node:sqlite` module (no `better-sqlite3`/native
  compilation, so no Visual Studio / build-tools requirement on Windows —
  just Node.js 22.5+). It's still marked experimental by Node, so you'll
  see a one-line `ExperimentalWarning` in the console; that's expected and
  harmless. To silence it: `node --no-warnings server.js`.
- **State that used to live in `localStorage`** (favorites) now lives in
  the database too, keyed by an anonymous per-browser session id, so it
  survives across devices/browsers pointed at the same backend. Dark-mode
  preference stays in `localStorage` since it's a pure UI preference.
- **Adoption applications** are persisted to an `adoption_applications`
  table instead of just popping a success modal and discarding the data.
  Submitting an application also flips the pet's status to `Reserved`.
- **Full pet CRUD**: an "+ Add Pet" button in the navbar opens a form to
  create a new pet (server auto-generates its `KND-YYYY-NNN` id); the pet
  detail page has **Edit** (same form, prefilled) and **Delete** buttons.
  Deleting a pet also cleans up its adoption applications and favorites.
- **Components**: `Navbar`, `Hero`, `QRCodeGenerator`, `SearchBar`,
  `SkeletonCard`, `PetCard`, `PetDetails`, `AdoptionModal`, `SuccessModal`,
  and `Footer` are now separate files under `frontend/src/components/`.
- Inline `<style>` block moved to `frontend/src/index.css`.

## Running it locally

### 1. Backend (Express + SQLite)

```bash
cd backend
npm install
npm run seed     # creates kindred.db and loads the 12 sample pets
npm start         # http://localhost:4000
```

Useful endpoints:

| Method | Path                        | Purpose                                   |
|--------|-----------------------------|--------------------------------------------|
| GET    | `/api/pets`                 | List pets (`?query=&species=&gender=`)     |
| GET    | `/api/pets/:id`              | Single pet detail                          |
| POST   | `/api/pets`                  | Create a pet (`name`, `species` required)  |
| PUT    | `/api/pets/:id`               | Update a pet (partial updates allowed)     |
| DELETE | `/api/pets/:id`               | Delete a pet (and its applications/favorites) |
| POST   | `/api/adoptions`             | Submit an application `{petId,name,phone,livingEnvironment}` |
| GET    | `/api/adoptions`             | List all applications (shelter-side view)  |
| GET    | `/api/favorites/:sessionId`  | Get a browser's saved favorites            |
| PUT    | `/api/favorites/:sessionId`  | Replace a browser's saved favorites        |

### 2. Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

The dev server proxies `/api/*` to `http://localhost:4000` (see
`vite.config.js`), so just run both servers side by side and open
`http://localhost:5173`.

### Production build

```bash
cd frontend
npm run build     # outputs static files to frontend/dist
```

Deploy `frontend/dist` behind any static host, set `VITE_API_URL` at
build time to point at your deployed backend's origin (e.g.
`VITE_API_URL=https://api.yoursite.com npm run build`), and run the
backend (`node server.js`) wherever you like — it just needs a writable
disk for `kindred.db`.

## Notes / things you may want to extend

- There's no auth — the `favorites` API keys off an anonymous
  browser-generated id stored in `localStorage`, not a real account.
- `adoption_applications` is a simple queue; there's no admin UI to
  review/approve them yet, just the `GET /api/adoptions` endpoint.
- `better-sqlite3` is synchronous, which is fine for an app this size,
  but swap to a pooled async driver if you expect heavy concurrent load.
