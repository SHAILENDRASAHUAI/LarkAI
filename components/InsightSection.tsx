import { SectionReveal } from "./SectionReveal";

export function InsightSection() {
  return (
    <section className="section-pad" data-rm-index={1}>
      <div className="container narrow center-block">
        <SectionReveal>
          <h2>You know the answer. The problem is the twelve seconds after the question.</h2>
          <p>
            Interviews reward fast, structured thinking under pressure — a skill that has nothing to
            do with whether you&apos;re qualified for the job. Non-native speakers, people with
            interview anxiety, and candidates who simply freeze under scrutiny are often judged on
            their delivery, not their ability. LarkAI exists to close that twelve-second gap.
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
