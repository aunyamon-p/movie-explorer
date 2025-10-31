import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});


export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  backdrop_path: string | null;
  vote_average: number;
  popularity: number;
}

export interface PaginatedResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
}

export interface Review {
  id: string;
  author: string;
  content: string;
  url: string;
}

export const getPopularMovies = async (page: number = 1) => {
  const response = await apiClient.get<PaginatedResponse>("/movie/popular", {
    params: { page },
  });
  return response.data;
};

export const getTopRatedMovies = async (page: number = 1) => {
  const response = await apiClient.get<PaginatedResponse>("/movie/top_rated", {
    params: { page },
  });
  return response.data;
};

export const getUpcomingMovies = async (page: number = 1) => {
  const response = await apiClient.get<PaginatedResponse>("/movie/upcoming", {
    params: { page },
  });
  return response.data;
};

export const getMovieDetails = async (movieId: string | number) => {
  const response = await apiClient.get<MovieDetails>(`/movie/${movieId}`);
  return response.data;
};

export const getMovieReviews = async (movieId: string | number) => {
  const response = await apiClient.get<{ results: Review[] }>(
    `/movie/${movieId}/reviews`
  );
  return response.data.results;
};

export const searchMovies = async (query: string, page: number = 1) => {
  if (!query) { 
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }
  const response = await apiClient.get<PaginatedResponse>('/search/movie', {
    params: { 
      query: query, 
      page: page    
    },
  });
  return response.data;
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const getImageUrl = (path: string | null, size: string = 'w500') => {
  if (!path) {
    return `https://via.placeholder.com/${size === 'w500' ? '500x750' : '1280x720'}?text=No+Image`;
  }
  
  return `${IMAGE_BASE_URL}${size}${path}`;
};