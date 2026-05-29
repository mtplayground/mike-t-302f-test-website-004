import Link from "next/link";
import { Container } from "@/components/layout/container";
import { siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-[#dce3de] bg-background/95">
      <Container className="flex min-h-16 items-center justify-between gap-4 py-3">
        <Link
          aria-label={`${siteConfig.name} home`}
          className="flex min-w-0 items-center gap-3 text-foreground"
          href="/"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-foreground text-sm font-bold text-background">
            M
          </span>
          <span className="truncate text-sm font-bold sm:text-base">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2">
          <Link
            className="rounded-md px-3 py-2 text-sm font-semibold text-muted transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            href="/"
          >
            Home
          </Link>
        </nav>
      </Container>
    </header>
  );
}
