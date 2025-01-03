from flask import Blueprint, render_template, request, jsonify
from app import app
from app.services.news_service import NewsService
from app.services.sentiment_service import SentimentService

main_bp = Blueprint('main_bp', __name__)

news_service = NewsService()
sentiment_service = SentimentService()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    query = request.form.get("query")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    articles = news_service.get_news(query)
    if articles is None:
        return jsonify({"error": "Error fetching news"}), 500

    processed_articles = []
    for article in articles:
        processed_articles.append({
            "title": article['title'],
            "link": article['link'],
            "published": article.get('published', 'Not available')
        })

    return jsonify(processed_articles)

