from flask import render_template, url_for, flash, redirect
from flaskapi import app, db, bcrypt
from flask_login import login_user, current_user, logout_user, login_required
from flaskapi import models
from email_validator import validate_email, EmailNotValidError
from flaskapi.models import User, Book
from flask import request, jsonify, abort, message_flashed
from flask_mail import Message
from pyisemail import is_email
from flask_login import logout_user
import sqlite3
from cor_model_modified import CORModel
from cor_files import correlation, test,books_data,original_books
import pandas as pd
import numpy as np
from numpy import genfromtxt
import json
import operator
import random


db.drop_all()
db.create_all()


#db.drop_all()
db.create_all()
@app.route("/")
def home():
    return "Hello from flask > BRS file!"


@app.route('/logout', methods=['GET', 'POST'])
@login_required
def apilogout():
    logout_user()
    return jsonify({'logged_out': 'True', 'message': 'User Logged out'}), 201


@app.route('/login', methods=['POST','GET'])
def apilogin():
    if request.method == 'GET':
        if current_user.is_authenticated:
            return jsonify({'logged_in': 'True', 'message': 'User was Logged in Already'}), 201 
    else:      
        if current_user.is_authenticated:
            return jsonify({'logged_in': 'True', 'message': 'User was Logged in Already'}), 201
        username = request.json.get('username')
        password = request.json.get('password')
        if username is None or password is None:
            abort(400)  # missing arguments
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user)
            return jsonify({'logged_in': 'True', 'message': 'User Logged in'}), 201
        else:
            return jsonify({'logged_in': 'False', 'message': 'Username or Password do not match'}), 400


@app.route('/register', methods=['POST'])
def apiregister():
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    if username is None or password is None or email is None:
        abort(400)  # missing arguments
    if len(username) < 1 or len(username) > 20:
        return jsonify({'message': 'Username too long'}), 400
    if len(password) < 1 or len(password) > 60:
        return jsonify({'message': 'password too long'}), 400
    if len(email) < 1 or len(email) > 120:
        return jsonify({'message': 'email too long'}), 400
    bool_result = is_email(email)
    if bool_result is False:
        return jsonify({'message': 'Invalid email!'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'registered': 'False', 'message': 'Email exists'}), 400
    if User.query.filter_by(username=username).first():
        return jsonify({'registered': 'False', 'message': 'User exists'}), 400
    else:
        pw_hash = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, email=email, password=pw_hash)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify({'registered': 'True', 'message': 'Account Created', 'logged_in': 'True'}), 201


@app.route('/new-rating/<int:book_id>', methods=['POST'])
@login_required
def apirating(book_id):
      user_id = User.get_id(current_user)
      print(book_id)
      if book_id < 1 or book_id>10000:
          abort(404)
      rating = int(request.json.get('rating'))
      print(rating)
      if rating < 1 or rating > 5:
          return jsonify({'message': 'Rating can only be in tha range 1 to 5'}), 400
      genres=original_books['genres'][book_id-1]
      print(genres)
      title=original_books['title'][book_id-1]
      book = Book(book_id=book_id, user_id=user_id, rating=rating,genres=genres,title=title)
      db.session.add(book)
      db.session.commit()
      return 'OK'

@app.route('/UserProfile', methods=['POST'])
@login_required
def apiprofile():
      books= Book.query.filter_by(rater=current_user).all()
      count=Book.query.filter_by(rater=current_user).count()
      user_name=current_user.username
      user_email=current_user.email
      ratedBooks = []
      my_fav_genres=[]
      for i in range (0,count): 
        my_fav_genres.append(books[i].genres)          
        ratedBooks.append({ 'id': books[i].book_id, 'title':  original_books['original_title'][books[i].book_id - 1], 'image': original_books['image_url'][books[i].book_id - 1], 'author':original_books['authors'][books[i].book_id - 1], 'rating': books[i].rating})
      my_fav_genres = list(dict.fromkeys(my_fav_genres))
      return jsonify({'username': user_name, 'booksRated': count, 'favGenres': my_fav_genres, 'ratedBooks': ratedBooks})

@app.route('/Recommend', methods=['GET'])
@login_required
def apirecommend():
      obj=CORModel(correlation, test,books_data)
      books= Book.query.filter_by(rater=current_user).all()
      count=Book.query.filter_by(rater=current_user).count()
      if count==0:
      #print("RECOMMENDED FOR ANYBODY:")
      #sorted_avg_ratings.head()
       minimum_to_include = 100000 #<-- You can try changing this minimum to include movies rated by fewer or more people

       average_ratings = original_books.loc[original_books['ratings_count'] > minimum_to_include]
       sorted_avg_ratings = average_ratings.loc[average_ratings['average_rating'] > 3]
       #sorted_avg_ratings = average_ratings.sort_values(by="average_rating", ascending=False)
       #random.shuffle(sorted_avg_ratings)
       sorted_avg_ratings_book_id=[]
       for j in sorted_avg_ratings.book_id:
        sorted_avg_ratings_book_id.append(j)

       random.shuffle(sorted_avg_ratings_book_id)
       sorted_avg_ratings_book_id=sorted_avg_ratings_book_id[:20]
       print(sorted_avg_ratings_book_id)
       recs = []
       for i in sorted_avg_ratings_book_id:
        recs.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1]})
        #recs=json.dumps(recs)
       return ({'Recommendations': recs}),200

      else:
       my_fav_ID=[]
       for i in range (0,count): 
           if books[i].rating >=3:
             my_fav_ID.append(books[i].book_id)
       print(my_fav_ID)
       recommendations=obj.get_recommendations(my_fav_ID)
       print(recommendations)
       recommendations=json.dumps(recommendations)
       return ({ 'Recommendations': recommendations }), 200

@app.route('/trending', methods=['GET'])
@login_required
def apitrending():
      books= Book.query.filter_by(rater=current_user).all()
      count=Book.query.filter_by(rater=current_user).count()
      if count==0:
      #print("RECOMMENDED FOR ANYBODY:")
      #sorted_avg_ratings.head()
       minimum_to_include = 100000 #<-- You can try changing this minimum to include movies rated by fewer or more people

       average_ratings = original_books.loc[original_books['ratings_count'] > minimum_to_include]
       sorted_avg_ratings = average_ratings.loc[average_ratings['average_rating'] >= 3]
       #sorted_avg_ratings = average_ratings.sort_values(by="average_rating", ascending=False)
       #random.shuffle(sorted_avg_ratings)
       sorted_avg_ratings_book_id=[]
       for j in sorted_avg_ratings.book_id:
        sorted_avg_ratings_book_id.append(j)

       random.shuffle(sorted_avg_ratings_book_id)
       sorted_avg_ratings_book_id=sorted_avg_ratings_book_id[:20]
       print(sorted_avg_ratings_book_id)
       recs = []
       for i in sorted_avg_ratings_book_id:
            recs.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1]})
       recs=json.dumps(recs)
       return  recs,200
      else:

       my_fav_genres=[]
       for i in range (0,count):
           my_fav_genres.append(books[i].genres)
       print(my_fav_genres)

       separator = ','
       new=separator.join(my_fav_genres)
       print(new)

       a = new.split(",")
       print(a)

       unique_list = [] 
       dict={}
       for x in a: 
           if x not in unique_list: 
               unique_list.append(x) 
               dict[x]=1
           else :
               dict[x]=dict[x]+1
       for x in unique_list: 
           print(x)
       print(dict)
       filtered_dict={}
       for key, value in dict.items():
        if (value >= count/2):
            filtered_dict[key] = value
       #print(filtered_dict)
       final=None
       for k in dict.keys():
        average_ratings = original_books.loc[original_books['genres'].str.contains(k)]
        sorted_avg_ratings = average_ratings.sort_values(by="average_rating", ascending=False)
        sorted_avg_ratings = sorted_avg_ratings.sort_values(by="ratings_count", ascending=False)
        sorted_avg_ratings = sorted_avg_ratings[sorted_avg_ratings['ratings_count']>=30000]
        sorted_avg_ratings = sorted_avg_ratings[sorted_avg_ratings['average_rating']>=4]
        print(sorted_avg_ratings['title'].head(10))
        if (final==None)._bool_:
         final=sorted_avg_ratings
        else :
         final=final.append(sorted_avg_ratings)

        trending=[]
        trendingIDs=[]
        #repeated=[]
        countID=-1
        finalBookIDs = final['book_id'].values
        for y in final['title']:
            countID = countID + 1 
            z = finalBookIDs[countID]
            if y not in trending : 
                c=0
                for i in range (0,count): 
                    if y in books[i].title:
                        c=c+1
                if c==0:
                 trending.append(y)
                 trendingIDs.append(z)
                 random.shuffle(trendingIDs) 
        trendingIDs=trendingIDs[:20]
        trending = []
        for i in range(len(trendingIDs)):
            trending.append({'id': int(trendingIDs[i]), 'title':  original_books['original_title'][trendingIDs[i]-1], 'image': original_books['image_url'][trendingIDs[i]-1], 'author':original_books['authors'][trendingIDs[i]-1]})
        trending = json.dumps(trending)
        return trending, 200

@app.route('/Summary', methods=['POST'])
@login_required
def apisummary():
        book_id = int(request.json.get('book_id'))
        authors=original_books['authors'][book_id-1]
        title=original_books['title'][book_id-1]
        average_rating=original_books['average_rating'][book_id-1]
        image_url=original_books['image_url'][book_id-1]
        genres=original_books['genres'][book_id-1]
        description=original_books['description'][book_id-1]

        summary = []

        books= Book.query.filter_by(rater=current_user).all()
        count=Book.query.filter_by(rater=current_user).count()
        c=0
        for i in range (0,count): 
            if book_id == books[i].book_id:
              c=c+1
        if c!=0:
            summary.append({'author':authors,'title':title,'average_rating':average_rating,'image_url':image_url,'genres':genres,'description':description,'read_or_not':1})
            summary=json.dumps(summary)
            return summary
        else:
            summary.append({'author':authors,'title':title,'average_rating':average_rating,'image_url':image_url,'genres':genres,'description':description,'read_or_not': 0})
            summary=json.dumps(summary)
            return summary
