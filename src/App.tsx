import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Detail from './pages/detail';
import Watchlist from './pages/watchlist';
import Upcoming from './pages/upcoming';
import { useSavedMovies } from './contexts/SavedMoviesContext';
import Navbar from './components/navbar'; 

function App() {
  const { watchlistIds, onToggleBookmark } = useSavedMovies();

  return (
    <div className="w-full h-full min-h-screen bg-black"> 
      
      <Navbar /> 
      
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              watchlist={watchlistIds}
              onToggleBookmark={onToggleBookmark}
            />
          } 
        />
        <Route path="/movie/:movieId" element={<Detail />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/upcoming" element={<Upcoming />} /> 
      </Routes>
    </div>
  );
}

export default App;