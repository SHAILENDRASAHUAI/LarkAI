import Link from "next/link";
import { HeroVisual } from "@/components/HeroVisual";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <div className="page-shell">
      <ScrollProgress />
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <nav className="site-nav" aria-label="Primary">
        <span className="wordmark">LarkAI</span>
        <div className="nav-actions">
          <Link href="#how-it-works">How it works</Link>
          <Link href="#privacy">Privacy</Link>
          <Link href="/signup" className="button-link">
            Try LarkAI
          </Link>
        </div>
      </nav>

      <main id="main-content">
        <section className="hero section-wrap">
          <div>
            <p className="eyebrow">Built for live interviews</p>
            <h1>Real-time interview confidence, grounded in your resume.</h1>
            <p className="lead-copy">
              LarkAI listens during your interview. A quiet suggestion appears when you need it. You stay focused on the
              conversation.
            </p>
            <div className="hero-cta-row">
              <Link href="/signup" className="button-link">
                Try LarkAI
              </Link>
              <Link href="#how-it-works" className="text-link">
                See how it works
              </Link>
            </div>
          </div>
          <HeroVisual />
        </section>

        <section id="how-it-works" className="section-wrap section-card">
          <h2>How it works</h2>
          <p>
            Share your resume once. Start your interview. If you pause, LarkAI shows a private, concise suggestion based
            on your own experience.
          </p>
        </section>

        <section id="privacy" className="section-wrap section-card">
          <h2>Private by design</h2>
          <p>
            Suggestions are visible only to you. LarkAI does not interrupt the call and does not post messages into your
            meeting chat.
          </p>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <h2>Start with one free interview session</h2>
        <Link href="/signup" className="button-link">
          Try LarkAI
        </Link>
      </footer>
    </div>
  );
}
