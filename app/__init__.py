from flask import Flask
from app.services.sentiment_service import SentimentService
app = Flask(__name__, template_folder='templates') # Initialize app here

def create_app():
    # Registers blueprints and configure app here

    from .routes.main import main_bp  # Import routes here after app creation
    app.register_blueprint(main_bp)

    sentiment_service = SentimentService()
    app.config['SENTIMENT_SERVICE'] = sentiment_service

    return app

