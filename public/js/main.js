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
      page_not_found_title: "பக்கம் கிடைக்கவில்லை (Page Not Found)",
      page_not_found_desc: "நீங்கள் தேடும் செய்தி அல்லது பக்கம் நீக்கப்பட்டிருக்கலாம் அல்லது முகவரி மாற்றப்பட்டிருக்கலாம். கீழே தேடவும் அல்லது முகப்புக்குச் செல்லவும்.",
      back_home: "முகப்புக்குச் செல்",
      search_articles: "செய்திகள் தேடுக",
      search_404_placeholder: "செய்தியின் தலைப்பு அல்லது வார்த்தைகளைத் தேடுங்கள்...",
      go_home: "முகப்புக்குச் செல்",
      published_label: "வெளியீடு:",
      views_label: "பார்வைகள்",
      contact_page_title: "தொடர்புக்கு (Contact KKK Media)",
      contact_hq_title: "தலைமை அலுவலகம்",
      contact_address_label: "முகவரி:",
      contact_default_address: "KKK Media Tower, அண்ணா சாலை, சென்னை, தமிழ்நாடு 600002",
      contact_editor_email_label: "செய்தி ஆசிரியர் மின்னஞ்சல்:",
      contact_phone_label: "தொலைபேசி / தொலைநகல்:",
      contact_newsdesk_label: "செய்திப் பகிர்வுகள் & நிருபர்கள் தொடர்பு:",
      contact_form_title: "கருத்து / செய்தி அனுப்ப",
      contact_name_label: "உங்கள் பெயர்",
      contact_email_label: "மின்னஞ்சல் முகவரி",
      contact_msg_label: "செய்தி / கருத்து விவரம்",
      contact_send_btn: "செய்தியை அனுப்பு (Send Message)",
      contact_success_msg: "✓ உங்கள் செய்தி வெற்றிகரமாக பெறப்பட்டது. ஆசிரியர் குழு விரைவில் உங்களைத் தொடர்பு கொள்ளும். நன்றி!",
      about_page_title: "எங்களைப் பற்றி (About KKK Media)",
      about_mission_title: "எங்கள் நோக்கம் (Our Mission)",
      about_coverage_title: "நாங்கள் உள்ளடக்கும் துறைகள்",
      about_ethics_title: "பத்திரிகை தர்மம் & உண்மை சரிபார்ப்பு (Fact-Checking)",
      about_editors_title: "தலைமை ஆசிரியர் குழு",
      privacy_page_title: "தனியுரிமைக் கொள்கை (Privacy Policy)",
      terms_page_title: "பயன்பாட்டு விதிமுறைகள் (Terms & Conditions)",
      disclaimer_page_title: "பொறுப்புத் துறப்பு & ஆசிரியர் நெறிமுறைகள் (Disclaimer & Editorial Standards)",
      footer_site_desc: "KKK Media தமிழ்நாடு அரசியல், தவெக, சினிமா, விளையாட்டு, தொழில்நுட்பம் மற்றும் உலக நடப்புகளை உடனுக்குடன் நடுநிலையுடன் வழங்கும் முன்னணி செய்தி தளம்.",
      footer_email_label: "மின்னஞ்சல்:",
      footer_phone_label: "தொலைபேசி:",
      footer_rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை (All Rights Reserved).",
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
      page_not_found_title: "Page Not Found",
      page_not_found_desc: "The page or news story you are looking for may have been removed, renamed, or is temporarily unavailable. Search below or return to home.",
      back_home: "Back to Home",
      search_articles: "Search News",
      search_404_placeholder: "Search headline or keywords...",
      go_home: "Go to Home",
      published_label: "Published:",
      views_label: "views",
      contact_page_title: "Contact Us (KKK Media)",
      contact_hq_title: "Headquarters",
      contact_address_label: "Address:",
      contact_default_address: "KKK Media Tower, Anna Salai, Chennai, Tamil Nadu 600002",
      contact_editor_email_label: "Chief Editor Email:",
      contact_phone_label: "Phone / Fax:",
      contact_newsdesk_label: "News Submissions & Reporter Desk:",
      contact_form_title: "Send Message / Feedback",
      contact_name_label: "Your Name",
      contact_email_label: "Email Address",
      contact_msg_label: "Message / Feedback Details",
      contact_send_btn: "Send Message",
      contact_success_msg: "✓ Your message has been received successfully. Our editorial team will contact you soon. Thank you!",
      about_page_title: "About Us (KKK Media)",
      about_mission_title: "Our Mission",
      about_coverage_title: "Topics We Cover",
      about_ethics_title: "Journalistic Ethics & Fact-Checking",
      about_editors_title: "Editorial Board",
      privacy_page_title: "Privacy Policy",
      terms_page_title: "Terms & Conditions",
      disclaimer_page_title: "Disclaimer & Editorial Standards",
      footer_site_desc: "KKK Media is Tamil Nadu's trusted digital media portal delivering unbiased and breaking updates on politics, TVK, cinema, sports, technology and world affairs.",
      footer_email_label: "Email:",
      footer_phone_label: "Phone:",
      footer_rights: "All Rights Reserved.",
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
      page_not_found_title: "പേജ് കണ്ടെത്താനായില്ല",
      page_not_found_desc: "നിങ്ങൾ തിരയുന്ന വാർത്തയോ പേജോ നീക്കം ചെയ്തിരിക്കാം അല്ലെങ്കിൽ വിലാസം മാറിയിരിക്കാം. താഴെ തിരയുകയോ ഹോമിലേക്ക് മടങ്ങുകയോ ചെയ്യുക.",
      back_home: "ഹോമിലേക്ക് പോകുക",
      search_articles: "വാർത്തകൾ തിരയുക",
      search_404_placeholder: "വാർത്തയുടെ തലക്കെട്ട് അല്ലെങ്കിൽ വാക്കുകൾ തിരയുക...",
      go_home: "ഹോമിലേക്ക് പോകുക",
      published_label: "പ്രസിദ്ധീകരിച്ചത്:",
      views_label: "കാഴ്ചകൾ",
      contact_page_title: "ബന്ധപ്പെടുക (KKK മീഡിയ)",
      contact_hq_title: "മുഖ്യ ഓഫീസ്",
      contact_address_label: "മേൽവിലാസം:",
      contact_default_address: "കെ.കെ.കെ മീഡിയ ടവർ, അണ്ണാ ശാലൈ, ചെന്നൈ, തമിഴ്നാട് 600002",
      contact_editor_email_label: "ചീഫ് എഡിറ്റർ ഇമെയിൽ:",
      contact_phone_label: "ഫോൺ / ഫാക്സ്:",
      contact_newsdesk_label: "വാർത്തകൾ അയക്കാനും റിപ്പോർട്ടർമാർക്കും:",
      contact_form_title: "അഭിപ്രായം / സന്ദേശം അയക്കുക",
      contact_name_label: "നിങ്ങളുടെ പേര്",
      contact_email_label: "ഇമെയിൽ വിലാസം",
      contact_msg_label: "സന്ദേശം / അഭിപ്രായ വിവരണം",
      contact_send_btn: "സന്ദേശം അയക്കുക (Send Message)",
      contact_success_msg: "✓ നിങ്ങളുടെ സന്ദേശം വിജയകരമായി ലഭിച്ചു. എഡിറ്റോറിയൽ ടീം ഉടൻ നിങ്ങളുമായി ബന്ധപ്പെടും. നന്ദി!",
      about_page_title: "ഞങ്ങളെ കുറിച്ച് (KKK മീഡിയ)",
      about_mission_title: "ഞങ്ങളുടെ ലക്ഷ്യം",
      about_coverage_title: "ഞങ്ങൾ ഉൾക്കൊള്ളുന്ന മേഖലകൾ",
      about_ethics_title: "മാധ്യമ ധർമ്മവും വസ്തുതാ പരിശോധനയും (Fact-Checking)",
      about_editors_title: "എഡിറ്റോറിയൽ ബോർഡ്",
      privacy_page_title: "സ്വകാര്യതാ നയം (Privacy Policy)",
      terms_page_title: "നിബന്ധനകളും വ്യവസ്ഥകളും (Terms & Conditions)",
      disclaimer_page_title: "നിരാകരണവും എഡിറ്റോറിയൽ മാനദണ്ഡങ്ങളും (Disclaimer)",
      footer_site_desc: "തമിഴ്‌നാട് രാഷ്ട്രീയം, ടിവികെ, സിനിമ, കായികരംഗം, സാങ്കേതികവിദ്യ, ലോക വാർത്തകൾ എന്നിവ നിഷ്പക്ഷമായും തത്സമയവും നൽകുന്ന തമിഴിലെ മുൻനിര ഡിജിറ്റൽ വാർത്താ പോർട്ടലാണ് KKK മീഡിയ.",
      footer_email_label: "ഇമെയിൽ:",
      footer_phone_label: "ഫോൺ:",
      footer_rights: "എല്ലാ അവകാശങ്ങളും നിക്ഷിപ്തം (All Rights Reserved).",
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
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 1b. Placeholder elements with data-i18n-ph
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key]) {
        el.placeholder = dict[key];
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
    // 1. Article title tags (card links and headings)
    document.querySelectorAll('[data-art-slug]').forEach(el => {
      if (!el.hasAttribute('data-orig-text')) {
        el.setAttribute('data-orig-text', el.textContent.trim());
      }
    });

    // 2. Article excerpts
    document.querySelectorAll('[data-excerpt-slug]').forEach(el => {
      if (!el.hasAttribute('data-orig-text')) {
        el.setAttribute('data-orig-text', el.textContent.trim());
      }
    });

    // 3. Article container elements
    const headlineEl = document.querySelector('article.article-container .article-headline');
    if (headlineEl && !headlineEl.hasAttribute('data-orig-text')) {
      headlineEl.setAttribute('data-orig-text', headlineEl.textContent.trim());
    }

    const excerptEl = document.querySelector('article.article-container .article-subheadline');
    if (excerptEl && !excerptEl.hasAttribute('data-orig-text')) {
      excerptEl.setAttribute('data-orig-text', excerptEl.textContent.trim());
    }

    const breadcrumbEl = document.querySelector('.article-breadcrumbs .breadcrumb-current');
    if (breadcrumbEl && !breadcrumbEl.hasAttribute('data-orig-text')) {
      breadcrumbEl.setAttribute('data-orig-text', breadcrumbEl.textContent.trim());
    }

    // 4. All content blocks in article-content (paragraphs, headings, lists, quotes)
    document.querySelectorAll('article.article-container .article-content').forEach(contentEl => {
      contentEl.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote, figcaption').forEach(block => {
        if (!block.hasAttribute('data-orig-text')) {
          block.setAttribute('data-orig-text', block.innerText.trim());
        }
      });
    });

    // 5. Static page blocks (About, Contact, Privacy, Terms, Disclaimer)
    document.querySelectorAll('.page-static-content').forEach(staticEl => {
      staticEl.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, blockquote').forEach(block => {
        if (!block.hasAttribute('data-orig-text')) {
          block.setAttribute('data-orig-text', block.innerText.trim());
        }
      });
    });

    const footerDescEl = document.querySelector('.footer-desc');
    if (footerDescEl && !footerDescEl.hasAttribute('data-orig-text')) {
      footerDescEl.setAttribute('data-orig-text', footerDescEl.textContent.trim());
    }
  };

  // 12. Full-Site Dynamic Translation Engine for Articles, Static Pages, & Cards
  let currentTranslationRequestId = 0;

  const hashText = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return 'h' + Math.abs(hash);
  };

  const dynamicTranslateElements = async (lang) => {
    const requestId = ++currentTranslationRequestId;

    // --- A. IF TAMIL ('ta'), REVERT EVERYTHING TO ORIGINAL TAMIL TEXT ---
    if (lang === 'ta') {
      const headlineEl = document.querySelector('article.article-container .article-headline');
      if (headlineEl && headlineEl.hasAttribute('data-orig-text')) {
        headlineEl.textContent = headlineEl.getAttribute('data-orig-text');
      }
      const excerptEl = document.querySelector('article.article-container .article-subheadline');
      if (excerptEl && excerptEl.hasAttribute('data-orig-text')) {
        excerptEl.textContent = excerptEl.getAttribute('data-orig-text');
      }
      const breadcrumbEl = document.querySelector('.article-breadcrumbs .breadcrumb-current');
      if (breadcrumbEl && breadcrumbEl.hasAttribute('data-orig-text')) {
        breadcrumbEl.textContent = breadcrumbEl.getAttribute('data-orig-text');
      }

      // Restore article body content blocks
      document.querySelectorAll('article.article-container .article-content p, article.article-container .article-content h2, article.article-container .article-content h3, article.article-container .article-content h4, article.article-container .article-content li, article.article-container .article-content blockquote, article.article-container .article-content figcaption').forEach(block => {
        if (block.hasAttribute('data-orig-text')) {
          block.textContent = block.getAttribute('data-orig-text');
        }
      });

      // Restore static pages
      document.querySelectorAll('.page-static-content p, .page-static-content h2, .page-static-content h3, .page-static-content h4, .page-static-content li, .page-static-content blockquote').forEach(block => {
        if (block.hasAttribute('data-orig-text')) {
          block.textContent = block.getAttribute('data-orig-text');
        }
      });

      // Restore listing cards
      document.querySelectorAll('[data-art-slug]').forEach(el => {
        if (el.hasAttribute('data-orig-text')) {
          el.textContent = el.getAttribute('data-orig-text');
        }
      });
      document.querySelectorAll('[data-excerpt-slug]').forEach(el => {
        if (el.hasAttribute('data-orig-text')) {
          el.textContent = el.getAttribute('data-orig-text');
        }
      });

      const footerDescEl = document.querySelector('.footer-desc');
      if (footerDescEl && footerDescEl.hasAttribute('data-orig-text')) {
        footerDescEl.textContent = footerDescEl.getAttribute('data-orig-text');
      }
      return;
    }

    // --- B. IF ENGLISH ('en') OR MALAYALAM ('ml') ---
    const pendingItems = [];

    // 1. Article Headline & Excerpt
    const headlineEl = document.querySelector('article.article-container .article-headline');
    const excerptEl = document.querySelector('article.article-container .article-subheadline');
    const breadcrumbEl = document.querySelector('.article-breadcrumbs .breadcrumb-current');
    const artSlug = headlineEl ? headlineEl.getAttribute('data-art-slug') : null;

    if (headlineEl) {
      const origHeadline = headlineEl.getAttribute('data-orig-text') || headlineEl.textContent.trim();
      const staticTitle = artSlug && articlesDictionary[artSlug]?.[lang]?.title;
      if (staticTitle) {
        headlineEl.textContent = staticTitle;
        if (breadcrumbEl) breadcrumbEl.textContent = staticTitle.substring(0, 40) + '...';
      } else if (origHeadline) {
        const cacheKey = `kkk_tr_${lang}_${hashText(origHeadline)}`;
        let cached = null;
        try { cached = sessionStorage.getItem(cacheKey); } catch (e) {}
        if (cached) {
          headlineEl.textContent = cached;
          if (breadcrumbEl) breadcrumbEl.textContent = cached.substring(0, 40) + '...';
        } else {
          pendingItems.push({
            text: origHeadline,
            cacheKey,
            apply: (translated) => {
              headlineEl.textContent = translated;
              if (breadcrumbEl) breadcrumbEl.textContent = translated.substring(0, 40) + '...';
            }
          });
        }
      }
    }

    if (excerptEl) {
      const origExcerpt = excerptEl.getAttribute('data-orig-text') || excerptEl.textContent.trim();
      const staticExcerpt = artSlug && articlesDictionary[artSlug]?.[lang]?.desc;
      if (staticExcerpt) {
        excerptEl.textContent = staticExcerpt;
      } else if (origExcerpt) {
        const cacheKey = `kkk_tr_${lang}_${hashText(origExcerpt)}`;
        let cached = null;
        try { cached = sessionStorage.getItem(cacheKey); } catch (e) {}
        if (cached) {
          excerptEl.textContent = cached;
        } else {
          pendingItems.push({
            text: origExcerpt,
            cacheKey,
            apply: (translated) => {
              excerptEl.textContent = translated;
            }
          });
        }
      }
    }

    // 2. Full Article Body Content Elements (paragraphs, headings, quotes, lists)
    document.querySelectorAll('article.article-container .article-content p, article.article-container .article-content h2, article.article-container .article-content h3, article.article-container .article-content h4, article.article-container .article-content li, article.article-container .article-content blockquote, article.article-container .article-content figcaption').forEach(block => {
      if (block.querySelector('img, iframe, video, audio')) return;
      const text = (block.getAttribute('data-orig-text') || block.innerText).trim();
      if (!text || text.length <= 1) return;

      const cacheKey = `kkk_tr_${lang}_${hashText(text)}`;
      let cached = null;
      try { cached = sessionStorage.getItem(cacheKey); } catch (e) {}

      if (cached) {
        block.textContent = cached;
      } else {
        pendingItems.push({
          text,
          cacheKey,
          apply: (translated) => {
            block.textContent = translated;
          }
        });
      }
    });

    // 3. Static Pages Content Elements (About Us, Contact, Terms, Privacy, Disclaimer)
    document.querySelectorAll('.page-static-content p, .page-static-content h2, .page-static-content h3, .page-static-content h4, .page-static-content li, .page-static-content blockquote').forEach(block => {
      if (block.querySelector('img, iframe, video, audio')) return;
      const text = (block.getAttribute('data-orig-text') || block.innerText).trim();
      if (!text || text.length <= 1) return;

      const cacheKey = `kkk_tr_${lang}_${hashText(text)}`;
      let cached = null;
      try { cached = sessionStorage.getItem(cacheKey); } catch (e) {}

      if (cached) {
        block.textContent = cached;
      } else {
        pendingItems.push({
          text,
          cacheKey,
          apply: (translated) => {
            block.textContent = translated;
          }
        });
      }
    });

    // 4. Listing Article Cards (Titles and Excerpts on Home, Category, and Search)
    document.querySelectorAll('[data-art-slug]').forEach(el => {
      if (el.classList.contains('article-headline') || el.classList.contains('breadcrumb-current')) return;
      const slug = el.getAttribute('data-art-slug');
      const staticTitle = slug && articlesDictionary[slug]?.[lang]?.title;
      if (staticTitle) {
        el.textContent = staticTitle;
      } else {
        const text = (el.getAttribute('data-orig-text') || el.textContent).trim();
        if (text && text.length > 2) {
          const cacheKey = `kkk_tr_${lang}_${hashText(text)}`;
          let cached = null;
          try { cached = sessionStorage.getItem(cacheKey); } catch (e) {}
          if (cached) {
            el.textContent = cached;
          } else {
            pendingItems.push({
              text,
              cacheKey,
              apply: (translated) => { el.textContent = translated; }
            });
          }
        }
      }
    });

    document.querySelectorAll('[data-excerpt-slug]').forEach(el => {
      if (el.classList.contains('article-subheadline')) return;
      const slug = el.getAttribute('data-excerpt-slug');
      const staticExcerpt = slug && articlesDictionary[slug]?.[lang]?.desc;
      if (staticExcerpt) {
        el.textContent = staticExcerpt;
      } else {
        const text = (el.getAttribute('data-orig-text') || el.textContent).trim();
        if (text && text.length > 2) {
          const cacheKey = `kkk_tr_${lang}_${hashText(text)}`;
          let cached = null;
          try { cached = sessionStorage.getItem(cacheKey); } catch (e) {}
          if (cached) {
            el.textContent = cached;
          } else {
            pendingItems.push({
              text,
              cacheKey,
              apply: (translated) => { el.textContent = translated; }
            });
          }
        }
      }
    });

    // 5. Batch Translate all pending items in chunks of 25 (fast, parallel, and resilient)
    if (pendingItems.length > 0) {
      const CHUNK_SIZE = 25;
      for (let i = 0; i < pendingItems.length; i += CHUNK_SIZE) {
        const chunk = pendingItems.slice(i, i + CHUNK_SIZE);
        try {
          const res = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              texts: chunk.map(item => item.text),
              targetLang: lang,
              sourceLang: 'ta'
            })
          });

          if (res.ok && requestId === currentTranslationRequestId) {
            const data = await res.json();
            if (data && data.success && Array.isArray(data.translations)) {
              data.translations.forEach((trans, idx) => {
                const item = chunk[idx];
                if (item && trans) {
                  item.apply(trans);
                  try { sessionStorage.setItem(item.cacheKey, trans); } catch (e) {}
                }
              });
            }
          }
        } catch (err) {
          console.warn('[KKKMedia] Dynamic translation error for chunk:', err.message);
        }
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

