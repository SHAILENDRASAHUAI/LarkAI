import { SectionReveal } from "./SectionReveal";

const steps = [
  {
    title: "Step 1 — Set the context",
    body: "Upload your resume and paste the job description before your interview. LarkAI reads both, so its suggestions sound like you, not a generic template.",
    visual: "context",
  },
  {
    title: "Step 2 — LarkAI listens",
    body: "During your call, LarkAI quietly transcribes what your interviewer is asking, in real time, in the background.",
    visual: "wave",
  },
  {
    title: "Step 3 — You see a grounded answer",
    body: "A short, tailored answer suggestion appears in a small window only visible to you — never captured by screen-sharing.",
    visual: "bubble",
  },
] as const;

function StepVisual({ visual }: { visual: (typeof steps)[number]["visual"] }) {
  if (visual === "wave") {
    return <div className="mini-wave" aria-hidden="true" />;
  }

  if (visual === "bubble") {
    return (
      <div className="mini-bubble" aria-hidden="true">
        <span />
      </div>
    );
  }

  return (
    <div className="mini-context" aria-hidden="true">
      <span />
      <span />
    </div>
  );
}

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-pad" data-rm-index={2}>
      <div className="container">
        <SectionReveal>
          <h2>How LarkAI works</h2>
        </SectionReveal>
        <ol className="steps-grid">
          {steps.map((step) => (
            <li key={step.title}>
              <SectionReveal>
                <StepVisual visual={step.visual} />
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </SectionReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
