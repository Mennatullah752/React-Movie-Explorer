import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";

const MovieSlider = ({ title, subtitle, movies = [], viewAllLink = "/movies" }) => {
  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-6 bg-accent rounded-full inline-block" />
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-textSecondary mt-1 ml-4">
              {subtitle}
            </p>
          )}
        </div>

        <Link
          to={viewAllLink}
          className="text-xs sm:text-sm font-semibold text-accent hover:text-white flex items-center gap-1 transition-colors group"
        >
          <span>Explore All</span>
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
        {movies.slice(0, 6).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieSlider;
