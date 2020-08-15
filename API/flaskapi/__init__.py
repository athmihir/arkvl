from flask import Flask
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
import os
from datetime import timedelta


app = Flask(__name__, static_folder='../build', static_url_path='/', template_folder='../static')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
# app.config['SQLALCHEMY_BINDS'] = {'db2': 'sqlite:///site2.db'}

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SQLALCHEMY_BINDS'] = {'db2': os.environ.get('HEROKU_POSTGRESQL_WHITE_URL')}


app.config['MAIL_SERVER'] = 'smtp.sendgrid.net'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'apikey'
app.config['MAIL_PASSWORD'] = os.environ.get('SENDGRID_API_KEY')
app.config['MAIL_DEFAULT_SENDER'] = 'Arkvlspace@em1215.arkvl.space'
app.config["REMEMBER_COOKIE_DURATION"] = timedelta(days=30)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'
mail = Mail(app)


@app.route('/')
def index():
    return app.send_static_file('index.html')


from flaskapi import routes


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
