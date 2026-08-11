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
| `index.html` | known | The app's first page (plan.md section 1, task 1.1): a minimal HTML skeleton with a `<title>` and one `<h1>` heading, opened directly in the browser with no server involved. |
| `.gitignore` | known | Tells Git which files to never track. Currently just `.DS_Store` (macOS Finder junk) so it never ends up in the GitHub history. |
| `style.css` | known | External stylesheet linked from index.html's `<head>` (plan.md section 2, tasks 2.1-2.2): layout, spacing, fonts, and colors for the form. |
| `app.js` | known | External script linked before `</body>` (plan.md section 2, tasks 2.3-2.4): live rating readout and habit-row highlighting via DOM manipulation and event listeners, no server involved. |
