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

  // 5. Multilingual Dictionary & Date Localization
  const articlesDictionary = {
    'tvk-vijay-next-political-strategy-district-level-meetings-2026': {
      ta: {
        title: 'விஜய் தலைமையில் தவெகவின் அடுத்தகட்ட அரசியல் வியூகம்: மாவட்ட வாரியாக தீவிர ஆலோசனை!',
        desc: 'தமிழக வெற்றிக் கழக தலைவர் விஜய் தலைமையில் மாவட்ட செயலாளர்களுடனான முக்கிய ஆலோசனைக் கூட்டம் பனையூர் தலைமை அலுவலகத்தில் விறுவிறுப்பாக நடைபெற்றது.'
      },
      en: {
        title: "TVK Vijay's Next Political Strategy: Intensive District-Level Consultations Underway!",
        desc: 'A key consultative meeting with district secretaries led by TVK President Vijay was held actively at the Panaiyur headquarters.'
      },
      ml: {
        title: 'വിജയിയുടെ നേതൃത്വത്തിൽ ടിവികെയുടെ അടുത്ത രാഷ്ട്രീയ തന്ത്രം: ജില്ലാതലത്തിൽ തീവ്ര കൂടിയാലോചനകൾ!',
        desc: 'തമിഴക വെട്രി കഴകം അധ്യക്ഷൻ വിജയിയുടെ നേതൃത്വത്തിൽ ജില്ലാ സെക്രട്ടറിമാരുമായുള്ള നിർണായക യോഗം പനയൂരിലെ ആസ്ഥാനത്ത് സജീവമായി നടന്നു.'
      }
    },
    'tamil-nadu-new-industrial-investments-cm-mk-stalin-mou-signing': {
      ta: {
        title: 'தமிழகத்தில் புதிய தொழில் முதலீடுகள்: முதலமைச்சர் மு.க.ஸ்டாலின் தலைமையில் வரலாற்று ஒப்பந்தங்கள்!',
        desc: 'சென்னையில் நடைபெற்ற உலக முதலீட்டாளர்கள் வழிகாட்டுதல் மாநாட்டில் ரூ.45,000 கோடி மதிப்பிலான புதிய தொழில் முதலீட்டு புரிந்துணர்வு ஒப்பந்தங்கள் கையெழுத்தாகின.'
      },
      en: {
        title: 'New Industrial Investments in Tamil Nadu: Historic MoUs Signed Under CM M.K. Stalin!',
        desc: 'New industrial investment MoUs worth ₹45,000 crore were signed at the Global Investors Guidance Summit in Chennai.'
      },
      ml: {
        title: 'തമിഴ്‌നാട്ടിൽ പുതിയ വ്യവസായ നിക്ഷേപങ്ങൾ: മുഖ്യമന്ത്രി എം.കെ.സ്റ്റാലിന്റെ നേതൃത്വത്തിൽ ചരിത്ര കരാറുകൾ!',
        desc: 'ചെന്നൈയിൽ നടന്ന നിക്ഷേപക സംഗമത്തിൽ 45,000 കോടി രൂപയുടെ പുതിയ വ്യവസായ നിക്ഷേപ കരാറുകൾ ഒപ്പുവെച്ചു.'
      }
    },
    'dmk-aiadmk-ground-campaign-edappadi-palaniswami-district-tours': {
      ta: {
        title: 'திமுக - அதிமுக களப்போராட்டம் தீவிரம்: மக்கள் சந்திப்பு பிரச்சாரத்தை முடுக்கிவிட்ட எடப்பாடி பழனிசாமி!',
        desc: 'அதிமுக பொதுச்செயலாளர் எடப்பாடி பழனிசாமி கொங்கு மண்டலம் மற்றும் டெல்டா மாவட்டங்களில் பிரம்மாண்ட பேரணிகளை நடத்த ஆயத்தமாகி வருகிறார்.'
      },
      en: {
        title: 'DMK vs AIADMK Ground Battle Intensifies: Edappadi Palaniswami Steps Up Public Campaigns!',
        desc: 'AIADMK General Secretary Edappadi Palaniswami gears up to hold massive rallies across Kongu and Delta districts.'
      },
      ml: {
        title: 'ഡിഎംകെ - എഐഎഡിഎംകെ പോരാട്ടം ശക്തം: ജനസമ്പർക്ക പരിപാടികൾ വേഗത്തിലാക്കി എടപ്പാടി പളനിസ്വാമി!',
        desc: 'കൊങ്കു, ഡെൽറ്റ മേഖലകളിൽ വമ്പൻ റാലികൾ സംഘടിപ്പിക്കാൻ ഒരുങ്ങി എഐഎഡിഎംകെ ജനറൽ സെക്രട്ടറി എടപ്പാടി പളനിസ്വാമി.'
      }
    },
    'kollywood-thalapathy-69-shooting-update-audio-launch-date': {
      ta: {
        title: 'கோலிவுட் அதிரடி: தளபதி 69 படப்பிடிப்பு சுடச்சுட அப்டேட்! இசை வெளியீட்டு விழா எப்போது?',
        desc: 'ஹெச்.வினோத் இயக்கத்தில் விஜய் நடிக்கும் புதிய படத்தின் இறுதிக்கட்ட படப்பிடிப்பு விறுவிறுப்பாக நடைபெற்று வருகிறது. இசை வெளியீட்டு விழா தேதி குறித்த முக்கிய தகவல்.'
      },
      en: {
        title: 'Kollywood Buzz: Thalapathy 69 Shooting Hot Update! When is the Audio Launch?',
        desc: "The final shooting schedule of Vijay's upcoming movie directed by H. Vinoth is underway. Key details on audio launch date revealed."
      },
      ml: {
        title: 'കോളിവുഡ് തരംഗം: ദളപതി 69 ചിത്രീകരണ അപ്ഡേറ്റ്! ഓഡിയോ ലോഞ്ച് എപ്പോൾ?',
        desc: 'എച്ച്. വിനോദ് സംവിധാനം ചെയ്യുന്ന വിജയ് ചിത്രത്തിന്റെ അവസാനഘട്ട ചിത്രീകരണം പുരോഗമിക്കുന്നു. ഓഡിയോ ലോഞ്ച് വിവരങ്ങൾ പുറത്ത്.'
      }
    },
    'ipl-2026-mega-auction-csk-team-strategy-ms-dhoni-plans': {
      ta: {
        title: 'ஐபிஎல் 2026 மெகா ஏலம்: சிஎஸ்கே அணியின் மாஸ்டர் பிளான்! தோனியின் புதிய திட்டம் என்ன?',
        desc: 'சென்னை சூப்பர் கிங்ஸ் அணி நிர்வாகம் வரவிருக்கும் ஐபிஎல் தொடருக்காக இளம் ஆல்ரவுண்டர்களை குறிவைத்து வியூகம் வகுத்து வருகிறது.'
      },
      en: {
        title: "IPL 2026 Mega Auction: CSK's Master Plan! What is MS Dhoni's New Strategy?",
        desc: 'Chennai Super Kings management devises strategies targeting young all-rounders for the upcoming IPL season.'
      },
      ml: {
        title: 'ഐപിഎൽ 2026 മെഗാ ലേലം: സിഎസ്കെയുടെ മാസ്റ്റർ പ്ലാൻ! ധോണിയുടെ പുതിയ തന്ത്രം എന്ത്?',
        desc: 'വരാനിരിക്കുന്ന ഐപിഎൽ സീസണിൽ യുവ ഓൾറൗണ്ടർമാരെ ലക്ഷ്യമിട്ട് ചെന്നൈ സൂപ്പർ കിംഗ്സ് മാനേജ്മെന്റ്.'
      }
    },
    'tamil-ai-revolution-multimodal-tamil-language-model-launched': {
      ta: {
        title: 'செயற்கை நுண்ணறிவு (AI) உலகில் புரட்சி: தமிழில் உரையாடும் புதிய AI மாடல் அறிமுகம்!',
        desc: 'தமிழ் மொழி மற்றும் வட்டார வழக்குகளை துல்லியமாகப் புரிந்து கொண்டு பதிலளிக்கும் அதிநவீன AI செயலி வெளியாகி வரவேற்பைப் பெற்றுள்ளது.'
      },
      en: {
        title: 'Revolution in Artificial Intelligence: New AI Model Conversing in Tamil Launched!',
        desc: 'A state-of-the-art AI application understanding Tamil language nuances and dialects has been launched to great acclaim.'
      },
      ml: {
        title: 'നിർമ്മിത ബുദ്ധിയിൽ വിപ്ലവം: തമിഴിൽ സംസാരിക്കുന്ന പുതിയ എഐ മോഡൽ പുറത്തിറക്കി!',
        desc: 'തമിഴ് ഭാഷയും പ്രാദേശിക പ്രയോഗങ്ങളും കൃത്യമായി മനസ്സിലാക്കുന്ന അത്യാധുനിക എഐ ആപ്പ് ശ്രദ്ധേയമാകുന്നു.'
      }
    },
    'made-in-india-electric-suv-600km-range-launched': {
      ta: {
        title: 'ஒரே சார்ஜில் 600 கி.மீ: இந்தியாவில் அறிமுகமாகும் புதிய மேட்-இன்-இந்தியா எலெக்ட்ரிக் எஸ்யூவி!',
        desc: 'அதிவேக சார்ஜிங் வசதி மற்றும் மலிவு விலையில் நடுத்தர குடும்பங்களை குறிவைத்து வெளியாகும் புதிய எலெக்ட்ரிக் கார் சந்தையில் பரபரப்பை ஏற்படுத்தியுள்ளது.'
      },
      en: {
        title: '600 KM on a Single Charge: New Made-in-India Electric SUV Launched in India!',
        desc: 'Affordable electric SUV with ultra-fast charging targeted at middle-class families creates excitement in the automotive market.'
      },
      ml: {
        title: 'ഒറ്റ ചാർജിൽ 600 കി.മീ: മെയ്ഡ് ഇൻ ഇന്ത്യ ഇലക്ട്രിക് എസ്‌യുവി ഇന്ത്യയിൽ പുറത്തിറങ്ങി!',
        desc: 'അതിവേഗ ചാർജിംഗും കുറഞ്ഞ വിലയുമായി ഇടത്തരം കുടുംബങ്ങളെ ലക്ഷ്യമിട്ടുള്ള പുതിയ ഇലക്ട്രിക് കാർ വിപണിയിൽ തരംഗമാകുന്നു.'
      }
    },
    'madurai-traditional-organic-farmer-viral-story-tamil-nadu': {
      ta: {
        title: 'இணையத்தில் வைரலாகும் மதுரை தாத்தா: 90 வயதிலும் பாரம்பரிய விவசாயத்தை மீட்டெடுத்த சாதனை!',
        desc: 'பாரம்பரிய இயற்கை விதைகளை கட்டிக்காத்து ஆயிரக்கணக்கான இளைஞர்களுக்கு இயற்கை விவசாயப் பயிற்சி அளிக்கும் மதுரை விவசாயியின் உத்வேகக் கதை.'
      },
      en: {
        title: 'Madurai Grandpa Goes Viral Online: Reviving Traditional Farming at Age 90!',
        desc: 'The inspiring story of a 90-year-old Madurai farmer preserving native heirloom seeds and training thousands in organic farming.'
      },
      ml: {
        title: 'ഇന്റർനെറ്റിൽ വൈറലായി മധുരയിലെ കർഷകൻ: 90-ാം വയസ്സിലും പാരമ്പര്യ കൃഷി വീണ്ടെടുത്ത് വിസ്മയം!',
        desc: 'നാടൻ വിത്തുകൾ സംരക്ഷിച്ച് ആയിരക്കണക്കിന് യുവാക്കൾക്ക് ജൈവകൃഷി പരിശീലനം നൽകുന്ന മധുര കർഷകന്റെ പ്രചോദനാത്മക കഥ.'
      }
    },
    'parliament-winter-session-new-bills-opposition-debates': {
      ta: {
        title: 'நாடாளுமன்ற குளிர்கால கூட்டத்தொடர்: புதிய மசோதாக்கள் மற்றும் எதிர்க்கட்சிகளின் அமளி!',
        desc: 'நாடாளுமன்றத்தில் நாட்டின் முக்கிய பொருளாதார மசோதாக்கள் மீதான விவாதம் காரசாரமாக துவங்கியுள்ளது.'
      },
      en: {
        title: 'Parliament Winter Session: Key New Bills Tabled Amid Opposition Protests!',
        desc: 'Heated debates commence in Parliament over pivotal national economic bills.'
      },
      ml: {
        title: 'പാർലമെന്റ് ശീതകാല സമ്മേളനം: പുതിയ ബില്ലുകളും പ്രതിപക്ഷ ബഹളവും!',
        desc: 'രാജ്യത്തെ പ്രധാന സാമ്പത്തിക ബില്ലുകളെക്കുറിച്ചുള്ള ചർച്ചകൾ പാർലമെന്റിൽ സജീവമായി ആരംഭിച്ചു.'
      }
    },
    'tamil-nadu-coastal-port-expansion-international-trade-hub': {
      ta: {
        title: 'தமிழக கடற்கரை பகுதிகளில் புதிய துறைமுக விரிவாக்கம்: சர்வதேச வர்த்தக மையம் உருவாகிறது!',
        desc: 'தூத்துக்குடி மற்றும் எண்ணூர் துறைமுகங்களின் நவீனமயமாக்கல் பணிகளுக்கு மத்திய மற்றும் மாநில அரசுகள் ஒப்புதல் அளித்துள்ளன.'
      },
      en: {
        title: 'Port Expansion Along Tamil Nadu Coast: International Trade Hub in the Making!',
        desc: 'Central and State governments approve major modernisation projects for Thoothukudi and Ennore ports.'
      },
      ml: {
        title: 'തമിഴ്‌നാട് തീരദേശ തുറമുഖ വികസനം: അന്താരാഷ്ട്ര വ്യാപാര ഹബ്ബ് യാഥാർത്ഥ്യമാകുന്നു!',
        desc: 'തൂത്തുക്കുടി, എണ്ണൂർ തുറമുഖങ്ങളുടെ നവീകരണത്തിന് കേന്ദ്ര-സംസ്ഥാന സർക്കാരുകളുടെ അംഗീകാരം.'
      }
    }
  };

  const categoryDescriptions = {
    'tamil-nadu-politics': {
      ta: 'தமிழ்நாடு அரசியல் களம், சட்டப்பேரவை விவாதங்கள், அரசின் புதிய திட்டங்கள் மற்றும் அரசியல் நகர்வுகள் குறித்த முழுமையான தகவல்கள்.',
      en: 'Comprehensive updates on Tamil Nadu political landscape, legislative assembly debates, state welfare schemes, and policy developments.',
      ml: 'തമിഴ്നാട് രാഷ്ട്രീയം, നിയമസഭാ ചർച്ചകൾ, പുതിയ സർക്കാർ പദ്ധതികൾ, രാഷ്ട്രീയ നീക്കങ്ങൾ എന്നിവയുടെ സമഗ്ര വിവരങ്ങൾ.'
    },
    'tvk-news': {
      ta: 'தமிழக வெற்றிக் கழகம் (TVK), தலைவர் விஜய் அவர்களின் மாநாடுகள், கொள்கை முடிவுகள் மற்றும் கட்சி நிர்வாக நிகழ்வுகள்.',
      en: 'Tamizhaga Vetri Kazhagam (TVK), President Vijay conferences, policy decisions, and party updates.',
      ml: 'തമിഴക വെട്രി കഴകം (ടിവികെ), പ്രസിഡന്റ് വിജയിയുടെ സമ്മേളനങ്ങൾ, നയപരമായ തീരുമാനങ്ങൾ, പാർട്ടി വാർത്തകൾ.'
    },
    'dmk-aiadmk-news': {
      ta: 'திமுக மற்றும் அதிமுக கட்சிகளின் தேர்தல் வியூகங்கள், தலைவர்களின் அறிக்கைகள் மற்றும் கள அரசியல் ஆய்வுகள்.',
      en: 'Election strategies, leaders statements, and ground political analysis of DMK and AIADMK.',
      ml: 'ഡിഎംകെ, എഐഎഡിഎംകെ പാർട്ടികളുടെ തിരഞ്ഞെടുപ്പ് തന്ത്രങ്ങൾ, നേതാക്കളുടെ പ്രസ്താവനകൾ, രാഷ്ട്രീയ വിശകലനങ്ങൾ.'
    },
    'national-news': {
      ta: 'இந்திய அளவிலான முக்கிய அரசியல், பொருளாதாரம், நாடாளுமன்ற நடவடிக்கைகள் மற்றும் உச்சநீதிமன்ற தீர்ப்புகள்.',
      en: 'National politics, economy, parliamentary proceedings, and Supreme Court verdicts.',
      ml: 'ദേശീയ രാഷ്ട്രീയം, സാമ്പത്തിക രംഗം, പാർലമെന്റ് നടപടികൾ, സുപ്രീം കോടതി വിധികൾ.'
    },
    'cinema-celebrity': {
      ta: 'கோலிவுட் திரை உலக செய்திகள், திரைப்பட விமர்சனங்கள், பிரபலங்களின் பேட்டிகள் மற்றும் டிரெய்லர் அப்டேட்கள்.',
      en: 'Kollywood cinema news, movie reviews, celebrity interviews, and trailer updates.',
      ml: 'കോളിവുഡ് സിനിമാ വിശേഷങ്ങൾ, റിവ്യൂകൾ, താര അഭിമുഖങ്ങൾ, ട്രെയിലർ അപ്ഡേറ്റുകൾ.'
    },
    'cricket-sports': {
      ta: 'ஐபிஎல், சர்வதேச கிரிக்கெட் போட்டிகள், செஸ், கால்பந்து மற்றும் இந்திய விளையாட்டு வீரர்களின் சாதனைகள்.',
      en: 'IPL, international cricket matches, chess, football, and achievements of Indian athletes.',
      ml: 'ഐപിഎൽ, അന്താരാഷ്ട്ര ക്രിക്കറ്റ്, ചെസ്സ്, ഫുട്ബോൾ, ഇന്ത്യൻ കായിക താരങ്ങളുടെ നേട്ടങ്ങൾ.'
    },
    'technology-ai': {
      ta: 'செயற்கை நுண்ணறிவு (AI), புதிய ஸ்மார்ட்போன்கள், ஆப்ஸ்கள் மற்றும் எதிர்கால டிஜிட்டல் தொழில்நுட்ப மாற்றங்கள்.',
      en: 'Artificial Intelligence (AI), latest smartphones, apps, and future digital technology trends.',
      ml: 'നിർമ്മിത ബുദ്ധി (എഐ), പുതിയ സ്മാർട്ട്ഫോണുകൾ, ആപ്പുകൾ, ഭാവി ഡിജിറ്റൽ സാങ്കേതികവിദ്യകൾ.'
    },
    'automobile-news': {
      ta: 'இந்திய சந்தையில் வெளியாகும் புதிய கார்கள், மின்சார வாகனங்கள் (EV), பைக்குகள் மற்றும் ஓட்டுநர் சோதனைகள்.',
      en: 'New cars launching in India, Electric Vehicles (EV), bikes, and test drives.',
      ml: 'ഇന്ത്യൻ വിപണിയിലെ പുതിയ കാറുകൾ, ഇലക്ട്രിക് വാഹനങ്ങൾ (ഇവി), ബൈക്കുകൾ, ടെസ്റ്റ് ഡ്രൈവുകൾ.'
    },
    'trending-news': {
      ta: 'இணையத்தில் வைரலாகும் சுவாரஸ்ய தகவல்கள், சமூக ஊடக விவாதங்கள் மற்றும் மக்களின் பேசுபொருட்கள்.',
      en: 'Viral stories online, social media trends, and popular discussions.',
      ml: 'ഓൺലൈനിൽ വൈറലാകുന്ന വാർത്തകൾ, സോഷ്യൽ മീഡിയ ട്രെൻഡുകൾ, ജനപ്രിയ വിഷയങ്ങൾ.'
    }
  };

  const langDictionary = {
    ta: {
      about_us: "எங்களைப் பற்றி",
      contact: "தொடர்புக்கு",
      privacy: "தனியுரிமைக் கொள்கை",
      terms: "விதிமுறைகள்",
      disclaimer: "பொறுப்புத் துறப்பு",
      breaking_news: "முக்கிய செய்திகள்",
      search_placeholder: "செய்திகள் தேடுக...",
      search_heading: "செய்திகள் தேடுக (Search News)",
      search_btn: "தேடு",
      tagline: "தமிழின் முன்னணி டிஜிட்டல் செய்தி தளம்",
      home: "முகப்பு",
      trending_title: "அதிகம் வாசிக்கப்பட்டவை",
      other_categories: "பிற செய்திப் பிரிவுகள்",
      all_categories: "அனைத்து செய்திப் பிரிவுகள்",
      related_news: "தொடர்புடைய செய்திகள்",
      dark_mode: "இருண்ட பயன்முறை (Dark Theme)",
      lang_title: "மொழி / Language",
      latest_news: "சமீபத்திய செய்திகள்",
      view_more: "மேலும் பார்க்க",
      view_all: "அனைத்தும் பார்க்க →",
      tvk_news_title: "தவெக சிறப்புச் செய்திகள்",
      cinema_title: "சினிமா",
      sports_title: "கிரிக்கெட் & விளையாட்டு",
      social_follow: "சமூக வலைதளங்களில் இணைந்திருங்கள்",
      quick_links: "முக்கிய பக்கங்கள்",
      categories_heading: "செய்திப் பிரிவுகள்",
      office_address: "அலுவலக முகவரி",
      prev_page: "« முந்தையது",
      next_page: "அடுத்தது »",
      no_articles_title: "இந்த பிரிவில் செய்திகள் எதுவும் இல்லை",
      no_articles_desc: "விரைவில் புதிய செய்திகள் பதிவேற்றப்படும்.",
      go_home: "முகப்புக்குச் செல்",
      published_label: "வெளியீடு:",
      views_label: "பார்வைகள்",
      categories: {
        'tamil-nadu-politics': "தமிழ்நாடு அரசியல்",
        'tvk-news': "தவெக செய்திகள்",
        'dmk-aiadmk-news': "திமுக & அதிமுக",
        'national-news': "தேசிய செய்திகள்",
        'cinema-celebrity': "சினிமா & பிரபலங்கள்",
        'cricket-sports': "கிரிக்கெட் & விளையாட்டு",
        'technology-ai': "தொழில்நுட்பம் & ஏஐ",
        'automobile-news': "ஆட்டோமொபைல்",
        'trending-news': "வைரல் & ட்ரெண்டிங்"
      }
    },
    en: {
      about_us: "About Us",
      contact: "Contact Us",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      disclaimer: "Disclaimer",
      breaking_news: "Breaking News",
      search_placeholder: "Search news, articles...",
      search_heading: "Search News",
      search_btn: "Search",
      tagline: "Tamil's Leading Digital News Portal",
      home: "Home",
      trending_title: "Most Read Stories",
      other_categories: "Other Categories",
      all_categories: "All Categories",
      related_news: "Related News",
      dark_mode: "Dark Theme",
      lang_title: "Language",
      latest_news: "Latest News",
      view_more: "View More",
      view_all: "View All →",
      tvk_news_title: "TVK Special News",
      cinema_title: "Cinema",
      sports_title: "Cricket & Sports",
      social_follow: "Follow Us On Social Media",
      quick_links: "Important Links",
      categories_heading: "News Categories",
      office_address: "Office Address",
      prev_page: "« Previous",
      next_page: "Next »",
      no_articles_title: "No articles found in this category",
      no_articles_desc: "New stories will be published shortly.",
      go_home: "Go to Home",
      published_label: "Published:",
      views_label: "views",
      categories: {
        'tamil-nadu-politics': "Tamil Nadu Politics",
        'tvk-news': "TVK News",
        'dmk-aiadmk-news': "DMK & AIADMK",
        'national-news': "National News",
        'cinema-celebrity': "Cinema & Celebrities",
        'cricket-sports': "Cricket & Sports",
        'technology-ai': "Technology & AI",
        'automobile-news': "Automobile",
        'trending-news': "Viral & Trending"
      }
    },
    ml: {
      about_us: "ഞങ്ങളെ കുറിച്ച്",
      contact: "ബന്ധപ്പെടുക",
      privacy: "സ്വകാര്യതാ നയം",
      terms: "നിബന്ധനകൾ",
      disclaimer: "നിരാകരണം",
      breaking_news: "ബ്രേക്കിംഗ് വാർത്തകൾ",
      search_placeholder: "വാർത്തകൾ തിരയുക...",
      search_heading: "വാർത്തകൾ തിരയുക",
      search_btn: "തിരയുക",
      tagline: "തമിഴിന്റെ മുൻനിര ഡിജിറ്റൽ വാർത്താ പോർട്ടൽ",
      home: "ഹോം",
      trending_title: "കൂടുതൽ വായിക്കപ്പെട്ടവ",
      other_categories: "മറ്റ് വാർത്താ വിഭാഗങ്ങൾ",
      all_categories: "എല്ലാ വാർത്താ വിഭാഗങ്ങളും",
      related_news: "ബന്ധപ്പെട്ട വാർത്തകൾ",
      dark_mode: "ഡാർക്ക് മോഡ്",
      lang_title: "ഭാഷ (Language)",
      latest_news: "ഏറ്റവും പുതിയ വാർത്തകൾ",
      view_more: "കൂടുതൽ കാണുക",
      view_all: "എല്ലാം കാണുക →",
      tvk_news_title: "ടിവികെ പ്രത്യേക വാർത്തകൾ",
      cinema_title: "സിനിമ",
      sports_title: "ക്രിക്കറ്റ് & കായികം",
      social_follow: "സോഷ്യൽ മീഡിയയിൽ ഞങ്ങളെ പിന്തുടരൂ",
      quick_links: "പ്രധാന ലിങ്കുകൾ",
      categories_heading: "വാർത്താ വിഭാഗങ്ങൾ",
      office_address: "ഓഫീസ് വിലാസം",
      prev_page: "« മുൻപത്തെ",
      next_page: "അടുത്തത് »",
      no_articles_title: "ഈ വിഭാഗത്തിൽ വാർത്തകൾ ലഭ്യമല്ല",
      no_articles_desc: "ഉടൻ തന്നെ പുതിയ വാർത്തകൾ ലഭ്യമാകും.",
      go_home: "ഹോമിലേക്ക് പോകുക",
      published_label: "പ്രസിദ്ധീകരിച്ചത്:",
      views_label: "കാഴ്ചകൾ",
      categories: {
        'tamil-nadu-politics': "തമിഴ്നാട് രാഷ്ട്രീയം",
        'tvk-news': "ടിവികെ വാർത്തകൾ",
        'dmk-aiadmk-news': "ഡിഎംകെ & എഐഎഡിഎംകെ",
        'national-news': "ദേശീയ വാർത്തകൾ",
        'cinema-celebrity': "സിനിമ & താരങ്ങൾ",
        'cricket-sports': "ക്രിക്കറ്റ് & കായികം",
        'technology-ai': "സാങ്കേതികവിദ്യ & എഐ",
        'automobile-news': "ഓട്ടോമൊബൈൽ",
        'trending-news': "വൈറൽ & ട്രെൻഡിംഗ്"
      }
    }
  };

  const updateDateDisplay = (lang) => {
    const headerDateEl = document.getElementById('currentDateDisplay');
    if (!headerDateEl) return;
    const now = new Date();
    if (lang === 'en') {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      headerDateEl.textContent = `KKK Media — ${now.toLocaleDateString('en-US', options)}`;
    } else if (lang === 'ml') {
      const daysMl = ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'];
      const monthsMl = ['ജനുവരി', 'ഫെബ്രുവരി', 'മാർച്ച്', 'ഏപ്രിൽ', 'മേയ്', 'ജൂൺ', 'ജൂലൈ', 'ഓഗസ്റ്റ്', 'സെപ്റ്റംബർ', 'ഒക്ടോബർ', 'നവംബർ', 'ഡിസംബർ'];
      headerDateEl.textContent = `KKK മീഡിയ — ${daysMl[now.getDay()]}, ${now.getDate()} ${monthsMl[now.getMonth()]} ${now.getFullYear()}`;
    } else {
      const daysTamil = ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'];
      const monthsTamil = ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'];
      headerDateEl.textContent = `KKK Media — ${daysTamil[now.getDay()]}, ${now.getDate()} ${monthsTamil[now.getMonth()]} ${now.getFullYear()}`;
    }
  };

  const formatArticleDate = (isoString, lang) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    if (lang === 'en') {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    const day = date.getDate();
    const year = date.getFullYear();
    const monthIdx = date.getMonth();
    if (lang === 'ml') {
      const mlMonths = ['ജനുവരി', 'ഫെബ്രുവരി', 'മാർച്ച്', 'ഏപ്രിൽ', 'മേയ്', 'ജൂൺ', 'ജൂലൈ', 'ഓഗസ്റ്റ്', 'സെപ്റ്റംബർ', 'ഒക്ടോബർ', 'നവംബർ', 'ഡിസംബർ'];
      return `${mlMonths[monthIdx]} ${day}, ${year}`;
    }
    const taMonths = ['ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்', 'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'];
    return `${taMonths[monthIdx]} ${day}, ${year}`;
  };

  // 6. Dark / Light Theme Toggle
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('kkk_theme', theme);
    } catch (e) {}

    themeToggleBtns.forEach((btn) => {
      const isDark = theme === 'dark';
      btn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      btn.setAttribute('title', isDark ? 'வெளிர் நிறம் (Light Mode)' : 'இருண்ட நிறம் (Dark Mode)');
    });
  };

  themeToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('kkk_theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // 7. Multilingual Switching Logic (Tamil, English, Malayalam)
  const langNames = { ta: 'தமிழ்', en: 'English', ml: 'മലയാളം' };
  const langCodes = { ta: 'TA', en: 'EN', ml: 'ML' };

  let googleTranslateLoaded = false;
  const loadGoogleTranslate = () => {
    if (googleTranslateLoaded) return;
    googleTranslateLoaded = true;

    window.googleTranslateElementInit = function() {
      new google.translate.TranslateElement({
        pageLanguage: 'ta',
        includedLanguages: 'ta,en,ml',
        autoDisplay: false
      }, 'google_translate_element');
    };

    const s = document.createElement('script');
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.body.appendChild(s);
  };

  const triggerGoogleTranslate = (lang) => {
    if (lang === 'ta') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=' + window.location.hostname + '; path=/;';
      if (document.documentElement.classList.contains('translated-ltr')) {
        window.location.reload();
      }
      return;
    }

    loadGoogleTranslate();
    document.cookie = `googtrans=/ta/${lang}; path=/;`;
    document.cookie = `googtrans=/ta/${lang}; domain=${window.location.hostname}; path=/;`;

    const applySelect = () => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = lang;
        select.dispatchEvent(new Event('change'));
      } else {
        setTimeout(applySelect, 250);
      }
    };
    applySelect();
  };

  const applyLanguage = (lang, triggerFullTranslate = true) => {
    document.documentElement.setAttribute('lang', lang);
    try {
      localStorage.setItem('kkk_lang', lang);
    } catch(e) {}

    const currentLangText = document.getElementById('currentLangText');
    if (currentLangText) currentLangText.textContent = langNames[lang] || 'தமிழ்';

    const headerLangBadge = document.getElementById('headerLangBadge');
    if (headerLangBadge) headerLangBadge.textContent = langCodes[lang] || 'TA';

    document.querySelectorAll('.lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    document.querySelectorAll('.mobile-lang-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    const dict = langDictionary[lang] || langDictionary.ta;

    // 1. Text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.tagName === 'INPUT') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 2. Categories with data-cat-slug
    document.querySelectorAll('[data-cat-slug]').forEach(el => {
      const slug = el.getAttribute('data-cat-slug');
      if (slug && dict.categories && dict.categories[slug]) {
        if (el.classList.contains('ticker-cat-tag')) {
          el.textContent = `[${dict.categories[slug]}]`;
        } else {
          el.textContent = dict.categories[slug];
        }
      }
    });

    // 3. Fallback for category href links
    if (dict.categories) {
      document.querySelectorAll('a[href*="/category/"]').forEach(link => {
        const href = link.getAttribute('href');
        const slug = href.split('/category/')[1]?.split('?')[0];
        if (slug && dict.categories[slug] && !link.hasAttribute('data-cat-slug')) {
          link.textContent = dict.categories[slug];
        }
      });
    }

    // 4. Category Banner Title & Description
    document.querySelectorAll('[data-cat-title]').forEach(el => {
      const slug = el.getAttribute('data-cat-title');
      if (slug && dict.categories && dict.categories[slug]) {
        el.textContent = dict.categories[slug];
      }
    });

    document.querySelectorAll('[data-cat-desc]').forEach(el => {
      const slug = el.getAttribute('data-cat-desc');
      if (slug && categoryDescriptions[slug] && categoryDescriptions[slug][lang]) {
        el.textContent = categoryDescriptions[slug][lang];
      }
    });

    // 5. Article Titles with data-art-slug
    document.querySelectorAll('[data-art-slug]').forEach(el => {
      const slug = el.getAttribute('data-art-slug');
      const origText = el.getAttribute('data-orig-text') || el.textContent.trim();
      const hasStatic = articlesDictionary[slug] && articlesDictionary[slug][lang];
      const staticTa = articlesDictionary[slug] && articlesDictionary[slug].ta && articlesDictionary[slug].ta.title.trim();

      if (lang === 'ta') {
        el.textContent = origText;
      } else if (hasStatic && (!staticTa || staticTa === origText)) {
        el.textContent = articlesDictionary[slug][lang].title;
      }
    });

    // 6. Article Excerpts with data-excerpt-slug
    document.querySelectorAll('[data-excerpt-slug]').forEach(el => {
      const slug = el.getAttribute('data-excerpt-slug');
      const origText = el.getAttribute('data-orig-text') || el.textContent.trim();
      const hasStatic = articlesDictionary[slug] && articlesDictionary[slug][lang];
      const staticTa = articlesDictionary[slug] && articlesDictionary[slug].ta && articlesDictionary[slug].ta.desc.trim();

      if (lang === 'ta') {
        el.textContent = origText;
      } else if (hasStatic && (!staticTa || staticTa === origText)) {
        el.textContent = articlesDictionary[slug][lang].desc;
      }
    });

    // 7. Reading Time Localization
    document.querySelectorAll('[data-read-min]').forEach(el => {
      const mins = el.getAttribute('data-read-min') || '1';
      if (lang === 'en') {
        el.textContent = `${mins} min read`;
      } else if (lang === 'ml') {
        el.textContent = `${mins} മിനിറ്റ് വായന`;
      } else {
        el.textContent = `${mins} நிமிட வாசிப்பு`;
      }
    });

    // 8. Published Article Date Localization
    document.querySelectorAll('[data-article-date]').forEach(el => {
      const iso = el.getAttribute('data-article-date');
      if (iso) {
        el.textContent = formatArticleDate(iso, lang);
      }
    });

    // 9. Top bar date
    updateDateDisplay(lang);

    // 10. Dynamic translation for custom / CMS-created articles
    dynamicTranslateElements(lang);

    // 11. Background Google Translate fallback
    if (triggerFullTranslate) {
      triggerGoogleTranslate(lang);
    }
  };

  // Helper to ensure original server-rendered text is preserved before any client mutation
  const preserveOriginalContent = () => {
    document.querySelectorAll('[data-art-slug]').forEach(el => {
      if (!el.hasAttribute('data-orig-text')) {
        el.setAttribute('data-orig-text', el.textContent.trim());
      }
    });

    document.querySelectorAll('[data-excerpt-slug]').forEach(el => {
      if (!el.hasAttribute('data-orig-text')) {
        el.setAttribute('data-orig-text', el.textContent.trim());
      }
    });

    // Capture article headline/subheadline only on actual news article pages with data-art-slug
    const headlineEl = document.querySelector('article.article-container .article-headline[data-art-slug]');
    if (headlineEl && !headlineEl.hasAttribute('data-orig-text')) {
      headlineEl.setAttribute('data-orig-text', headlineEl.textContent.trim());
    }

    const excerptEl = document.querySelector('article.article-container .article-subheadline[data-excerpt-slug]');
    if (excerptEl && !excerptEl.hasAttribute('data-orig-text')) {
      excerptEl.setAttribute('data-orig-text', excerptEl.textContent.trim());
    }

    const breadcrumbEl = document.querySelector('.article-breadcrumbs .breadcrumb-current[data-art-slug]');
    if (breadcrumbEl && !breadcrumbEl.hasAttribute('data-orig-text')) {
      breadcrumbEl.setAttribute('data-orig-text', breadcrumbEl.textContent.trim());
    }

    const contentEl = headlineEl ? document.querySelector('article.article-container .article-content') : null;
    if (contentEl && !contentEl.hasAttribute('data-orig-html')) {
      contentEl.setAttribute('data-orig-html', contentEl.innerHTML);
    }
  };

  // 12. Dynamic Translation Service for CMS-created Articles
  let currentTranslationRequestId = 0;

  const dynamicTranslateElements = async (lang) => {
    const requestId = ++currentTranslationRequestId;

    // Only run on actual news article pages with data-art-slug
    const headlineEl = document.querySelector('article.article-container .article-headline[data-art-slug]');
    const excerptEl = document.querySelector('article.article-container .article-subheadline[data-excerpt-slug]');
    const contentEl = headlineEl ? document.querySelector('article.article-container .article-content') : null;
    const breadcrumbEl = document.querySelector('.article-breadcrumbs .breadcrumb-current[data-art-slug]');

    if (lang === 'ta') {
      if (headlineEl && headlineEl.hasAttribute('data-orig-text')) {
        headlineEl.textContent = headlineEl.getAttribute('data-orig-text');
      }
      if (excerptEl && excerptEl.hasAttribute('data-orig-text')) {
        excerptEl.textContent = excerptEl.getAttribute('data-orig-text');
      }
      if (breadcrumbEl && breadcrumbEl.hasAttribute('data-orig-text')) {
        breadcrumbEl.textContent = breadcrumbEl.getAttribute('data-orig-text');
      }
      if (contentEl && contentEl.hasAttribute('data-orig-html')) {
        contentEl.innerHTML = contentEl.getAttribute('data-orig-html');
      }
      return;
    }

    // Detail article translation (en / ml)
    if (headlineEl) {
      const artSlug = headlineEl.getAttribute('data-art-slug');
      if (!artSlug) return;
      const staticTitle = articlesDictionary[artSlug]?.[lang]?.title;
      const staticTaTitle = articlesDictionary[artSlug]?.ta?.title?.trim();
      const origTitle = (headlineEl.getAttribute('data-orig-text') || headlineEl.textContent).trim();

      const needsDynamic = !staticTitle || (staticTaTitle && origTitle !== staticTaTitle);

      if (needsDynamic) {
        const origExcerpt = excerptEl ? (excerptEl.getAttribute('data-orig-text') || excerptEl.textContent).trim() : '';
        const origContent = contentEl ? (contentEl.getAttribute('data-orig-html') || contentEl.innerHTML) : '';

        const cacheKeyPrefix = `kkk_art_${artSlug || 'art'}_${lang}_`;
        let cachedTitle = null;
        let cachedExcerpt = null;
        let cachedContent = null;
        try {
          cachedTitle = sessionStorage.getItem(cacheKeyPrefix + 'title');
          cachedExcerpt = sessionStorage.getItem(cacheKeyPrefix + 'excerpt');
          cachedContent = sessionStorage.getItem(cacheKeyPrefix + 'content');
        } catch (e) {}

        if (cachedTitle && (cachedExcerpt || !origExcerpt) && (cachedContent || !origContent)) {
          if (headlineEl && cachedTitle) headlineEl.textContent = cachedTitle;
          if (breadcrumbEl && cachedTitle) breadcrumbEl.textContent = cachedTitle.substring(0, 40) + '...';
          if (excerptEl && cachedExcerpt) excerptEl.textContent = cachedExcerpt;
          if (contentEl && cachedContent) contentEl.innerHTML = cachedContent;
        } else {
          try {
            const textsToTranslate = [];
            if (origTitle) textsToTranslate.push(origTitle);
            if (origExcerpt) textsToTranslate.push(origExcerpt);
            if (origContent) textsToTranslate.push(origContent);

            if (textsToTranslate.length > 0) {
              const res = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  texts: textsToTranslate,
                  targetLang: lang,
                  sourceLang: 'ta'
                })
              });

              if (res.ok && requestId === currentTranslationRequestId) {
                const data = await res.json();
                if (data && data.success && Array.isArray(data.translations)) {
                  let idx = 0;
                  if (origTitle && data.translations[idx]) {
                    const transTitle = data.translations[idx++];
                    headlineEl.textContent = transTitle;
                    if (breadcrumbEl) breadcrumbEl.textContent = transTitle.substring(0, 40) + '...';
                    try { sessionStorage.setItem(cacheKeyPrefix + 'title', transTitle); } catch (e) {}
                  }
                  if (origExcerpt && data.translations[idx]) {
                    const transExcerpt = data.translations[idx++];
                    if (excerptEl) excerptEl.textContent = transExcerpt;
                    try { sessionStorage.setItem(cacheKeyPrefix + 'excerpt', transExcerpt); } catch (e) {}
                  }
                  if (origContent && data.translations[idx]) {
                    const transContent = data.translations[idx++];
                    if (contentEl) contentEl.innerHTML = transContent;
                    try { sessionStorage.setItem(cacheKeyPrefix + 'content', transContent); } catch (e) {}
                  }
                }
              }
            }
          } catch (err) {
            console.warn('[KKKMedia] Article dynamic translation error:', err.message);
          }
        }
      }
    }

    // Cards translation on listing pages
    const customCards = [];
    document.querySelectorAll('[data-art-slug]').forEach(el => {
      if (el.classList.contains('article-headline') || el.classList.contains('breadcrumb-current')) return;

      const slug = el.getAttribute('data-art-slug');
      const staticTitle = articlesDictionary[slug]?.[lang]?.title;
      const staticTaTitle = articlesDictionary[slug]?.ta?.title?.trim();
      const origText = (el.getAttribute('data-orig-text') || el.textContent).trim();

      const needsDynamic = !staticTitle || (staticTaTitle && origText !== staticTaTitle);
      if (needsDynamic) {
        customCards.push({ el, origText, slug });
      }
    });

    if (customCards.length > 0) {
      const textsToFetch = [];
      const itemsToFetch = [];

      customCards.forEach(item => {
        const cardCacheKey = `kkk_card_${item.slug || 'slug'}_${lang}`;
        let cached = null;
        try { cached = sessionStorage.getItem(cardCacheKey); } catch (e) {}

        if (cached) {
          item.el.textContent = cached;
        } else {
          textsToFetch.push(item.origText);
          itemsToFetch.push({ ...item, cardCacheKey });
        }
      });

      if (textsToFetch.length > 0) {
        try {
          const res = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              texts: textsToFetch,
              targetLang: lang,
              sourceLang: 'ta'
            })
          });

          if (res.ok && requestId === currentTranslationRequestId) {
            const data = await res.json();
            if (data && data.success && Array.isArray(data.translations)) {
              data.translations.forEach((trans, idx) => {
                const item = itemsToFetch[idx];
                if (item && trans) {
                  item.el.textContent = trans;
                  try { sessionStorage.setItem(item.cardCacheKey, trans); } catch (e) {}
                }
              });
            }
          }
        } catch (e) {}
      }
    }
  };

  const langSwitchBtn = document.getElementById('langSwitchBtn');
  const langDropdownMenu = document.getElementById('langDropdownMenu');
  const headerLangBtn = document.getElementById('headerLangBtn');
  const headerLangDropdownMenu = document.getElementById('headerLangDropdownMenu');

  if (langSwitchBtn && langDropdownMenu) {
    langSwitchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (headerLangDropdownMenu) headerLangDropdownMenu.classList.remove('show');
      langDropdownMenu.classList.toggle('show');
    });
  }

  if (headerLangBtn && headerLangDropdownMenu) {
    headerLangBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (langDropdownMenu) langDropdownMenu.classList.remove('show');
      headerLangDropdownMenu.classList.toggle('show');
    });
  }

  document.addEventListener('click', () => {
    if (langDropdownMenu) langDropdownMenu.classList.remove('show');
    if (headerLangDropdownMenu) headerLangDropdownMenu.classList.remove('show');
  });

  document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang) {
        applyLanguage(targetLang);
        if (langDropdownMenu) langDropdownMenu.classList.remove('show');
        if (headerLangDropdownMenu) headerLangDropdownMenu.classList.remove('show');
      }
    });
  });

  document.querySelectorAll('.mobile-lang-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang) applyLanguage(targetLang);
    });
  });

  // Preserve original server-rendered Tamil text before applying initial language
  preserveOriginalContent();

  // Initialize language on load
  const initialLang = localStorage.getItem('kkk_lang') || 'ta';
  applyLanguage(initialLang, initialLang !== 'ta');
});

