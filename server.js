const http = require('http');
const fs = require('fs');
const path = require('path');

let port = parseInt(process.env.PORT || '3000', 10);
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(path.join(ROOT, reqPath));
  if (!safePath.startsWith(ROOT)) {
    res.statusCode = 403;
    res.end('Access Denied');
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const htmlPath = safePath + '.html';
      if (fs.existsSync(htmlPath)) {
        serveFile(htmlPath, req, res);
        return;
      }
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end('<h1>404 Not Found</h1><p><a href="/">Return Home</a></p>');
      return;
    }

    serveFile(safePath, req, res, stats);
  });
});

function serveFile(filePath, req, res, stats) {
  if (!stats) {
    stats = fs.statSync(filePath);
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const range = req.headers.range;
  if (range && ext === '.mp4') {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stats.size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': contentType
    });
    file.pipe(res);
    return;
  }

  res.writeHead(200, {
    'Content-Length': stats.size,
    'Content-Type': contentType,
    'Cache-Control': 'no-cache'
  });

  fs.createReadStream(filePath).pipe(res);
}

function startListening(p) {
  server.listen(p, () => {
    console.log(`\n==============================================`);
    console.log(`  Portfolio is running!`);
    console.log(`  Local URL: http://localhost:${p}`);
    console.log(`==============================================\n`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    port += 1;
    startListening(port);
  } else {
    console.error('Server error:', err);
  }
});

startListening(port);
