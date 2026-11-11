const DEFAULT_GENRES = [
  { id: "all", name: "All Genres" },
  { id: "1", name: "Action" },
  { id: "2", name: "Sci-Fi" },
  { id: "3", name: "Drama" },
  { id: "4", name: "Comedy" },
  { id: "5", name: "Horror" },
  { id: "6", name: "Adventure" },
  { id: "7", name: "Romance" },
];

const GenreFilter = ({ selectedGenre, onSelectGenre, genres = [] }) => {
  // Use provided genres or fallback to DEFAULT_GENRES
  const displayGenres = genres.length > 0 
    ? [{ id: "all", name: "All Genres" }, ...genres] 
    : DEFAULT_GENRES;

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar scroll-smooth">
      {displayGenres.map((genre) => {
        const isSelected = String(selectedGenre) === String(genre.id);
        return (
          <button
            key={genre.id}
            onClick={() => onSelectGenre(genre.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isSelected
                ? "bg-accent text-darkBg shadow-md shadow-accent/25 scale-105"
                : "bg-[#1C202B] text-textSecondary hover:text-white hover:bg-[#252B3A] border border-[#252B3A]"
            }`}
          >
            {genre.name}
          </button>
        );
      })}
    </div>
  );
};

export default GenreFilter;
