const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// تقديم ملفات الواجهة
app.use(express.static(path.join(__dirname, 'public')));

// تحليل user-agent للحصول على OS والمتصفح
const detectOS = (ua) => {
  if (ua.includes('Windows NT 10.0')) return 'Windows 10';
  if (ua.includes('Windows NT 6.1')) return 'Windows 7';
  if (ua.includes('Mac OS X')) return 'macOS';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone')) return 'iOS';
  if (ua.includes('Linux')) return 'Linux';
  return 'غير معروف';
};

const detectBrowser = (ua) => {
  if (ua.includes('Chrome')) return 'Google Chrome';
  if (ua.includes('Firefox')) return 'Mozilla Firefox';
  if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
  if (ua.includes('Edge')) return 'Microsoft Edge';
  return 'غير معروف';
};

// API ترجع IP وOS والمتصفح
app.get('/api/info', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';
  const os = detectOS(userAgent);
  const browser = detectBrowser(userAgent);

  res.json({ ip, os, browser });
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
