import { useFavorites } from "../context/FavoritesContext";
import MovieGrid from "../components/MovieGrid";
import EmptyState from "../components/EmptyState";
import { Heart, Trash2 } from "lucide-react";

const Favorites = () => {
  const { favorites, favoritesCount } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 min-h-[70vh]">
      {/* Page Heading & Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#1C202B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-red-500" />
            <span>Saved Titles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            My Favorites
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            All the movies you've handpicked to watch later.
          </p>
        </div>

        {/* Counter Badge */}
        {favoritesCount > 0 && (
          <div className="flex items-center gap-2 bg-[#1C202B] px-4 py-2 rounded-xl border border-[#252B3A] text-sm text-textSecondary self-start sm:self-auto">
            <span>Saved Movies:</span>
            <span className="font-bold text-accent">{favoritesCount}</span>
          </div>
        )}
      </div>

      {/* Favorites Content: Empty State vs Grid */}
      {favorites.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your Watchlist is Empty"
          message="You haven't added any favorites yet. Explore our cinema library and click the heart icon on any movie to save it here!"
          actionText="Explore Movies"
          actionLink="/movies"
        />
      ) : (
        <div className="space-y-6">
          <p className="text-xs text-textSecondary">
            Click on any movie to view full details or click the heart icon to remove it from your favorites.
          </p>
          <MovieGrid
            movies={favorites}
            emptyMessage="No favorites added yet."
          />
        </div>
      )}
    </div>
  );
};

export default Favorites;
