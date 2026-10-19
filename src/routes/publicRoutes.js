const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const { softAuth } = require('../middlewares/auth');

// Soft auth on all public routes to display user badge if admin is visiting frontend
router.use(softAuth);

// Public pages
router.get('/', publicController.getHome);
router.get('/news/:slug', publicController.getArticle);
router.get('/category/:slug', publicController.getCategoryPage);
router.get('/search', publicController.getSearch);

// Static info pages
router.get('/about', publicController.getAbout);
router.get('/contact', publicController.getContact);
router.post('/contact', publicController.postContact);
router.get('/privacy-policy', publicController.getPrivacyPolicy);
router.get('/terms', publicController.getTerms);
router.get('/disclaimer', publicController.getDisclaimer);

// SEO & Monetization dynamic routes
router.get('/sitemap.xml', publicController.getSitemap);
router.get('/robots.txt', publicController.getRobots);
router.get('/ads.txt', publicController.getAdsTxt);

module.exports = router;
