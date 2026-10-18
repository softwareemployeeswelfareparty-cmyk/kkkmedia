const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('[Seed] Starting database seeding for KKK Media...');

  // 1. Create Admin & Editor Users
  const passwordHash = await bcrypt.hash('Admin@KKKMedia2026!', 10);
  const editorHash = await bcrypt.hash('Editor@KKKMedia2026!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@kkkmedia.com' },
    update: {},
    create: {
      email: 'admin@kkkmedia.com',
      passwordHash: passwordHash,
      name: 'தலைமை ஆசிரியர் (KKK Media)',
      role: 'ADMIN',
      avatar: '/images/avatar-admin.jpg',
      bio: 'மூத்த பத்திரிகையாளர் மற்றும் KKK Media செய்தி ஆசிரியர் குழு தலைவர்.',
    },
  });

  const editor = await prisma.user.upsert({
    where: { email: 'editor@kkkmedia.com' },
    update: {},
    create: {
      email: 'editor@kkkmedia.com',
      passwordHash: editorHash,
      name: 'அன்புச்செல்வன் கதிர்வேல்',
      role: 'EDITOR',
      avatar: '/images/avatar-editor.jpg',
      bio: 'அரசியல் மற்றும் புலனாய்வு செய்திகள் சிறப்பு நிருபர்.',
    },
  });

  console.log(`[Seed] Admin user created: ${admin.email}`);
  console.log(`[Seed] Editor user created: ${editor.email}`);

  // 2. Create Categories
  const categoriesData = [
    {
      nameTamil: 'தமிழ்நாடு அரசியல்',
      nameEnglish: 'Tamil Nadu Politics',
      slug: 'tamil-nadu-politics',
      description: 'தமிழ்நாடு அரசியல் களம், சட்டப்பேரவை விவாதங்கள், அரசின் புதிய திட்டங்கள் மற்றும் அரசியல் நகர்வுகள் குறித்த முழுமையான தகவல்கள்.',
      displayOrder: 1,
      isActive: true,
    },
    {
      nameTamil: 'தவெக செய்திகள்',
      nameEnglish: 'TVK News',
      slug: 'tvk-news',
      description: 'தமிழக வெற்றிக் கழகம் (TVK), தலைவர் விஜய் அவர்களின் மாநாடுகள், கொள்கை முடிவுகள் மற்றும் கட்சி நிர்வாக நிகழ்வுகள்.',
      displayOrder: 2,
      isActive: true,
    },
    {
      nameTamil: 'திமுக & அதிமுக',
      nameEnglish: 'DMK and AIADMK News',
      slug: 'dmk-aiadmk-news',
      description: 'திமுக மற்றும் அதிமுக கட்சிகளின் தேர்தல் வியூகங்கள், தலைவர்களின் அறிக்கைகள் மற்றும் கள அரசியல் ஆய்வுகள்.',
      displayOrder: 3,
      isActive: true,
    },
    {
      nameTamil: 'தேசிய செய்திகள்',
      nameEnglish: 'National News',
      slug: 'national-news',
      description: 'இந்திய அளவிலான முக்கிய அரசியல், பொருளாதாரம், நாடாளுமன்ற நடவடிக்கைகள் மற்றும் உச்சநீதிமன்ற தீர்ப்புகள்.',
      displayOrder: 4,
      isActive: true,
    },
    {
      nameTamil: 'சினிமா & பிரபலங்கள்',
      nameEnglish: 'Cinema and Celebrity News',
      slug: 'cinema-celebrity',
      description: 'கோலிவுட் திரை உலக செய்திகள், திரைப்பட விமர்சனங்கள், பிரபலங்களின் பேட்டிகள் மற்றும் டிரெய்லர் அப்டேட்கள்.',
      displayOrder: 5,
      isActive: true,
    },
    {
      nameTamil: 'கிரிக்கெட் & விளையாட்டு',
      nameEnglish: 'Cricket and Sports',
      slug: 'cricket-sports',
      description: 'ஐபிஎல், சர்வதேச கிரிக்கெட் போட்டிகள், செஸ், கால்பந்து மற்றும் இந்திய விளையாட்டு வீரர்களின் சாதனைகள்.',
      displayOrder: 6,
      isActive: true,
    },
    {
      nameTamil: 'தொழில்நுட்பம் & ஏஐ',
      nameEnglish: 'Technology and AI',
      slug: 'technology-ai',
      description: 'செயற்கை நுண்ணறிவு (AI), புதிய ஸ்மார்ட்போன்கள், ஆப்ஸ்கள் மற்றும் எதிர்கால டிஜிட்டல் தொழில்நுட்ப மாற்றங்கள்.',
      displayOrder: 7,
      isActive: true,
    },
    {
      nameTamil: 'ஆட்டோமொபைல்',
      nameEnglish: 'Automobile News',
      slug: 'automobile-news',
      description: 'இந்திய சந்தையில் வெளியாகும் புதிய கார்கள், மின்சார வாகனங்கள் (EV), பைக்குகள் மற்றும் ஓட்டுநர் சோதனைகள்.',
      displayOrder: 8,
      isActive: true,
    },
    {
      nameTamil: 'வைரல் & ட்ரெண்டிங்',
      nameEnglish: 'Trending News',
      slug: 'trending-news',
      description: 'இணையத்தில் வைரலாகும் சுவாரஸ்ய தகவல்கள், சமூக ஊடக விவாதங்கள் மற்றும் மக்களின் பேசுபொருட்கள்.',
      displayOrder: 9,
      isActive: true,
    },
  ];

  const categoryMap = {};
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap[cat.slug] = createdCat;
  }
  console.log(`[Seed] ${Object.keys(categoryMap).length} categories created.`);

  // 3. Create Tags
  const tagsData = [
    { name: 'விஜய்', slug: 'vijay' },
    { name: 'TVK', slug: 'tvk' },
    { name: 'மு.க.ஸ்டாலின்', slug: 'mk-stalin' },
    { name: 'எடப்பாடி பழனிசாமி', slug: 'edappadi-palaniswami' },
    { name: 'தேர்தல் 2026', slug: 'election-2026' },
    { name: 'கோலிவுட்', slug: 'kollywood' },
    { name: 'ஐபிஎல்', slug: 'ipl' },
    { name: 'சிஎஸ்கே', slug: 'csk' },
    { name: 'செயற்கை நுண்ணறிவு', slug: 'artificial-intelligence' },
    { name: 'மின்சார வாகனம்', slug: 'electric-vehicles' },
    { name: 'சென்னை', slug: 'chennai' },
    { name: 'தமிழ்நாடு', slug: 'tamil-nadu' },
  ];

  const tagMap = {};
  for (const tag of tagsData) {
    const createdTag = await prisma.tag.upsert({
      where: { slug: tag.slug },
      update: tag,
      create: tag,
    });
    tagMap[tag.slug] = createdTag;
  }
  console.log(`[Seed] ${Object.keys(tagMap).length} tags created.`);

  // 4. Create Rich Articles with Real Tamil Content
  const articlesData = [
    {
      title: 'விஜய் தலைமையில் தவெகவின் அடுத்தகட்ட அரசியல் வியூகம்: மாவட்ட வாரியாக தீவிர ஆலோசனை!',
      slug: 'tvk-vijay-next-political-strategy-district-level-meetings-2026',
      shortDescription: 'தமிழக வெற்றிக் கழக தலைவர் விஜய் தலைமையில் மாவட்ட செயலாளர்களுடனான முக்கிய ஆலோசனைக் கூட்டம் பனையூர் தலைமை அலுவலகத்தில் விறுவிறுப்பாக நடைபெற்றது.',
      fullContent: `
        <p class="lead">தமிழக வெற்றிக் கழகத்தின் (TVK) தலைவர் விஜய் அவர்களின் தலைமையில் பனையூரில் உள்ள கட்சித் தலைமை அலுவலகத்தில் மாவட்ட நிர்வாகிகள் மற்றும் இளைஞரணி ஒருங்கிணைப்பாளர்களுடனான உயர்மட்ட ஆலோசனைக் கூட்டம் இன்று நடைபெற்றது.</p>
        
        <h2>2026 சட்டமன்ற தேர்தலுக்கான வியூகங்கள்</h2>
        <p>கூட்டத்தில் பேசிய தலைவர் விஜய், தமிழகத்தின் பட்டிதொட்டியெங்கும் கட்சியின் கொள்கைகளை கொண்டு சேர்க்க வேண்டும் எனவும், பூத் கமிட்டி அமைக்கும் பணிகளை அடுத்த இரண்டு மாதங்களுக்குள் முழுமையாக முடிக்க வேண்டும் எனவும் உத்தரவிட்டார்.</p>
        
        <blockquote>
          "மக்களின் தேவைகளையும், தமிழகத்தின் அடிப்படை வாழ்வாதாரப் பிரச்சினைகளையும் முன்னிறுத்தி நாம் எடுக்கும் முன்னெடுப்புகள் ஒவ்வொன்றும் மக்கள் நலன் சார்ந்ததாகவே இருக்க வேண்டும்." — தவெக தலைவர் விஜய்.
        </blockquote>

        <p>கூட்டத்தில் எடுக்கப்பட்ட முக்கிய முடிவுகள்:</p>
        <ul>
          <li>மாநிலம் தழுவிய இளைஞர் விழிப்புணர்வு பாசறை கூட்டங்கள் தொடங்குதல்.</li>
          <li>சமூக வலைதளங்களில் தவறான பரப்புரைகளை முறியடிக்க அதிகாரப்பூர்வ தகவல் தொடர்பு மையம் விரிவாக்கம்.</li>
          <li>மாவட்ட வாரியாக மக்கள் குறைதீர்க்கும் சிறப்பு முகாம்கள் நடத்துதல்.</li>
        </ul>

        <h2>களப்பணியில் தீவிரமாகும் நிர்வாகிகள்</h2>
        <p>இதனைத் தொடர்ந்து அனைத்து மாவட்டங்களுக்கும் பொறுப்பாளர்கள் நியமிக்கப்பட்டு களப்பணிகள் முடுக்கிவிடப்பட்டுள்ளன. வரவிருக்கும் நாட்களில் தலைவர் விஜய் தமிழகம் முழுவதும் சுற்றுப்பயணம் மேற்கொள்ள உள்ளதாக கட்சி வட்டாரங்கள் தெரிவிக்கின்றன.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'தவெக தலைவர் விஜய் ஆலோசனைக் கூட்டம் - KKK Media செய்தி',
      categorySlug: 'tvk-news',
      authorId: admin.id,
      status: 'PUBLISHED',
      isFeatured: true,
      isBreaking: true,
      viewCount: 12540,
      seoTitle: 'தவெக விஜய் அடுத்தகட்ட அரசியல் வியூகம் | TVK News Tamil | KKK Media',
      seoDescription: 'தமிழக வெற்றிக் கழகத்தின் தலைவர் விஜய் தலைமையில் மாவட்ட நிர்வாகிகள் கூட்டம். 2026 சட்டமன்ற தேர்தலுக்கான அதிரடி முடிவுகள்.',
      seoKeywords: 'தவெக, விஜய், TVK News, அரசியல், தமிழ்நாடு தேர்தல் 2026, KKK Media',
      canonicalUrl: 'http://localhost:3000/news/tvk-vijay-next-political-strategy-district-level-meetings-2026',
      publishedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      tags: ['tvk', 'vijay', 'election-2026', 'tamil-nadu'],
    },
    {
      title: 'தமிழகத்தில் புதிய தொழில் முதலீடுகள்: முதலமைச்சர் மு.க.ஸ்டாலின் தலைமையில் வரலாற்று ஒப்பந்தங்கள்!',
      slug: 'tamil-nadu-new-industrial-investments-cm-mk-stalin-mou-signing',
      shortDescription: 'சென்னையில் நடைபெற்ற உலக முதலீட்டாளர்கள் வழிகாட்டுதல் மாநாட்டில் ரூ.45,000 கோடி மதிப்பிலான புதிய தொழில் முதலீட்டு புரிந்துணர்வு ஒப்பந்தங்கள் கையெழுத்தாகின.',
      fullContent: `
        <p class="lead">தமிழ்நாட்டை 1 டிரில்லியன் டாலர் பொருளாதாரமாக மாற்றும் அரசின் தொலைநோக்குப் பார்வையின் அங்கமாக, இன்று சென்னையில் ரூ.45,000 கோடி முதலீட்டில் 18 சர்வதேச நிறுவனங்களுடன் புரிந்துணர்வு ஒப்பந்தங்கள் செய்யப்பட்டன.</p>
        
        <h2>வேலைவாய்ப்பு பெருக்கம்</h2>
        <p>இந்த முதலீடுகளின் மூலம் தென் மாவட்டங்கள் உட்பட தமிழகம் முழுவதும் சுமார் 65,000-க்கும் மேற்பட்ட இளைஞர்களுக்கு நேரடியாகவும், மறைமுகமாகவும் உயர்தர வேலைவாய்ப்புகள் உருவாகும் என தொழில் துறை அமைச்சர் தங்கம் தென்னரசு தெரிவித்தார்.</p>

        <p>செமி கண்டக்டர் மற்றும் எலக்ட்ரானிக்ஸ் துறையில் தமிழ்நாடு முதன்மை மாநிலமாக உருவெடுத்து வருவதை சர்வதேச முதலீட்டாளர்கள் பாராட்டியுள்ளனர்.</p>

        <h2>முதலமைச்சர் உரை</h2>
        <p>நிகழ்ச்சியில் தலைமை உரையாற்றிய முதலமைச்சர் மு.க.ஸ்டாலின், "தமிழ்நாடு தொழில் தொடங்குவதற்கு உகந்த அமைதியான மற்றும் சிறந்த உள்கட்டமைப்பு கொண்ட மாநிலமாகத் திகழ்கிறது. வெளிநாட்டு முதலீடுகளை ஈர்ப்பதில் இந்தியாவுக்கே தமிழ்நாடு வழிகாட்டுகிறது" என்றார்.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'முதலமைச்சர் மு.க.ஸ்டாலின் தொழில் முதலீட்டு மாநாடு',
      categorySlug: 'tamil-nadu-politics',
      authorId: editor.id,
      status: 'PUBLISHED',
      isFeatured: true,
      isBreaking: false,
      viewCount: 8930,
      seoTitle: 'தமிழகத்தில் புதிய தொழில் முதலீடுகள் - முதலமைச்சர் மு.க.ஸ்டாலின் | KKK Media',
      seoDescription: 'சென்னையில் ரூ.45,000 கோடி தொழில் முதலீடுகள் கையெழுத்தாகின. 65,000 பேருக்கு வேலைவாய்ப்பு.',
      seoKeywords: 'முதலமைச்சர், மு.க.ஸ்டாலின், தமிழ்நாடு, தொழில் முதலீடு, சென்னை',
      canonicalUrl: 'http://localhost:3000/news/tamil-nadu-new-industrial-investments-cm-mk-stalin-mou-signing',
      publishedAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      tags: ['mk-stalin', 'tamil-nadu', 'chennai'],
    },
    {
      title: 'திமுக - அதிமுக களப்போராட்டம் தீவிரம்: மக்கள் சந்திப்பு பிரச்சாரத்தை முடுக்கிவிட்ட எடப்பாடி பழனிசாமி!',
      slug: 'dmk-aiadmk-ground-campaign-edappadi-palaniswami-district-tours',
      shortDescription: 'அதிமுக பொதுச்செயலாளர் எடப்பாடி பழனிசாமி கொங்கு மண்டலம் மற்றும் டெல்டா மாவட்டங்களில் பிரம்மாண்ட பேரணிகளை நடத்த ஆயத்தமாகி வருகிறார்.',
      fullContent: `
        <p class="lead">தமிழகத்தின் எதிர்கால அரசியலைத் தீர்மானிக்கும் தேர்தல் களத்தை நோக்கி பிரதான எதிர்க்கட்சியான அதிமுக தனது பொதுச்செயலாளர் எடப்பாடி பழனிசாமி தலைமையில் தீவிர மக்கள் சந்திப்பு பயணத்தை துவக்கியுள்ளது.</p>

        <h2>அரசு மீதான விமர்சனங்கள்</h2>
        <p>கூட்டத்தில் உரையாற்றிய எடப்பாடி பழனிசாமி, மின் கட்டண உயர்வு, சொத்துவரி உயர்வு மற்றும் விலைவாசி உயர்வு ஆகியவற்றை முன்வைத்து ஆளுங்கட்சியான திமுகவுக்கு எதிராக மக்களிடையே தீவிர விழிப்புணர்வை ஏற்படுத்த வேண்டும் என தொண்டர்களுக்கு அழைப்பு விடுத்தார்.</p>

        <p>அதிமுகவின் இந்த பிரச்சாரப் பயணம் பொதுமக்களிடையே பெரும் கவனத்தை ஈர்த்துள்ளதுடன், இரு பெரும் திராவிடக் கட்சிகளின் கள அரசியலை அனல் பறக்கச் செய்துள்ளது.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'எடப்பாடி பழனிசாமி அதிமுக பொதுக்கூட்டம்',
      categorySlug: 'dmk-aiadmk-news',
      authorId: editor.id,
      status: 'PUBLISHED',
      isFeatured: false,
      isBreaking: false,
      viewCount: 6540,
      seoTitle: 'அதிமுக பொதுச்செயலாளர் எடப்பாடி பழனிசாமி மக்கள் சந்திப்பு | KKK Media',
      seoDescription: 'திமுக அதிமுக களப்போராட்டம் தீவிரம். எடப்பாடி பழனிசாமி தமிழகம் தழுவிய பிரச்சாரம்.',
      seoKeywords: 'அதிமுக, எடப்பாடி பழனிசாமி, திமுக, தமிழ்நாடு அரசியல்',
      canonicalUrl: 'http://localhost:3000/news/dmk-aiadmk-ground-campaign-edappadi-palaniswami-district-tours',
      publishedAt: new Date(Date.now() - 1000 * 60 * 240),
      tags: ['edappadi-palaniswami', 'election-2026', 'tamil-nadu'],
    },
    {
      title: 'கோலிவுட் அதிரடி: தளபதி 69 படப்பிடிப்பு சுடச்சுட அப்டேட்! இசை வெளியீட்டு விழா எப்போது?',
      slug: 'kollywood-thalapathy-69-shooting-update-audio-launch-date',
      shortDescription: 'ஹெச்.வினோத் இயக்கத்தில் விஜய் நடிக்கும் புதிய படத்தின் இறுதிக்கட்ட படப்பிடிப்பு விறுவிறுப்பாக நடைபெற்று வருகிறது. இசை வெளியீட்டு விழா தேதி குறித்த முக்கிய தகவல்.',
      fullContent: `
        <p class="lead">தமிழ் திரையுலகமே பேராவலுடன் எதிர்பார்த்துக் கொண்டிருக்கும் தளபதி 69 திரைப்படத்தின் படப்பிடிப்பு பணிகள் தற்போது சென்னையில் பிரம்மாண்ட அரங்குகளில் நடைபெற்று வருகின்றன.</p>

        <h2>அனிருத் இசை மாயாஜாலம்</h2>
        <p>அனிருத் இசையமைப்பில் உருவாகி வரும் அனைத்து பாடல்களும் ரசிகர்களுக்கு விருந்தாக அமையும் என படக்குழுவினர் உறுதியளித்துள்ளனர். சமீபத்தில் படமாக்கப்பட்ட அதிரடி சண்டைக் காட்சிகள் சர்வதேச தரத்தில் உருவாகியுள்ளதாக தகவல்கள் வெளியாகியுள்ளன.</p>

        <p>திரைப்படத்தின் இசை வெளியீட்டு விழாவை மலேசியாவில் பிரம்மாண்டமாக நடத்த தயாரிப்பு நிறுவனம் திட்டமிட்டு வருவதாக சினிமா வட்டாரங்கள் தெரிவிக்கின்றன.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'தளபதி 69 சினிமா செய்தி கோலிவுட்',
      categorySlug: 'cinema-celebrity',
      authorId: admin.id,
      status: 'PUBLISHED',
      isFeatured: true,
      isBreaking: false,
      viewCount: 24900,
      seoTitle: 'தளபதி 69 படப்பிடிப்பு அப்டேட் மற்றும் ஆடியோ ரிலீஸ் | KKK Media Cinema',
      seoDescription: 'தளபதி 69 படத்தின் பிரத்யேக அப்டேட். ஹெச்.வினோத் மற்றும் அனிருத் கூட்டணியின் புதிய தகவல்.',
      seoKeywords: 'விஜய், தளபதி 69, கோலிவுட், சினிமா செய்திகள், KKK Media',
      canonicalUrl: 'http://localhost:3000/news/kollywood-thalapathy-69-shooting-update-audio-launch-date',
      publishedAt: new Date(Date.now() - 1000 * 60 * 180),
      tags: ['vijay', 'kollywood'],
    },
    {
      title: 'ஐபிஎல் 2026 மெகா ஏலம்: சிஎஸ்கே அணியின் மாஸ்டர் பிளான்! தோனியின் புதிய திட்டம் என்ன?',
      slug: 'ipl-2026-mega-auction-csk-team-strategy-ms-dhoni-plans',
      shortDescription: 'சென்னை சூப்பர் கிங்ஸ் அணி நிர்வாகம் வரவிருக்கும் ஐபிஎல் தொடருக்காக இளம் ஆல்ரவுண்டர்களை குறிவைத்து வியூகம் வகுத்து வருகிறது.',
      fullContent: `
        <p class="lead">ஐபிஎல் ரசிகர்களின் இதயத் துடிப்பான சென்னை சூப்பர் கிங்ஸ் (CSK) அணி, அடுத்த சீசனுக்கான ஆயத்தப் பணிகளில் தீவிரமாக இறங்கியுள்ளது.</p>

        <h2>தோனியின் வழிகாட்டுதல்</h2>
        <p>தல மகேந்திர சிங் தோனியின் வழிகாட்டுதலில் அணி நிர்வாகம் சர்வதேச இளம் பந்துவீச்சாளர்களையும், சுழற்பந்து வீச்சாளர்களையும் அடையாளம் கண்டுள்ளது. சேப்பாக்கம் ஆடுகளத்திற்கு ஏற்ற வகையில் அணி கட்டமைக்கப்படும் என பயிற்சியாளர் ஸ்டீபன் பிளெமிங் தெரிவித்துள்ளார்.</p>

        <p>ருதுராஜ் கெய்க்வாட் தலைமையிலான சிஎஸ்கே அணி தனது 6-வது கோப்பையை வெல்லும் தீவிர முனைப்பில் பயிற்சியைத் துவக்கியுள்ளது.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'சென்னை சூப்பர் கிங்ஸ் சிஎஸ்கே கிரிக்கெட் செய்தி',
      categorySlug: 'cricket-sports',
      authorId: editor.id,
      status: 'PUBLISHED',
      isFeatured: false,
      isBreaking: true,
      viewCount: 18200,
      seoTitle: 'ஐபிஎல் 2026 சிஎஸ்கே அணி திட்டம் | Dhoni CSK IPL News | KKK Media',
      seoDescription: 'சிஎஸ்கே அணியின் புதிய திட்டங்கள் மற்றும் மெகா ஏல வியூகம் குறித்த விரிவான பார்வை.',
      seoKeywords: 'சிஎஸ்கே, ஐபிஎல், தோனி, கிரிக்கெட் செய்திகள், KKK Media',
      canonicalUrl: 'http://localhost:3000/news/ipl-2026-mega-auction-csk-team-strategy-ms-dhoni-plans',
      publishedAt: new Date(Date.now() - 1000 * 60 * 90),
      tags: ['ipl', 'csk'],
    },
    {
      title: 'செயற்கை நுண்ணறிவு (AI) உலகில் புரட்சி: தமிழில் உரையாடும் புதிய AI மாடல் அறிமுகம்!',
      slug: 'tamil-ai-revolution-multimodal-tamil-language-model-launched',
      shortDescription: 'தமிழ் மொழி மற்றும் வட்டார வழக்குகளை துல்லியமாகப் புரிந்து கொண்டு பதிலளிக்கும் அதிநவீன AI செயலி வெளியாகி வரவேற்பைப் பெற்றுள்ளது.',
      fullContent: `
        <p class="lead">உலகெங்கிலும் உள்ள 8 கோடிக்கும் மேற்பட்ட தமிழ் பேசும் மக்களுக்கான பிரத்யேக மொழி மாதிரியை (Large Language Model) இந்திய தொழில்நுட்ப ஆராய்ச்சியாளர்கள் உருவாக்கியுள்ளனர்.</p>

        <h2>பயன்பாடுகள் மற்றும் சிறப்பம்சங்கள்</h2>
        <p>இந்த AI மாடல் பழங்கால சங்க இலக்கியங்கள் முதல் நவீன கணினி மற்றும் அறிவியல் கட்டுரைகள் வரை பிழையின்றி மொழிபெயர்க்கும் திறன் கொண்டது. விவசாயம், மருத்துவம் மற்றும் பள்ளி மாணவர்களின் கல்விக்கு இந்த தமிழ் AI பெரும் உதவியாக இருக்கும் என வல்லுநர்கள் கணித்துள்ளனர்.</p>

        <p>குரல் வழி கட்டளைகள் மூலம் கிராமப்புற மக்களும் எளிதில் பயன்படுத்தும் வகையில் இதனை வடிவமைத்துள்ளனர்.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'செயற்கை நுண்ணறிவு தமிழ் ஏஐ தொழில்நுட்பம்',
      categorySlug: 'technology-ai',
      authorId: admin.id,
      status: 'PUBLISHED',
      isFeatured: false,
      isBreaking: false,
      viewCount: 9800,
      seoTitle: 'தமிழில் உரையாடும் புதிய AI தொழில்நுட்பம் | Tamil AI Technology | KKK Media',
      seoDescription: 'தமிழ் மொழிக்கான பிரத்யேக AI மாடல் அறிமுகம். தமிழர்களின் தொழில்நுட்ப மைல்கல்.',
      seoKeywords: 'செயற்கை நுண்ணறிவு, தமிழ் ஏஐ, AI Technology, KKK Media',
      canonicalUrl: 'http://localhost:3000/news/tamil-ai-revolution-multimodal-tamil-language-model-launched',
      publishedAt: new Date(Date.now() - 1000 * 60 * 360),
      tags: ['artificial-intelligence'],
    },
    {
      title: 'ஒரே சார்ஜில் 600 கி.மீ: இந்தியாவில் அறிமுகமாகும் புதிய மேட்-இன்-இந்தியா எலெக்ட்ரிக் எஸ்யூவி!',
      slug: 'made-in-india-electric-suv-600km-range-launched',
      shortDescription: 'அதிவேக சார்ஜிங் வசதி மற்றும் மலிவு விலையில் நடுத்தர குடும்பங்களை குறிவைத்து வெளியாகும் புதிய எலெக்ட்ரிக் கார் சந்தையில் பரபரப்பை ஏற்படுத்தியுள்ளது.',
      fullContent: `
        <p class="lead">இந்திய ஆட்டோமொபைல் துறையில் மின்சார வாகனங்களின் ஆதிக்கம் நாளுக்கு நாள் அதிகரித்து வரும் நிலையில், சென்னைக்கு அருகிலுள்ள உற்பத்தி ஆலையில் தயாரான புதிய இவி கார் இன்று அதிகாரப்பூர்வமாக விற்பனைக்கு வந்துள்ளது.</p>

        <h2>பேட்டரி மற்றும் சிறப்பம்சங்கள்</h2>
        <p>இந்த காரில் 80kWh திறன் கொண்ட லித்தியம் பாஸ்பேட் பேட்டரி பொருத்தப்பட்டுள்ளது. 15 நிமிட அல்ட்ரா ஃபாஸ்ட் சார்ஜிங் மூலம் 250 கி.மீ வரை பயணிக்க முடியும். விலை ரூ.16 லட்சத்திலிருந்து தொடங்குவது வாகனப் பிரியர்களை உற்சாகப்படுத்தியுள்ளது.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'எலெக்ட்ரிக் கார் ஆட்டோமொபைல் செய்தி',
      categorySlug: 'automobile-news',
      authorId: editor.id,
      status: 'PUBLISHED',
      isFeatured: false,
      isBreaking: false,
      viewCount: 7100,
      seoTitle: '600 கி.மீ ரேஞ்ச் கொண்ட புதிய எலெக்ட்ரிக் கார் | EV Car News Tamil | KKK Media',
      seoDescription: 'இந்தியாவில் அறிமுகமான புதிய எலெக்ட்ரிக் எஸ்யூவி கார் விவரங்கள் மற்றும் விலை.',
      seoKeywords: 'மின்சார வாகனம், EV Car, ஆட்டோமொபைல், KKK Media',
      canonicalUrl: 'http://localhost:3000/news/made-in-india-electric-suv-600km-range-launched',
      publishedAt: new Date(Date.now() - 1000 * 60 * 420),
      tags: ['electric-vehicles'],
    },
    {
      title: 'இணையத்தில் வைரலாகும் மதுரை தாத்தா: 90 வயதிலும் பாரம்பரிய விவசாயத்தை மீட்டெடுத்த சாதனை!',
      slug: 'madurai-traditional-organic-farmer-viral-story-tamil-nadu',
      shortDescription: 'பாரம்பரிய இயற்கை விதைகளை கட்டிக்காத்து ஆயிரக்கணக்கான இளைஞர்களுக்கு இயற்கை விவசாயப் பயிற்சி அளிக்கும் மதுரை விவசாயியின் உத்வேகக் கதை.',
      fullContent: `
        <p class="lead">ரசாயன உரங்கள் இன்றி மாப்பிள்ளை சம்பா, கருப்பு கவுனி போன்ற பாரம்பரிய நெல் ரகங்களை பயிரிட்டு இளைஞர்களுக்கு வழிகாட்டி வரும் 90 வயது விவசாயியின் வீடியோ இணையத்தில் லட்சக்கணக்கானோரால் பகிரப்பட்டு வருகிறது.</p>

        <h2>இளைஞர்களுக்கு வழிகாட்டி</h2>
        <p>"மண்ணைக் காப்பது தாயைக் காப்பதற்கு சமம்" என்ற கொள்கையுடன் செயல்படும் இவரது பண்ணைக்கு தமிழ்நாடு முழுவதிலுமிருந்து ஐடி ஊழியர்களும், கல்லூரி மாணவர்களும் வந்து இயற்கை விவசாய நுணுக்கங்களை கற்றுச் செல்கின்றனர்.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'மதுரை இயற்கை விவசாயி வைரல் செய்தி',
      categorySlug: 'trending-news',
      authorId: admin.id,
      status: 'PUBLISHED',
      isFeatured: false,
      isBreaking: false,
      viewCount: 31400,
      seoTitle: '90 வயது மதுரை விவசாயியின் சாதனை வைரல் கதை | KKK Media Trending',
      seoDescription: 'பாரம்பரிய இயற்கை விவசாயத்தில் சாதனை படைக்கும் மதுரை பெரியவரின் வைரல் கதை.',
      seoKeywords: 'வைரல், மதுரை, இயற்கை விவசாயம், KKK Media',
      canonicalUrl: 'http://localhost:3000/news/madurai-traditional-organic-farmer-viral-story-tamil-nadu',
      publishedAt: new Date(Date.now() - 1000 * 60 * 500),
      tags: ['tamil-nadu'],
    },
    {
      title: 'நாடாளுமன்ற குளிர்கால கூட்டத்தொடர்: புதிய மசோதாக்கள் மற்றும் எதிர்க்கட்சிகளின் அமளி!',
      slug: 'parliament-winter-session-new-bills-opposition-debates',
      shortDescription: 'நாடாளுமன்றத்தில் நாட்டின் முக்கிய பொருளாதார மசோதாக்கள் மீதான விவாதம் காரசாரமாக துவங்கியுள்ளது.',
      fullContent: `
        <p class="lead">புது தில்லியில் நடைபெற்று வரும் நாடாளுமன்ற குளிர்கால கூட்டத்தொடரில் முக்கிய பொருளாதார சீர்திருத்த மசோதாக்கள் தாக்கல் செய்யப்பட்டன.</p>
        <p>மக்களவையில் விவசாய கடன் நிவாரணம் மற்றும் வேலைவாய்ப்பின்மை குறித்து எதிர்க்கட்சி எம்பிக்கள் விவாதம் எழுப்பியதால் பரபரப்பு நிலவியது.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'நாடாளுமன்ற கூட்டத்தொடர் தேசிய செய்தி',
      categorySlug: 'national-news',
      authorId: editor.id,
      status: 'PUBLISHED',
      isFeatured: false,
      isBreaking: false,
      viewCount: 5200,
      seoTitle: 'நாடாளுமன்ற குளிர்கால கூட்டத்தொடர் விவாதம் | National News Tamil | KKK Media',
      seoDescription: 'நாடாளுமன்றத்தில் புதிய மசோதாக்கள் தாக்கல் மற்றும் அமளி.',
      seoKeywords: 'நாடாளுமன்றம், டெல்லி, தேசிய செய்திகள், KKK Media',
      canonicalUrl: 'http://localhost:3000/news/parliament-winter-session-new-bills-opposition-debates',
      publishedAt: new Date(Date.now() - 1000 * 60 * 600),
      tags: ['tamil-nadu'],
    },
    {
      title: 'வரவிருக்கும் பட்ஜெட் 2026: நடுத்தர மக்களுக்கு வருமான வரி சலுகைகள் அறிவிக்கப்படுமா?',
      slug: 'union-budget-2026-income-tax-relief-expectations-draft',
      shortDescription: 'மத்திய நிதியமைச்சகம் தயாரித்து வரும் புதிய பட்ஜெட்டில் தனிநபர் வருமான வரி உச்சவரம்பு அதிகரிக்கப்படலாம் என எதிர்பார்க்கப்படுகிறது.',
      fullContent: `
        <p class="lead">மத்திய அரசின் வரவிருக்கும் பட்ஜெட் குறித்த எதிர்பார்ப்புகள் பொதுமக்கள் மற்றும் தொழில்துறையினர் மத்தியில் அதிகரித்துள்ளன.</p>
        <p>பணவீக்கத்தைக் கட்டுப்படுத்தவும், நுகர்வோர் வாங்கும் திறனை அதிகரிக்கவும் சலுகைகள் அறிவிக்கப்பட வாய்ப்புள்ளதாக நிதி நிபுணர்கள் கருத்து தெரிவித்துள்ளனர்.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'பட்ஜெட் 2026 நிதி அறிக்கை',
      categorySlug: 'national-news',
      authorId: admin.id,
      status: 'DRAFT',
      isFeatured: false,
      isBreaking: false,
      viewCount: 0,
      seoTitle: 'பட்ஜெட் 2026 எதிர்பார்ப்புகள் | KKK Media',
      seoDescription: 'மத்திய பட்ஜெட் 2026 தொடர்பான விரிவான அலசல்.',
      seoKeywords: 'பட்ஜெட், வருமான வரி, பொருளாதாரம், KKK Media',
      canonicalUrl: 'http://localhost:3000/news/union-budget-2026-income-tax-relief-expectations-draft',
      publishedAt: null,
      tags: [],
    },
    {
      title: 'தமிழக கடற்கரை பகுதிகளில் புதிய துறைமுக விரிவாக்கம்: சர்வதேச வர்த்தக மையம் உருவாகிறது!',
      slug: 'tamil-nadu-coastal-port-expansion-international-trade-hub',
      shortDescription: 'தூத்துக்குடி மற்றும் எண்ணூர் துறைமுகங்களின் நவீனமயமாக்கல் பணிகளுக்கு மத்திய மற்றும் மாநில அரசுகள் ஒப்புதல் அளித்துள்ளன.',
      fullContent: `
        <p class="lead">சர்வதேச சரக்கு கப்பல் போக்குவரத்தில் தமிழகத்தின் பங்கை அதிகரிக்கும் வகையில் புதிய முனையங்கள் அமைக்கும் திட்டம் தொடங்கப்பட்டுள்ளது.</p>
        <p>இதன் மூலம் ஏற்றுமதி இறக்குமதி வர்த்தகம் 40% அதிகரிக்கும் என எதிர்பார்க்கப்படுகிறது.</p>
      `,
      featuredImage: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'துறைமுக விரிவாக்கம் தமிழ்நாடு',
      categorySlug: 'tamil-nadu-politics',
      authorId: editor.id,
      status: 'SCHEDULED',
      scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
      isFeatured: false,
      isBreaking: false,
      viewCount: 0,
      seoTitle: 'தமிழக துறைமுக விரிவாக்க திட்டம் | KKK Media',
      seoDescription: 'சர்வதேச வர்த்தக மையமாக மாறும் தமிழக துறைமுகங்கள்.',
      seoKeywords: 'துறைமுகம், வர்த்தகம், தமிழ்நாடு, KKK Media',
      canonicalUrl: 'http://localhost:3000/news/tamil-nadu-coastal-port-expansion-international-trade-hub',
      publishedAt: null,
      tags: ['tamil-nadu'],
    }
  ];

  for (const art of articlesData) {
    const category = categoryMap[art.categorySlug];
    if (!category) continue;

    const existing = await prisma.article.findUnique({
      where: { slug: art.slug },
    });

    const articleData = {
      title: art.title,
      slug: art.slug,
      shortDescription: art.shortDescription,
      fullContent: art.fullContent.trim(),
      featuredImage: art.featuredImage,
      imageAlt: art.imageAlt,
      categoryId: category.id,
      authorId: art.authorId,
      status: art.status,
      isFeatured: art.isFeatured,
      isBreaking: art.isBreaking,
      viewCount: art.viewCount,
      seoTitle: art.seoTitle,
      seoDescription: art.seoDescription,
      seoKeywords: art.seoKeywords,
      canonicalUrl: art.canonicalUrl,
      publishedAt: art.publishedAt,
      scheduledDate: art.scheduledDate || null,
    };

    let article;
    if (existing) {
      article = await prisma.article.update({
        where: { id: existing.id },
        data: articleData,
      });
      await prisma.articleTag.deleteMany({ where: { articleId: article.id } });
    } else {
      article = await prisma.article.create({
        data: articleData,
      });
    }

    if (art.tags && art.tags.length > 0) {
      for (const tSlug of art.tags) {
        const tagObj = tagMap[tSlug];
        if (tagObj) {
          await prisma.articleTag.create({
            data: {
              articleId: article.id,
              tagId: tagObj.id,
            },
          });
        }
      }
    }
  }
  console.log(`[Seed] ${articlesData.length} articles seeded successfully.`);

  // 5. Site Settings
  const settingsData = [
    { key: 'site_name', value: 'KKK Media', group: 'branding' },
    { key: 'site_tagline', value: 'உண்மை உடனுக்குடன் — தமிழின் முன்னணி டிஜிட்டல் செய்தி தளம்', group: 'branding' },
    { key: 'site_description', value: 'KKK Media தமிழ்நாடு அரசியல், தவெக, சினிமா, விளையாட்டு, தொழில்நுட்பம் மற்றும் உலக நடப்புகளை உடனுக்குடன் நடுநிலையுடன் வழங்கும் முன்னணி செய்தி தளம்.', group: 'seo' },
    { key: 'contact_email', value: 'contact@kkkmedia.com', group: 'contact' },
    { key: 'contact_phone', value: '+91 44 2855 0101', group: 'contact' },
    { key: 'contact_address', value: 'KKK Media Tower, Anna Salai, Chennai, Tamil Nadu 600002', group: 'contact' },
    { key: 'social_facebook', value: 'https://facebook.com/kkkmediatamil', group: 'social' },
    { key: 'social_twitter', value: 'https://x.com/kkkmediatamil', group: 'social' },
    { key: 'social_youtube', value: 'https://youtube.com/@kkkmediatamil', group: 'social' },
    { key: 'social_instagram', value: 'https://instagram.com/kkkmediatamil', group: 'social' },
    { key: 'social_telegram', value: 'https://t.me/kkkmediatamil', group: 'social' },
    { key: 'social_whatsapp', value: 'https://whatsapp.com/channel/kkkmedia', group: 'social' },
    { key: 'adsense_enabled', value: 'true', group: 'ads' },
    { key: 'adsense_client_id', value: 'ca-pub-1234567890123456', group: 'ads' },
    { key: 'breaking_news_enabled', value: 'true', group: 'general' },
  ];

  for (const s of settingsData) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, group: s.group },
      create: s,
    });
  }
  console.log(`[Seed] ${settingsData.length} site settings configured.`);

  // 6. Audit Log
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'SYSTEM_SEED',
      entity: 'System',
      entityId: '0',
      details: 'Initial database seed with users, categories, tags, and articles completed.',
      ipAddress: '127.0.0.1',
      userAgent: 'Prisma Seeder',
    },
  });

  console.log('[Seed] Database seeding completed successfully! ✨');
}

main()
  .catch((e) => {
    console.error('[Seed] Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
