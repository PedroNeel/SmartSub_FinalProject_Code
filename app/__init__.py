from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from werkzeug.middleware.proxy_fix import ProxyFix
from config import Config

db = SQLAlchemy()
login_manager = LoginManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'

    from app.main import main_bp
    from app.auth import auth_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)

    from app.cli import register_commands
    register_commands(app)

    register_error_handlers(app)

    with app.app_context():
        db.create_all()

    return app

def register_error_handlers(app):
    @app.errorhandler(404)
    def not_found_error(error):
        return render_template('errors/404.html'), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        return render_template('errors/500.html'), 500
