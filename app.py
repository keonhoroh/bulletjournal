import os

from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "postgresql://localhost/bulletjournaldb"
)
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password_hash = db.Column(db.String(200), nullable=False)


class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10), nullable=False)
    highlight = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    habits = db.Column(db.JSON, nullable=False)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/entries", methods=["GET", "POST"])
def entries():
    if request.method == "POST":
        data = request.get_json()
        new_entry = Entry(
            date = data["date"],
            highlight = data["highlight"],
            rating = data["rating"],
            habits = data["habits"]
        )
        db.session.add(new_entry)
        db.session.commit()
        return jsonify(data), 201

    all_entries = Entry.query.all()
    result = []
    for entry in all_entries:
        result.append({
            "date": entry.date,
            "highlight": entry.highlight,
            "rating": entry.rating,
            "habits": entry.habits
        })
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5001)