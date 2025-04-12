from app.main import main_bp
from flask import render_template

@main_bp.route('/')
def home():
    return "<h1>Welcome to the Main Blueprint</h1>"
