export default function Home() {
  return (
    <main className="grid min-h-screen place-items-center bg-background p-8 text-foreground">
      <section className="w-full max-w-[760px] rounded-lg border border-[#d9ded9] bg-surface px-8 py-10 shadow-[0_24px_70px_rgb(29_37_34_/_10%)] sm:px-12 sm:py-14 lg:px-[72px] lg:py-[72px]">
        <p className="mb-4 text-sm font-bold uppercase text-accent">
          Next.js App Router
        </p>
        <h1 className="[overflow-wrap:anywhere] text-5xl leading-none font-bold sm:text-7xl">
          mike-t-302f-test-website-004
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted">
          A TypeScript-first baseline application is ready for future feature
          work.
        </p>
      </section>
    </main>
  );
}
