from flask import Flask
from app.services.sentiment_service import SentimentService
app = Flask(__name__, template_folder='templates') # Initialize app here
sentiment_service = None

def create_app():
    global sentiment_service

    sentiment_service = SentimentService()

    from .routes.main import main_bp  # Import routes here after app creation
    app.register_blueprint(main_bp)

    return app

def get_sentiment_service():
    global sentiment_service
    if sentiment_service is None:
        raise RuntimeError("SentimentService has not been initialized")
    return sentiment_service

