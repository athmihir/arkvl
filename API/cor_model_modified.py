# Creating the class, later we create an object of this class and just call functions
import numpy as np
from cor_files import books 
class CORModel:
    
    def __init__(self, correlation, test,books_data):
        '''
        This is the constructor. It will drop unnecessary cols, sort by book ID
        and merge both dataframes into one mega dataframe

        Parameters
        ----------
        books : pandas dataframe containing the imported dataset
        ratings : pandas dataframe containing 6 mil ratings
                  to reduce training time we might have to reduce that number

        Returns
        -------
        None.

        '''
        self.book_correlations=correlation
        self.book_titles=test
        self.total_books_data=books_data

        
    def get_recommendations(self, my_fav_IDs):
        '''
        This function accepts a list of fav book IDs and prints recs.
        Modify it as you want so that it returns recs instead of printing them

        Parameters
        ----------
        my_fav_IDs : list of integers
                     this is the list of book_ids the user LIKED
                     only LIKED, not <= 2 stars

        Returns
        -------
        None.

        '''
        my_fav_books=[]
        for i in range(10000):
            if i in my_fav_IDs:
               my_fav_books.append(self.total_books_data['title'][i-1])
        
        book_similarities = np.zeros(self.book_correlations.shape[0])

        for book in my_fav_books:    
            book_index = self.book_titles.index(book)
            book_similarities += self.book_correlations[book_index] 

        book_preferences = []
        for i in range(len(self.book_titles)):
            if self.book_titles[i] not in my_fav_books:
             book_preferences.append((self.book_titles[i], book_similarities[i]))
        
        user_recs = sorted(book_preferences, key= lambda x: x[1], reverse=True)
        
        recs = [(books[self.total_books_data['title']==user_recs[i][0]].book_id.unique()[0],user_recs[i][0],user_recs[i][1]) for i in range(10)]
        

        recIDs = [recs[i][0] for i in range(10)]
        recs = []
        for i in range(10):
            recs.append({'id': int(recIDs[i]), 'title': books['original_title'][recIDs[i]-1], 'image': books['image_url'][recIDs[i]-1], 'author':books['authors'][recIDs[i]-1]})
        return recs