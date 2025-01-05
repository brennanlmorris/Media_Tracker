from flask import Blueprint, render_template, request, jsonify
from app import get_sentiment_service
from app.services.news_service import NewsService

main_bp = Blueprint('main_bp', __name__)

news_service = NewsService()

@main_bp.route("/")
def index():
    return render_template("index.html")

@main_bp.route("/analyze", methods=["POST"])
def analyze():
    sentiment_service = get_sentiment_service()
    query = request.form.get("query")
    if not query:
        return jsonify({"error": "No query provided"}), 400

    articles = news_service.get_news(query)
    if articles is None:
        return jsonify({"error": "Error fetching news"}), 500

    processed_articles = []
    for article in articles:
        sentiment = sentiment_service.analyze_sentiment(article['title'])
        processed_articles.append({
            "title": article['title'],
            "link": article['link'],
            "published": article.get('published', 'Not available'),
            "sentiment": sentiment
        })

    return jsonify(processed_articles)

