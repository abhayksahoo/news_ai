import React from 'react';

export default function NewsCard({ title, url, description, imageUrl, publishedAt }) {
  const formattedDate = publishedAt ? new Date(publishedAt).toLocaleString() : 'Unknown Date';

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-xl overflow-hidden transition-all duration-300">
      {imageUrl && <img src={imageUrl} alt={title} className="object-cover h-48 w-full hover:scale-105 transition-transform" />}
      <div className="p-4">
        <h2 className="text-lg font-bold text-blue-600 hover:underline">
          <a href={url} target="_blank" rel="noopener noreferrer">
            {title}
          </a>
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{formattedDate}</p>
        <p className="text-gray-700 dark:text-gray-300 mt-4 line-clamp-3">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
