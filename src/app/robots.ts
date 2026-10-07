import type { MetadataRoute } from "next";

// Staging: se permite el rastreo para que los bots lean el noindex (meta + X-Robots-Tag).
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }] };
}
