import { SectionReveal } from "./SectionReveal";

const lines = [
  "LarkAI never appears in your shared screen, even when you&apos;re sharing your full application window.",
  "Nothing you say or see inside LarkAI is shared with your interviewer or their company.",
  "You can delete your interview transcripts at any time from your dashboard.",
];

export function TrustSection() {
  return (
    <section id="privacy" className="section-pad trust-on-light" data-rm-index={4}>
      <div className="container narrow">
        <SectionReveal>
          <h2>Built to stay out of the way</h2>
          <div className="trust-lines">
            {lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
