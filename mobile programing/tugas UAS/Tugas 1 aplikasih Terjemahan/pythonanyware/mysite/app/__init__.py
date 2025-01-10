from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    # Konfigurasi database SQLite
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/izal/mysite/rama'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db = SQLAlchemy(app)

    db.init_app(app)

    with app.app_context():
        from .routes import bp as main_bp
        app.register_blueprint(main_bp)

    return app
