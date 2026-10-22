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

// Trust reverse proxies (Netlify Edge CDN and Render Web Services)
app.set('trust proxy', 1);

// Security Headers (Configured to allow Google Fonts, images, CDNs, and inline scripts for rich editor)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com", "https://pagead2.googlesyndication.com"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.jsdelivr.net", "https://cdnjs.cloudflare.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdnjs.cloudflare.com", "data:"],
        imgSrc: ["'self'", "data:", "https:", "http:", "blob:"],
        frameSrc: ["'self'", "https://www.youtube.com", "https://youtube.com", "https://player.vimeo.com", "https://platform.twitter.com", "https://googleads.g.doubleclick.net"],
        connectSrc: ["'self'", "https://*.supabase.co", "https://*.supabase.in"],
      },
    },
    crossOriginEmbedderPolicy: false,
  })
);

// CORS configuration supporting Netlify frontend and custom domains
const allowedOrigins = [
  process.env.APP_URL,
  'https://kkkmedia.netlify.app',
  'https://kkkmedia-5.onrender.com',
  'http://localhost:3000'
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        origin.endsWith('.netlify.app') ||
        origin.endsWith('.onrender.com')
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

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
  const forwardedHost = req.headers['x-forwarded-host'] || req.get('host');
  const forwardedProto = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : req.protocol);
  res.locals.appUrl = process.env.APP_URL || `${forwardedProto}://${forwardedHost}`;
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
