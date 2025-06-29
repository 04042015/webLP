// Configuration untuk berbagai platform deployment

export const deploymentConfig = {
  // Netlify - Static Export
  netlify: {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
    features: {
      serverActions: false,
      apiRoutes: false,
      database: "client-side-only",
    },
  },

  // Vercel - Full Next.js
  vercel: {
    output: undefined,
    serverActions: true,
    apiRoutes: true,
    database: "full-support",
  },

  // Railway/Render - Docker
  docker: {
    output: undefined,
    serverActions: true,
    apiRoutes: true,
    database: "full-support",
  },
}

// Environment variables checker
export function checkDeploymentReadiness() {
  const requiredEnvVars = ["NEXT_PUBLIC_ADMIN_PASSWORD", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missing.length > 0) {
    console.warn("Missing environment variables:", missing)
    return false
  }

  return true
}
