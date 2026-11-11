import { Link } from "react-router-dom";
import { Play, Info, Star, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

const HeroSection = ({ movie, onWatchTrailer }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!movie) return null;

  const isFav = isFavorite(movie.id);
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear() || movie.releaseDate
    : "2024";

  return (
    <div className="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden">
      {/* Background Backdrop Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={
            movie.backdrop ||
            movie.poster ||
            "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&q=80"
          }
          alt={movie.title}
          className="w-full h-full object-cover object-center filter brightness-[0.45] scale-105 transform animate-pulse duration-1000"
        />
        {/* Cinematic Multi-Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-[#0F1117]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1117] via-[#0F1117]/80 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
        <div className="max-w-2xl space-y-4 sm:space-y-6">
          {/* Tag / Meta */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-semibold">
            <span className="bg-accent text-darkBg px-3 py-1 rounded-full uppercase tracking-wider font-extrabold text-[11px]">
              Featured Cinema
            </span>
            <div className="flex items-center gap-1.5 bg-[#1C202B]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-accent">
              <Star className="w-4 h-4 fill-accent" />
              <span>{movie.voteAverage || 8.8}</span>
            </div>
            <span className="text-textSecondary">{releaseYear}</span>
            {movie.runtime && (
              <>
                <span className="text-textSecondary/40">•</span>
                <span className="text-textSecondary">{movie.runtime} min</span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            {movie.title}
          </h1>

          {/* Short Overview */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed line-clamp-3 sm:line-clamp-4 max-w-xl">
            {movie.overview}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {/* View Details Button */}
            <Link
              to={`/movies/${movie.id}`}
              className="inline-flex items-center gap-2 bg-[#E5B817] hover:bg-accent text-darkBg font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-accent/20 hover:scale-105 transition-all duration-200 text-sm sm:text-base"
            >
              <Info className="w-5 h-5" />
              <span>View Details</span>
            </Link>

            {/* Watch Trailer Button */}
            <button
              onClick={() => onWatchTrailer(movie)}
              className="inline-flex items-center gap-2 bg-[#1C202B]/90 hover:bg-[#252B3A] text-white font-semibold px-6 py-3.5 rounded-2xl border border-white/10 hover:border-accent/40 shadow-lg hover:scale-105 transition-all duration-200 text-sm sm:text-base cursor-pointer"
            >
              <Play className="w-5 h-5 text-accent fill-accent" />
              <span>Watch Trailer</span>
            </button>

            {/* Favorite Quick Toggle */}
            <button
              onClick={() => toggleFavorite(movie)}
              aria-label="Toggle favorite"
              className={`p-3.5 rounded-2xl border transition-all duration-200 ${
                isFav
                  ? "bg-red-500/90 text-white border-red-500 shadow-lg shadow-red-500/30"
                  : "bg-[#1C202B]/80 text-white/80 border-white/10 hover:bg-white/20 hover:text-white"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFav ? "fill-white" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
