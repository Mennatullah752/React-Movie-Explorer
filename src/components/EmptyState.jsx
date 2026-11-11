import { Link } from "react-router-dom";
import { Film, Compass, HeartOff } from "lucide-react";

const EmptyState = ({
  icon: Icon = HeartOff,
  title = "No Movies Found",
  message = "You haven't added any favorites yet.",
  actionText = "Explore Movies",
  actionLink = "/movies",
}) => {
  return (
    <div className="py-20 px-4 text-center max-w-md mx-auto flex flex-col items-center">
      <div className="w-20 h-20 rounded-3xl bg-[#1C202B] border border-[#252B3A] flex items-center justify-center text-accent mb-6 shadow-xl shadow-black/40">
        <Icon className="w-10 h-10" />
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
        {title}
      </h3>

      <p className="text-sm text-textSecondary mb-8 leading-relaxed">
        {message}
      </p>

      {actionLink && actionText && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 bg-[#E5B817] hover:bg-accent text-darkBg font-bold px-7 py-3 rounded-2xl shadow-lg shadow-accent/20 hover:scale-105 transition-all text-sm"
        >
          <Compass className="w-4 h-4" />
          <span>{actionText}</span>
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
