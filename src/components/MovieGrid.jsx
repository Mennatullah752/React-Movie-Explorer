import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, emptyMessage = "No movies found." }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="py-16 text-center text-textSecondary bg-[#1C202B]/40 rounded-2xl border border-dashed border-[#252B3A]">
        <p className="text-base font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
