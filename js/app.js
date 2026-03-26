/* ===========================
   OSINT HUB - Main JavaScript
   =========================== */

// ===== SEARCH DATA =====
const SEARCH_DATA = [
  // Tools
  { title: 'Sherlock', desc: 'Hunt down social media accounts by username across 300+ sites', type: 'CLI Tool', url: 'tools.html#sherlock', icon: '🕵️' },
  { title: 'SpiderFoot', desc: 'Automated OSINT footprinting and reconnaissance tool', type: 'CLI/Web Tool', url: 'tools.html#spiderfoot', icon: '🕷️' },
  { title: 'theHarvester', desc: 'Gather emails, subdomains, IPs and URLs from public sources', type: 'CLI Tool', url: 'tools.html#harvester', icon: '🌾' },
  { title: 'Maltego', desc: 'Interactive data mining tool for link analysis', type: 'GUI Tool', url: 'tools.html#maltego', icon: '🔗' },
  { title: 'Recon-ng', desc: 'Full-featured web reconnaissance framework', type: 'CLI Tool', url: 'tools.html#recon-ng', icon: '🔭' },
  { title: 'OSINT Framework', desc: 'Curated collection of OSINT tools organized by category', type: 'Web', url: 'resources.html#frameworks', icon: '🌐' },
  { title: 'Shodan', desc: 'Search engine for Internet-connected devices', type: 'Web Tool', url: '#', icon: '🖥️' },
  { title: 'Censys', desc: 'Internet-wide scanning and search platform', type: 'Web Tool', url: '#', icon: '🔍' },
  { title: 'Have I Been Pwned', desc: 'Check if email/password has been in a data breach', type: 'Web Tool', url: '#', icon: '🔐' },
  { title: 'Hunter.io', desc: 'Find professional email addresses', type: 'Web Tool', url: '#', icon: '📧' },
  { title: 'Pipl', desc: 'People search engine', type: 'People Search', url: '#', icon: '👤' },
  { title: 'TinEye', desc: 'Reverse image search', type: 'Image Search', url: '#', icon: '🖼️' },
  { title: 'DNSDumpster', desc: 'DNS recon and research tool', type: 'DNS/Network', url: '#', icon: '🌐' },
  { title: 'Wayback Machine', desc: 'Archive of websites over time', type: 'Archive', url: '#', icon: '📚' },
  { title: 'GHunt', desc: 'Google account OSINT tool', type: 'CLI Tool', url: 'tools.html#ghunt', icon: '📬' },
  { title: 'ExifTool', desc: 'Read/write metadata in files', type: 'CLI Tool', url: 'tools.html#exiftool', icon: '📷' },
  { title: 'Metagoofil', desc: 'Metadata extraction from public documents', type: 'CLI Tool', url: 'tools.html#metagoofil', icon: '📄' },
  // Guides
  { title: 'OSINT Methodology', desc: 'Step-by-step investigation methodology', type: 'Guide', url: 'guides.html#methodology', icon: '📋' },
  { title: 'Social Media OSINT Guide', desc: 'How to investigate social media profiles', type: 'Guide', url: 'guides.html#social', icon: '📱' },
  { title: 'Google Dorks Guide', desc: 'Advanced Google search operators for OSINT', type: 'Guide', url: 'guides.html#dorks', icon: '🔎' },
  { title: 'Dark Web OSINT', desc: 'Safe techniques for dark web research', type: 'Guide', url: 'guides.html#darkweb', icon: '🌑' },
  { title: 'Image & Video Analysis', desc: 'GEOINT and media verification techniques', type: 'Guide', url: 'guides.html#images', icon: '🎥' },
  // Resources
  { title: 'OSINT Courses', desc: 'Free and paid courses for OSINT skills', type: 'Resource', url: 'resources.html#courses', icon: '🎓' },
  { title: 'CTF & Practice Labs', desc: 'OSINT challenges and practice environments', type: 'Resource', url: 'resources.html#ctf', icon: '🏆' },
];

// ===== NAV SEARCH =====
function initSearch() {
  const inputs = document.querySelectorAll('.search-input');
  const resultsBox = document.getElementById('search-results');
  if (!resultsBox) return;

  inputs.forEach(input => {
    input.addEventListener('input', e => handleSearch(e.target.value, resultsBox));
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeSearch(resultsBox);
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('#search-results') && !e.target.closest('.search-input')) {
      closeSearch(resultsBox);
    }
  });
}

function handleSearch(query, box) {
  query = query.trim().toLowerCase();
  if (!query) { closeSearch(box); return; }

  const results = SEARCH_DATA.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.desc.toLowerCase().includes(query) ||
    item.type.toLowerCase().includes(query)
  ).slice(0, 8);

  if (!results.length) {
    box.innerHTML = `<div class="search-result-item"><div class="sri-title">No results found for "${query}"</div></div>`;
  } else {
    box.innerHTML = results.map(r => `
      <a class="search-result-item" href="${r.url}">
        <span style="font-size:1.3rem">${r.icon}</span>
        <div style="flex:1">
          <div class="sri-title">${highlight(r.title, query)}</div>
          <div class="sri-desc">${highlight(r.desc, query)}</div>
        </div>
        <span class="sri-type">${r.type}</span>
      </a>
    `).join('');
  }
  box.classList.add('active');
}

function highlight(text, query) {
  if (!query) return text;
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(re, '<mark style="background:rgba(0,212,255,0.3);color:inherit;border-radius:3px">$1</mark>');
}

function closeSearch(box) {
  box.classList.remove('active');
  box.innerHTML = '';
}

// ===== CATEGORY FILTER =====
function initCatTabs() {
  document.querySelectorAll('.cat-tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.cat-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const cat = tab.dataset.cat;
        const container = tabGroup.closest('.section-block');

        tabGroup.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        if (!container) return;
        container.querySelectorAll('.card[data-cat]').forEach(card => {
          if (cat === 'all' || card.dataset.cat === cat) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  });
}

// ===== GUIDE ACCORDION =====
function initAccordion() {
  document.querySelectorAll('.guide-card-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.guide-card');
      card.classList.toggle('open');
    });
  });
}

// ===== COPY CODE BLOCKS =====
function initCopyBtns() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const block = btn.closest('.code-block');
      const text = block.innerText.replace('Copy', '').trim();
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'Copied!';
        btn.style.color = 'var(--accent-secondary)';
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.style.color = '';
        }, 2000);
      });
    });
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ===== READING PROGRESS =====
function initReadingProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / total * 100) + '%';
  });
}

// ===== ACTIVE NAV LINK =====
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  initCatTabs();
  initAccordion();
  initCopyBtns();
  initBackToTop();
  initReadingProgress();
  setActiveNav();
});
