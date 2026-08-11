from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

ENTRIES = [
    {
        "date": "2026-08-09",
        "highlight": "played soccer early morning",
        "rating": 7.2,
        "habits": ["exercise", "read 10 pages"],
    },
    {
        "date": "2026-08-10",
        "highlight": "watched new spider-man with friends",
        "rating": 6.7,
        "habits": ["15 min stretch", "exercise"],
    },
]


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/entries", methods=["GET", "POST"])
def entries():
    if request.method == "POST":
        new_entry = request.get_json()
        ENTRIES.append(new_entry)
        return jsonify(new_entry), 201
    return jsonify(ENTRIES)


if __name__ == "__main__":
    app.run(debug=True, port=5001)