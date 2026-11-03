import type { NextConfig } from "next";

// Pin the workspace root to this project, so a lockfile in a parent folder
// can't change where Next.js looks for files.
const projectRoot = process.cwd();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingRoot: projectRoot,
  turbopack: { root: projectRoot },
};

export default nextConfig;
