const prisma = require('../config/db');
const slugify = require('slugify');

const getAllCategories = async (includeInactive = false) => {
  const where = includeInactive ? {} : { isActive: true };
  return await prisma.category.findMany({
    where,
    orderBy: { displayOrder: 'asc' },
    include: {
      _count: {
        select: {
          articles: {
            where: { status: 'PUBLISHED' },
          },
        },
      },
    },
  });
};

const getCategoryBySlug = async (slug) => {
  return await prisma.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: {
          articles: {
            where: { status: 'PUBLISHED' },
          },
        },
      },
    },
  });
};

const getCategoryById = async (id) => {
  return await prisma.category.findUnique({
    where: { id: Number(id) },
  });
};

const createCategory = async (data) => {
  const slug = data.slug
    ? slugify(data.slug, { lower: true, strict: true })
    : slugify(data.nameEnglish || data.nameTamil, { lower: true, strict: true }) || `cat-${Date.now()}`;

  const maxOrder = await prisma.category.aggregate({
    _max: { displayOrder: true },
  });
  const nextOrder = (maxOrder._max.displayOrder || 0) + 1;

  return await prisma.category.create({
    data: {
      nameTamil: data.nameTamil.trim(),
      nameEnglish: (data.nameEnglish || data.nameTamil).trim(),
      slug,
      description: data.description ? data.description.trim() : null,
      displayOrder: data.displayOrder ? Number(data.displayOrder) : nextOrder,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    },
  });
};

const updateCategory = async (id, data) => {
  const updateData = {
    nameTamil: data.nameTamil?.trim(),
    nameEnglish: data.nameEnglish?.trim(),
    description: data.description?.trim(),
    displayOrder: data.displayOrder !== undefined ? Number(data.displayOrder) : undefined,
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : undefined,
  };

  if (data.slug) {
    updateData.slug = slugify(data.slug, { lower: true, strict: true });
  }

  // Remove undefined properties
  Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

  return await prisma.category.update({
    where: { id: Number(id) },
    data: updateData,
  });
};

const deleteCategory = async (id) => {
  const categoryId = Number(id);
  // Check if articles are assigned to this category
  const articleCount = await prisma.article.count({
    where: { categoryId },
  });

  if (articleCount > 0) {
    throw new Error(`Cannot delete category because it has ${articleCount} associated articles. Please reassign or delete them first.`);
  }

  return await prisma.category.delete({
    where: { id: categoryId },
  });
};

const reorderCategories = async (orderList) => {
  // orderList = [{ id: 1, order: 1 }, { id: 2, order: 2 }]
  const updates = orderList.map((item) =>
    prisma.category.update({
      where: { id: Number(item.id) },
      data: { displayOrder: Number(item.order) },
    })
  );
  return await prisma.$transaction(updates);
};

module.exports = {
  getAllCategories,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
};
