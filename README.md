# Photo Gallery (GitHub Pages ready)

This is a minimal static photo gallery built for publishing on GitHub Pages.

Features
- Responsive grid layout
- Lazy-loading images
- Keyboard and click lightbox (prev/next)
- Search and sorting
- Simple manifest (images/images.json) to add or reorder images

Quick start
1. Create a new GitHub repository and push these files to `main`.
2. Replace the placeholder images in `images/` with your own images (keep filenames or update `images/images.json`).
3. Update `images/images.json` to include your photos and metadata.

Publishing options

Option A — GitHub Pages (simple, no CI)
- Open your repository on GitHub → Settings → Pages.
- Choose branch `main` and folder `/root` or `/docs` (if you move files to `docs/`) and save.
- Your site will be available at `https://<your-username>.github.io/<repo>` (project pages) or `https://<your-username>.github.io` for a repo named `<your-username>.github.io`.

Option B — Automatic deploy to `gh-pages` using GitHub Actions (workflow included)
- The included workflow `.github/workflows/deploy.yml` will copy the built site to the `gh-pages` branch on push to `main`.
- Enable GitHub Actions in your repo and push. The action uses the default `GITHUB_TOKEN` and works for public repos.

Local preview
- Serve locally from the project root:
  - Python 3: `python -m http.server 8000`
  - Then open http://localhost:8000

How to add images
1. Put your image files in the `images/` folder (e.g. `images/myphoto.jpg`).
2. Add an entry to `images/images.json`:
   {
     "src": "images/myphoto.jpg",
     "title": "My Photo",
     "caption": "Where/when or short description",
     "date": "2025-05-01",
     "tags": ["vacation", "beach"]
   }
3. Commit and push.

Accessibility notes
- Images have alt text pulled from `title`/`caption`.
- Lightbox supports Escape and arrow keys.

License
- MIT. Replace with your preferred license.

Enjoy — if you want a different layout, auto-generation script, image optimization, or gallery templates (masonry, pagination, categories), tell me which features you'd like and I can add them.