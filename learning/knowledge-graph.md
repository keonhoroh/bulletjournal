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
| Dictionaries | seed | — | — | — |
| String formatting (f-strings) | seed | — | — | — |
| Classes & objects (Python OOP) | seed | — | — | — |
| HTML elements & document structure | understood | 2026-08-10 | 2026-08-10 | Built index.html, made a real mistake (text placed outside `<title>`/`<h1>` tags, leaking into `<head>`), fixed it, and correctly explained: "everything under head is metadata for the browser and not user-facing data." |
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
| Files talking to each other (imports/modules) | seed | — | — | — |
| Dependency management (pip, requirements.txt) | introduced | 2026-08-11 | 2026-08-11 | Explained why `pip install flask` pulled in 7 packages, not 1 (Flask's own dependencies), and generated requirements.txt via `pip freeze`. |
| Virtual environments | practicing | 2026-08-11 | 2026-08-11 | Created `venv/` themself; wrongly predicted "nothing new on disk" twice (once for venv creation, once for pip install) before seeing the real files, then correctly predicted `import flask` would print its version. |
| Project folder structure | practicing | 2026-08-11 | 2026-08-11 | Completed the full Flask `templates/` + `static/` split themself: moved index.html into templates/, moved style.css + app.js into static/, used `url_for('static', ...)` in the template, and confirmed the fully styled page loads live over localhost. |
| Database | introduced | 2026-08-10 | 2026-08-10 | Defined as permanent structured storage; explained why the app needs it (data must survive a restart). |
| ORM (SQLAlchemy) | introduced | 2026-08-10 | 2026-08-10 | Defined as "the standard Python library for talking to a database using Python code instead of raw SQL." |
| Database schema / tables | seed | — | — | — |
| Persistence (data survives a restart) | introduced | 2026-08-11 | 2026-08-11 | Explained that the POSTed entry only survives because the server process hasn't restarted — it's an in-memory Python list, not written to disk, which is why Section 5's real database exists. |

## Engineering practice

| Concept | Status | Introduced | Last reviewed | Evidence |
|---|---|---|---|---|
| Source control (Git & GitHub) | practicing | 2026-08-10 | 2026-08-10 | Created a GitHub repo, correctly predicted `git remote add` + `git push -u` would connect and push to it (slightly off on the remote-add step, corrected), then ran both and confirmed the push live on GitHub. |
| Git commit (a saved unit of change) | practicing | 2026-08-10 | 2026-08-10 | Made the repo's first real commit (index.html + learning/ + .gitignore) after I explained staging vs. committing; ran `git add`/`git commit` and saw `git status` confirm it. |
| Git branches | seed | — | — | — |
| .gitignore | seed | — | — | — |
| Automated testing (concept) | introduced | 2026-08-10 | 2026-08-10 | Explained via the plan's testing section: write tests for core flows, then deliberately break something to see a test fail. |
| pytest (tool) | seed | — | — | Named as the tool of choice in locked decisions; not yet explained. |
| Environment variables & secrets management | introduced | 2026-08-10 | 2026-08-10 | Explained as keeping passwords/API keys out of code and Git history, config differing per environment. |
| Authentication (concept) | introduced | 2026-08-10 | 2026-08-10 | Explained as verifying who a user is and keeping their data private from other users. |
| Password hashing | seed | — | — | — |
| Sessions & cookies | seed | — | — | — |
| Authorization (scoping data to the right user) | seed | — | — | — |
| Deployment / hosting (concept) | introduced | 2026-08-10 | 2026-08-10 | Explained as running the app on always-on servers reachable at a public address, vs. only on a laptop. |
| Production server vs. dev server (Gunicorn) | introduced | 2026-08-10 | 2026-08-10 | Explained that Flask's built-in server isn't for production and Gunicorn is the standard replacement. |
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
