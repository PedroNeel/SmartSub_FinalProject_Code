from app.auth import auth_bp
from flask import render_template

@auth_bp.route('/login')
def login():
    return "<h1>Login Page</h1>"
