import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import SortDropdown from "../components/SortDropdown";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { fetchMoviesList, fetchGenres } from "../api/movieService";
import { Film, RefreshCw, SlidersHorizontal } from "lucide-react";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params
  const initialSearch = searchParams.get("search") || "";
  const initialGenre = searchParams.get("genre") || "all";
  const initialSort = searchParams.get("sort") || "popularity";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [sortBy, setSortBy] = useState(initialSort);

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination / Load More state
  const [visibleCount, setVisibleCount] = useState(10);

  // Load genres once on mount
  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await fetchGenres();
        setGenres(data || []);
      } catch (err) {
        console.warn("Could not load genres:", err);
      }
    }
    loadGenres();
  }, []);

  // Sync state if URL query params change (e.g. from Navbar quick search)
  useEffect(() => {
    const q = searchParams.get("search");
    if (q !== null && q !== searchTerm) {
      setSearchTerm(q);
    }
  }, [searchParams]);

  // Fetch movies whenever filters change
  useEffect(() => {
    let isCancelled = false;

    async function loadMovies() {
      setLoading(true);
      setError(null);
      try {
        const results = await fetchMoviesList({
          search: searchTerm,
          genreId: selectedGenre,
          sort: sortBy,
        });

        if (!isCancelled) {
          setMovies(results || []);
          setVisibleCount(10); // reset visible count on new search/filter
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Error fetching movies:", err);
          setError("Failed to fetch movies. Please try again.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    // Debounce search input for snappy typing experience
    const debounceTimer = setTimeout(() => {
      loadMovies();
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(debounceTimer);
    };
  }, [searchTerm, selectedGenre, sortBy]);

  // Handle Genre selection & update URL
  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    const newParams = new URLSearchParams(searchParams);
    if (genreId === "all") {
      newParams.delete("genre");
    } else {
      newParams.set("genre", genreId);
    }
    setSearchParams(newParams);
  };

  // Handle Sort selection & update URL
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort", newSort);
    setSearchParams(newParams);
  };

  // Handle Search Input & update URL
  const handleSearchChange = (term) => {
    setSearchTerm(term);
    const newParams = new URLSearchParams(searchParams);
    if (term.trim()) {
      newParams.set("search", term.trim());
    } else {
      newParams.delete("search");
    }
    setSearchParams(newParams);
  };

  // Clear Search
  const handleClearSearch = () => {
    handleSearchChange("");
  };

  // Sliced movies for Load More pagination
  const displayedMovies = useMemo(() => {
    return movies.slice(0, visibleCount);
  }, [movies, visibleCount]);

  const hasMore = visibleCount < movies.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1C202B] pb-6">
        <div>
          <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider mb-1">
            <Film className="w-4 h-4" />
            <span>Discover & Filter</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Explore Movies
          </h1>
          <p className="text-sm text-textSecondary mt-1">
            Browse through our curated collection, filter by your favorite genre, or search by title.
          </p>
        </div>

        {/* Results Counter */}
        {!loading && (
          <div className="text-xs sm:text-sm text-textSecondary font-medium bg-[#1C202B] px-4 py-2 rounded-xl border border-[#252B3A] self-start md:self-auto">
            Showing <span className="text-white font-bold">{displayedMovies.length}</span> of{" "}
            <span className="text-accent font-bold">{movies.length}</span> movies
          </div>
        )}
      </div>

      {/* Search and Sort Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <SearchBar
          value={searchTerm}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          placeholder="Search for movies by title or keywords..."
        />

        <div className="flex items-center gap-3 self-end md:self-auto">
          <SortDropdown value={sortBy} onChange={handleSortChange} />
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-textSecondary uppercase tracking-wider">
          <SlidersHorizontal className="w-3.5 h-3.5 text-accent" />
          <span>Filter by Genre:</span>
        </div>
        <GenreFilter
          selectedGenre={selectedGenre}
          onSelectGenre={handleGenreChange}
          genres={genres}
        />
      </div>

      {/* Movie Grid / Loading / Error / Empty States */}
      {loading ? (
        <Loading count={10} message="Filtering cinema records..." />
      ) : error ? (
        <div className="py-16 text-center text-red-400 bg-[#1C202B]/60 rounded-3xl border border-red-500/30 p-8 space-y-4">
          <p>{error}</p>
          <button
            onClick={() => handleSearchChange("")}
            className="bg-accent text-darkBg font-bold px-5 py-2 rounded-xl text-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : movies.length === 0 ? (
        <EmptyState
          title="No Movies Found"
          message={`No titles matched your search "${searchTerm || selectedGenre}". Try searching with different keywords or reset filters.`}
          actionText="Reset Filters"
          actionLink="/movies"
        />
      ) : (
        <div className="space-y-10">
          <MovieGrid movies={displayedMovies} />

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center pt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 10)}
                className="inline-flex items-center gap-2 bg-[#1C202B] hover:bg-[#252B3A] text-white font-bold px-8 py-3.5 rounded-2xl border border-[#252B3A] hover:border-accent text-sm transition-all duration-200 hover:scale-105 shadow-xl cursor-pointer"
              >
                <RefreshCw className="w-4 h-4 text-accent" />
                <span>Load More Movies</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Movies;
