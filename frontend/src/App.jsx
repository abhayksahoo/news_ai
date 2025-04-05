import React, { useState } from "react";
import "./styles/App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const fetchNews = async (query) => {
    if (!query) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/news?query=${query}`,
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setNews([]);
      } else {
        setNews(data);
      }
    } catch (err) {
      setError("Failed to fetch news");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  let content;
  if (loading) {
    content = (
      <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
    );
  } else if (error) {
    content = (
      <p className="text-center text-red-600 dark:text-red-400">{error}</p>
    );
  } else if (news.length > 0) {
    content = (
      <div className="news-container">
        {news.map((article) => (
          <NewsCard
            key={article.url}
            title={article.title}
            description={article.description}
            url={article.url}
            source={article.source?.name}
            imageUrl={article.urlToImage}
            publishedAt={article.publishedAt}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
        Search to discover the latest news powered by AI 🔍
      </p>
    );
  }

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <Header
        title="News AI"
        onSearch={fetchNews}
        onToggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      <SearchBar onSearch={fetchNews} />
      {content}
      <Footer />
    </div>
  );
}

export default App;
