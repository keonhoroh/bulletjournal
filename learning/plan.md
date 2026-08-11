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
*Deliverable:* the page loads from `http://localhost:5000` in the browser.

**4. APIs**
Add a couple of Flask routes that return/accept JSON using fake, in-memory
data (a Python variable standing in for a database), and have the frontend
JavaScript call them with `fetch()`.
*Deliverable:* can hit an endpoint with `curl` and get JSON back, and the
page updates from data that came from the server, not hardcoded in the HTML.

**5. Database**
Swap the in-memory fake data for real PostgreSQL tables (via SQLAlchemy)
for entries and habits.
*Deliverable:* restart the Flask server and the previously saved entry is
still there — proof it's persisted, not just held in memory.

**6. Core features + accounts**
Wire up the full MVP: sign up / log in, log today's highlight/habits/rating,
and view the history list — all against the real database, all scoped to
the logged-in user.
*Deliverable:* two different test accounts, logged in locally, each seeing
only their own journal.

**7. Tests**
Write automated tests (pytest) for the core flows — saving an entry works,
one user can't see another user's data — runnable with a single command.
*Deliverable:* the test suite passes; then deliberately break something and
watch the relevant test fail, as proof the tests are actually checking
something.

**8. Live deployment**
Deploy the app to Render, running under Gunicorn, connected to a hosted
Postgres database, with secrets (DB password, etc.) set as environment
variables rather than in the code.
*Deliverable:* a real public URL, reachable from a phone on a different
network, with my own account and real entries in it.
