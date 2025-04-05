import React from "react";

function NewsCard({ title, url, description, imageUrl, publishedAt }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-200 dark:border-gray-700"
    >
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
          {description}
        </p>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-auto">
          {new Date(publishedAt).toLocaleDateString()}
        </span>
      </div>
    </a>
  );
}

export default NewsCard;
