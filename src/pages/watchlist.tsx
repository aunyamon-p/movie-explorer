import { useSavedMovies } from '../contexts/SavedMoviesContext';
import MovieList from '../components/movielist';

const Watchlist = () => {
  const { 
    savedMovies,
    watchlistIds,
    onToggleBookmark
  } = useSavedMovies();

  return (
    <div className="text-white max-w-7xl mx-auto p-4 font-rubik">
      <div className="flex items-center space-x-3 mb-6">
        <h1 className="text-3xl font-bold">My Watchlist</h1>
      </div>

      {savedMovies.length > 0 ? (
        <MovieList
          movies={savedMovies}
          watchlist={watchlistIds}
          onToggleBookmark={onToggleBookmark}
        />
      ) : (
        <div className="text-center text-gray-400 py-20">
          <p>You haven’t saved any movies yet.</p>
          <p>Try going back to the homepage and tap the Bookmark button on a movie you like.</p>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
