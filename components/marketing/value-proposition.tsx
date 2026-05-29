import { Container, Section } from "@/components/layout";

const ownershipPoints = [
  {
    title: "Your repo remains the source of truth",
    description:
      "Work is organized around GitHub issues, branches, commits, and pull requests so the codebase stays inspectable and portable."
  },
  {
    title: "Every change is reviewable",
    description:
      "Implementation moves through visible diffs and validation steps instead of hidden handoffs or opaque project status."
  },
  {
    title: "Delivery keeps operating context",
    description:
      "Build, deployment, environment, and runtime notes live with the project so future changes start from the real system state."
  }
] as const;

export function ValueProposition() {
  return (
    <Section spacing="lg" tone="surface">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-4 text-sm font-bold tracking-[0.14em] text-accent uppercase">
              Founder leverage
            </p>
            <h2 className="max-w-2xl text-3xl leading-tight font-bold text-foreground sm:text-5xl">
              Software work moves forward while you stay focused on decisions.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
              The system translates product direction into planned, built,
              deployed, and operated code changes without taking ownership away
              from your GitHub repository.
            </p>
          </div>

          <div className="grid gap-4">
            {ownershipPoints.map((point) => (
              <article
                className="rounded-lg border border-[#dce3de] bg-background p-5 sm:p-6"
                key={point.title}
              >
                <h3 className="text-xl font-bold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-muted">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
