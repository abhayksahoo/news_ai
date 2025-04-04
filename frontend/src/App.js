import React, { useState } from 'react';
import NewsCard from './components/NewsCard';
import SearchBar from './components/SearchBar';
import './styles/App.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const timestamp = new Date().getTime();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news?query=${query}&_=${timestamp}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setNews([]);
      } else {
        setNews(data.slice(0, 5));
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      setNews([]);
    }
    setLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100`}>
      {/* Header */}
      <header className="sticky top-0 bg-white dark:bg-gray-900 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center px-4 py-3">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">AI-Powered News Assistant</h1>
          <button
            onClick={toggleDarkMode}
            className="text-xl dark:text-gray-200"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Search Bar */}
      <SearchBar onSearch={fetchNews} />

      {/* Content */}
      <main className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                url={article.url}
                description={article.description || article.content || 'No description available'}
                imageUrl={article.urlToImage}
                publishedAt={article.publishedAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No results found. Try another topic!</p>
        )}
      </main>
    </div>
  );
}

export default App;
