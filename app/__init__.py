from flask import Flask

app = Flask(__name__, template_folder='templates') # Initialize app here

def create_app():
    # Registers blueprints and configure app here

    from .routes.main import main_bp  # Import routes here after app creation
    app.register_blueprint(main_bp)

    return app

