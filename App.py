
# coding: utf-8

# # Flask App for Olympics Dashboard

# #### By Safaa Amer, Maya Dennis, Christa Fields, and Kevin Yao

# In[ ]:


# import dependecies
import pandas as pd
from flask import Flask, jsonify, render_template
# note: importing various sqlalchemy methods for reading in sqlite database 
from sqlalchemy import create_engine, inspect, MetaData
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base


# In[ ]:


app = Flask(__name__)



# In[ ]:


# sqlalchemy 'create_engine' connect to sqlite database 
engine = create_engine("sqlite:///data/newsAPI.sqlite")
#    automapping the columns to sqlalchemy base object
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)


# In[ ]:


# saving references to each table
NYT_results = Base.classes.NYT_api_results
Guard_results = Base.classes.Guard_api_results
Google_results = Base.classes.Google_trends_results


# In[ ]:


# creating session
session = Session(engine)


# In[ ]:


# Flask route: index
@app.route('/')
def index():
    return render_template("index.html")


# In[ ]:


# Flask route: Methodology html page
@app.route("/methodology")
def meth():
    return render_template("page_template.html")


# In[ ]:


# Flask route: Youtube data
@app.route('/youtube_data')
def YT_data():
    YT_ls = []
    YT_views_df = pd.read_csv(open("YouTube Data/olympicchannel_viewcount.csv"), encoding='utf-8', engine='c')
    YT_vids_df = pd.read_csv(open("YouTube Data/ollympicchannel_vids.csv"), encoding='utf-8', engine='c')
    YT_df = pd.merge( YT_views_df, YT_vids_df, on="Unnamed: 0")
    YT_df = YT_df.astype('int', copy=False)

    for index, row in YT_df.iterrows():
        vid_id = row["video_id"]
        year = row["importantyear_x"]
        views = row["viewCount"]
        YT_ls.append({"video_id": int(vid_id),                      "year": int(year),                      "viewCount":int(views)})
    return jsonify(YT_ls)


# In[ ]:


# Flask route: NYT api 
@app.route('/nyt_articles')
def NYT_articles():
    NYT_ls = []
    query = session.query(NYT_results.news_id, NYT_results.year,                     NYT_results.article_hits).all()
    for instance in query:
        NYT_ls.append({"news_id":instance[0], "year":instance[1],                       "article_hits":instance[2]})
    return jsonify(NYT_ls)


# In[ ]:


# Flask route: theGuardian api
@app.route("/guardian_articles")
def Guard_articles():
    Guard_ls = []
    query = session.query(Guard_results.news_id, Guard_results.year,                     Guard_results.article_hits).all()
    for instance in query:
        Guard_ls.append({"news_id":instance[0], "year":instance[1],                       "article_hits":instance[2]})
    return jsonify(Guard_ls)
    


# In[ ]:


# Flask route: Google trends
@app.route("/google_trends")
def Google_trends():
    Goog_ls = []
    query = session.query(Google_results.month,                     Google_results.trend).all()
    for instance in query:
        Goog_ls.append({"month":instance[0],                       "trend":instance[1]})
    return jsonify(Goog_ls)
    


# In[ ]:


# Flask route: Olympics GDP
@app.route("/olympics_gdp_data")
def olympics_gdp_data():
    gdp_data_ls = []
    gdp_df = pd.read_csv("data/GDP data/Olympics_gdp_data.csv")
    for index, row in gdp_df.iterrows():
        rank = row["Rank"]
        gold = row["Gold"]
        silver = row["Silver"]
        bronze = row["Bronze"]
        total = row["Total"]
        year = row["Year"]
        season = row["Season"]
        country = row["Country"]
        GDP = row["GDP"]

        gdp_data_ls.append({"Rank": rank,                          "Gold":gold,                          "Silver":silver,                          "Bronze": bronze,                          "Total":total,                          "Year": year,                          "Season": season,                          "Country": country,                          "GDP":GDP})
    return jsonify(gdp_data_ls)


# In[ ]:


# Flask route: Viewers data
@app.route("/viewers_data")
def viewers_data():
    views_df = pd.read_csv(open("data/Viewers.csv"), encoding='utf-8', engine='c')
    fees_df = pd.read_csv(open("data/Rights_Fees.csv"), encoding='utf-8', engine='c')
    viewersClean_df = pd.merge( views_df, fees_df, left_on="Olympics ", right_on="Olympics")
    viewersData_ls = []
    for index, row in viewersClean_df.iterrows():
        olymp = row["Olympics"]
        viewers = row["Viewers"]
        Type = row["Type_x"]
        fees = row["Rights_Fees"]
        viewersData_ls.append({"Olympics":olymp,                              "Viewers":viewers,                              "Type": Type,                              "Rights_Fees":fees})
    return jsonify(viewersData_ls)
    


# In[ ]:


# Run app 
if __name__ == "__main__":
    app.run(debug=False)
    # if there's any problems, set debug =False

