import requests

def fetch_news(api_key, query, language='en'):
    url = f"https://newsapi.org/v2/everything?q={query}&language={language}&apiKey={api_key}"
    headers = {
        "User-Agent": "NewsAI/1.0"
    }
    # print(f"Requesting URL: {url}")  # Log the full request URL
    response = requests.get(url, headers=headers)
    # print(f"Response status code: {response.status_code}")  # Log the status code
    # print(f"Response body: {response.text}")  # Log the response body
    if response.status_code == 200:
        results = response.json().get('articles', [])
        limited_results = results[:8]
        if not limited_results:
            # print("No articles found for the query.")  # Log if no articles are found
            return []
        return [
            {
                "title": article.get('title', "No title available"),
                "content": article.get('content', "No content available"),
                "description": article.get('description', "No description available"),
                "url": article.get('url', "#"),
                "urlToImage": article.get('urlToImage', None),
                "publishedAt": article.get('publishedAt', None),
            }
            for article in limited_results
        ]
    elif response.status_code == 429:
        print("API quota exceeded. Returning an error message.")
        return {"error": "API quota exceeded. Please try again later or upgrade your plan."}
    else:
        # print(f"Error fetching news from NewsAPI.org: {response.status_code}, Response: {response.text}")  # Log the error
        return {"error": f"Error fetching news: {response.status_code}"}