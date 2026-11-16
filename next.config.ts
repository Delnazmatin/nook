import path from "node:path";
import type { NextConfig } from "next";

// `next dev` serves its dev-only assets (chunks, HMR socket, fonts) only to
// localhost by default. Opening the app from a phone over the LAN therefore
// loads the HTML but never hydrates, so every client component stays inert.
// Extra hosts can be added with ALLOWED_DEV_ORIGINS=host1,host2.
const extraDevOrigins = (process.env.ALLOWED_DEV_ORIGINS ?? "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve("."),
  },
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local", ...extraDevOrigins],
};

export default nextConfig;
