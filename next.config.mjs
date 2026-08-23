/** @type {import('next').NextConfig} */

// GitHub Pages serves this site from https://<user>.github.io/my-shop, so the app
// needs a basePath. It is declared here rather than injected by the Pages workflow
// so that a local `next build` produces exactly what CI produces, and so the same
// value can be reused for image and fetch URLs via NEXT_PUBLIC_BASE_PATH.
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.NODE_ENV === 'production' ? '/my-shop' : '');

const nextConfig = {
  output: 'export',
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
