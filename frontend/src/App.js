import React, { useState } from 'react';
import './styles/App.css';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import NewsCard from './components/NewsCard';
import Footer from './components/Footer';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news?query=${query}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setNews([]);
      } else {
        setNews(data);
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      setNews([]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <SearchBar onSearch={fetchNews} />
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                url={article.url}
                description={article.description}
                imageUrl={article.urlToImage}
                publishedAt={article.publishedAt}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No news articles found. Try searching for something else!</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
