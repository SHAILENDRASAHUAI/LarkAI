import { SectionReveal } from "./SectionReveal";

export function FinalCtaSection() {
  return (
    <section id="final-cta" className="section-pad-lg final-on-light" data-rm-index={4}>
      <div className="container narrow final-cta-copy">
        <SectionReveal>
          <h2>Your next interview doesn&apos;t have to feel like a guessing game.</h2>
          <a className="cta-button" href="#top">
            Try LarkAI free
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
