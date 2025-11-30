Eric Greuter — Simple Static Art Gallery

This is a small static website scaffold. It uses HTML/CSS/JS and sample SVG images placed under `images/pictures` and `images/paintings`.

How to view:
- Open `index.html` directly in a browser, or
- Serve the folder with a simple HTTP server. In PowerShell (Windows) run:

  python -m http.server 8000

Then open http://localhost:8000 in your browser.

Notes:
- The filename (e.g. `picture1.svg`) is used as the reference key for the caption text in `js/main.js` (the `captions` object).
- Replace sample SVGs with real images; keep the `data-filename` attribute on thumbnails matching the real filenames so captions work.
- Contact form is powered by Netlify Forms with email notifications.

Owner: Eric Greuter
