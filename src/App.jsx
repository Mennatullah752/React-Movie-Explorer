import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Film } from "lucide-react";

// 404 Not Found Page
const NotFound = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
    <div className="w-16 h-16 rounded-2xl bg-[#1C202B] border border-[#252B3A] flex items-center justify-center text-accent mb-4">
      <Film className="w-8 h-8" />
    </div>
    <h1 className="text-4xl font-extrabold text-white mb-2">404</h1>
    <p className="text-textSecondary mb-6">Page not found</p>
    <Link
      to="/"
      className="bg-accent text-darkBg font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-accentHover transition-colors"
    >
      Return Home
    </Link>
  </div>
);

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-[#0F1117] text-white flex flex-col selection:bg-accent selection:text-darkBg">
          {/* Persistent Navbar across all pages */}
          <Navbar />

          {/* Main Routing View */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Persistent Footer */}
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
