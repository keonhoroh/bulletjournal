# bullet journal

A minimal daily journal app: log a one-line highlight, track up to 5 daily
habits, and rate your day from 0–10. Entries are permanent once submitted —
no editing or deleting — so the log stays an honest historical record. Inspired
by the way I have been journaling since March of 2024.

## Features

- Sign up / log in — each account's journal is private
- Log today's highlight, up to 5 habits, and a 0–10 day rating (via a
  draggable circular dial)
- Pick any past date to backfill a missed entry; once a date has an entry
  it's locked read-only, so nothing already logged can be silently rewritten
- A GitHub-contributions-style monthly calendar, one cell per day, shaded by
  that day's rating — click a colored cell to pop open that day's full entry
- A live progress bar as habit checkboxes are checked off

## Tech stack

- **Backend:** Python, Flask, Flask-SQLAlchemy (ORM), Flask-Login (sessions),
  Werkzeug (password hashing)
- **Database:** PostgreSQL
- **Frontend:** plain HTML/CSS/JavaScript (no framework) + Tailwind CSS for
  styling
- **Tests:** pytest
- **Deployment:** Render, running under Gunicorn

## Running locally

Requires Python 3, Node.js (for the Tailwind build), and a local PostgreSQL
server.

```bash
# clone and enter the project
git clone https://github.com/keonhoroh/bulletjournal.git
cd bulletjournal

# python dependencies
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# a local database (name must match app.py's default DATABASE_URL)
createdb bulletjournaldb

# CSS build (only needed once, or after changing Tailwind classes)
npm install
npx @tailwindcss/cli -i static/src/input.css -o static/style.css

# run the app
python app.py
```

The app runs at `http://localhost:5001`.

## Running tests

```bash
python -m pytest
```

Tests run against a separate `bulletjournaldb_test` database (created
automatically) so they never touch real local data.

## About this project

Built as a learning project by a data engineer moving into software
engineering. My goal was to go from a static HTML mockup to a deployed,
multi-user, database-backed app while actually understanding each layer
(frontend, backend, database, auth, deployment) along the way, not just
assembling boilerplate.
