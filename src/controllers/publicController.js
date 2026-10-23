const articleService = require('../services/articleService');
const categoryService = require('../services/categoryService');
const settingsService = require('../services/settingsService');
const prisma = require('../config/db');
const { formatArticleContent } = require('../utils/formatContent');

// Helper to format date in Tamil style
const formatTamilDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const monthsTamil = [
    'ஜனவரி', 'பிப்ரவரி', 'மார்ச்', 'ஏப்ரல்', 'மே', 'ஜூன்',
    'ஜூலை', 'ஆகஸ்ட்', 'செப்டம்பர்', 'அக்டோபர்', 'நவம்பர்', 'டிசம்பர்'
  ];
  return `${d.getDate()} ${monthsTamil[d.getMonth()]}, ${d.getFullYear()}`;
};

// Calculate reading time
const calculateReadingTime = (content) => {
  const words = content.replace(/<[^>]*>?/gm, '').trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 150);
  return `${minutes} நிமிட வாசிப்பு`;
};

const getHome = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap();
    const categories = await categoryService.getAllCategories();
    
    // Fetch featured, breaking, trending, and latest articles
    const [featured, breaking, trending, latestData] = await Promise.all([
      articleService.getFeaturedArticles(5),
      articleService.getBreakingArticles(6),
      articleService.getTrendingArticles(5),
      articleService.getPublishedArticles({ page: 1, limit: 12 }),
    ]);

    // Fetch categorized news blocks (e.g. TVK, Politics, Cinema, Sports, Tech)
    const tvkCat = categories.find((c) => c.slug === 'tvk-news');
    const cinemaCat = categories.find((c) => c.slug === 'cinema-celebrity');
    const sportsCat = categories.find((c) => c.slug === 'cricket-sports');
    const techCat = categories.find((c) => c.slug === 'technology-ai');

    const [tvkNews, cinemaNews, sportsNews, techNews] = await Promise.all([
      tvkCat ? prisma.article.findMany({ where: { status: 'PUBLISHED', categoryId: tvkCat.id }, take: 4, orderBy: { publishedAt: 'desc' }, include: { category: true } }) : [],
      cinemaCat ? prisma.article.findMany({ where: { status: 'PUBLISHED', categoryId: cinemaCat.id }, take: 4, orderBy: { publishedAt: 'desc' }, include: { category: true } }) : [],
      sportsCat ? prisma.article.findMany({ where: { status: 'PUBLISHED', categoryId: sportsCat.id }, take: 4, orderBy: { publishedAt: 'desc' }, include: { category: true } }) : [],
      techCat ? prisma.article.findMany({ where: { status: 'PUBLISHED', categoryId: techCat.id }, take: 4, orderBy: { publishedAt: 'desc' }, include: { category: true } }) : [],
    ]);

    res.render('public/index', {
      title: `${settings.site_name} — தமிழின் முன்னணி செய்தி தளம்`,
      metaDescription: settings.site_description || 'KKK Media: தமிழ்நாடு அரசியல், சினிமா, விளையாட்டு மற்றும் முக்கிய உலகச் செய்திகளை உடனுக்குடன் வழங்கும் முன்னணி செய்தி தளம்.',
      canonicalUrl: `${res.locals.appUrl}/`,
      ogImage: featured[0]?.featuredImage || '/images/kkkmedia-og.jpg',
      settings,
      categories,
      featured,
      breaking,
      trending,
      latest: latestData.articles,
      tvkNews,
      cinemaNews,
      sportsNews,
      techNews,
      formatTamilDate,
      calculateReadingTime,
      activeNav: 'home',
    });
  } catch (error) {
    next(error);
  }
};

const getArticle = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const article = await articleService.getArticleBySlug(slug, true);

    if (!article) {
      return res.status(404).render('public/404', {
        title: 'செய்தி கிடைக்கவில்லை | Article Not Found',
        message: 'நீங்கள் தேடிய செய்தி நீக்கப்பட்டிருக்கலாம் அல்லது தவறான முகவரி.',
        statusCode: 404,
      });
    }

    // Only admins/authors can view unpublished articles via preview
    if (article.status !== 'PUBLISHED' && (!req.user || (req.user.role !== 'ADMIN' && req.user.id !== article.authorId))) {
      return res.status(404).render('public/404', {
        title: 'செய்தி இன்னும் வெளியாகவில்லை | Unpublished Article',
        message: 'இந்த செய்தி இன்னும் வெளியிடப்படவில்லை.',
        statusCode: 404,
      });
    }

    const settings = await settingsService.getSettingsMap();
    const categories = await categoryService.getAllCategories();
    const related = await articleService.getRelatedArticles(article.id, article.categoryId, 4);
    const trending = await articleService.getTrendingArticles(5);

    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const currentUrl = `${appUrl}/news/${article.slug}`;

    // Schema.org NewsArticle Structured Data
    const schemaNewsArticle = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      'headline': article.title,
      'description': article.shortDescription,
      'image': [article.featuredImage || `${appUrl}/images/kkkmedia-og.jpg`],
      'datePublished': article.publishedAt ? new Date(article.publishedAt).toISOString() : new Date(article.createdAt).toISOString(),
      'dateModified': new Date(article.updatedAt).toISOString(),
      'author': [{
        '@type': 'Person',
        'name': article.author.name,
        'url': `${appUrl}/author/${article.author.id}`,
      }],
      'publisher': {
        '@type': 'Organization',
        'name': settings.site_name,
        'logo': {
          '@type': 'ImageObject',
          'url': `${appUrl}/images/kkkmedia-logo.png`,
        },
      },
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': currentUrl,
      },
    };

    // BreadcrumbList Structured Data
    const schemaBreadcrumbs = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'முகப்பு (Home)',
          'item': `${appUrl}/`,
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': article.category.nameTamil,
          'item': `${appUrl}/category/${article.category.slug}`,
        },
        {
          '@type': 'ListItem',
          'position': 3,
          'name': article.title,
          'item': currentUrl,
        },
      ],
    };

    res.render('public/article', {
      title: `${article.seoTitle || article.title} | ${settings.site_name}`,
      metaDescription: article.seoDescription || article.shortDescription,
      keywords: article.seoKeywords || '',
      canonicalUrl: article.canonicalUrl || currentUrl,
      ogImage: article.socialImage || article.featuredImage || '/images/kkkmedia-og.jpg',
      article,
      related,
      trending,
      settings,
      categories,
      schemaNewsArticle: JSON.stringify(schemaNewsArticle),
      schemaBreadcrumbs: JSON.stringify(schemaBreadcrumbs),
      formatTamilDate,
      calculateReadingTime,
      formatArticleContent,
      currentUrl,
      activeNav: article.category.slug,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryPage = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const category = await categoryService.getCategoryBySlug(slug);

    if (!category) {
      return res.status(404).render('public/404', {
        title: 'பிரிவு கிடைக்கவில்லை | Category Not Found',
        message: 'நீங்கள் தேடிய செய்திப் பிரிவு தளத்தில் இல்லை.',
        statusCode: 404,
      });
    }

    const settings = await settingsService.getSettingsMap();
    const categories = await categoryService.getAllCategories();
    const result = await articleService.getPublishedArticles({
      page,
      limit: 12,
      categorySlug: slug,
    });
    const trending = await articleService.getTrendingArticles(5);

    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const currentUrl = `${appUrl}/category/${category.slug}`;

    res.render('public/category', {
      title: `${category.nameTamil} (${category.nameEnglish}) செய்திகள் | ${settings.site_name}`,
      metaDescription: category.description || `${category.nameTamil} தொடர்பான சுடச்சுட முக்கிய செய்திகள்.`,
      canonicalUrl: currentUrl,
      ogImage: '/images/kkkmedia-og.jpg',
      category,
      articles: result.articles,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
      },
      trending,
      settings,
      categories,
      formatTamilDate,
      calculateReadingTime,
      activeNav: category.slug,
    });
  } catch (error) {
    next(error);
  }
};

const getSearch = async (req, res, next) => {
  try {
    const query = req.query.q || '';
    const page = parseInt(req.query.page, 10) || 1;

    const settings = await settingsService.getSettingsMap();
    const categories = await categoryService.getAllCategories();
    const trending = await articleService.getTrendingArticles(5);

    let result = { articles: [], total: 0, totalPages: 1, page: 1 };
    if (query.trim()) {
      result = await articleService.getPublishedArticles({
        search: query.trim(),
        page,
        limit: 12,
      });
    }

    res.render('public/search', {
      title: query ? `"${query}" - தேடல் முடிவுகள் | ${settings.site_name}` : `செய்திகள் தேடல் | ${settings.site_name}`,
      metaDescription: `Search news articles on ${settings.site_name}.`,
      canonicalUrl: `${process.env.APP_URL || 'http://localhost:3000'}/search?q=${encodeURIComponent(query)}`,
      ogImage: '/images/kkkmedia-og.jpg',
      query,
      articles: result.articles,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        total: result.total,
      },
      trending,
      settings,
      categories,
      formatTamilDate,
      calculateReadingTime,
      activeNav: 'search',
    });
  } catch (error) {
    next(error);
  }
};

// Static Pages
const getAbout = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap();
    const categories = await categoryService.getAllCategories();
    res.render('public/about', {
      title: `எங்களைப் பற்றி (About Us) | ${settings.site_name}`,
      metaDescription: 'KKK Media தமிழ் டிஜிட்டல் செய்தி தளம் பற்றிய விரிவான அறிமுகம், நெறிமுறைகள் மற்றும் நோக்கம்.',
      canonicalUrl: `${process.env.APP_URL || 'http://localhost:3000'}/about`,
      ogImage: '/images/kkkmedia-og.jpg',
      settings,
      categories,
      activeNav: 'about',
    });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap();
    const categories = await categoryService.getAllCategories();
    res.render('public/contact', {
      title: `தொடர்புக்கு (Contact Us) | ${settings.site_name}`,
      metaDescription: 'KKK Media அலுவலக தொடர்பு முகவரி, தொலைபேசி மற்றும் மின்னஞ்சல் தகவல்கள்.',
      canonicalUrl: `${process.env.APP_URL || 'http://localhost:3000'}/contact`,
      ogImage: '/images/kkkmedia-og.jpg',
      settings,
      categories,
      messageSent: req.query.sent === 'true',
      activeNav: 'contact',
    });
  } catch (error) {
    next(error);
  }
};

const postContact = async (req, res, next) => {
  try {
    // In production this could send email via nodemailer or save feedback
    res.redirect('/contact?sent=true');
  } catch (error) {
    next(error);
  }
};

const getPrivacyPolicy = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap();
    const categories = await categoryService.getAllCategories();
    res.render('public/privacy', {
      title: `தனியுரிமைக் கொள்கை (Privacy Policy) | ${settings.site_name}`,
      metaDescription: 'KKK Media தனியுரிமைக் கொள்கை மற்றும் குக்கீ பயன்பாட்டு விதிமுறைகள்.',
      canonicalUrl: `${process.env.APP_URL || 'http://localhost:3000'}/privacy-policy`,
      ogImage: '/images/kkkmedia-og.jpg',
      settings,
      categories,
      activeNav: 'privacy',
    });
  } catch (error) {
    next(error);
  }
};

const getTerms = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap();
    const categories = await categoryService.getAllCategories();
    res.render('public/terms', {
      title: `பயன்பாட்டு விதிமுறைகள் (Terms & Conditions) | ${settings.site_name}`,
      metaDescription: 'KKK Media இணையதள பயன்பாட்டு விதிமுறைகள் மற்றும் நிபந்தனைகள்.',
      canonicalUrl: `${process.env.APP_URL || 'http://localhost:3000'}/terms`,
      ogImage: '/images/kkkmedia-og.jpg',
      settings,
      categories,
      activeNav: 'terms',
    });
  } catch (error) {
    next(error);
  }
};

const getDisclaimer = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap();
    const categories = await categoryService.getAllCategories();
    res.render('public/disclaimer', {
      title: `பொறுப்புத் துறப்பு (Disclaimer & Editorial Policy) | ${settings.site_name}`,
      metaDescription: 'KKK Media பொறுப்புத் துறப்பு, பதிப்புரிமை மற்றும் உண்மை சரிபார்ப்பு நெறிமுறைகள்.',
      canonicalUrl: `${process.env.APP_URL || 'http://localhost:3000'}/disclaimer`,
      ogImage: '/images/kkkmedia-og.jpg',
      settings,
      categories,
      activeNav: 'disclaimer',
    });
  } catch (error) {
    next(error);
  }
};

// Dynamic XML Sitemap
const getSitemap = async (req, res, next) => {
  try {
    const appUrl = process.env.APP_URL || 'http://localhost:3000';
    const [articles, categories] = await Promise.all([
      prisma.article.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, updatedAt: true, publishedAt: true },
        orderBy: { publishedAt: 'desc' },
      }),
      prisma.category.findMany({
        where: { isActive: true },
        select: { slug: true, updatedAt: true },
      }),
    ]);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
    <loc>${appUrl}/</loc>
    <changefreq>always</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${appUrl}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${appUrl}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>${appUrl}/privacy-policy</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${appUrl}/terms</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${appUrl}/disclaimer</loc>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>`;

    // Add Categories
    for (const cat of categories) {
      xml += `
  <url>
    <loc>${appUrl}/category/${cat.slug}</loc>
    <lastmod>${new Date(cat.updatedAt).toISOString()}</lastmod>
    <changefreq>hourly</changefreq>
    <priority>0.8</priority>
  </url>`;
    }

    // Add Articles
    for (const art of articles) {
      const lastMod = art.updatedAt ? new Date(art.updatedAt).toISOString() : new Date().toISOString();
      xml += `
  <url>
    <loc>${appUrl}/news/${art.slug}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    }

    xml += `
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    next(error);
  }
};

// Dynamic robots.txt
const getRobots = (req, res) => {
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${appUrl}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(robots);
};

// Dynamic ads.txt for Google AdSense compliance
const getAdsTxt = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap();
    let pubId = settings.adsense_client_id || 'ca-pub-1234567890123456';
    pubId = pubId.replace(/^ca-/, ''); // e.g. pub-1234567890123456
    const adsTxt = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;
    res.header('Content-Type', 'text/plain');
    res.send(adsTxt);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHome,
  getArticle,
  getCategoryPage,
  getSearch,
  getAbout,
  getContact,
  postContact,
  getPrivacyPolicy,
  getTerms,
  getDisclaimer,
  getSitemap,
  getRobots,
  getAdsTxt,
};
