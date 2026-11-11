import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Film, Heart, Search, Menu, X, Clapperboard } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const { favoritesCount } = useFavorites();
  const navigate = useNavigate();

  const handleQuickSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/movies?search=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch("");
      setShowSearchInput(false);
      setMobileMenuOpen(false);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
      isActive
        ? "text-accent after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-accent after:rounded"
        : "text-textSecondary hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0F1117]/95 backdrop-blur-md border-b border-[#1C202B]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E5B817] to-amber-300 flex items-center justify-center text-darkBg shadow-lg shadow-accent/20 group-hover:scale-105 transition-transform duration-200">
              <Clapperboard className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-accent transition-colors">
                Movie<span className="text-accent">Explorer</span>
              </span>
              <span className="text-[10px] text-textSecondary uppercase tracking-widest -mt-1 font-medium">
                Cinema Discovery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/movies" className={navLinkClass}>
              Explore Movies
            </NavLink>
            <NavLink to="/favorites" className={navLinkClass}>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Favorites</span>
              {favoritesCount > 0 && (
                <span className="ml-1 bg-accent text-darkBg font-bold text-xs px-2 py-0.5 rounded-full shadow">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
          </div>

          {/* Right Header Actions: Search & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Quick Search Toggle / Input */}
            <div className="relative">
              {showSearchInput ? (
                <form
                  onSubmit={handleQuickSearchSubmit}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    value={quickSearch}
                    onChange={(e) => setQuickSearch(e.target.value)}
                    placeholder="Search movies..."
                    autoFocus
                    className="w-48 sm:w-64 bg-[#1C202B] text-white text-sm rounded-full pl-4 pr-9 py-1.5 border border-amber-500/30 focus:outline-none focus:border-accent shadow-inner transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSearchInput(false)}
                    className="absolute right-2.5 text-textSecondary hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  aria-label="Search"
                  className="p-2.5 rounded-full bg-[#1C202B] text-textSecondary hover:text-accent hover:bg-[#252B3A] transition-all"
                >
                  <Search className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-[#1C202B] text-textSecondary hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#161922] border-b border-[#252B3A] px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <NavLink
            to="/"
            end
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-[#1C202B] hover:text-accent transition-colors"
          >
            Home
          </NavLink>
          <NavLink
            to="/movies"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-[#1C202B] hover:text-accent transition-colors"
          >
            Explore Movies
          </NavLink>
          <NavLink
            to="/favorites"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-[#1C202B] hover:text-accent transition-colors"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Favorites</span>
            </div>
            {favoritesCount > 0 && (
              <span className="bg-accent text-darkBg font-bold text-xs px-2.5 py-0.5 rounded-full">
                {favoritesCount}
              </span>
            )}
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
