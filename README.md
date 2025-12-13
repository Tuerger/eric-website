# Eric Greuter — Art Gallery

**Version:** 1.2.0

A modern, fully-featured portfolio website for analog photography and oil paintings. Built with vanilla HTML, CSS, and JavaScript with Progressive Web App (PWA) support.

## Features

- **Bilingual Support**: English and Dutch language switching with localStorage persistence
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **PWA Installation**: Installable on Windows 11, Android, and iOS with offline support
- **Dynamic Galleries**: Auto-loaded image galleries from JSON metadata with hover tooltips
- **Gallery Tooltips**: Hover over thumbnails to see painting/picture titles
- **Modal Viewer**: Expandable captions with hover/click interaction
- **Smooth Animations**: Homepage layered image animation with fade-in/out effects
- **Service Worker**: Offline caching strategy for core assets
- **Lazy Loading**: Performance-optimized image loading
- **Image Protection**: Right-click and drag-to-save disabled
- **Contact Form**: Netlify Forms integration with thank you redirect
- **SEO Optimized**: Meta tags, Open Graph, Twitter Card support
- **Custom Typography**: Cavolini font from CDN Fonts
- **Mobile Optimized Title**: Website title wraps to 2 lines on small devices

## File Structure

```
├── index.html                 # Homepage with animated lead image
├── about.html                 # About/contact page
├── paintings.html             # Oil paintings gallery
├── pictures.html              # Analog photography gallery
├── thanks.html                # Form submission thank you page
├── css/style.css              # Styling with responsive breakpoints
├── js/main.js                 # Main JavaScript logic
├── captions.json              # Unified captions (en/nl)
├── manifest.webmanifest       # PWA manifest
├── service-worker.js          # Service worker for offline support
├── images/
│   ├── lead.jpg               # Homepage featured image
│   ├── Logo.ico               # PWA app icon (installable)
│   ├── paintings/
│   │   ├── paintings.json     # Paintings file list
│   │   └── *.jpg              # Painting images
│   └── pictures/
│       ├── pictures.json      # Pictures file list
│       └── *.jpg              # Photo images
├── components/header.html     # Shared header component
└── manifest.webmanifest       # PWA configuration
```

## How to View

### Local Development
1. Open `index.html` directly in a browser, or
2. Serve the folder with a simple HTTP server:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

### Online
Visit the deployed site at: https://magnificent-clafoutis-19e86a.netlify.app

## Managing Content

### Captions & Metadata
Edit `captions.json` to update (grouped by language at top-level `en` / `nl`):
- Page titles and descriptions
- Gallery image captions (title + description)
- Contact form labels
- Navigation text

Example structure:
```json
{
  "en": {
    "pictures": {
      "Picture 1": { "title": "My Image", "description": "Image description" }
    }
  },
  "nl": {
    "pictures": {
      "Picture 1": { "title": "Mijn Afbeelding", "description": "Beschrijving" }
    }
  }
}
```

### Gallery Images
1. Add images to `images/paintings/` or `images/pictures/`
2. Update the corresponding JSON file (`paintings.json` or `pictures.json`) with filenames
3. Add captions to `captions.json` under the appropriate language (`en` or `nl`) with matching keys

## PWA Installation

### Windows 11
1. Open the website in Chrome/Edge
2. Click the install icon in the address bar
3. App runs in standalone window

### Android
1. Open in Chrome
2. Menu → "Install app"
3. App installs as standalone application

## Technical Details

- **No Backend Required**: Pure static site hosted on Netlify
- **Contact Forms**: Powered by Netlify Forms (form processing at build time)
- **Offline Support**: Service Worker caches core assets and JSON files
- **Display Mode**: `standalone` for app-like experience
- **Viewport**: `viewport-fit=cover` for notch/safe area support on modern devices

## Development Notes

- Gallery images are loaded dynamically from JSON file lists
- Captions are loaded from JSON files, not embedded in HTML
- Language switching is client-side, stored in localStorage
- Modal captions support both click-to-toggle and hover-to-expand interactions
- Homepage features a 5-layer animation: fade-in, float/rotate, then fade-out sequence

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## License

© 2024 Eric Greuter. All rights reserved.

## Changelog

### v1.2.0 (December 2025)
- **Added**: Hover tooltips on gallery thumbnails showing painting/picture titles
- **Improved**: Mobile responsive title now wraps to 2 lines on small devices instead of truncating
- **Enhanced**: Custom CSS styling for gallery title tooltips with dark background and light text

### v1.1.0 (Previous Release)
- Initial PWA implementation with service worker
- Bilingual support (English/Dutch)
- Dynamic gallery loading from JSON

## Contact

Email: eric.greuter@gmail.com  
Website: https://magnificent-clafoutis-19e86a.netlify.app
