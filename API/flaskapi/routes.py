from flask import render_template, url_for, flash, redirect
from flaskapi import app, db, bcrypt
from flask_login import login_user, current_user, logout_user, login_required
from flaskapi import models
from email_validator import validate_email, EmailNotValidError
from flaskapi.models import User, Book
from flask import request, jsonify, abort, message_flashed
from flask_mail import Message
from pyisemail import is_email

db.create_all()
@app.route("/")
def home():
    return "Hello from flask > BRS file!"

@app.route('/login', methods = ['POST'])
def apilogin():
    username = request.json.get('username')
    password = request.json.get('password')
    print('\nUsername and password received from user')
    if username is None or password is None:
        abort(400) # missing arguments
    print('\nChecked whether entered values are none, they are not')    
    user = User.query.filter_by(username=username).first()
    print('\nUsername match found')
    if user and bcrypt.check_password_hash(user.password, password):
        print('\nInside if, username and password matched')
        checker = login_user(user, remember=False)
        print('\nUser logged in', checker)
        return jsonify({ 'logged_in': 'True', 'message':'User Logged in' }), 200
    else:
        print('\nInside else, no match found')
        return jsonify({ 'logged_in': 'False', 'message':'Username or Password do not match' }), 400

@app.route('/register', methods = ['POST'])
def apiregister():
    username = request.json.get('username')

    if len(username) < 1 or len(username) > 20:
        return jsonify({ 'message': 'Username too long' }),400        
    password = request.json.get('password')
    email = request.json.get('email')
    bool_result = is_email(email)

    if bool_result is False:
        return jsonify({ 'message': 'Invalid email!' }),400
    if username is None or password is None or email is None:
        abort(400) # missing arguments
    if User.query.filter_by(email=email).first():
        return jsonify({ 'registered': 'False', 'message':'Email exists' }), 400
    if User.query.filter_by(username=username).first():
        return jsonify({ 'registered': 'False', 'message':'User exists' }), 400
    else:
        pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, email=email, password=pw_hash)
        db.session.add(user)
        db.session.commit()
        return jsonify({'registered': 'True', 'message':'Account Created' }), 201

@app.route('/new-rating', methods = ['POST'])
def apirating():
    user_id = User.get_id(current_user)    
    book_id = request.json.get('book_id')
    rating = request.json.get('rating')
    if rating < 1 or rating > 5:
        raise AssertionError('Rating given must be between 1 and 5')
    book = Book(book_id = book_id, user_id = user_id, rating = rating)