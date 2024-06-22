// apiEndpoints.js
export const API_KEY = '2b6b445e526a5e2436de60198ec48c58';

const baseUrl = 'https://api.themoviedb.org/3'; // URL cơ sở của API

export const requests = {
  fetchTrending: `${baseUrl}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${baseUrl}/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `${baseUrl}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${baseUrl}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchSearch: `${baseUrl}/search/movie?api_key=${API_KEY}&language=en-US`,
};