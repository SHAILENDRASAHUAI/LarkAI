import { SectionReveal } from "./SectionReveal";

export function ProductShowcaseSection() {
  return (
    <section className="section-pad" data-rm-index={3}>
      <div className="container showcase-wrap">
        <SectionReveal>
          <div className="call-window-mock" aria-hidden="true" />
          <div className="overlay-panel">
            <p className="overlay-question">
              Tell me about a time you had to learn something quickly under pressure.
            </p>
            <p>
              In my previous role, our team lost access to a third-party API two days before a
              launch. I volunteered to own the replacement work, learned the new provider&apos;s SDK
              overnight, and built a small adapter so the rest of the codebase stayed unchanged. We
              shipped on schedule, and I documented the migration path so teammates could support it
              after release.
            </p>
          </div>
          <p className="overlay-caption">Private to you. Invisible to your interviewer.</p>
        </SectionReveal>
      </div>
    </section>
  );
}
