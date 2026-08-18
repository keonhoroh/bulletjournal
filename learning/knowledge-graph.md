# Knowledge Graph

The living map of what I actually know on this project. Updated after every
lesson. This is what decides what I get quizzed on next — not the syllabus.

## How statuses work

- **seed** — not yet taught.
- **introduced** — Claude has explained it to me at least once.
- **practicing** — I've used it myself, with help, at least once.
- **understood** — I've explained it back in my own words *and* passed a quiz on it.

Statuses only move up on real evidence (something I said or did — see the
Evidence column), never just because a topic came up in conversation. Don't
re-quiz me on anything already `understood` and reviewed recently — spend
that time on `seed`/`introduced`/`practicing` concepts instead. Dates are
`YYYY-MM-DD`.

---

## Low-level (language & syntax fundamentals)

| Concept | Status | Introduced | Last reviewed | Evidence |
|---|---|---|---|---|
| Variables | seed | — | — | — |
| Data types (str, int, float, bool) | seed | — | — | — |
| Functions | seed | — | — | — |
| Conditionals (if / elif / else) | seed | — | — | — |
| Loops (for / while) | seed | — | — | — |
| Lists | seed | — | — | — |
| Dictionaries | practicing | 2026-08-12 | 2026-08-12 | Learned `data["date"]`-style key lookup (framed via the JS object equivalent they already knew), then wrote all four `data["..."]` lookups themself in the `Entry(...)` call in app.py. |
| String formatting (f-strings) | seed | — | — | — |
| Classes & objects (Python OOP) | seed | — | — | — |
| HTML elements & document structure | understood | 2026-08-10 | 2026-08-10 | Built index.html, made a real mistake (text placed outside `<title>`/`<h1>` tags, leaking into `<head>`), fixed it, and correctly explained: "everything under head is metadata for the browser and not user-facing data." |
| Tailwind CSS (utility-class styling) | introduced | 2026-08-17 | 2026-08-17 | Explained the core idea (compose tiny utility classes in HTML instead of writing custom CSS rules) and the build step that generates a CSS file containing only the classes actually used. Toolchain set up (task 9.1) and confirmed the generated `static/style.css` contains only Tailwind's base reset so far (251 lines), correctly predicting it would be "much smaller" than the full framework before any utility classes are used in HTML. |
| CSS selectors & the box model | practicing | 2026-08-10 | 2026-08-10 | Wrote real style.css values themselves (font stack with fallback, `rgb()` color function); hit an invalid named-color value (`off-white`) firsthand and saw it get silently skipped rather than breaking the whole file, confirming lenient CSS parsing. |
| JavaScript DOM manipulation | practicing | 2026-08-11 | 2026-08-11 | Extended into `createElement`/`appendChild`/template literals (section 4.3) and reading form values (`highlightInput.value`, `ratingInput.value`) to build a real object for `fetch()` (section 4.4). |
| JavaScript event handling | practicing | 2026-08-11 | 2026-08-11 | Correctly predicted `event.preventDefault()` would stop the Section-1 page-reload behavior on submit, then confirmed a new entry appended live with no reload. |
| HTML forms & inputs (text/checkbox/number, label `for`/`id`) | practicing | 2026-08-10 | 2026-08-10 | Built the full form (highlight/habits/rating/button) themself; explained the `for`/`id` link mostly right, but thought a mismatch would break the checkbox itself rather than just the label's click-through — corrected. |

## Structural (how the pieces connect)

| Concept | Status | Introduced | Last reviewed | Evidence |
|---|---|---|---|---|
| Client-server architecture | introduced | 2026-08-10 | 2026-08-10 | Explained frontend (runs in browser) vs. backend (runs on a remote always-on server) during core-components walkthrough. |
| API (frontend↔backend contract) | practicing | 2026-08-11 | 2026-08-11 | Wrote the template literal that renders `fetch("/api/entries")`'s response into the page themself; correctly predicted 3 list items would appear, then confirmed live in the browser. |
| HTTP methods & JSON | practicing | 2026-08-11 | 2026-08-11 | Correctly predicted a `POST` would return the new entry with status `201`, ran the real `curl -X POST` command themself, then confirmed via a follow-up `GET` that it actually got appended server-side. |
| Default form submission (GET reload + query string, no JS) | introduced | 2026-08-10 | 2026-08-10 | Predicted "nothing happens" on submit click; actual result was a page reload with field values appended to the URL as a query string — explained as the reason sections 3/4 (server + fetch API) exist. |
| Routing (URL → code) | practicing | 2026-08-11 | 2026-08-11 | Wrote and ran a real `@app.route("/")` view function, correctly predicted it would respond on port 5001 (after we hit a real macOS AirPlay-vs-port-5000 conflict on the first attempt), confirmed in browser. |
| Files talking to each other (imports/modules) | introduced | 2026-08-12 | 2026-08-12 | Saw `from app import app, db` import our own app.py as a module from a one-off setup command, same mechanism as importing an external package like Flask. |
| Dependency management (pip, requirements.txt) | introduced | 2026-08-11 | 2026-08-11 | Explained why `pip install flask` pulled in 7 packages, not 1 (Flask's own dependencies), and generated requirements.txt via `pip freeze`. |
| npm & package.json (JS dependency management) | practicing | 2026-08-17 | 2026-08-17 | Explained as the JavaScript-world equivalent of pip/requirements.txt, framed around the actual problem (Tailwind's build tool needs installing). Correctly predicted `package.json` would appear after `npm init -y`, with only a minor imprecision (guessed "empty" — it actually has default fields filled in), then saw the real generated file. |
| Virtual environments | practicing | 2026-08-11 | 2026-08-11 | Created `venv/` themself; wrongly predicted "nothing new on disk" twice (once for venv creation, once for pip install) before seeing the real files, then correctly predicted `import flask` would print its version. |
| Project folder structure | practicing | 2026-08-11 | 2026-08-11 | Completed the full Flask `templates/` + `static/` split themself: moved index.html into templates/, moved style.css + app.js into static/, used `url_for('static', ...)` in the template, and confirmed the fully styled page loads live over localhost. |
| Database | practicing | 2026-08-11 | 2026-08-11 | Installed real PostgreSQL locally and created a dedicated `bulletjournaldb` database; predicted (reasonably, if not quite precisely) that it would "appear on disk," then saw it actually lives in Postgres's own private data directory, not the project folder — confirmed only via `psql -l`. |
| ORM (SQLAlchemy) | practicing | 2026-08-11 | 2026-08-12 | Installed Flask-SQLAlchemy + psycopg2-binary and configured `db = SQLAlchemy(app)` in app.py, wired to a real Postgres database via SQLALCHEMY_DATABASE_URI. Then wrote real `Entry(date=data["date"], ...)`, `db.session.add()`/`commit()`, and `Entry.query.all()` themself to replace the fake list; correctly connected `db.session.add`/`commit` to the git `add`/`commit` staging analogy after an initial wrong prediction about the entry being stuck "in a queue," then confirmed it with a real POST+GET round trip through curl. |
| Database schema / tables | practicing | 2026-08-12 | 2026-08-12 | Defined a real `Entry` model (columns, types, primary key), correctly reasoned that defining the class alone wasn't enough to create the table, then ran `db.create_all()` and confirmed the real columns via `psql \d entry`. Repeated the pattern independently for a new `User` model (correctly wrote `unique=True` on `username` unprompted), correctly predicted `db.create_all()` would only add the new table and leave `Entry`'s existing rows untouched, then confirmed both via `psql`. |
| Persistence (data survives a restart) | understood | 2026-08-11 | 2026-08-17 | Correctly predicted a saved entry would survive a full kill-and-restart of the Flask process "because the data lives in our database now," then confirmed it live: both a curl-inserted entry and an earlier form-submitted entry were still there after the process was fully torn down and rebuilt. Fully re-confirmed for real production persistence (task 8.5): signed up and saved a real entry from a phone against the live Render deployment, then independently asked how to inspect the live database with `psql` and saw the real row there. |
| Database migrations (schema changes on an existing table) | practicing | 2026-08-13 | 2026-08-17 | Correctly generalized that `db.create_all()` leaves existing tables alone, but assumed that meant a *new column* added to an existing table's model would also just work; saw firsthand it doesn't (no error, but the real table stayed unchanged), then used raw `ALTER TABLE`/`UPDATE` via psql to add `entry.user_id` and backfill the 2 existing rows without losing data. Correctly discovered (task 8.4) that `db.create_all()` had never been called against the brand-new Render database at all, after seeing a real `Internal Server Error` on the live signup form; found via `grep` that it wasn't in `app.py` anywhere, only in the test fixture, then ran it as a one-off command against the live database via its External Database URL to create real tables in production. |

## Engineering practice

| Concept | Status | Introduced | Last reviewed | Evidence |
|---|---|---|---|---|
| Source control (Git & GitHub) | practicing | 2026-08-10 | 2026-08-10 | Created a GitHub repo, correctly predicted `git remote add` + `git push -u` would connect and push to it (slightly off on the remote-add step, corrected), then ran both and confirmed the push live on GitHub. |
| Git commit (a saved unit of change) | practicing | 2026-08-10 | 2026-08-10 | Made the repo's first real commit (index.html + learning/ + .gitignore) after I explained staging vs. committing; ran `git add`/`git commit` and saw `git status` confirm it. |
| Git branches | seed | — | — | — |
| .gitignore | seed | — | — | — |
| Automated testing (concept) | understood | 2026-08-10 | 2026-08-17 | Explained via the plan's testing section: write tests for core flows, then deliberately break something to see a test fail. Built the real fixture infrastructure, then proved the concept for real (task 7.5): correctly predicted a wrong prediction at first ("same thing, all pass") when the isolation filter was removed, was corrected, then watched the isolation test actually fail with alice's entry leaking into bob's list, then watched it pass again once the filter was restored. |
| pytest (tool) | understood | 2026-08-14 | 2026-08-17 | Set up a real `tests/conftest.py` fixture (test client + fresh test-only database per test, via `yield`); hit and fixed a real `ModuleNotFoundError` by learning to invoke it as `python -m pytest` instead of bare `pytest`. Wrote two full real tests themself: one for saving an entry, and one for cross-user isolation (logging out and back in as a second user within the same test client). Correctly predicted `2 passed` for the full suite (task 7.4), and correctly predicted a real test failure once shown why the isolation filter mattered (task 7.5). |
| Environment variables & secrets management | understood | 2026-08-11 | 2026-08-17 | Wrote/saw the real `os.environ.get("DATABASE_URL", <local default>)` pattern in app.py and correctly predicted it wouldn't error locally (no env var set, falls back to the default). Then used it for real in production (task 8.4): set real `DATABASE_URL`/`SECRET_KEY` values in Render's dashboard (never committed to code), correctly reasoned that the hardcoded local fallback (`localhost`) would fail on Render because no Postgres process runs on that machine's own `localhost`, and confirmed a live signup/login flow working end to end. |
| Authentication (concept) | practicing | 2026-08-10 | 2026-08-13 | Explained as verifying who a user is and keeping their data private from other users; then built a real `/login` route (`User.query.filter_by(...).first()` + `check_password_hash` + `login_user()`) themself, correctly predicted both the success and failure responses, and helped debug a real missing-`SECRET_KEY` error along the way. Followed up by writing `/logout` (`logout_user()`) and adding `@login_required` to `/api/entries` themself, unprompted; initially predicted an unauthenticated request would error rather than redirect, corrected by pointing back at `login_manager.login_view` from task 6.3, then confirmed a full login→access→logout→blocked cycle live via curl. |
| Password hashing | practicing | 2026-08-12 | 2026-08-12 | Wrote `password_hash=generate_password_hash(password)` themself in a real `/signup` route, submitted a real password via curl, and confirmed in `psql` that only a long scrambled string was stored, never the raw password. Initially called it "encrypted" rather than "hashed"; corrected on the reversible-vs-irreversible distinction. |
| Sessions & cookies | introduced | 2026-08-13 | 2026-08-13 | Explained via the concert hand-stamp analogy while wiring up Flask-Login; hit a real `RuntimeError: no secret key was set` when `login_user()` tried to write the session cookie, and fixed it by setting `SECRET_KEY` the same way as `DATABASE_URL`. |
| Authorization (scoping data to the right user) | practicing | 2026-08-13 | 2026-08-13 | Added a `user_id` foreign key to `Entry` and wrote `filter_by(user_id=current_user.id)` themself. Wrongly predicted a brand-new second account would still see the original two entries ("we didn't touch the entry data"), corrected by pointing back at the filter they'd just written, then confirmed real cross-account isolation via curl. Independently re-confirmed the same isolation live in the browser with two real accounts (Section 6's full deliverable). |
| Deployment / hosting (concept) | practicing | 2026-08-10 | 2026-08-17 | Explained as running the app on always-on servers reachable at a public address, vs. only on a laptop. Wrote the real `Procfile` line themself (`web: gunicorn app:app`), correctly reusing the exact command from task 8.1 but with a syntax slip (extra space in `app: app`), corrected by pointing back at the module:variable colon syntax. |
| Production server vs. dev server (Gunicorn) | practicing | 2026-08-10 | 2026-08-17 | Installed Gunicorn and ran the real app under `gunicorn app:app`; predicted it would use port 5001 (it doesn't — that's a Flask `app.run()` argument, never read by Gunicorn), corrected by seeing the real log line showing it defaulted to port 8000 instead. |
| Flask as a microframework | practicing | 2026-08-11 | 2026-08-11 | Ran a real minimal Flask app (one route, hardcoded response) end to end via `venv/bin/python app.py`, not just discussed conceptually. |
| Code review / reading a diff | seed | — | — | — |
| Writing clear commit messages | seed | — | — | — |

## AI-era practice

| Concept | Status | Introduced | Last reviewed | Evidence |
|---|---|---|---|---|
| Writing a good plan/spec before building | seed | — | — | — |
| Reviewing an AI-written diff before accepting it | seed | — | — | — |
| Agent memory files (learning/*.md persisted across sessions) | introduced | 2026-08-10 | 2026-08-10 | Explained in learning/file-map.md: these files exist so every future session reads them and skips re-deriving context. |
| Giving an AI agent good context/prompts | seed | — | — | — |
