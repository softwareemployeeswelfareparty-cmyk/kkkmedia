// Centralized Error Handling Middleware

const notFoundHandler = (req, res, next) => {
  if (req.originalUrl.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
    });
  }

  res.status(404).render('public/404', {
    title: 'பக்கம் கிடைக்கவில்லை | 404 Page Not Found',
    message: 'நீங்கள் தேடும் பக்கம் நீக்கப்பட்டிருக்கலாம் அல்லது முகவரி மாற்றப்பட்டிருக்கலாம்.',
    statusCode: 404,
  });
};

const errorHandler = (err, req, res, next) => {
  // Safe logging (avoid leaking credentials in production)
  const isDev = process.env.NODE_ENV !== 'production';
  console.error(`[Error] ${new Date().toISOString()} - ${req.method} ${req.originalUrl}:`, err.message);
  if (isDev) {
    console.error(err.stack);
  }

  // Handle Multer upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: 'File size exceeds the allowed limit (5MB maximum).',
    });
  }

  const statusCode = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (req.originalUrl.startsWith('/api/')) {
    return res.status(statusCode).json({
      success: false,
      message: isDev ? message : (statusCode === 500 ? 'An unexpected server error occurred.' : message),
      ...(isDev && { stack: err.stack }),
    });
  }

  res.status(statusCode).render('public/404', {
    title: 'பிழை ஏற்பட்டது | Server Error',
    message: isDev ? message : 'மன்னிக்கவும், தளத்தில் தொழில்நுட்பக் கோளாறு ஏற்பட்டுள்ளது. சிறிது நேரத்தில் மீண்டும் முயற்சிக்கவும்.',
    statusCode: statusCode,
  });
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
