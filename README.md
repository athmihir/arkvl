# Book Recommender

Follow the following steps to setup on your local machine

1. Run `git clone https://github.com/LethalPants/Book-Recommender.git`
2. `cd Book-Recommender`
3. `python -m venv env`
4. If you are on windows i.e. using `cmd` run `env\Scripts\activate`.
5. If you are using `bash` run `source env/Scripts/activate`
6. `pip install -r requirements.txt`

## To run the client

1. `cd client`
2. `npm install` if there is an installation error or something goes wrong `npm cache clean --force`
3. `npm start`
4. This should get everything up and running.

If all works out, you can test the repo by running `python cor_test.py`

## Contributing to the repo.

To contribute create a new branch using `git branch -b new_feature`
When you add new libraries to your virtual environment make sure to freeze them in requirements.txt.
