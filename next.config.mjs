/** @type {import('next').NextConfig} */
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const basePath = configuredBasePath === "/" ? "" : configuredBasePath.replace(/\/$/, "");

if (basePath && !basePath.startsWith("/")) {
  throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or start with '/'.");
}

const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
