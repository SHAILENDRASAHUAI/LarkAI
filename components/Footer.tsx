const columns = {
  Product: ["How it works", "Pricing", "FAQ"],
  Company: ["About", "Contact", "Careers"],
  Legal: ["Privacy", "Terms", "Data policy"],
};

export function Footer() {
  return (
    <footer className="footer-shell" data-rm-index={4}>
      <div className="container">
        <p className="wordmark footer-wordmark">LarkAI</p>
        <div className="footer-grid">
          {Object.entries(columns).map(([title, items]) => (
            <div key={title}>
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#top">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="copyright">© {new Date().getFullYear()} LarkAI. All rights reserved.</p>
        <p className="disclosure">
          LarkAI is a preparation and confidence tool. Always follow your interviewer&apos;s and
          employer&apos;s guidelines regarding recording and third-party tools during interviews.
        </p>
      </div>
    </footer>
  );
}
