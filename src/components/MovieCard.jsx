import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

const MovieCard = ({ movie }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    movie.poster ||
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80"
  );

  const isFav = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(movie);
  };

  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear() || movie.releaseDate
    : "N/A";

  const rating =
    typeof movie.voteAverage === "number"
      ? movie.voteAverage.toFixed(1)
      : movie.voteAverage || "7.5";

  return (
    <div className="group relative bg-[#1C202B] rounded-2xl overflow-hidden border border-[#252B3A] hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1.5 flex flex-col h-full">
      {/* Poster Container */}
      <Link
        to={`/movies/${movie.id}`}
        className="relative block w-full aspect-[2/3] overflow-hidden bg-[#161922]"
      >
        {/* Placeholder skeleton while loading */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-[#252B3A] animate-pulse flex items-center justify-center text-xs text-textSecondary">
            Loading poster...
          </div>
        )}

        <img
          src={imgSrc}
          alt={movie.title}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImgSrc(
              "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80"
            );
            setImageLoaded(true);
          }}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-black/30 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#0F1117]/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-xs font-bold text-accent shadow-md">
          <Star className="w-3.5 h-3.5 fill-accent text-accent" />
          <span>{rating}</span>
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all duration-200 ${
            isFav
              ? "bg-red-500/90 text-white border-red-500 shadow-lg shadow-red-500/30 scale-110"
              : "bg-[#0F1117]/70 text-white/80 border-white/10 hover:bg-white/20 hover:text-white hover:scale-110"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform ${
              isFav ? "fill-white" : "hover:fill-white/30"
            }`}
          />
        </button>
      </Link>

      {/* Card Info Content */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <Link to={`/movies/${movie.id}`}>
            <h3
              title={movie.title}
              className="font-bold text-white text-base group-hover:text-accent transition-colors line-clamp-1"
            >
              {movie.title}
            </h3>
          </Link>
          <div className="flex items-center justify-between text-xs text-textSecondary mt-1.5 font-medium">
            <span>{releaseYear}</span>
            {movie.runtime && (
              <span className="text-[11px] bg-[#252B3A] px-2 py-0.5 rounded text-gray-300">
                {movie.runtime} min
              </span>
            )}
          </div>
        </div>

        {/* View Details Link */}
        <div className="mt-4 pt-3 border-t border-[#252B3A]/60 flex items-center justify-between">
          <Link
            to={`/movies/${movie.id}`}
            className="text-xs font-semibold text-accent hover:text-white transition-colors flex items-center gap-1 group/btn"
          >
            <span>View Details</span>
            <span className="transition-transform group-hover/btn:translate-x-1">&rarr;</span>
          </Link>
          {isFav && (
            <span className="text-[11px] text-red-400 font-medium">
              Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
