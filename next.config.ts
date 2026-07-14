import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The /public placeholders are SVGs so the site renders offline. Drop real
    // .jpg/.png photos over the same filenames later and they'll work as-is.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
