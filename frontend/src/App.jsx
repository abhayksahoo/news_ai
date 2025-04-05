import React, { useState, useEffect } from "react";
import axios from "axios";
import { Moon, Sun } from "lucide-react";
import NewsCard from "./components/NewsCard";
import Input from "./components/ui/input";
import Toggle from "./components/ui/toggle";

function App() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (query = "") => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8000/news?q=${query}`
      );
      setArticles(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to load news. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("darkMode");
      if (savedTheme !== null) {
        setDarkMode(savedTheme === "true");
      }
    } catch (err) {
      // Silent fail
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchNews(searchTerm);
    }
  };

  return (
    <div className="transition-colors duration-300 min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white">
      <header className="flex justify-between items-center px-6 py-4 border-b dark:border-zinc-700">
        <h1 className="text-2xl font-bold">News AI</h1>
        <Toggle
          type="button"
          aria-label="Toggle dark mode"
          pressed={darkMode}
          onPressedChange={() => setDarkMode(!darkMode)}
          className="flex items-center gap-2 p-2 border rounded-full bg-zinc-200 dark:bg-zinc-800"
        >
          {darkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {darkMode ? "Light" : "Dark"} Mode
          </span>
        </Toggle>
      </header>

      <div className="flex justify-center mt-6">
        <Input
          type="text"
          placeholder="Search trending topics like ChatGPT, AI..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch}
          className="w-full max-w-xl border shadow px-4 py-2"
        />
      </div>

      <main className="px-4 sm:px-8 mt-10">
        {loading && <p className="text-center mt-20 text-lg">Loading...</p>}

        {!loading && error && (
          <p className="text-center mt-20 text-lg text-red-500">{error}</p>
        )}

        {!loading && !error && articles.length === 0 && (
          <p className="text-center mt-20 text-lg">
            No articles found. Try searching something else.
          </p>
        )}

        {!loading && !error && articles.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {articles.map((article) => (
              <NewsCard
                key={article.url}
                title={article.title}
                url={article.url}
                description={article.description}
                imageUrl={article.urlToImage}
                publishedAt={article.publishedAt}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
