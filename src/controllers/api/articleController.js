const articleService = require('../../services/articleService');
const { logAction } = require('../../services/auditService');
const prisma = require('../../config/db');

const getArticles = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, categoryId, status, search } = req.query;
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

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          author: { select: { id: true, name: true } },
          tags: { include: { tag: true } },
        },
      }),
      prisma.article.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        articles,
        total,
        page: parseInt(page, 10),
        totalPages: Math.ceil(total / take) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getArticle = async (req, res, next) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const { title, categoryId, shortDescription, fullContent } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Article title is required.' });
    }
    if (!categoryId) {
      return res.status(400).json({ success: false, message: 'Category is required.' });
    }

    const article = await articleService.createArticle(req.body, req.user.id);
    await logAction(req.user.id, 'CREATE', 'Article', article.id, `Created article: "${article.title}"`, req);

    res.status(201).json({
      success: true,
      message: 'Article created successfully.',
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await articleService.updateArticle(id, req.body, req.user.id);
    await logAction(req.user.id, 'UPDATE', 'Article', article.id, `Updated article: "${article.title}"`, req);

    res.json({
      success: true,
      message: 'Article updated successfully.',
      data: article,
    });
  } catch (error) {
    next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await articleService.getArticleById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    await articleService.deleteArticle(id);
    await logAction(req.user.id, 'DELETE', 'Article', id, `Deleted article: "${existing.title}"`, req);

    res.json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

const toggleFeatured = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({ where: { id: Number(id) } });
    if (!article) return res.status(404).json({ success: false, message: 'Article not found.' });

    const updated = await prisma.article.update({
      where: { id: Number(id) },
      data: { isFeatured: !article.isFeatured },
    });

    res.json({
      success: true,
      message: `Article ${updated.isFeatured ? 'marked as featured' : 'removed from featured'}.`,
      isFeatured: updated.isFeatured,
    });
  } catch (error) {
    next(error);
  }
};

const toggleBreaking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await prisma.article.findUnique({ where: { id: Number(id) } });
    if (!article) return res.status(404).json({ success: false, message: 'Article not found.' });

    const updated = await prisma.article.update({
      where: { id: Number(id) },
      data: { isBreaking: !article.isBreaking },
    });

    res.json({
      success: true,
      message: `Article ${updated.isBreaking ? 'marked as breaking news' : 'removed from breaking news'}.`,
      isBreaking: updated.isBreaking,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle,
  toggleFeatured,
  toggleBreaking,
};
