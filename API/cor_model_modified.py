# Creating the class, later we create an object of this class and just call functions
import numpy as np
from cor_files import original_books
from flaskapi.models import Corr
import json
import random

class CORModel:

    def get_recommendations(self, my_fav_IDs):
        row1=np.array(json.loads(Corr.query.get(my_fav_IDs[-1]).row))
        newlyRatedRecs = sorted(range(len(row1)), key=lambda k: row1[k], reverse=True)
        newlyRatedRecs = newlyRatedRecs[1:3]
        newlyRatedRecs[0] += 1
        newlyRatedRecs[1] += 1
        book_similarities = np.zeros(9927)
        for fav_id in my_fav_IDs:
            row = np.array(json.loads(Corr.query.get(fav_id).row))
            book_similarities += row  # Adding correlation columns of each books which were rated by user

        book_preferences = []
        for i in range(len(original_books["book_id"])):  # adding ids to the similarity books before sorting them
            if original_books['book_id'][i] not in my_fav_IDs:
                book_preferences.append((original_books["book_id"][i], book_similarities[i]))

        user_recs = sorted(book_preferences, key=lambda x: x[1], reverse=True)  # sorted the books by descending order of correlation
        user_recs = [x for x in user_recs if x[0] not in my_fav_IDs]  # remove books which are already rated
        recIDs = [user_recs[i][0] for i in range(50)]  # got ids of top 50 books
        random.shuffle(recIDs)
        recIDs = recIDs[:15]
        recIDs.extend(newlyRatedRecs)
        random.shuffle(recIDs)
        recIDs = list(dict.fromkeys(recIDs))
        recs = []
        for i in range(len(recIDs)):  # returning the books data by id from original books dataset
            recs.append({'id': int(recIDs[i]), 'title': original_books['original_title'][recIDs[i] - 1], 'image': original_books['image_url'][recIDs[i] - 1], 'author': original_books['authors'][recIDs[i] - 1]})
        return recs
