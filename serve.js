const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 8080;
const host = '127.0.0.1'; // bind to localhost to avoid URL ACL issues
const root = process.cwd();

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

function send404(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('404 Not Found');
}

const server = http.createServer((req, res) => {
  try {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);
    if (reqPath === '/') reqPath = '/index.html';
    let filePath = path.join(root, reqPath);

    // Prevent path traversal
    if (!filePath.startsWith(root)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (err) return send404(res);
      if (stats.isDirectory()) filePath = path.join(filePath, 'index.html');

      const ext = path.extname(filePath).toLowerCase();
      const type = mime[ext] || 'application/octet-stream';
      res.setHeader('Content-Type', type);

      const stream = fs.createReadStream(filePath);
      stream.on('error', () => {
        res.statusCode = 500;
        res.end('Server error');
      });
      stream.pipe(res);
    });
  } catch (e) {
    res.statusCode = 500;
    res.end('Internal server error');
  }
});

server.listen(port, host, () => {
  console.log(`Static server serving ${root} at http://${host}:${port}`);
  console.log('Press CTRL+C to stop');
});

process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
