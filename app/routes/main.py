from typing import Dict, List, Any
from flask import Blueprint, render_template, request, jsonify
from app import get_sentiment_service
from app.services.news_service import NewsService

main_bp = Blueprint('main_bp', __name__)

news_service = NewsService()

@main_bp.route("/")
def index():
    return render_template("index.html")

@main_bp.route("/analyze", methods=["POST"])
def analyze() -> jsonify:
    sentiment_service = get_sentiment_service()
    query = request.form.get("query")
    print(f"Received query: {query}")

    if not query:
        return jsonify({"error": "No query provided"}), 400

    articles = news_service.get_news(query)
    print(f"Articles fetched: {articles}")

    if articles is None:
        return jsonify({"error": "Error fetching news"}), 500

    processed_articles: List[Dict[str, Any]] = []
    for article in articles:
        print(f"Analyzing sentiment for: {articles}")
        sentiment: Dict[str, float] = sentiment_service.analyze_sentiment(article[:512])
        print(f"Sentiment: {sentiment}")

        processed_articles.append({
            "title": article,
            "link": '',
            "published": 'Not available',
            "sentiment": sentiment
        })

    print(f"Returning processed articles: {processed_articles}")
    return jsonify(processed_articles)