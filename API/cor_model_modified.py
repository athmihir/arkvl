# Creating the class, later we create an object of this class and just call functions
import numpy as np
from cor_files import original_books
from flaskapi.models import Corr
import json
import random

class CORModel:

    def get_recommendations(self, my_fav_IDs, read_books):
        finrow = np.array(json.loads(Corr.query.get(my_fav_IDs[-1]).row))
        book_similarities = np.zeros(9927)
        for fav_id in my_fav_IDs:
            row = np.array(json.loads(Corr.query.get(fav_id).row))
            book_similarities += row  # Adding correlation columns of each books which were rated by user

        book_preferences = []  # for general cormat
        for i in range(len(original_books["book_id"])):  # adding ids to the similarity books before sorting them
            book_preferences.append((original_books["book_id"][i], book_similarities[i]))

        fbookprefs = []  # for final book rated
        for i in range(len(original_books["book_id"])):  # adding ids to the similarity books before sorting them
            fbookprefs.append((original_books["book_id"][i], finrow[i]))

        fuser_recs = sorted(fbookprefs, key=lambda x: x[1], reverse=True)  # sorted the books by descending order of correlation
        fuser_recs = [x for x in fuser_recs if x[0] not in read_books]  # remove books which are already rated
        frecIDs = [fuser_recs[i][0] for i in range(10)]  # got ids of top 10 books
        frecIDs = random.sample(frecIDs, 2)

        user_recs = sorted(book_preferences, key=lambda x: x[1], reverse=True)  # sorted the books by descending order of correlation
        user_recs = [x for x in user_recs if x[0] not in read_books]  # remove books which are already rated
        recIDs = [user_recs[i][0] for i in range(30)]  # got ids of top 30 books
        recIDs = random.sample(recIDs, 10)
        recIDs = recIDs + frecIDs
        recIDs = list(set(recIDs))
        recs = []
        for i in range(10):  # returning the books data by id from original books dataset
            recs.append({'id': int(recIDs[i]), 'title': original_books['original_title'][recIDs[i] - 1], 'image': original_books['image_url'][recIDs[i] - 1], 'author': original_books['authors'][recIDs[i] - 1]})
        return recs
