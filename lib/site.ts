export const siteConfig = {
  name: "mike-t-302f-test-website-004",
  title: "Agent Team for Founders",
  description:
    "Autonomous software delivery for founders, from plan to pull request to deployable build inside GitHub.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:8080",
  locale: "en_US",
  socialImage: {
    path: "/images/founder-agent-workspace.png",
    width: 1672,
    height: 941,
    alt: "Founder workspace with software planning screens and deployment tools"
  }
} as const;
