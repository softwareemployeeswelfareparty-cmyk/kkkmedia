const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const apiRoutes = require('./routes/apiRoutes');
const adminRoutes = require('./routes/adminRoutes');
const publicRoutes = require('./routes/publicRoutes');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Security Headers (Configured to allow Google Fonts, images, CDNs, and inline scripts for rich editor)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "data:"],
        imgSrc: ["'self'", "data:", "https:", "http:", "blob:"],
        frameSrc: ["'self'", "https://www.youtube.com", "https://youtube.com", "https://player.vimeo.com", "https://platform.twitter.com"],
        connectSrc: ["'self'"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(cors());

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Cookie Parser
app.use(cookieParser(process.env.COOKIE_SECRET || 'kkkmedia_cookie_secret_signature'));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve Static Assets
app.use(express.static(path.join(__dirname, '..', 'public')));

// Global locals for all views
app.use((req, res, next) => {
  res.locals.appUrl = process.env.APP_URL || 'http://localhost:3000';
  res.locals.currentYear = new Date().getFullYear();
  res.locals.currentUser = null;
  res.locals.currentPath = req.path;
  next();
});

// Redirect Management Middleware (301/302 URL redirects)
const redirectMiddleware = require('./middlewares/redirectMiddleware');
app.use(redirectMiddleware);

// Mount Routes
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);
app.use('/', publicRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
