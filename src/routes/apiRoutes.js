const express = require('express');
const router = express.Router();
const authController = require('../controllers/api/authController');
const articleController = require('../controllers/api/articleController');
const categoryController = require('../controllers/api/categoryController');
const mediaController = require('../controllers/api/mediaController');
const settingsController = require('../controllers/api/settingsController');
const statsController = require('../controllers/api/statsController');
const translateController = require('../controllers/api/translateController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { authLimiter, apiLimiter } = require('../middlewares/security');

// Apply general API rate limiter
router.use(apiLimiter);

// 1. Authentication Endpoints
router.post('/auth/login', authLimiter, authController.login);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authenticate, authController.getMe);
router.put('/auth/profile', authenticate, authController.updateProfile);

// 2. Dashboard Statistics
router.get('/stats/dashboard', authenticate, statsController.getDashboardStats);

// 3. Articles Endpoints
router.get('/articles', articleController.getArticles);
router.get('/articles/:id', articleController.getArticle);
router.post('/articles', authenticate, articleController.createArticle);
router.put('/articles/:id', authenticate, articleController.updateArticle);
router.delete('/articles/:id', authenticate, articleController.deleteArticle);
router.patch('/articles/:id/toggle-featured', authenticate, articleController.toggleFeatured);
router.patch('/articles/:id/toggle-breaking', authenticate, articleController.toggleBreaking);

// 4. Categories Endpoints
router.get('/categories', categoryController.getCategories);
router.get('/categories/:id', categoryController.getCategory);
router.post('/categories', authenticate, authorizeRoles('ADMIN', 'EDITOR'), categoryController.createCategory);
router.put('/categories/:id', authenticate, authorizeRoles('ADMIN', 'EDITOR'), categoryController.updateCategory);
router.delete('/categories/:id', authenticate, authorizeRoles('ADMIN'), categoryController.deleteCategory);
router.post('/categories/reorder', authenticate, authorizeRoles('ADMIN', 'EDITOR'), categoryController.reorderCategories);

// 5. Media Endpoints
router.get('/media', authenticate, mediaController.getMediaList);
router.post('/media/upload', authenticate, upload.single('image'), mediaController.uploadImage);
router.delete('/media/:id', authenticate, authorizeRoles('ADMIN'), mediaController.deleteMedia);

const redirectController = require('../controllers/api/redirectController');
const errorLogController = require('../controllers/api/errorLogController');

// 6. Settings & Revalidation Endpoints
router.get('/settings', settingsController.getSettings);
router.put('/settings', authenticate, authorizeRoles('ADMIN'), settingsController.updateSettings);
router.post('/settings/revalidate', authenticate, authorizeRoles('ADMIN'), settingsController.revalidateCache);

// 7. Redirect Management Endpoints (ADMIN)
router.get('/redirects', authenticate, authorizeRoles('ADMIN'), redirectController.getRedirects);
router.post('/redirects', authenticate, authorizeRoles('ADMIN'), redirectController.createRedirect);
router.delete('/redirects/:id', authenticate, authorizeRoles('ADMIN'), redirectController.deleteRedirect);

// 8. Error Monitoring Endpoints (ADMIN)
router.get('/errors', authenticate, authorizeRoles('ADMIN'), errorLogController.getErrorLogs);
router.post('/errors/clear', authenticate, authorizeRoles('ADMIN'), errorLogController.clearErrorLogs);

// 9. Dynamic Translation Endpoint (Website & Admin CMS)
router.post('/translate', translateController.translate);

module.exports = router;
