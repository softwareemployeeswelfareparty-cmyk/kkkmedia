const prisma = require('../config/db');
const slugify = require('slugify');
const sanitizeHtml = require('sanitize-html');

// Safe HTML sanitizer options for Rich-Text content
const sanitizeOptions = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'iframe',
    'img', 'figure', 'figcaption', 'span'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading', 'class'],
    iframe: ['src', 'width', 'height', 'frameborder', 'allow', 'allowfullscreen'],
    '*': ['class', 'style', 'id']
  },
  allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'player.vimeo.com', 'twitter.com']
};

// Check and auto-publish scheduled articles
const checkScheduledArticles = async () => {
  try {
    const now = new Date();
    const scheduled = await prisma.article.findMany({
      where: {
        status: 'SCHEDULED',
        scheduledDate: {
          lte: now,
        },
      },
    });

    for (const art of scheduled) {
      await prisma.article.update({
        where: { id: art.id },
        data: {
          status: 'PUBLISHED',
          publishedAt: art.scheduledDate || now,
        },
      });
      console.log(`[Scheduler] Auto-published scheduled article: "${art.title}" (ID: ${art.id})`);
    }
  } catch (err) {
    console.error('[Scheduler] Error checking scheduled articles:', err.message);
  }
};

const getPublishedArticles = async ({
  page = 1,
  limit = 10,
  categoryId = null,
  categorySlug = null,
  tagSlug = null,
  search = null,
} = {}) => {
  await checkScheduledArticles();

  const take = Math.max(1, parseInt(limit, 10));
  const skip = (Math.max(1, parseInt(page, 10)) - 1) * take;

  const where = {
    status: 'PUBLISHED',
  };

  if (categorySlug) {
    where.category = { slug: categorySlug };
  } else if (categoryId) {
    where.categoryId = Number(categoryId);
  }

  if (tagSlug) {
    where.tags = {
      some: {
        tag: {
          slug: tagSlug,
        },
      },
    };
  }

  if (search && search.trim()) {
    const q = search.trim();
    where.OR = [
      { title: { contains: q } },
      { shortDescription: { contains: q } },
      { fullContent: { contains: q } },
      { seoKeywords: { contains: q } },
    ];
  }

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      where,
      skip,
      take,
      orderBy: { publishedAt: 'desc' },
      include: {
        category: true,
        author: {
          select: { id: true, name: true, avatar: true },
        },
        tags: {
          include: { tag: true },
        },
      },
    }),
    prisma.article.count({ where }),
  ]);

  return {
    articles,
    total,
    page: parseInt(page, 10),
    totalPages: Math.ceil(total / take) || 1,
    limit: take,
  };
};

const getArticleBySlug = async (slug, incrementViews = false) => {
  await checkScheduledArticles();

  const article = await prisma.article.findUnique({
    where: { slug },
    include: {
      category: true,
      author: {
        select: { id: true, name: true, avatar: true, bio: true },
      },
      tags: {
        include: { tag: true },
      },
    },
  });

  if (!article) return null;

  if (incrementViews && article.status === 'PUBLISHED') {
    // Fire and forget view increment
    prisma.article.update({
      where: { id: article.id },
      data: { viewCount: { increment: 1 } },
    }).catch(err => console.error('[Views] Failed to increment views:', err.message));
  }

  return article;
};

const getArticleById = async (id) => {
  return await prisma.article.findUnique({
    where: { id: Number(id) },
    include: {
      category: true,
      author: {
        select: { id: true, name: true, avatar: true },
      },
      tags: {
        include: { tag: true },
      },
    },
  });
};

const getFeaturedArticles = async (limit = 5) => {
  return await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      isFeatured: true,
    },
    take: limit,
    orderBy: { publishedAt: 'desc' },
    include: {
      category: true,
      author: { select: { id: true, name: true, avatar: true } },
    },
  });
};

const getBreakingArticles = async (limit = 5) => {
  return await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      isBreaking: true,
    },
    take: limit,
    orderBy: { publishedAt: 'desc' },
    include: {
      category: true,
    },
  });
};

const getTrendingArticles = async (limit = 5) => {
  return await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
    },
    take: limit,
    orderBy: { viewCount: 'desc' },
    include: {
      category: true,
      author: { select: { id: true, name: true } },
    },
  });
};

const getRelatedArticles = async (articleId, categoryId, limit = 4) => {
  return await prisma.article.findMany({
    where: {
      status: 'PUBLISHED',
      categoryId: Number(categoryId),
      id: { not: Number(articleId) },
    },
    take: limit,
    orderBy: { publishedAt: 'desc' },
    include: {
      category: true,
    },
  });
};

const createArticle = async (data, authorId) => {
  const sanitizedContent = sanitizeHtml(data.fullContent || '', sanitizeOptions);

  let slug = data.slug
    ? slugify(data.slug, { lower: true, strict: true })
    : slugify(data.title.substring(0, 80), { lower: true, strict: true }) || `news-${Date.now()}`;

  // Ensure unique slug
  let counter = 1;
  const originalSlug = slug;
  while (await prisma.article.findUnique({ where: { slug } })) {
    slug = `${originalSlug}-${counter++}`;
  }

  const status = data.status || 'DRAFT';
  let publishedAt = null;
  let scheduledDate = null;

  if (status === 'PUBLISHED') {
    publishedAt = data.publishedAt ? new Date(data.publishedAt) : new Date();
  } else if (status === 'SCHEDULED') {
    scheduledDate = data.scheduledDate ? new Date(data.scheduledDate) : new Date();
  }

  const article = await prisma.article.create({
    data: {
      title: data.title.trim(),
      slug,
      shortDescription: data.shortDescription ? data.shortDescription.trim() : '',
      fullContent: sanitizedContent,
      featuredImage: data.featuredImage || null,
      imageAlt: data.imageAlt ? data.imageAlt.trim() : null,
      categoryId: Number(data.categoryId),
      authorId: Number(authorId),
      status,
      isFeatured: Boolean(data.isFeatured),
      isBreaking: Boolean(data.isBreaking),
      seoTitle: data.seoTitle ? data.seoTitle.trim() : null,
      seoDescription: data.seoDescription ? data.seoDescription.trim() : null,
      seoKeywords: data.seoKeywords ? data.seoKeywords.trim() : null,
      canonicalUrl: data.canonicalUrl ? data.canonicalUrl.trim() : null,
      socialImage: data.socialImage ? data.socialImage.trim() : null,
      publishedAt,
      scheduledDate,
    },
  });

  // Handle tags if provided
  if (data.tags) {
    await syncArticleTags(article.id, data.tags);
  }

  return await getArticleById(article.id);
};

const updateArticle = async (id, data, currentUserId) => {
  const articleId = Number(id);
  const existing = await prisma.article.findUnique({ where: { id: articleId } });
  if (!existing) {
    throw new Error('Article not found');
  }

  const updateData = {};

  if (data.title !== undefined) updateData.title = data.title.trim();
  if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription.trim();
  if (data.fullContent !== undefined) {
    updateData.fullContent = sanitizeHtml(data.fullContent, sanitizeOptions);
  }
  if (data.featuredImage !== undefined) updateData.featuredImage = data.featuredImage || null;
  if (data.imageAlt !== undefined) updateData.imageAlt = data.imageAlt ? data.imageAlt.trim() : null;
  if (data.categoryId !== undefined) updateData.categoryId = Number(data.categoryId);
  if (data.isFeatured !== undefined) updateData.isFeatured = Boolean(data.isFeatured);
  if (data.isBreaking !== undefined) updateData.isBreaking = Boolean(data.isBreaking);
  if (data.seoTitle !== undefined) updateData.seoTitle = data.seoTitle ? data.seoTitle.trim() : null;
  if (data.seoDescription !== undefined) updateData.seoDescription = data.seoDescription ? data.seoDescription.trim() : null;
  if (data.seoKeywords !== undefined) updateData.seoKeywords = data.seoKeywords ? data.seoKeywords.trim() : null;
  if (data.canonicalUrl !== undefined) updateData.canonicalUrl = data.canonicalUrl ? data.canonicalUrl.trim() : null;
  if (data.socialImage !== undefined) updateData.socialImage = data.socialImage ? data.socialImage.trim() : null;

  if (data.slug && data.slug !== existing.slug) {
    let newSlug = slugify(data.slug, { lower: true, strict: true });
    let counter = 1;
    const orig = newSlug;
    while (await prisma.article.findFirst({ where: { slug: newSlug, id: { not: articleId } } })) {
      newSlug = `${orig}-${counter++}`;
    }
    updateData.slug = newSlug;
  }

  if (data.status !== undefined) {
    updateData.status = data.status;
    if (data.status === 'PUBLISHED' && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    } else if (data.status === 'SCHEDULED') {
      updateData.scheduledDate = data.scheduledDate ? new Date(data.scheduledDate) : existing.scheduledDate;
    }
  }

  await prisma.article.update({
    where: { id: articleId },
    data: updateData,
  });

  if (data.tags !== undefined) {
    await syncArticleTags(articleId, data.tags);
  }

  return await getArticleById(articleId);
};

const deleteArticle = async (id) => {
  const articleId = Number(id);
  // Delete tag relations first
  await prisma.articleTag.deleteMany({ where: { articleId } });
  return await prisma.article.delete({
    where: { id: articleId },
  });
};

// Helper to sync tags (accepts comma separated string or array of tag names)
const syncArticleTags = async (articleId, tagsInput) => {
  let tagNames = [];
  if (Array.isArray(tagsInput)) {
    tagNames = tagsInput;
  } else if (typeof tagsInput === 'string') {
    tagNames = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
  }

  // Clear existing tags for this article
  await prisma.articleTag.deleteMany({ where: { articleId } });

  for (const name of tagNames) {
    if (!name) continue;
    let tag = await prisma.tag.findUnique({ where: { name } });
    if (!tag) {
      let slug = slugify(name, { lower: true, strict: true });
      if (!slug) {
        slug = `tag-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
      }
      // Ensure unique slug
      let count = 1;
      const baseSlug = slug;
      while (await prisma.tag.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${count++}`;
      }
      tag = await prisma.tag.create({
        data: { name, slug },
      });
    }

    await prisma.articleTag.upsert({
      where: {
        articleId_tagId: {
          articleId,
          tagId: tag.id,
        },
      },
      update: {},
      create: {
        articleId,
        tagId: tag.id,
      },
    });
  }
};

module.exports = {
  getPublishedArticles,
  getArticleBySlug,
  getArticleById,
  getFeaturedArticles,
  getBreakingArticles,
  getTrendingArticles,
  getRelatedArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  checkScheduledArticles,
};
