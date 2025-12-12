// Load reusable header component
async function loadHeader() {
  try {
    const response = await fetch('components/header.html');
    const html = await response.text();
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      headerContainer.innerHTML = html;
      initializeHeader();
    }
  } catch (error) {
    console.error('Failed to load header:', error);
  }
}

// Initialize header functionality after it's loaded
function initializeHeader() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('site-nav');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
    
    // Close hamburger menu when clicking nav links
    document.querySelectorAll('.site-nav a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('show');
      });
    });
  }
  
  // Initialize language switcher
  initializeLanguageSwitcher();
  
  // Load captions after header is ready
  loadCaptions();
}

// Load header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadHeader);
} else {
  loadHeader();
}

// Language management
let currentLang = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  
  // Update active state for all language buttons (both header and nav)
  document.querySelectorAll('.lang-flag').forEach(btn => {
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Reload captions
  loadCaptions();

  // Close mobile nav after selection for clearer feedback
  const nav = document.getElementById('site-nav');
  if (nav && nav.classList.contains('show')) {
    nav.classList.remove('show');
  }
}

// Initialize language switcher after header loads
function initializeLanguageSwitcher() {
  const bindHandler = (btn) => {
    const lang = btn.dataset.lang;
    
    // Use touchstart for immediate feedback on mobile
    let touchHandled = false;
    
    btn.addEventListener('touchstart', (e) => {
      touchHandled = true;
      btn.style.opacity = '1';
      btn.style.transform = 'scale(1.1)';
    }, { passive: true });
    
    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      if (touchHandled) {
        setLanguage(lang);
        touchHandled = false;
      }
      btn.style.opacity = '';
      btn.style.transform = '';
    }, { passive: false });
    
    btn.addEventListener('click', (e) => {
      // Only trigger if touch didn't already handle it
      if (!touchHandled) {
        e.preventDefault();
        setLanguage(lang);
      }
    });
  };

  // Bind handlers to all language buttons present (header + nav)
  document.querySelectorAll('.lang-flag').forEach(bindHandler);

  // Set initial active state across all
  document.querySelectorAll('.lang-flag').forEach(btn => {
    if (btn.dataset.lang === currentLang) btn.classList.add('active');
  });
}

// Load captions from JSON file
let captions = { pictures: {}, paintings: {}, home: {} };

async function loadCaptions() {
  try {
    const response = await fetch('captions.json');
    const allCaptions = await response.json();
    captions = allCaptions[currentLang] || allCaptions['en'] || {};
    
    // Update home page caption if it exists
    const homeCaption = document.querySelector('.home-svg-container figcaption');
    if (homeCaption && captions.home && captions.home.title) {
      homeCaption.textContent = captions.home.title;
    }
    
    // Update home page description if it exists
    const homeDescription = document.getElementById('home-description');
    if (homeDescription && captions.home && captions.home.description) {
      homeDescription.textContent = captions.home.description;
    }
    
    // Update about page content if it exists
    if (captions.about) {
      const aboutTitle = document.getElementById('about-title');
      const aboutQuote = document.getElementById('about-quote');
      const aboutP1 = document.getElementById('about-p1');
      const aboutP2 = document.getElementById('about-p2');
      
      if (aboutTitle && captions.about.title) {
        aboutTitle.textContent = captions.about.title;
      }
      if (aboutQuote && captions.about.quote) {
        aboutQuote.textContent = captions.about.quote;
      }
      if (aboutP1 && captions.about.paragraph1) {
        const p = captions.about.paragraph1;
        aboutP1.textContent = Array.isArray(p) ? p.join(' ') : p;
      }
      if (aboutP2 && captions.about.paragraph2) {
        const p = captions.about.paragraph2;
        aboutP2.textContent = Array.isArray(p) ? p.join(' ') : p;
      }
    }
    
    // Update contact section if it exists
    if (captions.contact) {
      const contactTitle = document.getElementById('contact-title');
      const contactP1 = document.getElementById('contact-p1');
      const contactP2 = document.getElementById('contact-p2');
      
      if (contactTitle && captions.contact.title) {
        contactTitle.textContent = captions.contact.title;
      }
      if (contactP1 && captions.contact.paragraph1) {
        contactP1.innerHTML = captions.contact.paragraph1.replace('eric.greuter@gmail.com', '<strong>eric.greuter@gmail.com</strong>');
      }
      if (contactP2 && captions.contact.paragraph2) {
        const p = captions.contact.paragraph2;
        contactP2.textContent = Array.isArray(p) ? p.join(' ') : p;
      }
    }

    // Update header content
    if (captions.header) {
      const headerTitle = document.getElementById('header-title');
      if (headerTitle && captions.header.title) {
        headerTitle.textContent = captions.header.title;
      }
    }

    // Update navigation
    if (captions.nav) {
      const navHome = document.getElementById('nav-home');
      const navPictures = document.getElementById('nav-pictures');
      const navPaintings = document.getElementById('nav-paintings');
      const navAbout = document.getElementById('nav-about');
      
      if (navHome && captions.nav.home) navHome.textContent = captions.nav.home;
      if (navPictures && captions.nav.pictures) navPictures.textContent = captions.nav.pictures;
      if (navPaintings && captions.nav.paintings) navPaintings.textContent = captions.nav.paintings;
      if (navAbout && captions.nav.about) navAbout.textContent = captions.nav.about;
    }

    // Update gallery page titles
    const paintingsTitle = document.getElementById('paintings-title');
    const picturesTitle = document.getElementById('pictures-title');
    if (paintingsTitle && captions.paintings && captions.paintings.title) {
      paintingsTitle.textContent = captions.paintings.title;
    }
    if (picturesTitle && captions.pictures && captions.pictures.title) {
      picturesTitle.textContent = captions.pictures.title;
    }

    // Update thanks page
    if (captions.thanks) {
      const thanksTitle = document.getElementById('thanks-title');
      const thanksP1 = document.getElementById('thanks-p1');
      const thanksLink = document.getElementById('thanks-link');
      
      if (thanksTitle && captions.thanks.title) thanksTitle.textContent = captions.thanks.title;
      if (thanksP1 && captions.thanks.paragraph1) {
        const p = captions.thanks.paragraph1;
        thanksP1.textContent = Array.isArray(p) ? p.join(' ') : p;
      }
      if (thanksLink && captions.thanks.link) thanksLink.textContent = captions.thanks.link;
    }

    // Update form labels
    if (captions.form) {
      const formNameLabel = document.getElementById('form-name-label');
      const formEmailLabel = document.getElementById('form-email-label');
      const formMessageLabel = document.getElementById('form-message-label');
      const formSubmit = document.getElementById('form-submit');
      
      if (formNameLabel && captions.form.name) formNameLabel.textContent = captions.form.name;
      if (formEmailLabel && captions.form.email) formEmailLabel.textContent = captions.form.email;
      if (formMessageLabel && captions.form.message) formMessageLabel.textContent = captions.form.message;
      if (formSubmit && captions.form.submit) formSubmit.textContent = captions.form.submit;
    }
  } catch (error) {
    console.error('Failed to load captions:', error);
  }
}

// Load gallery images dynamically
async function loadGallery() {
  const paintingsGallery = document.getElementById('gallery-paintings');
  const picturesGallery = document.getElementById('gallery-pictures');
  
  // Load paintings
  if (paintingsGallery) {
    try {
      const response = await fetch('images/paintings/paintings.json');
      const paintings = await response.json();
      
      paintings.forEach(filename => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = `images/paintings/${filename}`;
        img.alt = filename.replace(/\.[^.]+$/, '');
        img.className = 'thumb';
        img.dataset.filename = filename;
        img.loading = 'lazy';
        img.crossOrigin = 'anonymous';
        
        figure.appendChild(img);
        paintingsGallery.appendChild(figure);
      });
    } catch (error) {
      console.error('Failed to load paintings:', error);
    }
  }
  
  // Load pictures
  if (picturesGallery) {
    try {
      const response = await fetch('images/pictures/pictures.json');
      const pictures = await response.json();
      
      pictures.forEach(filename => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = `images/pictures/${filename}`;
        img.alt = filename.replace(/\.[^.]+$/, '');
        img.className = 'thumb';
        img.dataset.filename = filename;
        img.loading = 'lazy';
        img.crossOrigin = 'anonymous';
        
        figure.appendChild(img);
        picturesGallery.appendChild(figure);
      });
    } catch (error) {
      console.error('Failed to load pictures:', error);
    }
  }
}

// Load gallery after a short delay to ensure captions are loaded
setTimeout(loadGallery, 100);
// Register service worker for PWA installability
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch(err => {
      console.error('Service worker registration failed:', err);
    });
  });
}

// Site interactivity: hamburger menu and gallery modal with captions
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('site-nav');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const modalClose = document.getElementById('modal-close');

// Open modal when a thumbnail is clicked (event delegation)
document.addEventListener('click', (e)=>{
  const t = e.target;
  if(t.classList && t.classList.contains('thumb')){
    openModalWithImage(t.src, t.dataset.filename);
  }
});

function openModalWithImage(src, filename){
  modalImage.src = src;
  modalImage.alt = filename || '';
  
  // Apply dominant color border to modal image when it loads
  const applyColorOnce = () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      canvas.width = modalImage.width;
      canvas.height = modalImage.height;
      ctx.drawImage(modalImage, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      let r = 0, g = 0, b = 0;
      let count = 0;
      
      // Sample every 4th pixel for performance
      for (let i = 0; i < data.length; i += 16) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      
      const hexColor = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
      
      modalImage.style.borderColor = hexColor;
      modalImage.style.borderWidth = '8px';
      modalImage.style.borderStyle = 'solid';
      
      modalImage.removeEventListener('load', applyColorOnce);
    } catch (error) {
      console.error('Failed to extract color:', error);
    }
  };
  
  // If image is already cached/loaded
  if (modalImage.complete && modalImage.naturalWidth) {
    applyColorOnce();
  } else {
    // Wait for image to load
    modalImage.addEventListener('load', applyColorOnce);
  }
  
  const key = filename ? filename.replace(/\.[^.]+$/, '') : '';
  
  // Check if it's a picture or painting based on filename
  let captionHTML = '';
  if (captions.pictures && captions.pictures[key]) {
    const pictureData = captions.pictures[key];
    if (typeof pictureData === 'object') {
      // New format with title and description
      const title = pictureData.title || '';
      const description = pictureData.description || '';
      const descText = Array.isArray(description) ? description.join(' ') : description;
      if (title) {
        captionHTML = `<div class="caption-title">${title}</div>`;
        if (descText) {
          captionHTML += `<div class="caption-description">${descText}</div>`;
        }
      }
    } else {
      // Fallback for old format
      captionHTML = pictureData;
    }
  } else if (captions.paintings && captions.paintings[key]) {
    const paintingData = captions.paintings[key];
    if (typeof paintingData === 'object') {
      // New format with title and description
      const title = paintingData.title || '';
      const description = paintingData.description || '';
      const descText = Array.isArray(description) ? description.join(' ') : description;
      if (title) {
        captionHTML = `<div class="caption-title">${title}</div>`;
        if (descText) {
          captionHTML += `<div class="caption-description">${descText}</div>`;
        }
      }
    } else {
      // Fallback for old format
      captionHTML = paintingData;
    }
  }
  
  modalCaption.innerHTML = captionHTML;
  if (captionHTML) {
    modalCaption.classList.add('show');
    
    // Add click handler to title to toggle description
    const titleEl = modalCaption.querySelector('.caption-title');
    const descEl = modalCaption.querySelector('.caption-description');
    if (titleEl && descEl) {
      titleEl.addEventListener('click', () => {
        descEl.classList.toggle('show');
      });
      // Show description on hover
      titleEl.addEventListener('mouseenter', () => {
        descEl.classList.add('show');
      });
      titleEl.addEventListener('mouseleave', () => {
        descEl.classList.remove('show');
      });
    }
  }
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal(){
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  modalCaption.classList.remove('show');
  modalImage.src = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=>{
  if(e.target === modal) closeModal();
});

// Close on ESC
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape') closeModal();
});

// Disable right-click on images
document.addEventListener('contextmenu', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    return false;
  }
});

// Disable dragging images
document.addEventListener('dragstart', (e) => {
  if (e.target.tagName === 'IMG') {
    e.preventDefault();
    return false;
  }
});

