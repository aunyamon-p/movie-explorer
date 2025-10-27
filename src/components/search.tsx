import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function MovieSearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="relative w-full"> {}
      <input
        type="text"
        placeholder="Search movies..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full bg-[#191919] text-white placeholder-gray-500 px-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:ring-1 focus:ring-red-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-white"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}