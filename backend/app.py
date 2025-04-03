from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
from news_fetcher import fetch_news
from summarizer import summarize_text
import os
from dotenv import load_dotenv, find_dotenv

# Load environment variables
if not find_dotenv():
    raise FileNotFoundError(".env file not found. Please create one with the required API keys.")
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/news', methods=['GET'])
def get_news():
    try:
        query = request.args.get('query', 'technology')
        print(f"Received request for query: {query}")  # Log each request
        api_key = os.getenv("NEWS_API_KEY")
        if not api_key:
            return jsonify({"error": "API key not found"}), 500

        print(f"Fetching news for query: {query}")  # Log the query
        articles = fetch_news(api_key, query)
        if not articles:
            print("No articles fetched from Currents API.")  # Log if no articles are fetched
            return jsonify({"error": "No articles found for the given query."}), 200

        summarized_articles = []
        for article in articles:
            try:
                print(f"Summarizing article: {article['title']}")  # Log the article title
                summary = summarize_text(article.get('content', 'No content available'))
                summarized_articles.append({"title": article['title'], "summary": summary})
            except Exception as e:
                print(f"Error summarizing article: {e}")
                summarized_articles.append({"title": article['title'], "summary": "Error summarizing this article."})

        print(f"Summarized articles: {summarized_articles}")  # Log the summarized articles
        return jsonify(summarized_articles), 200
    except Exception as e:
        print(f"Error in /news endpoint: {e}")  # Log the error
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
