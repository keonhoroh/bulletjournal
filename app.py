import os

from flask import Flask, render_template, jsonify, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL", "postgresql://localhost/bulletjournaldb"
)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key-change-in-production")
db = SQLAlchemy(app)

login_manager = LoginManager(app)
login_manager.login_view = "login"


# a registered account; UserMixin plugs this into Flask-Login's session handling
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), nullable=False, unique=True)
    password_hash = db.Column(db.String(200), nullable=False)


# tells Flask-Login how to turn a stored session id back into a real User
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


# one day's journal entry: highlight, rating, habits, and which user it belongs to
class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.String(10), nullable=False)
    highlight = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    habits = db.Column(db.JSON, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)


# serves the main journal page; @login_required blocks it for anyone not signed in
@app.route("/")
@login_required
def home():
    return render_template("index.html")


# ends the current session and sends the user back to the login-gated home page
@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("home"))


# creates a new account with a hashed password; the raw password is never stored
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        new_user = User(
            username=username,
            password_hash=generate_password_hash(password),
        )
        db.session.add(new_user)
        db.session.commit()
        return redirect(url_for("home"))
    return render_template("signup.html")


# verifies credentials and starts a logged-in session via Flask-Login
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for("home"))

        return "invalid username or password", 401
    return render_template("login.html")


# GET returns this user's own entries; POST creates one, rejecting a second
# submission for a date that's already logged (entries are immutable)
@app.route("/api/entries", methods=["GET", "POST"])
@login_required
def entries():
    if request.method == "POST":
        data = request.get_json()

        # one entry per user per day, enforced here rather than relying on the frontend
        existing_entry = Entry.query.filter_by(user_id=current_user.id, date=data["date"]).first()

        if existing_entry:
            return jsonify({"error": "an entry for this date already exists and can't be changed"}), 409

        new_entry = Entry(
            date = data["date"],
            highlight = data["highlight"],
            rating = data["rating"],
            habits = data["habits"],
            user_id = current_user.id,
        )
        db.session.add(new_entry)
        db.session.commit()
        return jsonify({
            "id": new_entry.id,
            "date": new_entry.date,
            "highlight": new_entry.highlight,
            "rating": new_entry.rating,
            "habits": new_entry.habits
        }), 201

    all_entries = Entry.query.filter_by(user_id=current_user.id).all()
    result = []
    for entry in all_entries:
        result.append({
            "id": entry.id,
            "date": entry.date,
            "highlight": entry.highlight,
            "rating": entry.rating,
            "habits": entry.habits
        })
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True, port=5001)