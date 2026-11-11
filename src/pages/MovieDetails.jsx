import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchMovieById, fetchSimilarMovies } from "../api/movieService";
import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import TrailerModal from "../components/TrailerModal";
import {
  ArrowLeft,
  Star,
  Clock,
  Calendar,
  Heart,
  Play,
  Share2,
  Film,
  AlertCircle,
} from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Trailer modal state
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadDetails() {
      setLoading(true);
      setError(null);
      // Scroll to top on id change
      window.scrollTo({ top: 0, behavior: "smooth" });

      try {
        const [movieData, similarData] = await Promise.all([
          fetchMovieById(id),
          fetchSimilarMovies(id),
        ]);

        if (isMounted) {
          if (!movieData) {
            setError("Movie not found in the database.");
          } else {
            setMovie(movieData);
            setSimilarMovies(similarData || []);
          }
        }
      } catch (err) {
        console.error("Failed to load movie details:", err);
        if (isMounted) {
          setError("Failed to load movie details. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadDetails();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: movie?.title,
          text: movie?.overview,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Loading count={4} message="Fetching movie specifications and media..." />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-[#1C202B] rounded-3xl border border-red-500/30 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">Movie Unavailable</h3>
        <p className="text-sm text-textSecondary">{error || "Movie not found"}</p>
        <button
          onClick={() => navigate("/movies")}
          className="inline-flex items-center gap-2 bg-accent text-darkBg font-bold px-6 py-2.5 rounded-xl text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Movies</span>
        </button>
      </div>
    );
  }

  const isFav = isFavorite(movie.id);
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear() || movie.releaseDate
    : "N/A";
  const rating =
    typeof movie.voteAverage === "number"
      ? movie.voteAverage.toFixed(1)
      : movie.voteAverage || "7.5";

  return (
    <div className="min-h-screen">
      {/* 1. Backdrop Section */}
      <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] overflow-hidden">
        <img
          src={
            movie.backdrop ||
            movie.poster ||
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&q=80"
          }
          alt={movie.title}
          className="w-full h-full object-cover object-top filter brightness-[0.4]"
        />

        {/* Cinematic Multi-Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-[#0F1117]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117]/80 via-transparent to-[#0F1117]/80" />

        {/* Back Navigation Button */}
        <div className="absolute top-6 left-4 sm:left-8 z-20">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0F1117]/80 backdrop-blur-md border border-white/10 text-white hover:text-accent hover:border-accent/40 text-sm font-semibold transition-all shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </div>
      </div>

      {/* 2. Movie Information Card Section (Overlapping Backdrop) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-48 sm:-mt-64 relative z-20 pb-16">
        <div className="bg-[#1C202B]/95 backdrop-blur-xl border border-[#252B3A] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Poster Column */}
            <div className="md:col-span-4 lg:col-span-4 flex justify-center md:block">
              <div className="relative group w-60 sm:w-72 md:w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[2/3] bg-[#161922]">
                <img
                  src={
                    movie.poster ||
                    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80"
                  }
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[#0F1117]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-sm font-extrabold text-accent shadow-lg">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span>{rating} / 10</span>
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="md:col-span-8 lg:col-span-8 space-y-6">
              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  {movie.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-textSecondary font-medium mt-3">
                  <div className="flex items-center gap-1 text-white">
                    <Calendar className="w-4 h-4 text-accent" />
                    <span>{movie.releaseDate || releaseYear}</span>
                  </div>
                  {movie.runtime && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-white">
                        <Clock className="w-4 h-4 text-accent" />
                        <span>{movie.runtime} min</span>
                      </div>
                    </>
                  )}
                  <span>•</span>
                  <span className="bg-[#252B3A] text-gray-300 px-2.5 py-0.5 rounded text-xs">
                    HD 4K
                  </span>
                </div>
              </div>

              {/* Genres Pills */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-textSecondary">
                    Genres
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-[#252B3A] text-accent text-xs font-semibold border border-amber-500/20"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Overview */}
              <div className="space-y-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-textSecondary">
                  Storyline & Overview
                </h4>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                  {movie.overview}
                </p>
              </div>

              {/* Action Buttons Section */}
              <div className="pt-4 border-t border-[#252B3A] flex flex-wrap items-center gap-3 sm:gap-4">
                {/* Favorite Button (Add / Remove) */}
                <button
                  onClick={() => toggleFavorite(movie)}
                  className={`inline-flex items-center gap-2.5 font-bold px-6 py-3.5 rounded-2xl shadow-lg transition-all duration-200 text-sm sm:text-base cursor-pointer ${
                    isFav
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20"
                      : "bg-[#E5B817] hover:bg-accent text-darkBg shadow-accent/20 hover:scale-105"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFav ? "fill-white" : ""}`} />
                  <span>{isFav ? "Remove from Favorites" : "Add to Favorites"}</span>
                </button>

                {/* Watch Trailer Button */}
                <button
                  onClick={() => setIsTrailerOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#252B3A] hover:bg-[#2E3649] text-white font-semibold px-6 py-3.5 rounded-2xl border border-white/10 hover:border-accent/40 shadow-lg hover:scale-105 transition-all text-sm sm:text-base cursor-pointer"
                >
                  <Play className="w-5 h-5 text-accent fill-accent" />
                  <span>Watch Trailer</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={handleShare}
                  aria-label="Share movie"
                  className="p-3.5 rounded-2xl bg-[#252B3A] text-textSecondary hover:text-white hover:bg-[#2E3649] border border-white/10 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                {copiedShare && (
                  <span className="text-xs text-accent font-semibold animate-fadeIn">
                    Link copied!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Similar Movies Section */}
        {similarMovies.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between border-b border-[#1C202B] pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Film className="w-6 h-6 text-accent" />
                  <span>Similar Movies</span>
                </h2>
                <p className="text-xs text-textSecondary mt-0.5">
                  You might also enjoy these related titles
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {similarMovies.slice(0, 4).map((simMovie) => (
                <MovieCard key={simMovie.id} movie={simMovie} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Trailer Modal */}
      <TrailerModal
        movie={movie}
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
      />
    </div>
  );
};

export default MovieDetails;
