import { SectionReveal } from "./SectionReveal";

const plans: Array<{
  name: string;
  price: string;
  detail: string;
  sub: string;
  cta: string;
  featured?: boolean;
}> = [
  {
    name: "Starter",
    price: "$29",
    detail: "5 interview credits",
    sub: "1 credit = 1 hour of live use",
    cta: "Get Starter",
  },
  {
    name: "Most candidates choose this — Standard",
    price: "$79",
    detail: "15 interview credits",
    sub: "Enough for a full interview loop",
    cta: "Get Standard",
    featured: true,
  },
  {
    name: "Unlimited prep — Pro",
    price: "$149/mo",
    detail: "Unlimited live sessions",
    sub: "Best for an active, multi-company search",
    cta: "Get Pro",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="section-pad pricing-on-light" data-rm-index={4}>
      <div className="container">
        <SectionReveal>
          <h2>Pay for what you need, not a subscription you&apos;ll forget to cancel</h2>
        </SectionReveal>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <SectionReveal key={plan.name}>
              <article className={`price-card ${plan.featured ? "featured" : ""}`}>
                <h3>{plan.name}</h3>
                <p className="price">{plan.price}</p>
                <p>{plan.detail}</p>
                <p>{plan.sub}</p>
                <a className="cta-button" href="#final-cta">
                  {plan.cta}
                </a>
              </article>
            </SectionReveal>
          ))}
        </div>
        <p className="credits-note">Credits never expire.</p>
      </div>
    </section>
  );
}
