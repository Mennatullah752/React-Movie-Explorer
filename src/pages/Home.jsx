import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import MovieSlider from "../components/MovieSlider";
import Loading from "../components/Loading";
import TrailerModal from "../components/TrailerModal";
import { fetchPopularMovies, fetchTrendingMovies } from "../api/movieService";
import { AlertCircle, Film, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Trailer Modal state
  const [selectedTrailerMovie, setSelectedTrailerMovie] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeData() {
      setLoading(true);
      setError(null);
      try {
        const [popular, trending] = await Promise.all([
          fetchPopularMovies(),
          fetchTrendingMovies(),
        ]);

        if (isMounted) {
          setPopularMovies(popular || []);
          setTrendingMovies(trending || []);
        }
      } catch (err) {
        console.error("Failed to load home movies:", err);
        if (isMounted) {
          setError("Failed to load movies. Please check your connection or try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadHomeData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenTrailer = (movie) => {
    setSelectedTrailerMovie(movie);
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
    setSelectedTrailerMovie(null);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Loading count={6} message="Preparing your cinematic experience..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-lg mx-auto my-20 p-8 bg-[#1C202B] rounded-3xl border border-red-500/30 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">Oops! Something went wrong</h3>
        <p className="text-sm text-textSecondary">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-accent text-darkBg font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-accentHover"
        >
          Retry
        </button>
      </div>
    );
  }

  const featuredMovie = popularMovies[0] || trendingMovies[0];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      {featuredMovie && (
        <HeroSection
          movie={featuredMovie}
          onWatchTrailer={handleOpenTrailer}
        />
      )}

      {/* Main Home Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Popular Movies Section */}
        <MovieSlider
          title="Popular Movies"
          subtitle="Top rated and globally acclaimed masterpieces"
          movies={popularMovies}
          viewAllLink="/movies?sort=popularity"
        />

        {/* Promo Banner / Call To Action */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-500/20 via-[#1C202B] to-purple-900/20 border border-accent/20 p-8 sm:p-12 shadow-xl">
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent font-semibold text-xs border border-accent/30">
              <Sparkles className="w-3.5 h-3.5" />
              Discover Thousands of Titles
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Looking for something specific?
            </h3>
            <p className="text-sm text-textSecondary leading-relaxed">
              Explore our full movie database with filters for genre, rating, popularity, and real-time instant search.
            </p>
            <div className="pt-2">
              <Link
                to="/movies"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accentHover text-darkBg font-bold px-6 py-3 rounded-2xl transition-all shadow-lg shadow-accent/20 text-sm"
              >
                <Film className="w-4 h-4" />
                <span>Open Movie Catalog</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Trending Movies Section */}
        <MovieSlider
          title="Trending Now"
          subtitle="Hot releases everyone is currently talking about"
          movies={trendingMovies}
          viewAllLink="/movies?sort=rating"
        />
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        movie={selectedTrailerMovie}
        isOpen={isTrailerOpen}
        onClose={handleCloseTrailer}
      />
    </div>
  );
};

export default Home;
