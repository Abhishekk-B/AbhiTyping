from website import app
from flask import render_template, redirect, url_for, request



@app.route("/", methods =["GET", "POST"])
def index():
    if request.method == "POST":
        name = request.form['name']
        return render_template("home.html", name = name)
    return render_template("index.html")

    