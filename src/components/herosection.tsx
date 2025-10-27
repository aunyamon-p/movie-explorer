import { useEffect, useState } from "react";
import { getImageUrl } from "../services/MovieService";
import { type Movie } from "../api/tmdbApi";

interface HeroSectionProps {
  movies: Movie[];
  isLoading: boolean;
}

export default function HeroSection({ movies, isLoading }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    if (movies.length === 0) return;
    const heroMovies = movies.slice(0, 5);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [movies]);

  
  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  
  const displayMovies = movies.slice(0, 5);

  if (displayMovies.length === 0) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center bg-black text-white">
        No hero images available
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] overflow-hidden bg-black">
      {}
      {displayMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={getImageUrl(movie.backdrop_path, "w1280")}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          {}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-linear-to-t from-black to-transparent z-10" />

          {}
          <div className="absolute bottom-16 left-30 z-20 text-white">
            <h2 className="text-4xl font-bold">{movie.title}</h2>
          </div>
        </div>
      ))}

      {}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {displayMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
              index === currentIndex
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
