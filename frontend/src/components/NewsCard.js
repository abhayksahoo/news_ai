import React from 'react';
import './NewsCard.css';

function NewsCard({ title, summary }) {
  return (
    <div className="news-card">
      <h2>{title}</h2>
      <p>{summary}</p>
    </div>
  );
}

export default NewsCard;
