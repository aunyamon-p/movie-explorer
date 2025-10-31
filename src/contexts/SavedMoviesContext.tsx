import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { type Movie } from '../service/tmdbApi';

interface SavedMoviesContextType {
  savedMovies: Movie[];
  addMovie: (movie: Movie) => void;
  removeMovie: (movieId: number) => void;
  isMovieSaved: (movieId: number) => boolean;
  watchlistIds: number[]; 
  onToggleBookmark: (movie: Movie) => void; 
}

const SavedMoviesContext = createContext<SavedMoviesContextType | undefined>(undefined);

export const SavedMoviesProvider = ({ children }: { children: ReactNode }) => {
  const [savedMovies, setSavedMovies] = useState<Movie[]>(() => {
    try {
      const localData = localStorage.getItem('saved-movies');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  }, [savedMovies]);

  const addMovie = (movie: Movie) => {
    setSavedMovies((prevMovies) => {
      if (!prevMovies.some(m => m.id === movie.id)) {
        return [...prevMovies, movie];
      }
      return prevMovies;
    });
  };

  const removeMovie = (movieId: number) => {
    setSavedMovies((prevMovies) => prevMovies.filter(movie => movie.id !== movieId));
  };

  const isMovieSaved = (movieId: number) => {
    return savedMovies.some(movie => movie.id === movieId);
  };
  
  const onToggleBookmark = (movie: Movie) => {
    if (isMovieSaved(movie.id)) {
      removeMovie(movie.id);
    } else {
      addMovie(movie);
    }
  };

  const watchlistIds = savedMovies.map(movie => movie.id);

  return (
    <SavedMoviesContext.Provider 
      value={{ 
        savedMovies, 
        addMovie, 
        removeMovie, 
        isMovieSaved,
        watchlistIds,
        onToggleBookmark 
      }}
    >
      {children}
    </SavedMoviesContext.Provider>
  );
};

export const useSavedMovies = () => {
  const context = useContext(SavedMoviesContext);
  if (context === undefined) {
    throw new Error('useSavedMovies must be used within a SavedMoviesProvider');
  }
  return context;
};

