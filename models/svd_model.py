import numpy as np
import pandas as pd
from collections import defaultdict
from surprise import Reader, Dataset, SVD,accuracy



class SVDmodel:
  def __init__(self, books, ratings):
    
      ratings.columns = ['user_id','book_id','rating']
      ratings=ratings[0:200000]
      reader = Reader(rating_scale=(1, 5)) #line_format by default order of the fields
      self.data = Dataset.load_from_df(ratings[["user_id",	"book_id",	"rating"]], reader=reader)

  def create_utility_matrix(self):
      trainsetfull = self.data.build_full_trainset()
      testsetfull = trainsetfull.build_anti_testset()

      algo=SVD(n_factors=85)

      #n_factors=80,reg_all=0.05

      algo.fit(trainsetfull)
      self.predictions = algo.test(testsetfull)

  
  def get_top_n(self, user_id, book,ratings, n=100):
    '''Return the top N (default) movieId for a user,.i.e. userID and history for comparisom
    Args:
    Returns:

    '''
    # Peart I.: Surprise docomuntation

    # 1. First map the predictions to each user.
    top_n = defaultdict(list)
    for uid, iid, true_r, est, _ in self.predictions:
       top_n[uid].append((iid, est))
    
    # 2. Then sort the predictions for each user and retrieve the k highest ones.
    for uid, user_ratings in top_n.items():
      user_ratings.sort(key=lambda x: x[1], reverse=True)
      top_n[uid] = user_ratings[:n]
      

    # Part II.: inspired by: https://beckernick.github.io/matrix-factorization-recommender/

    # 3. Tells how many movies the user has already rated
    user_data = ratings[ratings.user_id == (user_id)]

    # 4. Data Frame with predictions.
    preds_df = pd.DataFrame([(id, pair[0], pair[1]) for id, row in top_n.items() for pair in row],
                            columns=["user_id", "book_id", "rat_pred"])

    # 5. Return pred_usr, i.e. top N recommended movies with (merged) titles and genres.
    pred_usr = preds_df[preds_df["user_id"] == (user_id)].merge(book, how='left', left_on='book_id',right_on='book_id')

    # 6. Return hist_usr, i.e. top N historically rated movies with (merged) titles and genres for holistic evaluation
    hist_usr = ratings[ratings.user_id == (user_id)].sort_values("rating", ascending=False).merge(book, how='left', left_on='book_id',right_on='book_id')

    finalpred_usr=pred_usr[pred_usr['ratings_count']>=100000]
    #finalpred_usr=pred_usr.sort_values(by="average_rating",ascending=False)

    return finalpred_usr