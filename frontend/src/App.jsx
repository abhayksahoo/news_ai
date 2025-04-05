import React, { useState, useEffect } from "react";
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
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/news?query=${query}`,
      );
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setNews(data);
      }
    } catch (err) {
      setError("Failed to fetch news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews("technology");
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <Header
        title="News AI"
        onSearch={fetchNews}
        onToggleDarkMode={toggleDarkMode}
        darkMode={darkMode}
      />
      <SearchBar onSearch={fetchNews} />

      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && !error && (
        <div className="news-container">
          {news.map((article) => (
            <NewsCard
              key={article.url}
              title={article.title}
              description={article.description}
              url={article.url}
              source={article.source?.name}
              urlToImage={article.urlToImage}
            />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
