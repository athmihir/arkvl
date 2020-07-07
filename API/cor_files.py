# -*- coding: utf-8 -*-

import pandas as pd
import csv
import os, os.path
from whoosh import index
from whoosh.fields import Schema, NUMERIC, TEXT, KEYWORD, ID, STORED
from whoosh.analysis import StemmingAnalyzer

test=[]
with open("test_new.txt",errors='ignore') as f:
  for line in f:
    test.append(line.strip())
corrmat=pd.read_csv('corrmat.csv',header=None)
correlation=corrmat.to_numpy()
original_books=pd.read_csv('FinalBooksEdit.csv',encoding='latin')
books_data=pd.read_csv('titles.csv')

#schema = Schema(book_id = NUMERIC(stored=True), title=TEXT(stored=True, phrase=True), author=TEXT(stored=True, phrase=True), image_url=TEXT(stored=True))

#if not os.path.exists("indexdir"):
#    os.mkdir("indexdir")
#ix = index.create_in("indexdir", schema)
ix = index.open_dir("indexdir")

#writer = ix.writer()
#bookIDs = original_books['book_id'].values
#titles = original_books['original_title'].values
#authors = original_books['authors'].values
#images = original_books['image_url'].values
#for i in range(9927):
#  if(pd.isnull(titles[i]) or pd.isnull(authors[i])):
#    continue
#  writer.add_document(book_id = int(bookIDs[i]), title = titles[i], author = authors[i], image_url = images[i])

#writer.commit()