import { Container, Section } from "@/components/layout";

const lifecycleSteps = [
  {
    step: "01",
    title: "Plan",
    description:
      "Clarify the goal, map dependencies, and split work into implementation-sized issues before code changes begin."
  },
  {
    step: "02",
    title: "Build",
    description:
      "Make scoped changes in the repository with typed code, shared components, and validation aligned to the existing project."
  },
  {
    step: "03",
    title: "Deploy",
    description:
      "Produce a runnable build, keep environment requirements explicit, and verify the app in the target runtime shape."
  },
  {
    step: "04",
    title: "Operate",
    description:
      "Carry forward what changed, what passed, and what the next session needs so the product can keep moving."
  }
] as const;

export function HowItWorks() {
  return (
    <Section spacing="lg">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-bold tracking-[0.14em] text-accent uppercase">
            Autonomous SDLC
          </p>
          <h2 className="text-4xl leading-tight font-bold text-foreground sm:text-5xl">
            Plan, build, deploy, and operate as one continuous loop.
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            The workflow is built for founders who want progress without
            project-management drag, while still keeping the code and decisions
            auditable.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {lifecycleSteps.map((item) => (
            <article
              className="rounded-lg border border-[#dce3de] bg-surface p-6"
              key={item.title}
            >
              <p className="text-sm font-bold text-accent">{item.step}</p>
              <h3 className="mt-5 text-2xl font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
