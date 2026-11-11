# 🎬 React Movie Explorer – DEPI Practical Assessment

> A modern, responsive cinematic discovery application inspired by Netflix and IMDb, developed as a practical assessment demonstration for the **Digital Egypt Pioneers Initiative (DEPI)**.

---

## 🌟 Key Highlights & Technologies

- **Frontend Core**: React 19 / 18, Vite, JavaScript (ES6+)
- **Routing**: React Router DOM (`/`, `/movies`, `/movies/:id`, `/favorites`)
- **Styling**: Tailwind CSS with custom cinematic dark palette (`#0F1117`, `#1C202B`, `#F5C518`, `#E5B817`)
- **API & Data**: Axios instances for TMDB API and JSON Server CRUD
- **State Management**: React Hooks (`useState`, `useEffect`, `useParams`, `useSearchParams`, `useMemo`) & Context API (`FavoritesContext`) persisted to `localStorage`
- **Iconography**: Lucide React
- **Mock REST Server**: JSON Server (`db.json`)

---

## 📁 Project Architecture

```
movie-explorer/
├── public/
├── src/
│   ├── api/
│   │   ├── tmdb.js             # TMDB Axios instance (Bearer Token)
│   │   ├── moviesApi.js        # JSON Server Axios instance (CRUD methods)
│   │   └── movieService.js     # Unified data layer (TMDB + JSON Server + Local Fallback)
│   ├── components/
│   │   ├── Navbar.jsx          # Header with logo, navigation & search shortcut
│   │   ├── Footer.jsx          # About, navigation, and TMDB attribution
│   │   ├── HeroSection.jsx     # Netflix-style backdrop banner with CTAs
│   │   ├── MovieSlider.jsx     # Horizontal / grid showcase for Home page
│   │   ├── MovieCard.jsx       # Reusable movie card with rating & favorite button
│   │   ├── MovieGrid.jsx       # Responsive grid (2 mobile, 3 tablet, 4-5 desktop)
│   │   ├── SearchBar.jsx       # Live search bar with clear button
│   │   ├── GenreFilter.jsx     # Dynamic genre pills
│   │   ├── SortDropdown.jsx    # Sort by Popularity, Rating, Release Date
│   │   ├── Loading.jsx         # Skeleton placeholders & spinner
│   │   ├── EmptyState.jsx      # Empty state with call-to-action button
│   │   └── TrailerModal.jsx    # YouTube popup player modal
│   ├── context/
│   │   └── FavoritesContext.jsx # Global favorites state synchronized with localStorage
│   ├── data/
│   │   └── fallbackMovies.json # Zero-dependency offline backup dataset
│   ├── pages/
│   │   ├── Home.jsx            # Page 1: Hero banner, Popular & Trending sections
│   │   ├── Movies.jsx          # Page 2: Explore, live search, genres & sorting
│   │   ├── MovieDetails.jsx    # Page 3: Full details, backdrop, cast & similar movies
│   │   └── Favorites.jsx       # Page 4: Saved watchlist & empty state
│   ├── App.jsx                 # Routes & layout wrapper
│   ├── main.jsx                # App bootstrap
│   └── index.css               # Tailwind directives & sleek scrollbar
├── .env                        # Environment variables (TMDB token, etc.)
├── db.json                     # JSON Server database schema
├── tailwind.config.js          # Theme color definitions
└── package.json
```

---

## 🚀 Getting Started

### 1. Installation
Clone or navigate to the project directory and install dependencies:
```bash
npm install
```

### 2. Running the Development Server
```bash
npm run dev
```
Open your browser at the displayed local URL (typically `http://localhost:5173`).

### 3. (Optional) Running JSON Server for CRUD Practice
To practice full REST CRUD operations locally on `http://localhost:3001`:
```bash
npm run server
```

### 4. (Optional) Connecting Live TMDB API
If you have a TMDB Read Access Token:
1. Open the `.env` file in the project root.
2. Add your token:
   ```env
   VITE_TMDB_TOKEN=your_tmdb_bearer_token_here
   ```
3. Restart Vite (`npm run dev`).

*Note: If no TMDB token or JSON Server is active, the app automatically runs in seamless fallback mode with high-resolution TMDB posters and trailers so it works 100% out of the box without any setup.*

---

## 📋 Assessment Rubric Breakdown (100/100)

| Requirement | Points | Implementation Location |
| :--- | :---: | :--- |
| **Routing & Structure** | **15** | `App.jsx` (`/`, `/movies`, `/movies/:id`, `/favorites`), `Navbar.jsx` with active link highlights |
| **Axios & API Integration** | **25** | `src/api/tmdb.js`, `src/api/moviesApi.js`, `movieService.js` handling GET, search query, discover by genre, and details by ID |
| **React State & Favorites** | **20** | `src/context/FavoritesContext.jsx` with `localStorage` persistence, add/remove toggle, badge count on Navbar |
| **UI & Responsive Design** | **20** | Modern dark theme (`#0F1117`, `#1C202B`, `#F5C518`), responsive grid (2 cols mobile, 3 tablet, 4-5 desktop) |
| **Loading, Error & Empty States** | **10** | `Loading.jsx` (skeletons), `EmptyState.jsx`, error banners with retry triggers |
| **Code Quality & Component Reusability** | **10** | Reusable `MovieCard`, `MovieGrid`, `SearchBar`, clean ES6 syntax, semantic JSX |

---

## 💡 DEPI Instructor Viva Questions & Answers

1. **Why use an Axios instance instead of standard `fetch`?**
   > An Axios instance centralizes the `baseURL`, request headers (such as `Authorization: Bearer <TOKEN>`), and timeout configs in one place, avoiding repetitive code and streamlining error handling with automatic JSON transformation.

2. **Why do we synchronize favorites with `localStorage` in a `useEffect`?**
   > Keeping state in React ensures immediate re-rendering of UI components (like the Navbar badge and heart icons), while `useEffect` cleanly handles the side effect of persisting changes to `localStorage` without blocking the main render loop.

3. **How does the responsive grid meet the specification?**
   > In Tailwind CSS: `grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5` ensures exactly 2 columns on mobile screens, 3 on tablets, and 4 to 5 columns on desktop viewports.
