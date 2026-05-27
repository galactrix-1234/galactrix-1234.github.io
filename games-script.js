// Simple static gallery that reads games/games.json
// Features: search, sort, lazy-loading, lightbox with keyboard navigation

const GALLERY_EL = document.getElementById('gallery');
const SEARCH = document.getElementById('search');
const SORT = document.getElementById('sort');
const LIGHTBOX = document.getElementById('lightbox');
const LB_IMG = document.getElementById('lb-img');
const LB_TITLE = document.getElementById('lb-title');
const LB_DESC = document.getElementById('lb-desc');
const LB_URL = document.getElementById('lb-url');
const LB_CLOSE = document.getElementById('lb-close');
const LB_PREV = document.getElementById('lb-prev');
const LB_NEXT = document.getElementById('lb-next');

let games = [];
let filtered = [];
let currentIndex = -1;

// Fetch manifest and render
async function init(){
  try{
    const res = await fetch('games/games.json', {cache: 'no-cache'});
    games = await res.json();
    games.forEach((i, idx) => i._idx = idx);
    filtered = games.slice();
    renderGallery();
  }catch(err){
    GALLERY_EL.innerHTML = '<p style="color:var(--muted)">Could not load games/games.json — check the file.</p>';
    console.error(err);
  }
}

function renderGallery(){
  applySort();
  GALLERY_EL.innerHTML = '';
  filtered.forEach((img, i) => {
    const card = document.createElement('button');
    card.className = 'card';
    card.setAttribute('aria-label', `${img.title || 'Photo'} — ${img.caption || ''}`);
    card.type = 'button';
    card.addEventListener('click', () => openLightbox(i));
    const imageEl = document.createElement('img');
    imageEl.src = img.src;
    imageEl.alt = img.title || img.caption || 'Photo';
    imageEl.loading = 'lazy';
    const meta = document.createElement('div');
    meta.className = 'meta';
    const title = document.createElement('p');
    title.className = 'title';
    title.textContent = img.title || '';
    const caption = document.createElement('p');
    caption.className = 'caption';
    caption.textContent = img.caption || '';
    meta.appendChild(title);
    meta.appendChild(caption);
    card.appendChild(imageEl);
    card.appendChild(meta);
    GALLERY_EL.appendChild(card);
  });
}

// Search and filter
SEARCH.addEventListener('input', () => {
  const q = SEARCH.value.trim().toLowerCase();
  if(!q) filtered = games.slice();
  else filtered = games.filter(i => {
    return (i.title && i.title.toLowerCase().includes(q)) ||
           (i.caption && i.caption.toLowerCase().includes(q)) ||
           (i.tags && i.tags.join(' ').toLowerCase().includes(q));
  });
  renderGallery();
});

// Sort
SORT.addEventListener('change', () => renderGallery());
function applySort(){
  const mode = SORT.value;
  const copy = filtered;
  if(mode === 'date-desc') copy.sort((a,b) => (b.date||'').localeCompare(a.date||''));
  else if(mode === 'date-asc') copy.sort((a,b) => (a.date||'').localeCompare(b.date||''));
  else if(mode === 'title-asc') copy.sort((a,b)=> (a.title||'').localeCompare(b.title||''));
  else if(mode === 'title-desc') copy.sort((a,b)=> (b.title||'').localeCompare(a.title||''));
}

// Lightbox
function openLightbox(listIndex){
  // Map listIndex to original games index
  const item = filtered[listIndex];
  currentIndex = games.findIndex(i => i._idx === item._idx);
  showLightbox();
}
function showLightbox(){
  if(currentIndex < 0 || currentIndex >= games.length) return;
  const game = games[currentIndex];
  LB_IMG.src = game.src;
  LB_IMG.alt = game.title || game.caption || 'Game';
  LB_TITLE.textContent = game.title || '';
  LB_DESC.textContent = game.caption || (game.date ? game.date : '');
  LB_URL.innerHTML = `<a href="${game.url}">${game.url}</a>`
  
  LIGHTBOX.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  LIGHTBOX.setAttribute('aria-hidden','true');
  LB_IMG.src = '';
  document.body.style.overflow = '';
}
function prev(){
  currentIndex = (currentIndex - 1 + games.length) % games.length;
  showLightbox();
}
function next(){
  currentIndex = (currentIndex + 1) % games.length;
  showLightbox();
}
LB_CLOSE.addEventListener('click', closeLightbox);
LB_PREV.addEventListener('click', prev);
LB_NEXT.addEventListener('click', next);
LIGHTBOX.addEventListener('click', (e) => {
  if(e.target === LIGHTBOX) closeLightbox();
});
// Keyboard
document.addEventListener('keydown', (e) => {
  if(LIGHTBOX.getAttribute('aria-hidden') === 'false'){
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') prev();
    if(e.key === 'ArrowRight') next();
  }
});

// Initialize
init();