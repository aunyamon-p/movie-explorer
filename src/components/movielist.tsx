import { Bookmark } from "lucide-react";
import { type Movie } from "../service/tmdbApi"; 
import { getImageUrl } from "../service/tmdbApi";
import { Link } from "react-router-dom";

interface MovieListProps {
  movies: Movie[];
  watchlist: number[];
  onToggleBookmark: (movie: Movie) => void;
}

export default function MovieList({
  movies,
  watchlist,
  onToggleBookmark,
}: MovieListProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {movies.map((movie) => {
        const isBookmarked = watchlist.includes(movie.id);

        return (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="bg-[#191919] rounded-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={getImageUrl(movie.poster_path, "w500")}
              alt={movie.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-3 flex flex-col justify-between gap-3">
              <div className="text-left">
                <h3 className="font-semibold truncate text-white">
                  {movie.title}
                </h3>
              </div>
              <div className="flex justify-between items-center text-left">
                <p className="text-sm text-white">
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleBookmark(movie);
                  }}
                  className="px-3 py-1 bg-[#191919]"
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      isBookmarked
                        ? "fill-white text-white"
                        : "text-white hover:fill-white"
                    }`}
                  />
                </button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}