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
  
  // Update active flag
  document.querySelectorAll('.lang-flag').forEach(btn => {
    btn.classList.remove('active');
  });
  const activeBtn = document.getElementById(`lang-${lang}`);
  if (activeBtn) activeBtn.classList.add('active');
  
  // Reload captions
  loadCaptions();
}

// Initialize language switcher after header loads
function initializeLanguageSwitcher() {
  const langEn = document.getElementById('lang-en');
  const langNl = document.getElementById('lang-nl');
  
  if (langEn) {
    langEn.addEventListener('click', () => setLanguage('en'));
  }
  if (langNl) {
    langNl.addEventListener('click', () => setLanguage('nl'));
  }
  
  // Set initial active state
  const activeBtn = document.getElementById(`lang-${currentLang}`);
  if (activeBtn) activeBtn.classList.add('active');
}

// Load captions from text file
let captions = { pictures: {}, paintings: {}, home: {} };

async function loadCaptions() {
  try {
    const filename = currentLang === 'nl' ? 'CAPTIONS_NL.txt' : 'CAPTIONS.txt';
    const response = await fetch(filename);
    const text = await response.text();
    
    // Parse the text file
    const lines = text.split('\n');
    lines.forEach(line => {
      line = line.trim();
      if (line && line.includes('=')) {
        const [key, value] = line.split('=');
        const parts = key.split('.');
        
        if (parts.length === 2) {
          const [section, item] = parts;
          if (!captions[section]) captions[section] = {};
          captions[section][item] = value;
        }
      }
    });
    
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
      const aboutP1 = document.getElementById('about-p1');
      const aboutP2 = document.getElementById('about-p2');
      
      if (aboutTitle && captions.about.title) {
        aboutTitle.textContent = captions.about.title;
      }
      if (aboutP1 && captions.about.paragraph1) {
        aboutP1.textContent = captions.about.paragraph1;
      }
      if (aboutP2 && captions.about.paragraph2) {
        aboutP2.textContent = captions.about.paragraph2;
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
        contactP2.textContent = captions.contact.paragraph2;
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
      if (thanksP1 && captions.thanks.paragraph1) thanksP1.textContent = captions.thanks.paragraph1;
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
        figure.appendChild(img);
        picturesGallery.appendChild(figure);
      });
    } catch (error) {
      console.error('Failed to load pictures:', error);
    }
  }
}

// Load gallery on page load
loadGallery();

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
  const key = filename ? filename.replace(/\.[^.]+$/, '') : '';
  
  // Check if it's a picture or painting based on filename
  let captionText = '';
  if (captions.pictures && captions.pictures[key]) {
    captionText = captions.pictures[key];
  } else if (captions.paintings && captions.paintings[key]) {
    captionText = captions.paintings[key];
  }
  
  modalCaption.textContent = captionText;
  if (captionText) {
    modalCaption.classList.add('show');
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
