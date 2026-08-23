// GitHub Pages serves this site from a repository sub-path (/my-shop), so absolute
// URLs need that prefix. Next.js applies `basePath` to next/link and next/router
// automatically, but NOT to `next/image` when `unoptimized` is set, and not to raw
// fetch() calls - those two cases must prefix manually via withBasePath().
//
// The value is inlined at build time (see next.config.mjs) so it is identical on the
// server and on the client, which avoids a hydration mismatch.

export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path) {
  // Leave relative paths and external URLs (http://, https://, data:) untouched.
  if (typeof path !== "string" || !path.startsWith("/")) return path;
  // Never prefix twice.
  if (BASE_PATH && path.startsWith(`${BASE_PATH}/`)) return path;
  return `${BASE_PATH}${path}`;
}
