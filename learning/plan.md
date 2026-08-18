# Build Plan: Daily Journal App

Primary objective: **learning**, not speed. Every section below should leave
me able to explain, in my own words, how that layer works — not just that it
works. See learning/project.md for who I am, the MVP, and the parking lot.

## Locked decisions

For each layer, the choice is the popular, "boring," most-documented option —
the one with the biggest community, the most tutorials, and the fewest
surprises when something breaks and I need to search for an answer.

### 1. Language: Python
Already know it from data engineering. Learning a new framework, a database,
and deployment all at once is enough new material — reusing a language I
already read comfortably means more attention goes to the *new* concepts
instead of syntax. Python also has one of the largest beginner-web
communities of any language.

### 2. Frontend: plain HTML, CSS, and JavaScript (no framework)
The browser only understands HTML/CSS/JS regardless of any other choice made
here, so this isn't really optional. What *is* a choice is skipping a
frontend framework (React, Vue, etc.) for now — they solve problems (managing
complex UI state) this project doesn't have yet, and they'd hide the
fundamentals I actually want to see working. Plain HTML/CSS/JS is the
default starting point almost every "learn web dev" path uses before adding
a framework.

**Update (section 9):** once the MVP (sections 1–8) was fully working, the
goal shifted from "learn the fundamentals" to "make this portfolio-ready,"
so Tailwind CSS (a utility-class CSS framework, not a JS framework like
React) was deliberately added for the visual redesign. HTML/JS stay plain —
this only changes how styling is written.

### 3. Backend: Flask
The most beginner-documented Python web framework — its official tutorial
literally walks through building an accounts + database-backed app, which is
close to exactly this project. It's a "microframework": it starts minimal
and I add pieces (database layer, login, etc.) one at a time and understand
what each one does, rather than getting a large framework's worth of
generated code upfront. Supporting pieces, chosen for the same
popular/well-documented reasons:
- **SQLAlchemy** — the standard Python library for talking to a database using Python code instead of raw SQL (called an "ORM").
- **Flask-Login + Werkzeug's password hashing** — the standard, boring way to handle login sessions and store passwords safely in Flask; also what the official Flask tutorial teaches.
- **pytest** — the standard Python testing tool, used everywhere, huge community.

### 4. Database: PostgreSQL
The most widely used general-purpose database, with the biggest community and
every hosting platform supports it. Also a practical fit, not just a popular
one: this app is multi-user by design (see project.md), and Postgres handles
multiple users hitting it at once correctly, which a simpler file-based
database isn't built for. Using the same database locally and in production
avoids a second set of "why does this work on my laptop but not live" bugs.

Local dev setup (section 5): PostgreSQL 16 installed via Homebrew, running as
a local server process; the project's dedicated local database is named
`bulletjournaldb`.

### 5. Hosting: Render
A hosting platform with a large beginner community and straightforward,
well-documented support for exactly this combination (Flask + Postgres),
deployed straight from GitHub. In production, Flask's own built-in server
isn't meant to be used live, so the app will run under **Gunicorn**, the
standard production server for Flask apps — this is a real, common piece of
the puzzle, not an extra.

---

## Sectioned build plan

Each section ends with something concrete I can point to and see working —
not just "wrote some code." Sequenced so each layer sits on top of the last.

**1. Static frontend skeleton**
Build one plain HTML page with the full layout: a highlight text field, 5
habit checkboxes, and a day-rating input, filled with fake example data.
*Deliverable:* open the file directly in a browser and see the full journal
layout, no server involved yet.

Tasks:
- [x] 1.1 Minimal `index.html` (doctype, html/head/body, title, one heading) renders in the browser.
- [x] 1.2 Add the highlight-of-the-day field: a labeled text input with fake example text, inside a `<form>`.
- [x] 1.3 Add the 5 habit checkboxes, each with a label, a few pre-checked as fake data.
- [x] 1.4 Add the day-rating field: a number input constrained 0–10 with an example fake value.
- [x] 1.5 Add section headings/structure (e.g. "Habits", "Rating", a submit button placeholder) so it reads as one cohesive form.
- [x] 1.6 Fresh open of the saved file in the browser confirms it matches the full section 1 deliverable.

**2. Styling and interactivity**
Add CSS for layout/appearance and vanilla JavaScript so the page responds —
the rating updates live, checkboxes visibly toggle — using only in-browser
JavaScript, no backend yet.
*Deliverable:* the same page, now visually real and interactive, still just
a local file.

Tasks:
- [x] 2.1 Link an external `style.css` and apply basic layout/spacing so the form no longer looks like plain unstyled text.
- [x] 2.2 Style the inputs/checkboxes/labels so the page reads as one cohesive form (fonts, spacing, a visible "checked" state).
- [x] 2.3 Link an external `app.js`; add a live rating readout that updates as the rating input changes.
- [x] 2.4 Add JS that visibly highlights a habit row when its checkbox is toggled.
- [x] 2.5 Fresh open of the saved files in the browser confirms it matches the full section 2 deliverable.

**3. A simple local server**
Stand up a minimal Flask app and have it serve that HTML page instead of
opening the file directly.
*Deliverable:* the page loads from `http://localhost:5001` in the browser
(port 5001, not the usual 5000 — macOS's built-in AirPlay Receiver also
listens on 5000, so we moved Flask to 5001 to avoid the conflict).

Tasks:
- [x] 3.1 Set up a Python virtual environment and install Flask; confirm `flask` is importable.
- [x] 3.2 Write a minimal Flask app with one route (`/`) that returns a hardcoded string; confirm it responds at `http://localhost:5001`.
- [x] 3.3 Serve `index.html` for real from that route instead of a hardcoded string.
- [x] 3.4 Move `style.css` and `app.js` into Flask's expected static-file location so the styled, interactive page loads correctly over `localhost`, not just `file://`.
- [x] 3.5 Fresh visit to `http://localhost:5001` confirms it matches the full section 3 deliverable.

**4. APIs**
Add a couple of Flask routes that return/accept JSON using fake, in-memory
data (a Python variable standing in for a database), and have the frontend
JavaScript call them with `fetch()`.
*Deliverable:* can hit an endpoint with `curl` and get JSON back, and the
page updates from data that came from the server, not hardcoded in the HTML.

Tasks:
- [x] 4.1 Add a fake in-memory list of past entries in `app.py` and a `GET /api/entries` route that returns it as JSON; confirm with `curl`.
- [x] 4.2 Add a `POST /api/entries` route that accepts a JSON body and appends it to the in-memory list; confirm with `curl` sending real JSON.
- [x] 4.3 In `app.js`, `fetch()` `/api/entries` on page load and render the results into the page, proving the data came from the server, not hardcoded HTML.
- [x] 4.4 Wire the submit button to `fetch()`-POST the form's real values as JSON to `/api/entries` instead of doing a default page-reload submission, then refresh the rendered list.
- [x] 4.5 Fresh reload of `http://localhost:5001` confirms the full section 4 deliverable.

**5. Database**
Swap the in-memory fake data for real PostgreSQL tables (via SQLAlchemy)
for entries and habits.
*Deliverable:* restart the Flask server and the previously saved entry is
still there — proof it's persisted, not just held in memory.

Tasks:
- [x] 5.1 Install PostgreSQL locally (Homebrew) and start it as a background service; confirm you can connect with `psql`.
- [x] 5.2 Create a dedicated local database for this project.
- [x] 5.3 Install Flask-SQLAlchemy + psycopg2 in the venv and configure `app.py` to connect to that database.
- [x] 5.4 Define a SQLAlchemy `Entry` model and create the real table; confirm it exists in the database.
- [x] 5.5 Replace the in-memory `ENTRIES` list in the `GET`/`POST` `/api/entries` routes with real database queries.
- [x] 5.6 Fully restart the Flask server and confirm a previously saved entry is still there — proof of real persistence.

**6. Core features + accounts**
Wire up the full MVP: sign up / log in, log today's highlight/habits/rating,
and view the history list — all against the real database, all scoped to
the logged-in user.
*Deliverable:* two different test accounts, logged in locally, each seeing
only their own journal.

Tasks:
- [x] 6.1 Define a `User` model (username, hashed-password column) and create the real table.
- [x] 6.2 Install Flask-Login; build sign-up: a route + form that hashes the password (Werkzeug) and saves a new `User`.
- [x] 6.3 Build login: Flask-Login session setup (`LoginManager`, `user_loader`) plus a login route/form.
- [x] 6.4 Add logout, and protect routes: require login for the journal page and `/api/entries` (redirect to login otherwise).
- [x] 6.5 Scope entries to the user: add a `user_id` link on `Entry`, and filter/save `/api/entries` by the logged-in user only.
- [x] 6.6 Full deliverable check: create two real accounts in the browser and confirm each sees only their own entries.

**7. Tests**
Write automated tests (pytest) for the core flows — saving an entry works,
one user can't see another user's data — runnable with a single command.
*Deliverable:* the test suite passes; then deliberately break something and
watch the relevant test fail, as proof the tests are actually checking
something.

Tasks:
- [x] 7.1 Install pytest; create a dedicated `bulletjournaldb_test` database and a `tests/conftest.py` fixture (test client + fresh tables per test).
- [x] 7.2 Write a test that posting a new entry while logged in actually saves it and it comes back via `GET`.
- [x] 7.3 Write a test that one logged-in user never sees another user's entries.
- [x] 7.4 Run the full suite with one command and confirm both tests pass.
- [x] 7.5 Deliberately break the user-scoping filter, watch the relevant test fail, then revert and confirm it passes again.

**8. Live deployment**
Deploy the app to Render, running under Gunicorn, connected to a hosted
Postgres database, with secrets (DB password, etc.) set as environment
variables rather than in the code.
*Deliverable:* a real public URL, reachable from a phone on a different
network, with my own account and real entries in it.

Tasks:
- [x] 8.1 Install Gunicorn in the venv; confirm the app runs locally via `gunicorn app:app` instead of `python app.py`.
- [x] 8.2 Add a `Procfile` telling Render how to start the app; regenerate `requirements.txt` so Gunicorn is included; commit and push.
- [x] 8.3 Create a Render account, a hosted Postgres database on Render, and a Web Service connected to this GitHub repo.
- [x] 8.4 Set `DATABASE_URL` and `SECRET_KEY` as real environment variables in Render's dashboard (not in code); confirm the deploy succeeds and the app loads at its public URL.
- [x] 8.5 Full deliverable check: sign up for a real account on the live URL from your phone (different network than your laptop), save a real entry, confirm it's there.

**9. Visual redesign (Tailwind CSS, responsive)**
Rebuild the frontend's look using Tailwind CSS, a utility-class CSS
framework, with a real build step (not the CDN prototyping version), so the
app looks like a professional, portfolio-ready product on both mobile and
desktop.
*Deliverable:* the same journal + login/signup flow, now visually polished
and responsive, checked in the browser at both a phone-sized and
desktop-sized viewport.

Tasks:
- [x] 9.1 Set up the Tailwind build toolchain (`npm init`, install Tailwind, a config file, an input/output CSS file) and wire Flask to serve the generated CSS.
- [ ] 9.2 Redesign `index.html` (the journal page) with Tailwind utility classes: layout, spacing, typography, a real visual hierarchy.
- [ ] 9.3 Redesign `login.html` and `signup.html` to match, and add a link between them (the gap we noticed after section 8).
- [ ] 9.4 Make the layout responsive: confirm it looks right at a narrow (phone) width and a wide (desktop) width using the browser's device toolbar.
- [ ] 9.5 Polish pass: favicon, page titles, consistent spacing/colors across all three pages, loading/empty states for the entries list.

**10. New features (edit/delete entries, ratings chart)**
Extend the MVP's feature set past pure create/read: let users edit or delete
a past entry, and see their ratings over time as a simple chart.
*Deliverable:* from the live Render deployment, edit an existing entry,
delete another, and see a real chart update to reflect the change.

Tasks:
- [ ] 10.1 Add `PUT`/`DELETE /api/entries/<id>` routes (scoped to the logged-in user, same pattern as existing routes); confirm with `curl`.
- [ ] 10.2 Add edit/delete controls to the frontend entries list, wired to those routes with `fetch()`.
- [ ] 10.3 Add a simple chart (ratings over time) to the journal page, populated from the same `/api/entries` data already being fetched.
- [ ] 10.4 Write pytest tests for the new edit/delete routes, including that a user can't edit/delete another user's entry (same pattern as section 7).
- [ ] 10.5 Redeploy to Render (push to GitHub, confirm auto-deploy); full deliverable check on the live URL.
