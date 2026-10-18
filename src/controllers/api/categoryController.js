const categoryService = require('../../services/categoryService');
const { logAction } = require('../../services/auditService');

const getCategories = async (req, res, next) => {
  try {
    const includeInactive = req.query.includeInactive === 'true' || req.query.all === 'true';
    const categories = await categoryService.getAllCategories(includeInactive);
    res.json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }
    res.json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { nameTamil } = req.body;
    if (!nameTamil || !nameTamil.trim()) {
      return res.status(400).json({ success: false, message: 'Tamil category name is required.' });
    }

    const category = await categoryService.createCategory(req.body);
    await logAction(req.user.id, 'CREATE', 'Category', category.id, `Created category: "${category.nameTamil}"`, req);

    res.status(201).json({
      success: true,
      message: 'Category created successfully.',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.updateCategory(id, req.body);
    await logAction(req.user.id, 'UPDATE', 'Category', category.id, `Updated category: "${category.nameTamil}"`, req);

    res.json({
      success: true,
      message: 'Category updated successfully.',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found.' });
    }

    await categoryService.deleteCategory(id);
    await logAction(req.user.id, 'DELETE', 'Category', id, `Deleted category: "${category.nameTamil}"`, req);

    res.json({
      success: true,
      message: 'Category deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};

const reorderCategories = async (req, res, next) => {
  try {
    const { orderList } = req.body;
    if (!Array.isArray(orderList)) {
      return res.status(400).json({ success: false, message: 'orderList must be an array of { id, order }' });
    }

    await categoryService.reorderCategories(orderList);
    await logAction(req.user.id, 'UPDATE', 'Category', null, 'Reordered categories', req);

    res.json({ success: true, message: 'Categories reordered successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
};
