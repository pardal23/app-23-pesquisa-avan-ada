
import React, { useState, useCallback } from 'react';
import { SearchEngine } from '../types';

// Helper component for SVG icons, defined outside SearchForm to avoid re-creation on re-renders.
const EngineIcon: React.FC<{ engine: SearchEngine }> = ({ engine }) => {
  switch (engine) {
    case SearchEngine.Google:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,5 12,5C14.6,5 16.1,6.2 17,7.1L19,5.2C17.1,3.4 14.8,2 12,2C6.4,2 2,6.5 2,12C2,17.5 6.4,22 12,22C17.6,22 21.5,18.2 21.5,12.3C21.5,11.8 21.4,11.4 21.35,11.1Z" />
        </svg>
      );
    case SearchEngine.Bing:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5,3V19L8.72,21L18,15.82V11.73H18L9.77,8.95L11.38,12.64L13.5,11.73V14.24L8.72,16.5V6.5L13.5,8.79V11.17L15,10.56V5.5L5,3Z" />
        </svg>
      );
    case SearchEngine.DuckDuckGo:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.12,14.08C11.12,14.08 11.2,14.19 11.2,14.19C10.15,15.5 8.93,16.5 7.05,16.5C4.7,16.5 3,14.53 3,12C3,9.47 4.7,7.5 7.05,7.5C8.93,7.5 10.15,8.5 11.2,9.81C11.2,9.81 11.12,9.92 11.12,9.92C10.96,9.73 10.78,9.54 10.59,9.36C9.72,8.5 8.46,7.94 7.05,7.94C4.94,7.94 3.44,9.75 3.44,12C3.44,14.25 4.94,16.06 7.05,16.06C8.46,16.06 9.72,15.5 10.59,14.64C10.78,14.46 10.96,14.27 11.12,14.08M21,12C21,9.47 19.3,7.5 16.95,7.5C15.07,7.5 13.85,8.5 12.8,9.81C12.8,9.81 12.88,9.92 12.88,9.92C13.04,9.73 13.22,9.54 13.41,9.36C14.28,8.5 15.54,7.94 16.95,7.94C19.06,7.94 20.56,9.75 20.56,12C20.56,14.25 19.06,16.06 16.95,16.06C15.54,16.06 14.28,15.5 13.41,14.64C13.22,14.46 13.04,14.27 12.88,14.08C12.88,14.08 12.8,14.19 12.8,14.19C13.85,15.5 15.07,16.5 16.95,16.5C19.3,16.5 21,14.53 21,12Z" />
        </svg>
      );
  }
};


const SearchForm: React.FC = () => {
  const [query, setQuery] = useState('');
  const [engine, setEngine] = useState<SearchEngine>(SearchEngine.Google);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      return;
    }

    let url = '';
    const encodedQuery = encodeURIComponent(query.trim());

    switch (engine) {
      case SearchEngine.Google:
        url = `https://www.google.com/search?q=${encodedQuery}`;
        break;
      case SearchEngine.Bing:
        url = `https://www.bing.com/search?q=${encodedQuery}`;
        break;
      case SearchEngine.DuckDuckGo:
        url = `https://duckduckgo.com/?q=${encodedQuery}`;
        break;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  }, [query, engine]);

  const engineOptions = [
    { id: SearchEngine.Google, name: 'Google' },
    { id: SearchEngine.Bing, name: 'Bing' },
    { id: SearchEngine.DuckDuckGo, name: 'DuckDuckGo' },
  ];

  return (
    <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border border-white/20">
      <form onSubmit={handleSearch}>
        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for anything..."
            className="w-full bg-slate-800/60 text-white placeholder-slate-400 border border-slate-700 rounded-lg py-3 pr-4 pl-12 focus:ring-2 focus:ring-sky-400 focus:border-sky-400 outline-none transition-all duration-300"
          />
        </div>

        <div className="mb-6">
          <p className="text-slate-300 mb-3 text-center">Select Search Engine</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {engineOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setEngine(opt.id)}
                className={`flex items-center justify-center p-3 rounded-lg text-sm font-semibold transition-all duration-300 border ${
                  engine === opt.id
                    ? 'bg-sky-500 text-white border-sky-400 shadow-lg'
                    : 'bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/70 hover:border-slate-500'
                }`}
              >
                <EngineIcon engine={opt.id} />
                {opt.name}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!query.trim()}
          className="w-full flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform active:scale-95 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:hover:bg-slate-600"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
