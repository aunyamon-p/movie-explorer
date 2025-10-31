import { useState, useEffect } from "react";
import { type Movie, getUpcomingMovies } from "../service/tmdbApi";
import { useSavedMovies } from "../contexts/SavedMoviesContext";
import MovieList from "../components/movielist";
import Pagination from "../components/pagination";

const Upcoming = () => {
  const { watchlistIds, onToggleBookmark } = useSavedMovies();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const data = await getUpcomingMovies(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [currentPage]);

  return (
    <div className="text-white max-w-7xl mx-auto p-4 font-rubik">
      <h1 className="text-3xl font-bold mb-6">Upcoming Movie</h1>

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <>
          <MovieList
            movies={movies}
            watchlist={watchlistIds}
            onToggleBookmark={onToggleBookmark}
          />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Upcoming;
