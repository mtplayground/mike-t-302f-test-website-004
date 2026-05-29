import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[#dce3de] bg-background">
      <Container className="flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0 font-semibold text-foreground">{siteConfig.name}</p>
        <p className="m-0">Built for a self-hosted Next.js runtime.</p>
      </Container>
    </footer>
  );
}
