import axios from "axios";

// JSON Server Axios Instance
// Default: http://localhost:3001
const api = axios.create({
  baseURL: import.meta.env.VITE_JSON_SERVER_URL || "http://localhost:3001",
});

// GET all movies
export const getMovies = () => api.get("/movies");

// GET one movie by ID
export const getMovieById = (id) => api.get(`/movies/${id}`);

// POST new movie
export const addMovie = (movie) => api.post("/movies", movie);

// PATCH movie (e.g. updating isFavorite status)
export const updateMovie = (id, data) => api.patch(`/movies/${id}`, data);

// DELETE movie
export const deleteMovie = (id) => api.delete(`/movies/${id}`);

// GET all genres
export const getGenres = () => api.get("/genres");

export default api;
