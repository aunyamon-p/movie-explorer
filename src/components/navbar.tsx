
import { Link, NavLink } from 'react-router-dom';
import { Clapperboard, Calendar, Bookmark } from 'lucide-react';

const Navbar = () => {
 
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? 'text-red-500 font-bold'
      : 'text-white hover:text-red-500';
  };

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <Link to="/" className="flex items-center space-x-2">
          <Clapperboard className="w-8 h-8 text-red-500" />
          <span className="text-2xl font-bold">Movie Explorer</span>
        </Link>


        <div className="flex space-x-6 items-center">
          {}
          <NavLink to="/upcoming" className={getNavLinkClass}>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Upcoming</span>
            </div>
          </NavLink>
          <NavLink to="/watchlist" className={getNavLinkClass}>
            <div className="flex items-center space-x-1">
              <Bookmark className="w-4 h-4" />
              <span>Watchlist</span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;