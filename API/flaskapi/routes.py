from flask import render_template, url_for, flash, redirect
from flaskapi import app, db, bcrypt, mail
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
from cor_files import original_books, ix
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



@app.route('/api/logout', methods=['GET', 'POST'])
def apilogout():
    if current_user.is_authenticated:
        logout_user()
        return jsonify({'logged_out': 'True', 'message': 'User logged out'}), 200
    else:
        return jsonify({'error': 'Invalid Request'}), 401


@app.route('/api/login', methods=['POST','GET'])
def apilogin():
    if request.method == 'GET':
        if current_user.is_authenticated:
            return jsonify({'logged_in': 'True', 'message': 'User was Logged in Already','Username':current_user.username}), 200
        else:
            return jsonify({'error': 'Invalid Request'}), 401
    if current_user.is_authenticated:
        return jsonify({'logged_in': 'True', 'message': 'User was Logged in Already'}), 200
    username = request.json.get('username')
    password = request.json.get('password')
    if username is None or password is None:
        return jsonify({'error': 'Invalid Request'}), 400  # missing arguments
    if not (1 < len(username) < 20) or not (1 < len(password) < 60):
        return jsonify({'error': 'Invalid Request'}), 400
    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'logged_in': 'True', 'message': 'User Logged in', 'Username':current_user.username}), 200
    else:
        return jsonify({'logged_in': 'False', 'message': 'Username or Password do not match'}), 400


def send_verification_email(user):
    token = user.get_verification_token()
    msg = Message('Account Verification',
                  sender='Arkvlspace@em1215.arkvl.space',
                  recipients=[user.email])
    msg.body = f''' To verify your account, click on the link below:
{url_for('verify_register', token=token, _external=True)}

If you did not make this request then simply ignore this email and no changes will be made
'''
    mail.send(msg)

@app.route('/api/register', methods=['POST'])
def apiregister():
    if current_user.is_authenticated:
        return jsonify({'logged_in': 'True', 'message': 'Logout to register a new user!'}), 401
    username = request.json.get('username')
    password = request.json.get('password')
    email = request.json.get('email')
    if username is None or password is None or email is None:
        return jsonify({'message': 'Fields cannot be blank!'}), 400  # missing arguments
    if len(username) < 1 or len(username) > 20:
        return jsonify({'message': 'Username too long'}), 400
    if len(password) < 1 or len(password) > 60:
        return jsonify({'message': 'Password too long'}), 400
    if len(email) < 1 or len(email) > 120:
        return jsonify({'message': 'Email too long'}), 400
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
        send_verification_email(user)
        login_user(user)
        return jsonify({'registered': 'True', 'message': 'Account Created','Username':current_user.username}), 201

@app.route('/api/new-rating', methods=['POST', 'PUT'])
def apirating():
    if current_user.is_authenticated:
        book_id = request.json.get('book_id')
        if book_id is None:
            return jsonify({'error': 'Invalid Request'}), 400
        else:
            book_id=int(book_id)
        booky = Book.query.filter_by(rater=current_user, book_id=book_id).first()
        if not (1 <= book_id <= 9927):
            return jsonify({'error': 'Invalid Request'}), 400
        rating = request.json.get('rating')
        if rating is None:
            return jsonify({'error': 'Invalid Request'}), 400
        else:
            rating=int(rating)
        if not (0 <= rating <= 5):
            return jsonify({'message': 'Rating can only be in tha range 0 to 5'}), 400
        genres=original_books['genres'][book_id-1]
        print(genres)
        title=original_books['title'][book_id-1]
        if rating == 0:
            if booky:
                db.session.delete(booky)
            else:
                return jsonify({'error': 'Book has not been rated before'}), 400
        elif booky:
            booky.rating = rating
        else:
            book = Book(book_id=book_id, user_id=current_user.id, rating=rating,genres=genres,title=title)
            db.session.add(book)
        db.session.commit()
        return jsonify({'message': 'Book rated'}),201
    else:
        return jsonify({'error': 'Invalid Request'}), 400

@app.route('/api/user-profile', methods=['GET'])
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
            my_fav_genres = [key for key, value in Counter(my_fav_genres).most_common()]
            if len(my_fav_genres) >= 4:
                my_fav_genres = my_fav_genres[:4]
        else:
            if len(my_fav_genres) >= 4:
                my_fav_genres = my_fav_genres[0::3]
        my_fav_genres = ','.join(my_fav_genres)
        return jsonify({'username': current_user.username, 'dateJoined': current_user.date_created.strftime('%d/%m/%Y'), 'booksRated': len(books), 'favGenres': my_fav_genres, 'ratedBooks': ratedBooks, 'verified':current_user.verified}), 200
    else:
        return jsonify({'error': 'Invalid Request'}), 401

def checkIfDuplicates(eleList):
    setOfEle = set()
    for elem in eleList:
        if elem in setOfEle:
            return True
        else:
            setOfEle.add(elem)
    return False

@app.route('/api/recommend', methods=['GET'])
def apirecommend():
    if current_user.is_authenticated:
        obj=CORModel()
        books= Book.query.filter_by(rater=current_user).all()
        count=len(books)
        if count==0:       # if not rated any then we give generalized recs
            minimum_to_include = 300000 #<-- You can try changing this minimum to include movies rated by fewer or more people
            average_ratings = original_books.loc[original_books['ratings_count'] > minimum_to_include]
            sorted_avg_ratings = average_ratings.loc[average_ratings['average_rating'] > 4]
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
            read_books = []
            for book in books:
                if book.rating >=3:
                    my_fav_ID.append(book.book_id)
                read_books.append(book.book_id)

            recommendations=obj.get_recommendations(my_fav_ID, read_books)
            return ({ 'Recommendations': recommendations }), 200
    else:
        return jsonify({'error': 'Invalid Request'}), 401


@app.route('/api/trending', methods=['GET'])
def apitrending():
    if current_user.is_authenticated:
        books= Book.query.filter_by(rater=current_user).all()
        count=len(books)
        minimum_to_include = 1000000 #<-- You can try changing this minimum to include movies rated by fewer or more people
        average_ratings = original_books.loc[original_books['ratings_count'] > minimum_to_include]
        sorted_avg_ratings = average_ratings.loc[average_ratings['average_rating'] > 3.5]
        sorted_avg_ratings_book_id=[]
        for j in sorted_avg_ratings.book_id:
            sorted_avg_ratings_book_id.append(j)
        random.shuffle(sorted_avg_ratings_book_id)
        sorted_avg_ratings_book_id=sorted_avg_ratings_book_id[:10]
        print(type(books))
        print(books)
        my_fav_genres=[]                                    #getting fav genres
        favAuthors = []
        allTimeFavs = []
        my_fav_ID=[]                                    #books already rated
        for book in books:
            my_fav_ID.append(book.book_id)
            if book.rating > 3:
                my_fav_genres.append(book.genres)
                favAuthors.append(original_books['authors'][book.book_id - 1])

        for i in sorted_avg_ratings_book_id:
            try:
                foundPosition = my_fav_ID.index(i)
                allTimeFavs.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1], 'rating': books[foundPosition].rating})
            except:
                allTimeFavs.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1], 'rating': 0})
        if count==0:
            minimum_to_include = 100000
            sciFiBooks = original_books.loc[original_books['genres'].str.contains(' Science Fiction')]
            sciFiBooks = sciFiBooks.sort_values(by="average_rating", ascending=False)
            sciFiBooks = sciFiBooks.loc[sciFiBooks['ratings_count'] > minimum_to_include]
            sciFiBooks = sciFiBooks[:10]

            thrillerBooks = original_books.loc[original_books['genres'].str.contains(' Thriller')]
            thrillerBooks = thrillerBooks.sort_values(by="average_rating", ascending=False)
            thrillerBooks = thrillerBooks.loc[thrillerBooks['ratings_count'] > minimum_to_include]
            thrillerBooks = thrillerBooks[:10]

            actionBooks = original_books.loc[original_books['genres'].str.contains(' Action')]
            actionBooks = actionBooks.sort_values(by="average_rating", ascending=False)
            actionBooks = actionBooks.loc[actionBooks['ratings_count'] > minimum_to_include]
            actionBooks = actionBooks[:10]

            sciFi = []
            thriller = []
            action = []
            for i in range(10):
                sciFi.append({'id': int(sciFiBooks['book_id'].iloc[i]), 'title': sciFiBooks['original_title'].iloc[i], 'image': sciFiBooks['image_url'].iloc[i], 'author': sciFiBooks['authors'].iloc[i], 'rating': 0})
                thriller.append({'id': int(thrillerBooks['book_id'].iloc[i]), 'title': thrillerBooks['original_title'].iloc[i], 'image': thrillerBooks['image_url'].iloc[i], 'author': thrillerBooks['authors'].iloc[i], 'rating': 0})
                action.append({'id': int(actionBooks['book_id'].iloc[i]), 'title': actionBooks['original_title'].iloc[i], 'image': actionBooks['image_url'].iloc[i], 'author': actionBooks['authors'].iloc[i], 'rating': 0})
            return ( {'trending': [{'header': 'All Time Favourites', 'books': allTimeFavs}, {'header': 'Best Of Sci-Fi', 'books': sciFi}, {'header': 'Best Of Thriller', 'books': thriller}, {'header': 'Best Of Action', 'books': action}]}), 200
        else:

            separator = ', '
            new=separator.join(my_fav_genres)
            a = new.split(", ")
            unique_list = []
            dict1={}
            for x in a:
                if x not in unique_list:                    #getting unique genres and count of each genre
                    unique_list.append(x)
                    dict1[x]=1
                else :
                    dict1[x]=dict1[x]+1

            dict1 = sorted(dict1.items(), key=lambda x: x[1], reverse=True)
            top3 = dict1[:3]

            final = []
            firstBookList = []
            secondBookList = []
            thirdBookList = []
            genreNumber = 1
            for k in top3:
                n = 10                                                                        #ratio of books to show
                average_ratings = original_books.loc[original_books['genres'].str.contains(k[0])]
                sorted_avg_ratings = average_ratings.sort_values(by="average_rating", ascending=False)
                sorted_avg_ratings = sorted_avg_ratings.sort_values(by="ratings_count", ascending=False)
                sorted_avg_ratings = sorted_avg_ratings[sorted_avg_ratings['ratings_count']>=100000]
                sorted_avg_ratings = sorted_avg_ratings[sorted_avg_ratings['average_rating']>=4]                #filter
                sorted_avg_ratings = sorted_avg_ratings.sample(frac=1).reset_index(drop=True)                       #randomize
                sorted_avg_ratings = [x for x in sorted_avg_ratings.iloc[:,0].tolist() if x not in my_fav_ID]       # remove if already rated
                sorted_avg_ratings = [x for x in sorted_avg_ratings if x not in final]       # remove if already rated in final
                sorted_avg_ratings = sorted_avg_ratings[:n]  #get top n according to the ratio we calculated
                final = final + sorted_avg_ratings
                for i in sorted_avg_ratings:
                    if genreNumber == 1:
                        firstBookList.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1], 'rating': 0})
                    elif genreNumber == 2:
                        secondBookList.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1], 'rating': 0})
                    else:
                        thirdBookList.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1],'rating': 0})
                genreNumber = genreNumber + 1

            genreOne = "Best Of " + top3[0][0]
            genreTwo = "Best Of " + top3[1][0]
            genreThree = "Best Of " + top3[2][0]

            separator = ', '
            new = separator.join(favAuthors)
            a = new.split(", ")
            unique_list = []
            dict1={}
            for x in a:
                if x not in unique_list:                    #getting unique genres and count of each genre
                    unique_list.append(x)
                    dict1[x]=1
                else :
                    dict1[x]=dict1[x]+1

            dict1 = sorted(dict1.items(), key=lambda x: x[1], reverse=True)
            top3 = dict1[:3]

            authorList1 = []
            authorList2 = []
            authorList3 = []
            authorNumber = 1
            for k in top3:
                n = 10                                                                        #ratio of books to show
                average_ratings = original_books.loc[original_books['authors'].str.contains(k[0])]
                sorted_avg_ratings = average_ratings.sort_values(by="average_rating", ascending=False)
                sorted_avg_ratings = sorted_avg_ratings.sample(frac=1).reset_index(drop=True)                       #randomize
                sorted_avg_ratings = [x for x in sorted_avg_ratings.iloc[:,0].tolist() if x not in my_fav_ID]       # remove if already rated
                sorted_avg_ratings = [x for x in sorted_avg_ratings if x not in final]       # remove if already rated in final
                sorted_avg_ratings = sorted_avg_ratings[:n]  #get top n according to the ratio we calculated
                final = final + sorted_avg_ratings
                for i in sorted_avg_ratings:
                    if authorNumber == 1:
                        authorList1.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1], 'rating': 0})
                    elif authorNumber == 2:
                        authorList2.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1], 'rating': 0})
                    else:
                        authorList3.append({'id': i, 'title': original_books['original_title'][i-1], 'image': original_books['image_url'][i-1], 'author':original_books['authors'][i-1], 'rating': 0})

                authorNumber = authorNumber + 1

            if len(authorList2) == 0:
                top3 = top3[0::2]
            if len(authorList3) == 0:
                top3 = top3[:2]

            authorOne = "Best Of " + top3[0][0]
            if len(authorList1) == 0:
                authorOne = ""
            if len(top3) == 1:
                return ( {'trending': [{'header': 'All Time Favourites', 'books': allTimeFavs}, {'header': genreOne, 'books': firstBookList}, {'header': genreTwo, 'books': secondBookList}, {'header': genreThree, 'books': thirdBookList}, {'header': authorOne, 'books': authorList1}]}), 200

            authorTwo = "Best Of " + top3[1][0]
            if len(authorList2) == 0:
                authorTwo = ""
            if len(top3) == 2:
                return ( {'trending': [{'header': 'All Time Favourites', 'books': allTimeFavs}, {'header': genreOne, 'books': firstBookList}, {'header': genreTwo, 'books': secondBookList}, {'header': genreThree, 'books': thirdBookList}, {'header': authorOne, 'books': authorList1}, {'header': authorTwo, 'books': authorList2}]}), 200

            authorThree = "Best Of " + top3[2][0]
            if len(authorList3) == 0:
                authorThree= ""
            return ( {'trending': [{'header': 'All Time Favourites', 'books': allTimeFavs}, {'header': genreOne, 'books': firstBookList}, {'header': genreTwo, 'books': secondBookList}, {'header': genreThree, 'books': thirdBookList}, {'header': authorOne, 'books': authorList1}, {'header': authorTwo, 'books': authorList2}, {'header': authorThree, 'books': authorList3}]}), 200
    else:
        return jsonify({'error': 'Invalid Request'}), 401

@app.route('/api/summary', methods=['POST'])
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
        amazon_link = original_books['amazon_link'][book_id-1]
        summary = []

        books= Book.query.filter_by(rater=current_user).all()
        count=Book.query.filter_by(rater=current_user).count()
        c=0
        for i in range (0,count):
            if book_id == books[i].book_id:
                c=c+1
                rating=books[i].rating
        if c!=0:
            summary.append({'author':authors,'title':title,'average_rating':average_rating,'image_url':image_url,'genres':genres,'description':description,'amazonLink': amazon_link, 'read_or_not':rating})
            return ({"Summary":summary}),200
        else:
            summary.append({'author':authors,'title':title,'average_rating':average_rating,'image_url':image_url,'genres':genres,'description':description, 'amazonLink': amazon_link, 'read_or_not': 0})
            return ({"Summary":summary}),200
    else:
        return jsonify({'error': 'Invalid Request'}), 401

@app.route('/api/search/<key>', methods=['GET'])
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
        return jsonify({'error': 'Invalid Request'}), 401



#reset password

def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request',
                  sender='Arkvlspace@em1215.arkvl.space',
                  recipients=[user.email])
    msg.body = f''' To reset your password, visit the following link:
{url_for('change_password', token=token, _external=True)}

If you did not make this request then simply ignore this email and no changes will be made
'''
    mail.send(msg)


@app.route("/api/reset_password", methods=['POST'])
def reset_password():
    if current_user.is_authenticated:
        return jsonify({'error': 'Already Logged In'}), 400
    email = request.json.get('email')
    if not email:
        return jsonify({'error': 'Invalid request'}), 400
    if not 0 < len(email) < 120:
        return jsonify({'error': 'This is not a valid email'}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User does not Exist'}), 400
    send_reset_email(user)
    return jsonify({'message': 'Reset Email sent Successfully'}), 200


@app.route("/change_password/<token>", methods=['GET'])
def change_password(token):
    if current_user.is_authenticated:
        return jsonify({'error': 'Already Logged In'}), 400
    user = User.verify_reset_token(token)
    if user is None:
        return jsonify({'error': 'Invalid or expired token'}), 400
    return app.send_static_file('index.html')


@app.route("/api/verifyreset", methods=['POST'])
def verifyreset():
    if current_user.is_authenticated:
        return jsonify({'error': 'Already Logged In'}), 400
    token = request.json.get('token')
    password = request.json.get('password')
    if token is None or password is None:
        return jsonify({'error': 'Invalid Request'}), 400
    if len(password) < 1 or len(password) > 60:
        return jsonify({'message': 'Password too long'}), 400
    user = User.verify_reset_token(token)
    if user is None:
        return jsonify({'error': 'Invalid or expired token'}), 400
    user.password = bcrypt.generate_password_hash(password).decode('utf-8')
    db.session.commit()
    return jsonify({'message': 'Password reset Successfully'}), 201



#verifying user by email

@app.route("/api/verify/<token>", methods=['GET'])
def verify_register(token):
    user = User.verify_verification_token(token)
    if user is None:
        return jsonify({'error': 'Invalid or expired token'}), 400
    user.verified = 1
    db.session.commit()
    return app.send_static_file('index.html')



@app.route("/api/reverify", methods=['GET'])
def reverify(token):
    if current_user.is_authenticated:
        if current_user.verified == 1:
            return jsonify({'error': 'Account Already Verified'}), 400
        send_verification_email(current_user)
        return jsonify({'message': 'Verification Email has been sent Successfully!'}), 200
    else:
        return jsonify({'error': 'You need to login first'}), 400




