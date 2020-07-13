from flask import Flask
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dfc8e8057418dbd98274a233fff7eb7a'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
# app.config['SQLALCHEMY_BINDS'] = {'db2': 'sqlite:///site2.db'}

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://bimalsrbauwkjh:35a92634533d869cd09b72ffc000f4083c92ec5954d8aa150c3ab5cc61dd041f@ec2-18-211-48-247.compute-1.amazonaws.com:5432/d1525nndol0bct'
app.config['SQLALCHEMY_BINDS'] = {'db2': 'postgres://mfqignlvwxbpbq:1113e5f55f5f33868ae6dfa82051d6097fcc3413f620ff13bea1849ef6068bc3@ec2-18-211-48-247.compute-1.amazonaws.com:5432/d1mlkkp8039dhe'}

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

from flaskapi import routes
