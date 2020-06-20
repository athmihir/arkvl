import pandas as pd
from models.cor_model import CORModel

# Importing datasets, adjust the file path accordingly

books = pd.read_csv('data/books.csv')
ratings = pd.read_csv('data/ratings.csv')

# USE THE NEXT TWO LINES ONLY IF YOU WANT TO REDUCE SIZE OF THE DATASET
# BECAUSE CALC TIME IS TOO HIGH FOR 6 MIL
# JUST REPLACE 200000 BY THE NUMBER OF ROWS YOU WANT

temp = ratings.sort_values(by=['user_id'], ascending=True)
ratings = temp.iloc[:200000, :]


BRS = CORModel(books, ratings)                  # creating object
# this takes a lot of time (4 - 5 mins on my laptop) if you have 6 mil examples
BRS.create_correlation_matrix()

# add your fav book IDs here, refer to books.csv search for your fav books, add their IDs here
books_that_user_likes = [464]
# bruh i ain't explaining this one too FOH
recs = BRS.get_recommendations(books_that_user_likes)

print(recs)