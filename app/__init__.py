from flask import Flask

def create_app():
    app = Flask(__name__)

    #Registers blueprints and configure app here

    return app