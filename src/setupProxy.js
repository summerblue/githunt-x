const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/reddit-api',
    createProxyMiddleware({
      target: 'https://www.reddit.com',
      changeOrigin: true,
      pathRewrite: { '^/reddit-api': '' },
      headers: {
        'User-Agent': 'GitHunt/1.0',
      },
    })
  );
};
