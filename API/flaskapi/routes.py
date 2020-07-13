from flask import render_template, url_for, flash, redirect
from flaskapi import app, db, bcrypt
from flask_login import login_user, current_user, logout_user, login_required
from flaskapi import models
from email_validator import validate_email, EmailNotValidError
from flaskapi.models import User, Book, Corr
from flask import request, jsonify, abort, message_flashed
from flask_mail import Message
from pyisemail import is_email
from flask_login import logout_user
import sqlite3
from datetime import datetime, date
from cor_model_modified import CORModel
from cor_files import test, original_books, ix
from whoosh.qparser import MultifieldParser
import pandas as pd
import numpy as np
from numpy import genfromtxt
import json
import operator
import random
from collections import Counter


#PLease do not run conventional db.drop and db.create....it will be applied to all the tables (including corr matrix db)

# db.drop_all(bind=[None])            #Wipes out only default database aka user and books database
# db.create_all(bind=[None])



@app.route('/logout', methods=['GET', 'POST'])
def apilogout():
    if current_user.is_authenticated:
        logout_user()
        return jsonify({'logged_out': 'True', 'message': 'User Logged out'}), 201
    else:
        return jsonify({'error': 'Invalid Request'}), 400


@app.route('/login', methods=['POST','GET'])
def apilogin():
    if request.method == 'GET':
        if current_user.is_authenticated:
            return jsonify({'logged_in': 'True', 'message': 'User was Logged in Already','Username':current_user.username}), 201
        else:
            return jsonify({'error': 'Invalid Request'}), 400
    if current_user.is_authenticated:
        return jsonify({'logged_in': 'True', 'message': 'User was Logged in Already'}), 201
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        return jsonify({'error': 'Invalid Request'}), 400  # missing arguments
    if not (1 < len(username) < 20) or not (1 < len(password) < 60):
        return jsonify({'error': 'Invalid Request'}), 400
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'logged_in': 'True', 'message': 'User Logged in', 'Username':current_user.username}), 201
    else:
        return jsonify({'logged_in': 'False', 'message': 'Username or Password do not match'}), 400


@app.route('/register', methods=['POST'])
def apiregister():
    if current_user.is_authenticated:
        return jsonify({'logged_in': 'True', 'message': 'Logout to register a new user!'}), 401
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    if username is None or password is None or email is None:
        return jsonify({'error': 'Invalid Request'}), 400  # missing arguments
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
        user = User(username=username, email=email, password=pw_hash, date_created = datetime.now())
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return jsonify({'registered': 'True', 'message': 'Account Created','Username':current_user.username}), 201

@app.route('/new-rating', methods=['POST'])
def apirating():
    if current_user.is_authenticated:
        book_id = request.json.get('book_id')
        if book_id is None:
            return jsonify({'error': 'Invalid Request'}), 400
        else:
            book_id=int(book_id)
        print(book_id)
        if not (1 <= book_id <= 9927):
            return jsonify({'error': 'Invalid Request'}), 400
        rating = request.json.get('rating')
        if rating is None:
            return jsonify({'error': 'Invalid Request'}), 400
        else:
            rating=int(rating)
        if not (1 <= rating <= 5):
            return jsonify({'message': 'Rating can only be in tha range 1 to 5'}), 400
        genres=original_books['genres'][book_id-1]
        print(genres)
        title=original_books['title'][book_id-1]
        book = Book(book_id=book_id, user_id=current_user.id, rating=rating,genres=genres,title=title)
        db.session.add(book)
        db.session.commit()
        return 'OK'
    else:
        return jsonify({'error': 'Invalid Request'}), 400

@app.route('/UserProfile', methods=['GET'])
def apiprofile():
    if current_user.is_authenticated:
        books= Book.query.filter_by(rater=current_user).all()
        ratedBooks = []
        my_fav_genres=[]
        for book in books:
            if book.rating>=4:
                myFavGenresString = book.genres
                myFavGenresList = myFavGenresString.split(",")
                my_fav_genres.extend(myFavGenresList)
            ratedBooks.append({ 'id': book.book_id, 'title':  original_books['original_title'][book.book_id - 1], 'image': original_books['image_url'][book.book_id - 1], 'author':original_books['authors'][book.book_id - 1], 'rating': book.rating})
        if checkIfDuplicates(my_fav_genres):
            my_fav_genres = Repeat(my_fav_genres)
            my_fav_genres = list(dict.fromkeys(my_fav_genres))
        else:
            if len(my_fav_genres) >= 4:
                my_fav_genres = my_fav_genres[0::3]
        my_fav_genres = ','.join(my_fav_genres)
        return jsonify({'username': current_user.username, 'dateJoined': current_user.date_created.strftime('%d/%m/%Y'), 'booksRated': len(books), 'favGenres': my_fav_genres, 'ratedBooks': ratedBooks})
    else:
        return jsonify({'error': 'Invalid Request'}), 400

def checkIfDuplicates(eleList):
    setOfEle = set()
    for elem in eleList:
        if elem in setOfEle:
            return True
        else:
            setOfEle.add(elem)
    return False

def Repeat(x):
    _size = len(x)
    repeated = []
    for i in range(_size):
        k = i + 1
        for j in range(k, _size):
            if x[i] == x[j] and x[i] not in repeated:
                repeated.append(x[i])
    return repeated

@app.route('/Recommend', methods=['GET'])
def apirecommend():
    if current_user.is_authenticated:
        obj=CORModel()
        books= Book.query.filter_by(rater=current_user).all()
        count=len(books)
        if count==0:       # if not rated any then we give generalized recs
            minimum_to_include = 100000 #<-- You can try changing this minimum to include movies rated by fewer or more people
            average_ratings = original_books.loc[original_books['ratings_count'] > minimum_to_include]
            sorted_avg_ratings = average_ratings.loc[average_ratings['average_rating'] > 3]
            sorted_avg_ratings_book_id=[]
            for j in sorted_avg_ratings.book_id:
                sorted_avg_ratings_book_id.append(j)
            random.shuffle(sorted_avg_ratings_book_id)
            sorted_avg_ratings_book_id=sorted_avg_ratings_book_id[:20]
            recs = []
            for i in sorted_avg_ratings_book_id:
                recs.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1]})
            return ({'Recommendations': recs}),200

        else:
            my_fav_ID=[]
            for book in books:
                if book.rating >=3:
                    my_fav_ID.append(book.book_id)

            recommendations=obj.get_recommendations(my_fav_ID)
            return ({ 'Recommendations': recommendations }), 200
    else:
        return jsonify({'error': 'Invalid Request'}), 400


@app.route('/Trending', methods=['GET'])
def apitrending():
    if current_user.is_authenticated:
        books= Book.query.filter_by(rater=current_user).all()
        count=len(books)
        if count==0:
            minimum_to_include = 100000 #<-- You can try changing this minimum to include movies rated by fewer or more people
            average_ratings = original_books.loc[original_books['ratings_count'] > minimum_to_include]
            sorted_avg_ratings = average_ratings.loc[average_ratings['average_rating'] >= 3]
            sorted_avg_ratings_book_id=[]
            for j in sorted_avg_ratings.book_id:
                sorted_avg_ratings_book_id.append(j)
            random.shuffle(sorted_avg_ratings_book_id)
            sorted_avg_ratings_book_id=sorted_avg_ratings_book_id[:20]
            recs = []
            for i in sorted_avg_ratings_book_id:
                recs.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1]})
            return ({'Trending': recs}),200
        else:

            my_fav_genres=[]                                    #getting fav genres
            for book in books:
                my_fav_genres.append(book.genres)

            separator = ','
            new=separator.join(my_fav_genres)
            a = new.split(",")

            unique_list = []
            dict1={}
            for x in a:
                if x not in unique_list:                    #getting unique genres and count of each genre
                    unique_list.append(x)
                    dict1[x]=1
                else :
                    dict1[x]=dict1[x]+1

            top3 = Counter(x).most_common(3)            #top 3 most repeated genres

            print(dict1)
            sum = 0
            for k in top3:
                sum+=k[1]

            my_fav_ID=[]                                    #books already rated
            for book in books:
                if book.rating >=3:
                    my_fav_ID.append(book.book_id)

            final = []
            for k in top3:
                n = int(k[1]/sum*20)                                                                        #ratio of books to show
                average_ratings = original_books.loc[original_books['genres'].str.contains(k[0])]
                sorted_avg_ratings = average_ratings.sort_values(by="average_rating", ascending=False)
                sorted_avg_ratings = sorted_avg_ratings.sort_values(by="ratings_count", ascending=False)
                sorted_avg_ratings = sorted_avg_ratings[sorted_avg_ratings['ratings_count']>=30000]
                sorted_avg_ratings = sorted_avg_ratings[sorted_avg_ratings['average_rating']>=4]                #filter
                sorted_avg_ratings = sorted_avg_ratings.sample(frac=1).reset_index(drop=True)                       #randomize
                sorted_avg_ratings = [x for x in sorted_avg_ratings.iloc[:,0].tolist() if x not in my_fav_ID]       # remove if already rated
                final = final + sorted_avg_ratings[:n]                          #get top n according ot the ratio we calculated

            trending=[]                 #getting books and returning them
            for trends in final:
                trending.append({'id': int(trends), 'title':  original_books['original_title'][trends-1], 'image': original_books['image_url'][trends-1], 'author':original_books['authors'][trends-1]})
            return ({ 'Trending': trending }), 200
    else:
        return jsonify({'error': 'Invalid Request'}), 400


@app.route('/Summary', methods=['POST'])
def apisummary():
    if current_user.is_authenticated:
        book_id = request.json.get('book_id')
        if book_id is None:
            return jsonify({'error': 'Invalid Request'}), 400
        else:
            book_id=int(book_id)
        if not (1 <= book_id <= 9927):
            return jsonify({'error': 'Invalid Request'}), 400
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
                rating=books[i].rating
        if c!=0:
            summary.append({'author':authors,'title':title,'average_rating':average_rating,'image_url':image_url,'genres':genres,'description':description,'read_or_not':rating})
            return ({"Summary":summary}),200
        else:
            summary.append({'author':authors,'title':title,'average_rating':average_rating,'image_url':image_url,'genres':genres,'description':description,'read_or_not': 0})
            return ({"Summary":summary}),200
    else:
        return jsonify({'error': 'Invalid Request'}), 400


@app.route('/search/<key>', methods=['GET'])
def apisearch(key):
    if current_user.is_authenticated:
        searchTerm = key
        if searchTerm is None:
            return jsonify({'error': 'Invalid Request'}), 400
        searchTerm = searchTerm + "*"
        with ix.searcher() as searcher:
            query = MultifieldParser(["title", "author"], ix.schema).parse(searchTerm)
            #query = query.append('*')
            results = searcher.search(query, terms=True)
            searchResults = []
            for r in results:
                result = dict(r)
                searchResults.append(result)
        return jsonify({"searchResults": searchResults}),200
    else:
        return jsonify({'error': 'Invalid Request'}), 400





