from flask import Flask, request, jsonify, make_response
from flask_cors import CORS  # Import CORS
from news_fetcher import fetch_news
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get the NEWS_API_KEY from environment variables
NEWS_API_KEY = os.getenv("NEWS_API_KEY")
if not NEWS_API_KEY:
    raise EnvironmentError("NEWS_API_KEY environment variable not found. Please set it in the .env file.")

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/news', methods=['GET'])
def get_news():
    try:
        query = request.args.get('query', 'technology')  # Default to 'technology' if no query is provided
        articles = fetch_news(NEWS_API_KEY, query)
        if not articles:
            return jsonify({"error": "No articles found for the given query."}), 200

        # Add headers to disable caching
        response = make_response(jsonify(articles), 200)
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
        return response
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
