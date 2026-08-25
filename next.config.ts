import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.kamlesh.tech" }],
        destination: "https://kamlesh.tech/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
