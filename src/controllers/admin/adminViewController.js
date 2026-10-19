const prisma = require('../../config/db');
const articleService = require('../../services/articleService');
const categoryService = require('../../services/categoryService');
const settingsService = require('../../services/settingsService');

const loginView = async (req, res) => {
  if (req.user) {
    return res.redirect('/admin/dashboard');
  }
  const settings = await settingsService.getSettingsMap();
  res.render('admin/login', {
    title: 'Admin Login | KKK Media CMS',
    error: req.query.error || null,
    redirect: req.query.redirect || '/admin/dashboard',
    settings,
  });
};

const dashboardView = async (req, res, next) => {
  try {
    const [
      totalArticles,
      publishedArticles,
      draftArticles,
      scheduledArticles,
      totalCategories,
      totalViewsAgg,
      recentArticles,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.article.count(),
      prisma.article.count({ where: { status: 'PUBLISHED' } }),
      prisma.article.count({ where: { status: 'DRAFT' } }),
      prisma.article.count({ where: { status: 'SCHEDULED' } }),
      prisma.category.count(),
      prisma.article.aggregate({ _sum: { viewCount: true } }),
      prisma.article.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          author: { select: { name: true } },
        },
      }),
      prisma.auditLog.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true } },
        },
      }),
    ]);

    const categories = await categoryService.getAllCategories(true);

    res.render('admin/dashboard', {
      title: 'Dashboard Overview | KKK Media Admin',
      activeTab: 'dashboard',
      stats: {
        totalArticles,
        publishedArticles,
        draftArticles,
        scheduledArticles,
        totalCategories,
        totalViews: totalViewsAgg._sum.viewCount || 0,
      },
      recentArticles,
      recentAuditLogs,
      categories,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const articlesListView = async (req, res, next) => {
  try {
    const { page = 1, limit = 15, status, categoryId, search } = req.query;
    const take = Math.max(1, parseInt(limit, 10));
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * take;

    const where = {};
    if (status) where.status = status;
    if (categoryId) where.categoryId = Number(categoryId);
    if (search && search.trim()) {
      const q = search.trim();
      where.OR = [
        { title: { contains: q } },
        { shortDescription: { contains: q } },
      ];
    }

    const [articles, total, categories] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          author: { select: { name: true } },
          tags: { include: { tag: true } },
        },
      }),
      prisma.article.count({ where }),
      categoryService.getAllCategories(true),
    ]);

    res.render('admin/articles-list', {
      title: 'Articles Management | KKK Media Admin',
      activeTab: 'articles',
      articles,
      categories,
      filters: { status, categoryId, search },
      pagination: {
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / take) || 1,
        total,
      },
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const newArticleView = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories(true);
    res.render('admin/article-form', {
      title: 'புதிய செய்தி உருவாக்குதல் (Create Article) | KKK Media Admin',
      activeTab: 'articles-new',
      isEdit: false,
      article: null,
      categories,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const editArticleView = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [article, categories] = await Promise.all([
      articleService.getArticleById(id),
      categoryService.getAllCategories(true),
    ]);

    if (!article) {
      return res.status(404).render('public/404', {
        title: 'Article Not Found',
        message: 'The requested article could not be found.',
        statusCode: 404,
      });
    }

    res.render('admin/article-form', {
      title: `செய்தி திருத்துதல்: ${article.title} | KKK Media Admin`,
      activeTab: 'articles',
      isEdit: true,
      article,
      categories,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const categoriesView = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories(true);
    res.render('admin/categories', {
      title: 'பிரிவுகள் மேலாண்மை (Categories) | KKK Media Admin',
      activeTab: 'categories',
      categories,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const mediaView = async (req, res, next) => {
  try {
    const { page = 1 } = req.query;
    const take = 24;
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * take;

    const [media, total] = await Promise.all([
      prisma.mediaAsset.findMany({
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.mediaAsset.count(),
    ]);

    res.render('admin/media', {
      title: 'மீடியா நூலகம் (Media Assets) | KKK Media Admin',
      activeTab: 'media',
      media,
      pagination: {
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / take) || 1,
        total,
      },
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const settingsView = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap(true);
    res.render('admin/settings', {
      title: 'தள அமைப்புகள் (Site Settings) | KKK Media Admin',
      activeTab: 'settings',
      settings,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const profileView = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });
    res.render('admin/profile', {
      title: 'சுயவிவரம் (Admin Profile) | KKK Media Admin',
      activeTab: 'profile',
      profileUser: user,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const pagesView = async (req, res, next) => {
  try {
    const settings = await settingsService.getSettingsMap(true);
    res.render('admin/pages', {
      title: 'முக்கிய பக்கங்கள் (Important Pages) | KKK Media Admin',
      activeTab: 'pages',
      settings,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const redirectsView = async (req, res, next) => {
  try {
    const redirectService = require('../../services/redirectService');
    const redirects = await redirectService.getAllRedirects();
    res.render('admin/redirects', {
      title: 'மறுதிசைவு மேலாண்மை (Redirect Management) | KKK Media Admin',
      activeTab: 'redirects',
      redirects,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

const errorsView = async (req, res, next) => {
  try {
    const errorLogService = require('../../services/errorLogService');
    const errors = await errorLogService.getErrorLogs();
    res.render('admin/errors', {
      title: 'பிழைகள் & உடைந்த பக்கங்கள் கண்காணிப்பு (Error Monitoring) | KKK Media Admin',
      activeTab: 'errors',
      errors,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginView,
  dashboardView,
  articlesListView,
  newArticleView,
  editArticleView,
  categoriesView,
  mediaView,
  settingsView,
  pagesView,
  profileView,
  redirectsView,
  errorsView,
};
