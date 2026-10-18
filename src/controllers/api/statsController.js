const prisma = require('../../config/db');

const getDashboardStats = async (req, res, next) => {
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
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          category: { select: { nameTamil: true, nameEnglish: true } },
          author: { select: { name: true } },
        },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { name: true, email: true, role: true } },
        },
      }),
    ]);

    res.json({
      success: true,
      data: {
        counts: {
          totalArticles,
          publishedArticles,
          draftArticles,
          scheduledArticles,
          totalCategories,
          totalViews: totalViewsAgg._sum.viewCount || 0,
        },
        recentArticles,
        recentAuditLogs,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
};
