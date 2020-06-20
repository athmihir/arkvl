# Importing the usual shit

import numpy as np
import pandas as pd



# Creating the class, later we create an object of this class and just call functions

class CORModel:
    
    def __init__(self, books, ratings):
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
        booksDF = pd.DataFrame(books, columns=['book_id', 'authors', 'title', 'average_rating'])
        booksDF = booksDF.sort_values('book_id')

        self.total_books_data = pd.merge(booksDF, ratings, on='book_id')

    def create_correlation_matrix(self):
        '''
        This function is the major time consumer. It pivots total_books_data
        on the user_id and the aggregation function is mean(). Then it
        calculates the correlation matrix using np.corrcoef().
        T() is transposing index and columns
        
        '''
        self.each_user_ratings = pd.pivot_table(self.total_books_data, index='user_id', values='rating', columns='title', fill_value=0)
        self.book_correlations = np.corrcoef(self.each_user_ratings.T)
        self.book_titles = list(self.each_user_ratings)

        
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
        my_fav_books =[self.total_books_data['title'][i] for i in range(1000) if i in my_fav_IDs]
                
        book_similarities = np.zeros(self.book_correlations.shape[0])

        for book in my_fav_books:    
            book_index = self.book_titles.index(book)
            book_similarities += self.book_correlations[book_index] 

        book_preferences = []
        for i in range(len(self.book_titles)):
            book_preferences.append((self.book_titles[i], book_similarities[i]))
        
        user_recs = sorted(book_preferences, key= lambda x: x[1], reverse=True)
        
        recs = [(self.total_books_data[self.total_books_data['title']==user_recs[i][0]].book_id.unique()[0], user_recs[i][0],user_recs[i][1]) for i in range(20)]

        return recs
