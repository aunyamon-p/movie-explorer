import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"; 
import { 
  type Movie, 
  getPopularMovies, 
  getTopRatedMovies,
  searchMovies 
} from "../api/tmdbApi"; 
import HeroSection from "../components/herosection";
import MovieFilter from "../components/filter";
import MovieList from "../components/movielist";
import Pagination from "../components/pagination";

type Tab = "All" | "Popular" | "Top Rated";

interface HomeProps {
  watchlist: number[];
  onToggleBookmark: (movie: Movie) => void;
}

export default function Home({
  watchlist,
  onToggleBookmark,
}: HomeProps) {
  const [tab, setTab] = useState<Tab>("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search'); 

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        let data;
        
        if (searchQuery) {
          data = await searchMovies(searchQuery, currentPage);
          setTab("All"); 
        } else {
          if (tab === "Top Rated") {
            data = await getTopRatedMovies(currentPage);
          } else {
            data = await getPopularMovies(currentPage);
          }
        }

        setMovies(data.results); 
        setTotalPages(data.total_pages);

      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [tab, currentPage, searchQuery]); 

  return (
    <div className="bg-black text-white min-h-screen font-rubik w-full h-full">
      {!searchQuery && <HeroSection movies={movies} isLoading={isLoading} />}
      
      <div className="max-w-7xl mx-auto px-2 py-8 overflow-hidden">
        <h2 className="text-3xl font-semibold mb-6 text-left">
          {searchQuery ? `Search results for "${searchQuery}"` : "Movies Lists"}
        </h2>
        
        {!searchQuery && <MovieFilter tab={tab} setTab={setTab} />}
        
        {isLoading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <>
            {movies.length === 0 && searchQuery && (
              <p className="text-center text-gray-400 py-10">No movies found matching "{searchQuery}"</p>
            )}
            <MovieList
              movies={movies}
              watchlist={watchlist}
              onToggleBookmark={onToggleBookmark}
            />
          </>
        )}
        
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages} 
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}