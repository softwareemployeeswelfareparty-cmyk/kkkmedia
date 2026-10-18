const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'kkkmedia_production_super_secret_jwt_key_2026';

// Middleware to authenticate JWT from Cookies or Authorization Header
const authenticate = async (req, res, next) => {
  try {
    let token = null;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      if (req.originalUrl.startsWith('/api/')) {
        return res.status(401).json({ success: false, message: 'Authentication required. No token provided.' });
      }
      return res.redirect(`/admin/login?redirect=${encodeURIComponent(req.originalUrl)}`);
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, name: true, role: true, avatar: true },
    });

    if (!user) {
      res.clearCookie('token');
      if (req.originalUrl.startsWith('/api/')) {
        return res.status(401).json({ success: false, message: 'User session has expired or user not found.' });
      }
      return res.redirect('/admin/login?error=Session expired. Please log in again.');
    }

    req.user = user;
    res.locals.currentUser = user;
    next();
  } catch (error) {
    res.clearCookie('token');
    if (req.originalUrl.startsWith('/api/')) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }
    return res.redirect('/admin/login?error=Session invalid. Please log in again.');
  }
};

// Soft authentication for public layout (attaches user if logged in, but doesn't block)
const softAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: { id: true, email: true, name: true, role: true, avatar: true },
      });
      if (user) {
        req.user = user;
        res.locals.currentUser = user;
      }
    }
  } catch (err) {
    // Ignore invalid tokens for public views
  }
  next();
};

// Role-based authorization
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      if (req.originalUrl.startsWith('/api/')) {
        return res.status(403).json({ success: false, message: 'Forbidden. Insufficient permissions.' });
      }
      return res.status(403).render('public/404', {
        title: 'அனுமதி மறுக்கப்பட்டது | Access Denied',
        message: 'இந்த பக்கத்தை அணுக உங்களுக்கு உரிய அனுமதி இல்லை.',
        statusCode: 403,
      });
    }
    next();
  };
};

module.exports = {
  authenticate,
  softAuth,
  authorizeRoles,
};
