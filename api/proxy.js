import { createProxyMiddleware } from "http-proxy-middleware";
import { createServer } from "http";

const target = "https://eaglercraft.com";

// Reusable handler
const proxy = createProxyMiddleware({
  target,
  changeOrigin: true,
  ws: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader("Host", new URL(target).host);
  }
});

export default function handler(req, res) {
  proxy(req, res, (err) => {
    res.statusCode = 500;
    res.end("Proxy error: " + err.message);
  });
}
