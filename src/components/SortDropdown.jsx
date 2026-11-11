import { ArrowUpDown } from "lucide-react";

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 bg-[#1C202B] px-3.5 py-2.5 rounded-2xl border border-[#252B3A] text-sm text-textSecondary focus-within:border-accent">
      <ArrowUpDown className="w-4 h-4 text-accent" />
      <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary hidden sm:inline">
        Sort By:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs sm:text-sm"
      >
        <option value="popularity" className="bg-[#1C202B] text-white">
          Popularity
        </option>
        <option value="rating" className="bg-[#1C202B] text-white">
          Rating (High to Low)
        </option>
        <option value="releaseDate" className="bg-[#1C202B] text-white">
          Release Date (Newest)
        </option>
      </select>
    </div>
  );
};

export default SortDropdown;
