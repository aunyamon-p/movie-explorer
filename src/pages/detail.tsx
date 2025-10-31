import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Bookmark, Star } from 'lucide-react'; 
import { 
  getMovieDetails, 
  getMovieReviews, 
  type MovieDetails, 
  type Review 
} from '../service/tmdbApi'; 
import { useSavedMovies } from '../contexts/SavedMoviesContext'; 
import { getImageUrl } from "../service/tmdbApi";

const Detail = () => {
  const { movieId } = useParams<{ movieId: string }>(); 
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isMovieSaved, onToggleBookmark } = useSavedMovies();

  useEffect(() => {
    if (!movieId) return; 

    const fetchDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const movieData = await getMovieDetails(movieId);
        const reviewsData = await getMovieReviews(movieId);

        setMovie(movieData); 
        setReviews(reviewsData); 

      } catch (err) {
        console.error(err);
        setError('Cannot load movie data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (isLoading) return <div className="text-white text-center p-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-10">{error}</div>;
  if (!movie) return <div className="text-white text-center p-10">No movie data found.</div>;

  const isSaved = isMovieSaved(movie.id);

  return (
    <div className="text-white max-w-6xl mx-auto p-4 font-rubik">
      <div className="relative w-full h-[400px] md:h-[500px]">
        <img
          src={getImageUrl(movie.backdrop_path, 'w1280')}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
        
        <div className="relative flex flex-col md:flex-row items-end h-full p-8 z-10">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-48 h-auto rounded-lg shadow-lg"
          />
          <div className="md:ml-8 mt-4 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-bold">{movie.title}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-yellow-400 flex items-center">
                <Star className="w-5 h-5 fill-yellow-400" />
                <span className="ml-1">{movie.vote_average.toFixed(1)}</span>
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>{movie.runtime} minutes</span>
            </div>
            <div className="flex space-x-2 mt-2">
              {movie.genres.map(genre => (
                <span key={genre.id} className="text-xs bg-red-500 px-2 py-1 rounded-full">{genre.name}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
            <p className="text-gray-300 max-w-3xl">{movie.overview}</p>
          </div>
          <button
            onClick={() => onToggleBookmark(movie)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              isSaved
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#191919] hover:bg-gray-600'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-white' : ''}`} />
            <span>{isSaved ? 'Bookedmark' : 'Add Watchlist'}</span>
          </button>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Review</h2>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="bg-[#191919] p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-1">{review.author}</h3>
                  <p className="text-gray-300 text-sm line-clamp-4">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">There are no reviews for this movie yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;