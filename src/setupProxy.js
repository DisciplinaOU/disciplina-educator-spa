const { createProxyMiddleware } = require("http-proxy-middleware");

const aaa = createProxyMiddleware({
  pathRewrite: path => path.replace(process.env.REACT_APP_AAA, ""),
  target: process.env.REACT_APP_AAA_PROXY,
  changeOrigin: true
});

const educator = createProxyMiddleware({
  pathRewrite: path => path.replace(process.env.REACT_APP_EDUCATOR, ""),
  target: process.env.REACT_APP_EDUCATOR_PROXY,
  changeOrigin: true
});

const proxies = app => {
  app.use(process.env.REACT_APP_AAA, aaa);
  app.use(process.env.REACT_APP_EDUCATOR, educator);
};

module.exports = proxies;
