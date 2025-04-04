import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-between bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 w-full max-w-xl mx-auto mb-6 transition-all"
    >
      <input
        type="text"
        placeholder="Search latest news..."
        className="flex-grow bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none px-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        aria-label="Search"
      >
        <FiSearch className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;
