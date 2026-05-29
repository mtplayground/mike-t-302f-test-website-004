import { Container, Section } from "@/components/layout";
import { LeadCaptureForm } from "@/components/lead";

export function FinalCta() {
  return (
    <Section
      className="border-t border-[#dce3de]"
      id="lead"
      spacing="lg"
      tone="foreground"
    >
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(360px,460px)] lg:gap-14">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-bold tracking-[0.14em] text-[#9fe3d9] uppercase">
              Ready when you are
            </p>
            <h2 className="text-3xl leading-tight font-bold text-balance sm:text-5xl">
              Bring your next software move into GitHub.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d9e7e2]">
              Start with the outcome you want. The work can move from plan to
              pull request to deployable build while you keep the repository,
              history, and decisions in your hands.
            </p>
          </div>
          <LeadCaptureForm />
        </div>
      </Container>
    </Section>
  );
}
