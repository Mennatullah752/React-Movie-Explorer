import { Clapperboard, Heart, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0A0C10] border-t border-[#1C202B] text-textSecondary mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#1C202B]/60">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-darkBg">
                <Clapperboard className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-white">
                Movie<span className="text-accent">Explorer</span>
              </span>
            </Link>
            <p className="text-sm text-textSecondary max-w-sm leading-relaxed">
              Movie Explorer is a modern cinematic discovery platform built with React.js, Tailwind CSS, and TMDB / REST API. Designed as a practical graduation assessment demonstrating production-grade frontend engineering.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-textSecondary">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C202B] border border-[#252B3A] text-accent font-medium">
                DEPI Practical Assessment
              </span>
              <span className="px-3 py-1 rounded-full bg-[#1C202B] border border-[#252B3A]">
                React 19 + Tailwind
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Home Page
                </Link>
              </li>
              <li>
                <Link to="/movies" className="hover:text-accent transition-colors">
                  Explore Movies
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="hover:text-accent transition-colors">
                  My Favorites
                </Link>
              </li>
            </ul>
          </div>

          {/* API Attribution & Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              API Attribution
            </h4>
            <p className="text-xs leading-relaxed text-textSecondary">
              This product uses the TMDB API but is not endorsed or certified by TMDB. Powered by The Movie Database & JSON Server mock API.
            </p>
            <div className="pt-2">
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs font-semibold text-accent hover:underline"
              >
                Learn more at themoviedb.org &rarr;
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-textSecondary gap-4">
          <p>© {new Date().getFullYear()} Movie Explorer. Built with passion for DEPI Practical Assessment.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> and React.js
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
