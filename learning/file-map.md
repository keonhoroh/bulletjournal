# File Map

Every file and folder in this repo, one line each, so nothing here is ever a
mystery box. Statuses:

- **known** — I've explained this file in my own words.
- **parked** — honest one-liner for now; a real deep dive is scheduled for later.
- **generated** — machine-made; never hand-edit.

Update this whenever a file is added, removed, or finally understood.

| Path | Status | What it is / why it exists |
|---|---|---|
| `.git/` | generated | Git's internal database for this repo (history, branches, objects). Never edit by hand. |
| `.claude/` | generated | Claude Code's local settings folder for this project. |
| `.claude/settings.local.json` | generated | Tool permissions Claude Code has been granted in this project so far; managed by the CLI, not app code. |
| `.DS_Store` | generated | macOS Finder's metadata file for this folder. Not part of the app; safe to gitignore. |
| `:)` (originally `day0`) | parked | A personal note file, not part of the app. Purpose known only to you for now — rename, describe, or delete it when convenient. |
| `learning/` | parked | This project's "agent memory": files read at the start of every session so context (who you are, decisions made, what you know) doesn't have to be re-derived each time — an AI-era engineering practice in itself. |
| `learning/project.md` | parked | Who you are and your experience level, the project idea, and the locked MVP vs. parking-lot (v2) feature lists. |
| `learning/plan.md` | parked | The locked tech-stack decisions (Python/Flask/Postgres/Render, etc.) and the 8-section build plan, each section ending in a concrete deliverable. |
| `learning/knowledge-graph.md` | parked | The living map of what you actually know, one row per concept with a status (seed/introduced/practicing/understood). Drives what you get quizzed on. |
| `learning/file-map.md` | parked | This file: what every file/folder in the repo is and why it exists. |
| `templates/index.html` | known | The app's page, served by Flask via `render_template()` (section 3). Now also has an empty `<ul id="entries-list">` (section 4, task 4.3) that `app.js` fills in client-side after fetching `/api/entries`. |
| `.gitignore` | known | Tells Git which files to never track. Currently just `.DS_Store` (macOS Finder junk) so it never ends up in the GitHub history. |
| `static/style.css` | known | Stylesheet, moved into Flask's `static/` convention (plan.md section 3, task 3.4) so Flask auto-serves it at `/static/style.css`. Content unchanged from section 2. |
| `static/app.js` | known | Script served from `/static/app.js`. `fetch()`es `/api/entries` on page load and renders results into `#entries-list` (4.3); also intercepts the form's submit event, POSTs its values as JSON, and re-renders the list (4.4). |
| `venv/` | generated | This project's isolated Python environment (plan.md section 3, task 3.1): its own copy of the Python interpreter and pip, so installed packages (Flask, etc.) stay local to this project. Gitignored, never hand-edited. |
| `requirements.txt` | generated | Exact list of installed Python packages + versions (plan.md section 3, task 3.1), written by `pip freeze`. Never hand-edited — regenerated the same way whenever dependencies change. |
| `app.py` | known | The Flask server: `/` serves the real page; `/api/entries` `GET`/`POST` read and write the real `Entry` table via `Entry.query.all()` and `db.session.add()`/`commit()` (section 5, task 5.5) — the in-memory `ENTRIES` list is gone. Defines a real `User` model/table (username, password_hash) for accounts (section 6, task 6.1). `/signup` (task 6.2) reads a plain form POST via `request.form`, hashes the password with `generate_password_hash()`, saves a new `User`, and redirects home. `/login` (task 6.3) verifies credentials with `check_password_hash` and calls Flask-Login's `login_user()`; a `LoginManager` + `user_loader` + `SECRET_KEY` are configured to make sessions work. `/logout` and `@login_required` on `/` and `/api/entries` (task 6.4) now require a real session to access the journal at all. `Entry` now has a `user_id` foreign key, and `/api/entries` GET/POST are scoped to `current_user.id` (task 6.5) — real cross-account isolation, confirmed via curl with two separate accounts. Run with `venv/bin/python app.py` on port 5001. |
| `templates/signup.html` | known | The sign-up page: a plain (non-JS) form POSTing username/password to `/signup` (section 6, task 6.2). |
| `templates/login.html` | known | The login page: a plain (non-JS) form POSTing username/password to `/login` (section 6, task 6.3). |
| `tests/` | known | Home for the automated test suite (section 7); run with `venv/bin/python -m pytest` from the project root. |
| `tests/conftest.py` | known | Shared pytest fixture (`client`): points the app at a separate `bulletjournaldb_test` database, creates fresh tables before each test and drops them after, and hands tests a Flask test client (task 7.1). |
| `tests/test_entries.py` | known | `test_posting_an_entry_saves_it` (task 7.2): signs up + logs in a test user, POSTs a new entry, and asserts it comes back via GET. `test_user_cannot_see_another_users_entries` (task 7.3): alice saves an entry, logs out, bob logs in, and asserts bob's entries list is empty — proven to actually catch bugs by temporarily removing the `filter_by` in app.py and watching it fail (task 7.5). |
| `Procfile` | known | Tells Render the exact command to start the app in production: `web: gunicorn app:app` (section 8, task 8.2). |
| `package.json` | generated | JavaScript's equivalent of `requirements.txt`: tracks this project's npm (JavaScript) dependencies, currently Tailwind CSS (section 9, task 9.1). Created by `npm init`, updated automatically by `npm install`. |
| `package-lock.json` | generated | Exact installed versions of every npm dependency (including indirect ones), auto-written by npm. Never hand-edited. |
| `node_modules/` | generated | Downloaded JavaScript package code (Tailwind CSS, etc.) — the npm equivalent of `venv/`. Gitignored, regenerable via `npm install`. |
| `static/src/input.css` | known | The one real line of hand-written Tailwind config: `@import "tailwindcss";`. This is the *source* file a human edits; running the Tailwind build reads this and generates `static/style.css` from it (section 9, task 9.1). |
| `static/style.css` | generated | Now built by Tailwind (`npx @tailwindcss/cli -i static/src/input.css -o static/style.css`) instead of hand-written — role changed in section 9, task 9.1. Still committed to Git (unlike most generated files) because Render's deploy only runs `pip install`, never `npm run build`, so the compiled CSS must already be in the repo. |
