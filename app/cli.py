import click
from app import db
from app.models import User
from flask.cli import with_appcontext

def register_commands(app):
    @app.cli.command("init-db")
    @with_appcontext
    def init_db():
        """Initialize the database"""
        db.create_all()
        click.echo("Database initialized")

    @app.cli.command("create-admin")
    @click.argument("email")
    @click.argument("password")
    @with_appcontext
    def create_admin(email, password):
        """Create an admin user"""
        admin = User(
            name="Admin",
            surname="User",
            email=email,
            role="admin"
        )
        admin.set_password(password)
        db.session.add(admin)
        db.session.commit()
        click.echo(f"Admin user {email} created")