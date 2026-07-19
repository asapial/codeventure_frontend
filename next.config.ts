import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Permanent redirects from the legacy `/account/*` workspace to the new
  // role-aware `/dashboard/*` shell. Kept as 308s so query strings + method
  // are preserved.
  async redirects() {
    return [
      { source: "/account", destination: "/dashboard", permanent: true },
      {
        source: "/account/projects",
        destination: "/dashboard/projects",
        permanent: true,
      },
      {
        source: "/account/projects/:slug",
        destination: "/dashboard/projects/:slug",
        permanent: true,
      },
      {
        source: "/account/billing",
        destination: "/dashboard/billing",
        permanent: true,
      },
      {
        source: "/account/members",
        destination: "/dashboard/members",
        permanent: true,
      },
      {
        source: "/account/settings",
        destination: "/dashboard/settings",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
