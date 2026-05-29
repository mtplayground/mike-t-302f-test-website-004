import Image from "next/image";
import { Container, Section } from "@/components/layout";
import { ButtonLink } from "@/components/ui";

export function Hero() {
  return (
    <Section
      className="relative isolate flex min-h-[calc(100svh-6rem)] items-center overflow-hidden bg-foreground text-white sm:min-h-[calc(100svh-5rem)]"
      spacing="none"
    >
      <Image
        alt="Founder workspace with software planning screens and deployment tools"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        fill
        priority
        sizes="100vw"
        src="/images/founder-agent-workspace.png"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(11_18_16_/_92%)_0%,rgb(11_18_16_/_76%)_34%,rgb(11_18_16_/_34%)_68%,rgb(11_18_16_/_10%)_100%)]" />

      <Container className="py-16 sm:py-24 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-5 text-sm font-bold tracking-[0.14em] text-[#9fe3d9] uppercase">
            Autonomous software delivery
          </p>
          <h1 className="text-4xl leading-none font-bold text-balance sm:text-6xl lg:text-7xl">
            Agent Team for Founders
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#d9e7e2] sm:text-2xl sm:leading-9">
            You just talk, we handle the rest
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="#lead" size="lg">
              Start the conversation
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
