import axios from "axios";

// TMDB Axios Instance
// Configured with TMDB Base URL and Bearer Authorization Token
const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN || ""}`,
  },
});

export default tmdb;
