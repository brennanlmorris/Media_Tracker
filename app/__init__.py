from flask import Flask
from .routes.main import main

def create_app():
    app = Flask(__name__)

    #Registers blueprints and configure app here
    app.register_blueprint(main)

    return app