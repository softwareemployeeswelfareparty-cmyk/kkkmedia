/**
 * KKK Media — Public Website Client Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Breaking News Ticker Rotation
  const tickerItems = document.querySelectorAll('.ticker-item');
  if (tickerItems.length > 1) {
    let currentIndex = 0;
    let tickerInterval = null;

    const showNextTicker = () => {
      tickerItems[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % tickerItems.length;
      tickerItems[currentIndex].classList.add('active');
    };

    const startTicker = () => {
      tickerInterval = setInterval(showNextTicker, 4500);
    };

    const stopTicker = () => {
      clearInterval(tickerInterval);
    };

    startTicker();

    const tickerWrap = document.querySelector('.ticker-wrap');
    if (tickerWrap) {
      tickerWrap.addEventListener('mouseenter', stopTicker);
      tickerWrap.addEventListener('mouseleave', startTicker);
    }
  }

  // 2. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');

  const openDrawer = () => {
    if (mobileNavDrawer) mobileNavDrawer.classList.add('open');
    if (mobileNavBackdrop) mobileNavBackdrop.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    if (mobileNavDrawer) mobileNavDrawer.classList.remove('open');
    if (mobileNavBackdrop) mobileNavBackdrop.style.display = 'none';
    document.body.style.overflow = '';
  };

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeDrawer);

  // 3. Search Modal Trigger
  const searchModalTriggers = document.querySelectorAll('.search-modal-trigger');
  const searchModalBackdrop = document.getElementById('searchModalBackdrop');
  const searchModalClose = document.getElementById('searchModalClose');
  const searchModalInput = document.getElementById('searchModalInput');

  const openSearch = () => {
    if (searchModalBackdrop) {
      searchModalBackdrop.style.display = 'flex';
      if (searchModalInput) {
        setTimeout(() => searchModalInput.focus(), 100);
      }
      document.body.style.overflow = 'hidden';
    }
  };

  const closeSearch = () => {
    if (searchModalBackdrop) {
      searchModalBackdrop.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  searchModalTriggers.forEach((btn) => btn.addEventListener('click', openSearch));
  if (searchModalClose) searchModalClose.addEventListener('click', closeSearch);
  if (searchModalBackdrop) {
    searchModalBackdrop.addEventListener('click', (e) => {
      if (e.target === searchModalBackdrop) closeSearch();
    });
  }

  // Close search on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeDrawer();
    }
  });

  // 4. Copy Article Link Button
  const copyLinkBtns = document.querySelectorAll('.copy-link-btn');
  copyLinkBtns.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = btn.getAttribute('data-url') || window.location.href;
      try {
        await navigator.clipboard.writeText(url);
        const originalTitle = btn.getAttribute('title') || 'இணைப்பை நகலெடு';
        btn.innerHTML = '✓';
        btn.setAttribute('title', 'நகலெடுக்கப்பட்டது!');
        setTimeout(() => {
          btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
          btn.setAttribute('title', originalTitle);
        }, 2000);
      } catch (err) {
        prompt('Copy link:', url);
      }
    });
  });

  // 5. Live current date in header (Tamil format)
  const headerDateEl = document.getElementById('currentDateDisplay');
  if (headerDateEl) {
    const daysTamil = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
    const monthsTamil = [
      'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
      'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
    ];
    const now = new Date();
    const dayName = daysTamil[now.getDay()];
    const dateNum = now.getDate();
    const monthName = monthsTamil[now.getMonth()];
    const year = now.getFullYear();
    headerDateEl.textContent = `${dayName}, ${dateNum} ${monthName} ${year}`;
  }
});
