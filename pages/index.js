import React, { useState } from 'react';
import Header from '../components/Header';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const fetchNews = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/news?query=${query}`);
      const data = await response.json();
      setNews(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching news:', error);
    }
    setLoading(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Header onSearch={fetchNews} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((article, index) => (
              <NewsCard key={index} {...article} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
