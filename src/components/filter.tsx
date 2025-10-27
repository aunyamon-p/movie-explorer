import MovieSearchInput from './search';

type Tab = "All" | "Popular" | "Top Rated";

interface MovieFilterProps {
  tab: Tab;
  setTab: (tab: Tab) => void;
}

export default function MovieFilter({ tab, setTab }: MovieFilterProps) {
  return (
    <div className="flex mb-8 justify-between items-center">
      {}
      <div className="flex gap-4">
        {(["All", "Popular", "Top Rated"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 rounded-lg transition-colors ${
              tab === t
                ? "bg-red-500 text-white font-bold"  
                : "bg-black text-white hover:bg-white/10 border border-[#747474]" 
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      
      {}
      <div className="w-full max-w-xs">
        <MovieSearchInput />
      </div>
    </div>
  );
}
