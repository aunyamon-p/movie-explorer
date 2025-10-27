import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";
import { getImageUrl } from "../services/MovieService";
import type { Movie } from "../services/mockData";

interface SimilarMoviesProps {
  currentMovie: Movie;
  movies: Movie[];
  watchlist: number[];
  onToggleBookmark: (movie: Movie) => void;
}

export default function SimilarMovies({
  currentMovie,
  movies,
  watchlist,
  onToggleBookmark,
}: SimilarMoviesProps) {
  const currentGenreIds = currentMovie.genres?.map((g) => g.id) || [];

  const similarMovies = movies
    .filter(
      (m) =>
        m.id !== currentMovie.id &&
        m.genres?.some((g) => currentGenreIds.includes(g.id))
    )
    .slice(0, 5); 

  if (similarMovies.length === 0)
    return (
      <div className="mt-12 text-center text-gray-500">
        No similar movies found.
      </div>
    );

  return (
    <div className="mt-12 w-full px-8">
      <h2 className="text-xl font-semibold mb-4 text-white">Similar Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        {similarMovies.map((m) => {
          const isBookmarked = watchlist.includes(m.id);

          return (
            <div
              key={m.id}
              className="min-w-[150px] bg-[#191919] p-2 rounded-lg"
            >
              <Link to={`/movie/${m.id}`}>
                <img
                  src={getImageUrl(m.poster_path)}
                  alt={m.title}
                  className="w-full h-40 object-cover rounded-lg mb-2"
                />
              </Link>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-semibold text-white truncate">
                    {m.title}
                  </p>
                  <p className="text-white text-sm">
                    ⭐ {m.vote_average.toFixed(1)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleBookmark(m)}
                  className="px-3 py-1 bg-[#191919] "
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
          );
        })}
      </div>
    </div>
  );
}
