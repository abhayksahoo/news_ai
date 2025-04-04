import React, { useState } from 'react';

export default function Header({ onSearch, toggleDarkMode }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    const debounce = setTimeout(() => {
      onSearch(query);
    }, 300);
    return () => clearTimeout(debounce);
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">News AI</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search news..."
            value={query}
            onChange={handleSearch}
            className="rounded-lg px-4 py-2 shadow-md focus:ring-2 focus:ring-blue-600 outline-none dark:bg-gray-800 dark:text-gray-200"
          />
          <button
            onClick={toggleDarkMode}
            className="text-xl dark:text-gray-200"
          >
            🌙
          </button>
        </div>
      </div>
    </header>
  );
}
