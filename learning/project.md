# Project: Daily Journal App

## Who I am
Data engineer transitioning to software engineering. This is one of my first
software projects, built to go on my resume/portfolio as a live, working app —
not a local demo. I'm new to full-stack app development (auth, deployment,
frontend/backend split) but comfortable with data and databases from my
data engineering background.

## The idea
A minimal daily journal. Each day, the user logs:
1. A one-sentence/phrase highlight of the day (hard length limit, no more).
2. Progress on up to 5 self-defined daily habits (done / not done).
3. A rating of the day from 0.0 to 10.0.

## In the MVP
The smallest version that is genuinely usable, by a real user, live on the
internet — end to end.

- **Highlight of the day** — one text field, hard character/line limit enforced.
- **Habit tracking** — user defines up to 5 habits (name only); each day, check off which were done.
- **Day rating** — single numeric input/slider, 0.0–10.0.
- **One entry per day** — create/edit *today's* entry only.
- **Accounts (basic auth)** — sign up / log in, so each user's journal is private. Doesn't need to be fancy (email+password or a hosted auth provider is fine) — it just needs to exist, because a public deployed app with no auth means everyone shares one journal.
- **History view** — a simple, read-only list of past entries (date, highlight, rating, habits). No editing past days in MVP — just seeing them is enough to make this a real journal instead of a write-only form.
- **Persistent storage** — a real database, not local/in-memory state.
- **Deployed live** — real URL, accessible without your laptop running.

## Parking lot (v2)
Written down so these stop nagging me. Not forgotten, just not now.

- Habit streaks and completion statistics
- Charts/graphs (mood over time, habit trends, etc.)
- Editing or deleting past entries
- Multiple entries per day
- Reminders / notifications to log your day
- Rich text, photos, or attachments in entries
- Tags/categories for entries
- Search over past entries
- Data export (CSV/PDF)
- Custom habit scheduling (weekly/specific days, not just daily)
- Social or sharing features
- Password reset flow / OAuth (Google, etc.) login polish
- Mobile app / installable PWA
- Dark mode / theming
- Timezone handling beyond a single default

## Core components to learn & build (the trunk)
The major pieces needed to get this project live end to end, roughly in the
order data flows through them. ~5-9 pieces, high-level only — details come later.

1. **Source control (Git + GitHub)** — Git tracks every change to the code over time so nothing is ever lost and mistakes can be undone; GitHub hosts that history online as a backup and as the trigger point for deployment. Non-negotiable best practice from day one, not an extra.
2. **Frontend** — the part of the app that runs in the user's browser: the actual screens, text boxes, and buttons someone uses to log a highlight, check off habits, and set a rating.
3. **Backend** — a program that runs on a remote, always-on server (not the user's device). It receives requests from the frontend and enforces the real rules (length limits, "you can only see your own journal") before touching data, because anything left to the browser alone can be tampered with.
4. **API** — the fixed menu of requests the frontend is allowed to make to the backend (e.g. "save today's entry," "give me the last 30 days"). Frontend and backend are separate programs, so they need an agreed-upon way to talk over the internet.
5. **Database** — permanent, structured storage for entries, habits, and accounts, so data survives after the backend restarts and can be looked up later.
6. **Authentication** — verifies who's using the app (e.g. email + password) and keeps each user's journal private from everyone else's. Required because the MVP is public and multi-user.
7. **Deployment / hosting** — running the backend, database, and frontend on servers that are always on and reachable at a public web address, instead of only working while a laptop is open.
8. **Configuration & secrets management** — keeping sensitive values (database passwords, API keys) out of the code and Git history, and letting the app behave differently locally vs. once deployed.

