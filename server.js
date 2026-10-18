require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const prisma = require('./src/config/db');
const { checkScheduledArticles } = require('./src/services/articleService');

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

// Background scheduler to check scheduled articles every 60 seconds
const schedulerInterval = setInterval(() => {
  checkScheduledArticles();
}, 60 * 1000);

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✓ Database connection established successfully.');

    // Initial check for scheduled articles
    await checkScheduledArticles();

    server.listen(PORT, () => {
      console.log(`
======================================================
  📰 KKK MEDIA — Dynamic Tamil News & Blog CMS
======================================================
  🌐 Public Portal:   http://localhost:${PORT}/
  🛡️  Admin Dashboard: http://localhost:${PORT}/admin
  📡 REST API:        http://localhost:${PORT}/api/articles
  🗺️  Sitemap:         http://localhost:${PORT}/sitemap.xml
======================================================
  Environment: ${process.env.NODE_ENV || 'development'}
  Admin Login: admin@kkkmedia.com / Admin@KKKMedia2026!
======================================================
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
const shutdown = async () => {
  console.log('\nShutting down KKK Media gracefully...');
  clearInterval(schedulerInterval);
  server.close(async () => {
    await prisma.$disconnect();
    console.log('Server and database disconnected.');
    process.exit(0);
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

startServer();
