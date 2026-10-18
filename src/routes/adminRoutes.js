const express = require('express');
const router = express.Router();
const adminViewController = require('../controllers/admin/adminViewController');
const { authenticate, authorizeRoles } = require('../middlewares/auth');

// Public admin login page
router.get('/login', adminViewController.loginView);

// Logout route
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/admin/login?message=Logged out successfully.');
});

// Protected admin dashboard and views
router.get('/', authenticate, (req, res) => res.redirect('/admin/dashboard'));
router.get('/dashboard', authenticate, adminViewController.dashboardView);

// Articles views
router.get('/articles', authenticate, adminViewController.articlesListView);
router.get('/articles/new', authenticate, adminViewController.newArticleView);
router.get('/articles/:id/edit', authenticate, adminViewController.editArticleView);

// Categories views
router.get('/categories', authenticate, adminViewController.categoriesView);

// Media library views
router.get('/media', authenticate, adminViewController.mediaView);

// Site Settings view (ADMIN role only)
router.get('/settings', authenticate, authorizeRoles('ADMIN'), adminViewController.settingsView);

// Profile view
router.get('/profile', authenticate, adminViewController.profileView);

module.exports = router;
