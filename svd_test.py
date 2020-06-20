import numpy as np
import pandas as pd
from models.svd_model import SVDmodel

books = pd.read_csv('data/books.csv')
ratings = pd.read_csv('data/ratings.csv')
hatim_rating=pd.read_csv('data/hatimpred.csv')
hatim_rating=hatim_rating.drop(['Unnamed: 3'],axis=1)

ratings=hatim_rating.append(ratings,ignore_index=True)

obj=SVDmodel(books, ratings)
obj.create_utility_matrix()
x = obj.get_top_n(22224,books, ratings)
print(x)