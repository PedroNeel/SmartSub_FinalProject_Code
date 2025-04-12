from flask import Blueprint, request, flash, redirect, url_for
from flask_login import login_user, logout_user, login_required
from app.models import User
from app import login_manager

auth_bp = Blueprint('auth', __name__)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@auth_bp.route('/login', methods=['POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    user = User.query.filter_by(email=email).first()
    
    if user and user.check_password(password):
        login_user(user)
        return redirect(url_for('main.dashboard'))
    flash('Invalid credentials')
    return redirect(url_for('main.index'))

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))