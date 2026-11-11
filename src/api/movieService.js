import tmdb from "./tmdb";
import { getMovies, getMovieById, getGenres } from "./moviesApi";
import fallbackData from "../data/fallbackMovies.json";

const hasTmdbToken = Boolean(import.meta.env.VITE_TMDB_TOKEN && import.meta.env.VITE_TMDB_TOKEN.trim().length > 10);

// Helper to format TMDB movie object into our unified UI format
const formatTmdbMovie = (m, genreList = []) => {
  const genres = m.genres 
    ? m.genres.map(g => g.name)
    : (m.genre_ids || []).map(id => {
        const found = genreList.find(g => g.id === id);
        return found ? found.name : null;
      }).filter(Boolean);

  return {
    id: String(m.id),
    title: m.title || m.original_title || "Untitled Movie",
    overview: m.overview || "No description available for this movie.",
    poster: m.poster_path 
      ? `https://image.tmdb.org/t/p/w500${m.poster_path}` 
      : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80",
    backdrop: m.backdrop_path 
      ? `https://image.tmdb.org/t/p/w1280${m.backdrop_path}` 
      : (m.poster_path ? `https://image.tmdb.org/t/p/w1280${m.poster_path}` : "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1280&q=80"),
    releaseDate: m.release_date || "2024",
    voteAverage: m.vote_average ? Number(m.vote_average.toFixed(1)) : 7.5,
    runtime: m.runtime || 120,
    genreIds: m.genre_ids ? m.genre_ids.map(String) : (m.genres ? m.genres.map(g => String(g.id)) : []),
    genres: genres.length > 0 ? genres : ["Cinema"],
    trailerKey: null,
    popularity: m.popularity || 80,
  };
};

/**
 * Fetch Genres list
 */
export const fetchGenres = async () => {
  if (hasTmdbToken) {
    try {
      const res = await tmdb.get("/genre/movie/list");
      return res.data.genres;
    } catch (e) {
      console.warn("TMDB genres failed, using fallback:", e.message);
    }
  }

  // Check JSON server
  try {
    const res = await getGenres();
    if (res.data && res.data.length > 0) return res.data;
  } catch (e) {
    // server not running, use fallback
  }

  return fallbackData.genres;
};

/**
 * Fetch Popular Movies
 */
export const fetchPopularMovies = async () => {
  if (hasTmdbToken) {
    try {
      const [moviesRes, genresRes] = await Promise.all([
        tmdb.get("/movie/popular"),
        fetchGenres()
      ]);
      return moviesRes.data.results.map(m => formatTmdbMovie(m, genresRes));
    } catch (e) {
      console.warn("TMDB fetch popular failed, fallbacking:", e.message);
    }
  }

  try {
    const res = await getMovies();
    if (res.data && res.data.length > 0) return res.data;
  } catch (e) {
    // fallback
  }

  return fallbackData.movies;
};

/**
 * Fetch Trending Movies
 */
export const fetchTrendingMovies = async () => {
  if (hasTmdbToken) {
    try {
      const [moviesRes, genresRes] = await Promise.all([
        tmdb.get("/trending/movie/week"),
        fetchGenres()
      ]);
      return moviesRes.data.results.map(m => formatTmdbMovie(m, genresRes));
    } catch (e) {
      console.warn("TMDB fetch trending failed:", e.message);
    }
  }

  // Shuffle or slice fallback movies for trending
  return [...fallbackData.movies].reverse();
};

/**
 * Fetch Filtered / Searched Movies
 */
export const fetchMoviesList = async ({ search = "", genreId = "all", sort = "popularity" } = {}) => {
  let movies = [];

  if (hasTmdbToken) {
    try {
      const genres = await fetchGenres();
      let res;
      if (search.trim()) {
        res = await tmdb.get("/search/movie", { params: { query: search } });
      } else if (genreId && genreId !== "all") {
        res = await tmdb.get("/discover/movie", { params: { with_genres: genreId } });
      } else {
        res = await tmdb.get("/movie/popular");
      }
      movies = res.data.results.map(m => formatTmdbMovie(m, genres));
    } catch (e) {
      console.warn("TMDB fetch list failed:", e.message);
    }
  }

  // If TMDB didn't return movies, check JSON Server or fallback
  if (movies.length === 0) {
    try {
      const res = await getMovies();
      movies = res.data && res.data.length > 0 ? res.data : fallbackData.movies;
    } catch (e) {
      movies = fallbackData.movies;
    }

    // Apply Client Search Filter
    if (search.trim()) {
      const term = search.toLowerCase();
      movies = movies.filter(m => 
        m.title.toLowerCase().includes(term) ||
        (m.overview && m.overview.toLowerCase().includes(term))
      );
    }

    // Apply Genre Filter
    if (genreId && genreId !== "all") {
      movies = movies.filter(m => {
        if (!m.genreIds) return false;
        return m.genreIds.includes(String(genreId));
      });
    }
  }

  // Apply Sorting
  return [...movies].sort((a, b) => {
    if (sort === "rating") return b.voteAverage - a.voteAverage;
    if (sort === "releaseDate") return new Date(b.releaseDate) - new Date(a.releaseDate);
    // default popularity
    return (b.popularity || b.voteAverage) - (a.popularity || a.voteAverage);
  });
};

/**
 * Fetch Movie Details by ID
 */
export const fetchMovieById = async (id) => {
  if (hasTmdbToken) {
    try {
      const [movieRes, videosRes] = await Promise.all([
        tmdb.get(`/movie/${id}`),
        tmdb.get(`/movie/${id}/videos`).catch(() => ({ data: { results: [] } }))
      ]);
      const movie = formatTmdbMovie(movieRes.data);
      const trailer = (videosRes.data.results || []).find(v => v.type === "Trailer" && v.site === "YouTube");
      if (trailer) {
        movie.trailerKey = trailer.key;
      }
      return movie;
    } catch (e) {
      console.warn("TMDB fetch movie by ID failed:", e.message);
    }
  }

  try {
    const res = await getMovieById(id);
    if (res.data) return res.data;
  } catch (e) {
    // fallback
  }

  const found = fallbackData.movies.find(m => String(m.id) === String(id));
  if (found) return found;

  // If not found, return first fallback as emergency
  return fallbackData.movies[0];
};

/**
 * Fetch Similar Movies for Details page
 */
export const fetchSimilarMovies = async (id) => {
  if (hasTmdbToken) {
    try {
      const [res, genres] = await Promise.all([
        tmdb.get(`/movie/${id}/similar`),
        fetchGenres()
      ]);
      if (res.data.results?.length > 0) {
        return res.data.results.slice(0, 6).map(m => formatTmdbMovie(m, genres));
      }
    } catch (e) {
      // fallback
    }
  }

  return fallbackData.movies
    .filter(m => String(m.id) !== String(id))
    .slice(0, 4);
};
