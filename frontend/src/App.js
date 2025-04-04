import React, { useState } from 'react';
import NewsCard from './components/NewsCard';
import SearchBar from './components/SearchBar';
import './styles/App.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (query) => {
    setLoading(true);
    try {
      // Append a timestamp to the URL to bypass the cache
      const timestamp = new Date().getTime();
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/news?query=${query}&_=${timestamp}`);
      console.log('Response status:', response.status); // Log the response status
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.error) {
        alert(data.error); // Show the error message from the backend
        setNews([]);
      } else {
        console.log('Response data:', data); // Log the response data
        setNews(data.slice(0, 5)); // Limit to 5 articles
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]); // Clear news on error
      alert('Failed to fetch news. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>News Fetcher</h1>
      <SearchBar onSearch={fetchNews} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        news.length > 0 ? (
          news.map((article, index) => (
            <NewsCard
              key={index}
              title={article.title}
              url={article.url}
              description={article.description || article.content || 'No description available'}
              imageUrl={article.urlToImage}
              publishedAt={article.publishedAt}
            />
          ))
        ) : (
          <p>No news articles found.</p>
        )
      )}
    </div>
  );
}

export default App;
