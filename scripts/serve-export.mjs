import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";

const root = path.resolve(process.env.STATIC_DIRECTORY ?? "out");
const configuredPrefix = process.env.BASE_PATH ?? "/login-detection";
const prefix = configuredPrefix === "/" ? "" : `/${configuredPrefix.replace(/^\/+|\/+$/g, "")}`;
const port = Number(process.env.PORT ?? 3002);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
};

function fileFor(pathname) {
  if (prefix && pathname !== prefix && !pathname.startsWith(`${prefix}/`)) return null;
  const relativeUrl = prefix ? pathname.slice(prefix.length) : pathname;
  const decoded = decodeURIComponent(relativeUrl).replace(/^\/+/, "");
  const candidates = decoded.endsWith("/") || decoded === ""
    ? [path.join(root, decoded, "index.html")]
    : [path.join(root, decoded), path.join(root, `${decoded}.html`), path.join(root, decoded, "index.html")];

  return candidates.find((candidate) => candidate.startsWith(`${root}${path.sep}`) && existsSync(candidate) && statSync(candidate).isFile()) ?? null;
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", `http://${request.headers.host ?? `127.0.0.1:${port}`}`);
  const file = fileFor(url.pathname);
  if (!file) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  response.writeHead(200, {
    "cache-control": "no-store",
    "content-type": contentTypes[path.extname(file)] ?? "application/octet-stream",
  });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static export available at http://127.0.0.1:${port}${prefix}/`);
});
