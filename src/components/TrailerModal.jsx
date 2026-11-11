import { X } from "lucide-react";

const TrailerModal = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  // Use movie trailerKey or fallback to official trailer
  const videoKey = movie.trailerKey || "YoHD9XEInc0";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#1C202B] rounded-3xl overflow-hidden border border-[#252B3A] shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252B3A] bg-[#161922]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h3 className="font-bold text-white text-base sm:text-lg line-clamp-1">
              {movie.title} – Official Trailer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#252B3A] text-textSecondary hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
            title={`${movie.title} Trailer`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#161922] flex items-center justify-between text-xs text-textSecondary">
          <span>Release: {movie.releaseDate || "Cinema"}</span>
          <span>Rating: ★ {movie.voteAverage || "8.5"}</span>
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
