import { createContext, useContext, useState, useEffect } from "react";
import { updateMovie } from "../api/moviesApi";

const FavoritesContext = createContext();

const STORAGE_KEY = "movie_explorer_favorites";

export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from localStorage if present
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to parse favorites from localStorage:", error);
      return [];
    }
  });

  // Sync favorites with localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  }, [favorites]);

  // Check if a movie is in favorites
  const isFavorite = (movieId) => {
    return favorites.some((m) => String(m.id) === String(movieId));
  };

  // Add movie to favorites
  const addToFavorites = async (movie) => {
    if (isFavorite(movie.id)) return;
    setFavorites((prev) => [...prev, movie]);

    // Optional JSON Server sync if running
    try {
      await updateMovie(movie.id, { isFavorite: true });
    } catch {
      // Ignored if JSON server is not running
    }
  };

  // Remove movie from favorites
  const removeFromFavorites = async (movieId) => {
    setFavorites((prev) => prev.filter((m) => String(m.id) !== String(movieId)));

    // Optional JSON Server sync if running
    try {
      await updateMovie(movieId, { isFavorite: false });
    } catch {
      // Ignored if JSON server is not running
    }
  };

  // Toggle favorite helper
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        favoritesCount: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to consume FavoritesContext
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
