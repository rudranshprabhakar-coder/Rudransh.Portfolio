# Rudransh Prabhakar — Personal Site

This repository contains a static personal website (HTML/CSS/JS). It is ready to be published to GitHub Pages.

What I added to make publishing easy
- `.gitignore` — prevents editor/OS clutter from being committed.
- `.github/workflows/deploy.yml` — a GitHub Actions workflow that publishes the repository contents to the `gh-pages` branch using the built-in `GITHUB_TOKEN` when you push to `main` (or `master`).

Publishing options (choose one)

1) Create a GitHub repository and push from your machine (recommended)

   Open a PowerShell terminal in the project root and run:

   # initialize a git repo, add, commit
   git init
   git add .
   git commit -m "Initial site commit"

   # create a GitHub repo and push (requires GitHub CLI `gh` installed and logged in)
   gh repo create <your-username>/<repo-name> --public --source=. --remote=origin --push

   # If you do NOT have `gh`, create a repo on github.com, then run:
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main

   Once pushed, GitHub Actions will run the workflow and publish to GitHub Pages. The Pages URL will appear in the repository Settings → Pages or on the Actions log when the workflow completes.

2) Create a user-site repository for a custom username URL

   If you'd like the site to be available at `https://<your-username>.github.io/`, name the repository exactly `<your-username>.github.io` and push the same way as above.

Notes about custom domains
- If you own a domain and want it to point at the Pages site, add a `CNAME` file at the repo root containing the domain and configure DNS A/CAA/CNAME records per GitHub's docs.

If you'd like, I can:
- create the remote for you if you tell me your GitHub username and give me a repo name (you'll still need to authenticate locally), or
- produce a short PowerShell script that automates the local git commands.
