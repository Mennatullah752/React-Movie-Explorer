import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, onClear, placeholder = "Search for movies..." }) => {
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-textSecondary">
        <Search className="w-5 h-5 text-accent" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#1C202B] text-white placeholder-textSecondary text-sm sm:text-base rounded-2xl pl-12 pr-11 py-3.5 border border-[#252B3A] focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent shadow-lg transition-all"
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear search"
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-textSecondary hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
