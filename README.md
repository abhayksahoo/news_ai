# News Fetcher

News Fetcher is an application that allows users to search for the latest news on any topic of their interest. It fetches the top 5 news articles and provides source links for further reading.

## Project Structure
```
news_fetcher/
├── backend/
│   ├── app.py               # Main Flask app
│   ├── news_fetcher.py      # Module for fetching news
│   ├── .env                 # Environment variables (e.g., API keys)
│   ├── requirements.txt     # Python dependencies
│   ├── __init__.py          # Marks backend as a Python package
├── frontend/
│   ├── public/
│   │   ├── index.html       # Main HTML file
│   ├── src/
│   │   ├── index.js         # Entry point for React app
│   │   ├── App.js           # Main React component
│   │   ├── components/      # Folder for React components
│   │   │   ├── NewsCard.js  # Component to display individual news articles
│   │   │   ├── SearchBar.js # Component for the search bar
│   ├── styles/          # Folder for CSS files
│   │   │   ├── App.css      # Styling for the app
│   ├── .env                 # Environment variables (e.g., backend URL)
│   ├── package.json         # Dependencies for the React app
├── .gitignore               # Ignore sensitive files
```

## Setup Instructions

### Prerequisites
- Python 3.8 or higher
- Node.js and npm
- API key for Currents API (or another news API)

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the `backend/` folder and add your Currents API key:
   ```plaintext
   NEWS_API_KEY=your_currents_api_key
   ```

4. Run the backend server:
   ```bash
   python app.py
   ```

5. Verify the server is running at `http://127.0.0.1:5000`.

6. Test the `/news` endpoint:
   ```bash
   curl "http://127.0.0.1:5000/news?query=technology"
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend/` folder and add the backend URL:
   ```plaintext
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. Start the React development server:
   ```bash
   npm start
   ```

### Running the Application
1. Ensure the backend server is running on `http://localhost:5000`.
2. Open the frontend in your browser at `http://localhost:3000`.
3. Use the search bar to type a topic and view news articles.

### Currents API Integration

The backend now uses the Currents API to fetch news articles. Ensure you have a valid API key from [Currents API](https://currentsapi.services/en/docs/).

```
https://api.currentsapi.services/v1/search?keywords={query}&language={language}&apiKey={api_key}
```

### Step 4: Test the Backend
1. Open your browser or use a tool like `curl` or Postman to test the `/news` endpoint:
   ```bash
   curl "http://127.0.0.1:5000/news?query=technology"
   ```

2. Ensure the backend returns a JSON response with news articles.

### Running the Backend in Production

#### Using Waitress (Windows)
1. Install Waitress:
   ```bash
   pip install waitress
   ```

2. Run the backend server:
   ```bash
   python -m waitress --host=0.0.0.0 --port=5000 app:app
   ```

#### Using Gunicorn (Unix/Linux)
1. Install Gunicorn:
   ```bash
   pip install gunicorn
   ```

2. Run the backend server:
   ```bash
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```

3. Verify the server is running at `http://127.0.0.1:5000`.

## Environment Variables

### Backend
Create a `.env` file in the `backend/` folder with the following content:
```plaintext
NEWS_API_KEY=your_currents_api_key
```

### Frontend
Create a `.env` file in the `frontend/` folder with the following content:
```plaintext
REACT_APP_BACKEND_URL=http://localhost:5000
```

### `.gitignore`
Ensure `.env` files are excluded from version control by adding the following to `.gitignore`:
```plaintext
backend/.env
frontend/.env
```

## Future Enhancements
- Add pagination for more news articles.
- Add user authentication for personalized news feeds.

## License
This project is open-source and available under the MIT License.
