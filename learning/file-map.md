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
| `app.py` | known | The Flask server: `/` serves the real page (section 3); `/api/entries` (section 4, tasks 4.1-4.2) handles `GET` (list fake entries) and `POST` (append a new one) against an in-memory list. Run with `venv/bin/python app.py` on port 5001. |
