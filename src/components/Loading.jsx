const Loading = ({ count = 8, message = "Loading cinematic universe..." }) => {
  return (
    <div className="py-12 space-y-6">
      <div className="flex items-center justify-center gap-3 text-accent">
        <div className="w-5 h-5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        <span className="text-sm font-semibold tracking-wide text-gray-300">
          {message}
        </span>
      </div>

      {/* Skeleton cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-[#1C202B] rounded-2xl overflow-hidden border border-[#252B3A] animate-pulse"
          >
            <div className="aspect-[2/3] bg-[#252B3A]" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-[#252B3A] rounded w-3/4" />
              <div className="flex justify-between">
                <div className="h-3 bg-[#252B3A] rounded w-1/4" />
                <div className="h-3 bg-[#252B3A] rounded w-1/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
