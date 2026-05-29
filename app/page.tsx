import { Container, Section } from "@/components/layout";
import { siteConfig } from "@/lib/site";

export default function Home() {
  return (
    <Section className="flex min-h-[62vh] items-center" spacing="lg">
      <Container size="narrow">
        <p className="mb-4 text-sm font-bold uppercase text-accent">
          Next.js App Router
        </p>
        <h1 className="[overflow-wrap:anywhere] text-5xl leading-none font-bold sm:text-7xl">
          {siteConfig.name}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
          A TypeScript-first baseline application now has a shared marketing
          shell and reusable layout primitives for future feature work.
        </p>
      </Container>
    </Section>
  );
}
