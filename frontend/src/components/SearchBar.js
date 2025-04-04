import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi'; // Install react-icons if not already installed

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <div className="relative w-full md:w-1/2">
        <input
          type="text"
          placeholder="Search for news (e.g., AI, Tesla, Economy...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full px-6 py-3 shadow-md focus:ring-2 focus:ring-blue-600 outline-none dark:bg-gray-800 dark:text-gray-200"
        />
        <FiSearch className="absolute top-3 right-4 text-gray-400 dark:text-gray-300" size={20} />
      </div>
      <button
        onClick={handleSearch}
        className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition-all"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
