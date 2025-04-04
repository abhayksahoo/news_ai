import React from 'react';
import './NewsCard.css';

function NewsCard({ title, url, description, imageUrl, publishedAt }) {
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleString() : 'Unknown Date';

  return (
    <div className="news-card">
      <h2>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h2>
      {imageUrl && <img src={imageUrl} alt={title} className="news-image" />}
      <p>{description}</p>
      <p><strong>Published At:</strong> {formattedDate}</p>
    </div>
  );
}

export default NewsCard;
