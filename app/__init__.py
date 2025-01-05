from flask import Flask
app = Flask(__name__, template_folder='templates') # Initialize app here

def create_app():
    from .routes.main import main_bp  # Import routes here after app creation
    app.register_blueprint(main_bp)

    return app

def get_sentiment_service():
    from .services.sentiment_service import SentimentService

    if 'sentiment_service' not in app.extensions:
        app.extensions['sentiment_service'] = SentimentService()

    return app.extensions['sentiment_service']

