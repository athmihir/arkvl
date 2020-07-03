import pandas as pd
import csv
test=[]
with open("test_new.txt",errors='ignore') as f:
  for line in f:
    test.append(line.strip())
# corrmat=pd.read_csv('corrmat.csv',header=None)
# correlation=corrmat.to_numpy()
original_books=pd.read_csv('FinalBookmodified.csv',encoding='latin')
books_data=pd.read_csv('titles.csv')


