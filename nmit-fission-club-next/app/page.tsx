"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const cursor = document.querySelector<HTMLElement>(".cursor-glow");
    const menu = document.querySelector<HTMLButtonElement>(".menu-toggle");
    const nav = document.querySelector<HTMLElement>(".nav-links");

    const onMouseMove = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const onMenuClick = () => {
      if (!nav || !menu) return;
      const open = nav.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    };

    menu?.addEventListener("click", onMenuClick);

    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".nav-links a"));
    const closeMenu = () => nav?.classList.remove("open");
    navLinks.forEach((a) => a.addEventListener("click", closeMenu));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

    const cards = Array.from(document.querySelectorAll<HTMLElement>(".card"));
    const cardHandlers = new Map<HTMLElement, (e: MouseEvent) => void>();

    cards.forEach((card) => {
      const handler = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      };
      cardHandlers.set(card, handler);
      card.addEventListener("mousemove", handler);
    });

    const sections = document.querySelectorAll("main section[id]");
    const navAnchors = document.querySelectorAll<HTMLAnchorElement>(".nav-links a:not(.nav-button)");

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navAnchors.forEach((a) =>
              a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
            );
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );

    sections.forEach((section) => activeObserver.observe(section));

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      menu?.removeEventListener("click", onMenuClick);
      navLinks.forEach((a) => a.removeEventListener("click", closeMenu));
      revealObserver.disconnect();
      activeObserver.disconnect();
      cards.forEach((card) => {
        const handler = cardHandlers.get(card);
        if (handler) card.removeEventListener("mousemove", handler);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" />
      <div className="page-grid" />

      <header className="navbar">
        <a className="brand" href="#home" aria-label="FISSION home">
          <img src="/fission-logo.png" alt="FISSION logo" />
          <span>FISS<span>ION</span></span>
        </a>

        <button className="menu-toggle" aria-label="Open menu" aria-expanded="false">
          <span />
          <span />
          <span />
        </button>

        <nav className="nav-links">
          <a className="active" href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#what-we-do">What We Do</a>
          <a href="#vision">Vision &amp; Mission</a>
          <a href="#join">Join Us</a>
          <a className="nav-button" href="#join">Join FISSION <b>→</b></a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy reveal">
            <div className="eyebrow"><span /> AI &amp; MACHINE LEARNING • NMIT</div>
            <h1><span>AI STARTS</span><strong>HERE.</strong></h1>
            <p className="hero-subtitle">Artificial Intelligence &amp;<br />Machine Learning <em>Student Club</em></p>
            <p className="hero-description">
              A community of curious minds building, learning and innovating with technology.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#about">Explore More <span>→</span></a>
              <a className="button outline" href="#join">Join the Community <span>↗</span></a>
            </div>
          </div>

          <div className="hero-visual reveal">
            <div className="visual-aura" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="hero-logo">
              <img src="/fission-hero.png" alt="FISSION AI and Machine Learning Club" />
            </div>
            <span className="spark s1" /><span className="spark s2" /><span className="spark s3" />
          </div>

          <a className="scroll-down" href="#about" aria-label="Scroll to about">
            <span>⌄</span>
          </a>
          <div className="hero-wave" />
        </section>

        <section className="section about" id="about">
          <div className="section-label reveal">ABOUT <span>FISSION</span></div>
          <div className="about-grid">
            <div className="about-intro reveal">
              <h2>Building the<br /><span>future of learning.</span></h2>
            </div>
            <div className="about-copy reveal">
              <p className="lead">We bring together students who are passionate about technology, innovation, creativity, and problem-solving.</p>
              <div className="copy-line" />
              <p>
                FISSION is the Artificial Intelligence and Machine Learning student club of Nitte Meenakshi Institute of Technology (NMIT), Bengaluru. We provide a platform to learn beyond the classroom, explore emerging technologies, build practical skills, and collaborate on innovative ideas.
              </p>
            </div>
          </div>
        </section>

        <section className="section what-we-do" id="what-we-do">
          <div className="section-heading reveal">
            <div>
              <div className="section-label">WHAT <span>WE DO</span></div>
              <h2>Learn. Build. <span>Innovate.</span></h2>
            </div>
            <p>Hands-on opportunities to turn curiosity into practical skills and meaningful work.</p>
          </div>

          <div className="cards">
            <article className="card reveal"><div className="card-icon">&lt;/&gt;</div><h3>Learn</h3><p>Workshops and technical sessions designed to build practical skills.</p><i>01</i></article>
            <article className="card reveal"><div className="card-icon">♜</div><h3>Compete</h3><p>Competitions and challenges that push you to think and create.</p><i>02</i></article>
            <article className="card reveal"><div className="card-icon">◇</div><h3>Innovate</h3><p>Turn ideas into projects and explore real-world solutions.</p><i>03</i></article>
            <article className="card reveal"><div className="card-icon">◎</div><h3>Collaborate</h3><p>Learn from peers and build meaningful connections.</p><i>04</i></article>
            <article className="card reveal"><div className="card-icon">↗</div><h3>Explore</h3><p>Stay connected with emerging technologies and industry trends.</p><i>05</i></article>
          </div>
        </section>

        <section className="section vision" id="vision">
          <div className="center-heading reveal">
            <div className="section-label">OUR <span>VISION &amp; MISSION</span></div>
            <h2>Curiosity into <span>impact.</span></h2>
          </div>

          <div className="vision-grid">
            <article className="vision-card reveal">
              <div className="round-icon">◉</div>
              <div><small>OUR VISION</small><p>To create a vibrant student community where curiosity leads to learning, learning leads to innovation, and innovation creates real-world impact.</p></div>
            </article>
            <article className="vision-card reveal">
              <div className="round-icon">⌁</div>
              <div><small>OUR MISSION</small><p>To empower students with the knowledge, skills, exposure, and collaborative environment needed to explore technology, develop innovative solutions, and prepare for the future.</p></div>
            </article>
          </div>
        </section>

        <section className="join" id="join">
          <div className="join-glow" />
          <div className="join-inner reveal">
            <div>
              <div className="eyebrow"><span /> FISSION • NMIT</div>
              <h2>Ready to <span>innovate</span><br />and make an impact?</h2>
              <p>Whether you&apos;re taking your first step into technology or already building, FISSION gives you a place to learn, contribute and grow.</p>
            </div>
            <a className="button primary" href="https://www.instagram.com/fission.nmit?stkn=ZGQ3d25kYmxmOWc5" target="_blank" rel="noopener noreferrer">Join FISSION Today <span>→</span></a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <img src="/fission-logo.png" alt="FISSION logo" />
          <div><strong>FISS<span>ION</span></strong><small>AI STARTS HERE</small></div>
        </div>
        <div className="footer-links">
          <a href="#home">Home</a><a href="#about">About</a><a href="#what-we-do">What We Do</a><a href="#vision">Vision &amp; Mission</a><a href="#join">Join Us</a>
        </div>
        <div className="social">
          <small>CONNECT WITH US</small>
          <div>
            <a href="https://www.instagram.com/fission.nmit?stkn=ZGQ3d25kYmxmOWc5" target="_blank" rel="noopener noreferrer" aria-label="Instagram">◎</a>
            <a href="https://www.linkedin.com/company/fission-nmit/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          </div>
        </div>
        <p className="copyright">© 2026 FISSION Club, NMIT. All rights reserved.</p>
      </footer>
    </>
  );
}
