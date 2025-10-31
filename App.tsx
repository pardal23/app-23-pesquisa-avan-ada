
import React from 'react';
import SearchForm from './components/SearchForm';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white font-sans">
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Advanced Search Hub
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            One search bar, multiple engines.
          </p>
        </header>
        <SearchForm />
        <footer className="fixed bottom-4 text-slate-500 text-sm">
          Powered by Gemini & React
        </footer>
      </main>
    </div>
  );
};

export default App;
