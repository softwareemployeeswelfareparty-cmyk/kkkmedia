const { matchRedirect, loadRedirects } = require('../services/redirectService');

// Preload redirects on startup
loadRedirects().catch(() => {});

const redirectMiddleware = (req, res, next) => {
  // Ignore static assets, api, and admin routes
  if (
    req.path.startsWith('/api') ||
    req.path.startsWith('/admin') ||
    req.path.startsWith('/css') ||
    req.path.startsWith('/js') ||
    req.path.startsWith('/images') ||
    req.path.startsWith('/uploads') ||
    req.path === '/favicon.ico'
  ) {
    return next();
  }

  const target = matchRedirect(req.path);
  if (target) {
    return res.redirect(target.statusCode || 301, target.toPath);
  }

  next();
};

module.exports = redirectMiddleware;
