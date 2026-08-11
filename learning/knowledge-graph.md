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
| CSS selectors & the box model | seed | — | — | — |
| JavaScript DOM manipulation | seed | — | — | — |
| JavaScript event handling | seed | — | — | — |
| HTML forms & inputs (text/checkbox/number, label `for`/`id`) | practicing | 2026-08-10 | 2026-08-10 | Built the full form (highlight/habits/rating/button) themself; explained the `for`/`id` link mostly right, but thought a mismatch would break the checkbox itself rather than just the label's click-through — corrected. |

## Structural (how the pieces connect)

| Concept | Status | Introduced | Last reviewed | Evidence |
|---|---|---|---|---|
| Client-server architecture | introduced | 2026-08-10 | 2026-08-10 | Explained frontend (runs in browser) vs. backend (runs on a remote always-on server) during core-components walkthrough. |
| API (frontend↔backend contract) | introduced | 2026-08-10 | 2026-08-10 | Defined as "the fixed menu of requests the frontend is allowed to make to the backend." |
| HTTP methods & JSON | seed | — | — | — |
| Default form submission (GET reload + query string, no JS) | introduced | 2026-08-10 | 2026-08-10 | Predicted "nothing happens" on submit click; actual result was a page reload with field values appended to the URL as a query string — explained as the reason sections 3/4 (server + fetch API) exist. |
| Routing (URL → code) | seed | — | — | — |
| Files talking to each other (imports/modules) | seed | — | — | — |
| Dependency management (pip, requirements.txt) | seed | — | — | — |
| Virtual environments | seed | — | — | — |
| Project folder structure | seed | — | — | — |
| Database | introduced | 2026-08-10 | 2026-08-10 | Defined as permanent structured storage; explained why the app needs it (data must survive a restart). |
| ORM (SQLAlchemy) | introduced | 2026-08-10 | 2026-08-10 | Defined as "the standard Python library for talking to a database using Python code instead of raw SQL." |
| Database schema / tables | seed | — | — | — |
| Persistence (data survives a restart) | seed | — | — | — |

## Engineering practice

| Concept | Status | Introduced | Last reviewed | Evidence |
|---|---|---|---|---|
| Source control (Git & GitHub) | introduced | 2026-08-10 | 2026-08-10 | Explained Git as tracked change history and GitHub as its online host/backup, framed as non-negotiable from day one. |
| Git commit (a saved unit of change) | seed | — | — | — |
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
| Flask as a microframework | introduced | 2026-08-10 | 2026-08-10 | Explained as starting minimal and adding pieces (DB, login, etc.) one at a time, understanding each. |
| Code review / reading a diff | seed | — | — | — |
| Writing clear commit messages | seed | — | — | — |

## AI-era practice

| Concept | Status | Introduced | Last reviewed | Evidence |
|---|---|---|---|---|
| Writing a good plan/spec before building | seed | — | — | — |
| Reviewing an AI-written diff before accepting it | seed | — | — | — |
| Agent memory files (learning/*.md persisted across sessions) | introduced | 2026-08-10 | 2026-08-10 | Explained in learning/file-map.md: these files exist so every future session reads them and skips re-deriving context. |
| Giving an AI agent good context/prompts | seed | — | — | — |
