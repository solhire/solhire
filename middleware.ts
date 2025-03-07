import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
export default authMiddleware({
  publicRoutes: [
    "/",
    "/api/webhook",
    "/become-creator",
    "/login",
    "/register",
    "/api/webhooks(.*)",
    "/profile/:username", // Public profile viewing
    "/jobs", // Public job listings
    "/jobs/:id", // Public job details
    "/search", // Public search
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    "/faq"
  ],
  ignoredRoutes: [
    "/api/webhooks(.*)",
  ]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 