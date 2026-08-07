"use client";

import { useEffect, useRef, useState } from "react";

const properties = [
  { place: "Goa · India", name: "Casa Aurelia", meta: "5 beds · 7 baths · 11,200 sq ft", price: "₹18.5 Cr", pos: "70% center" },
  { place: "Alibaug · India", name: "The Quiet House", meta: "4 beds · 5 baths · 8,400 sq ft", price: "₹12.8 Cr", pos: "100% center" },
  { place: "Bengaluru · India", name: "Atelier 27", meta: "4 beds · 4 baths · 6,100 sq ft", price: "₹9.4 Cr", pos: "48% center" },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [mode, setMode] = useState("Buy");
  const [saved, setSaved] = useState<number[]>([]);
  const cursor = useRef<HTMLDivElement>(null);
  const parallax = useRef<HTMLElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (cursor.current) cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
    };
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");
    reveals.forEach((el) => {
      const section = el.closest("section, footer");
      const siblings = section ? Array.from(section.querySelectorAll(".reveal")) : [];
      const order = Math.min(4, Math.max(0, siblings.indexOf(el)));
      el.style.setProperty("--motion-delay", `${order * 90}ms`);
    });
    const motionSections = document.querySelectorAll<HTMLElement>("main > section, main > footer");
    motionSections.forEach((section, index) => {
      section.classList.add("motion-section");
      section.dataset.motionIndex = String(index);
    });

    const setMotionState = (section: HTMLElement, state: "before" | "active" | "after") => {
      if (section.classList.contains(`motion-${state}`)) return;
      section.classList.remove("motion-before", "motion-active", "motion-after");
      section.classList.add(`motion-${state}`);
      section.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
        element.classList.toggle("is-visible", state === "active");
        element.classList.toggle("is-past", state === "after");
      });
    };
    const updateSectionMotion = () => {
      const viewport = window.innerHeight;
      motionSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const visiblePixels = Math.max(0, Math.min(rect.bottom, viewport) - Math.max(rect.top, 0));
        const visibleRatio = visiblePixels / Math.max(1, Math.min(rect.height, viewport));
        const isActive = section.classList.contains("motion-active");
        let state: "before" | "active" | "after";
        if (rect.bottom <= 0) state = "after";
        else if (rect.top >= viewport) state = "before";
        else if (isActive && visibleRatio > .4) state = "active";
        else if (!isActive && visibleRatio >= .6) state = "active";
        else state = rect.top < 0 ? "after" : "before";
        setMotionState(section, state);
      });
    };
    let frame = 0;
    const updateParallax = () => {
      frame = 0;
      updateSectionMotion();
      const scene = parallax.current;
      if (!scene) return;
      const rect = scene.getBoundingClientRect();
      const distance = Math.max(1, rect.height - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / distance));
      scene.style.setProperty("--p", progress.toFixed(4));

    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main>
      <div className="cursor" ref={cursor} />
      <div className="grain" />
      <header className="nav">
        <a className="brand" href="#top" aria-label="ARIKA REALTY home">
          <img className="brand-logo" src="/arika-logo-transparent.png" alt="ARIKA REALTY — Building Legacies" width="1280" height="853" />
        </a>
        <nav aria-label="Primary navigation">
          <a href="#residences">Residences</a><a href="#story">Our story</a><a href="#journal">Journal</a>
        </nav>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Toggle menu"><i/><i/></button>
        <a className="nav-cta" href="#contact">Private consultation <Arrow/></a>
      </header>

      <div className={`menu-panel ${menu ? "open" : ""}`}>
        <div className="menu-head"><img src="/arika-logo-transparent.png" alt="ARIKA REALTY" width="1280" height="853"/><button onClick={() => setMenu(false)} aria-label="Close menu">Close ×</button></div>
        {["Residences", "Our story", "Journal", "Contact"].map((x, i) => <a key={x} onClick={() => setMenu(false)} href={`#${x.toLowerCase().replace(" ", "-")}`}><small>0{i+1}</small>{x}</a>)}
      </div>

      <section
        className="parallax-hero"
        id="top"
        ref={parallax}
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty("--px", ((event.clientX / bounds.width) - .5).toFixed(3));
          event.currentTarget.style.setProperty("--py", ((event.clientY / window.innerHeight) - .5).toFixed(3));
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--px", "0");
          event.currentTarget.style.setProperty("--py", "0");
        }}
      >
        <div className="parallax-stage">
          <img className="parallax-sky" src="/parallax-sky.png" alt="" aria-hidden="true" />
          <div className="parallax-haze" />
          <img className="parallax-cloud parallax-cloud-far" src="/parallax-cloud-far-alpha.png" alt="" aria-hidden="true" />
          <div className="parallax-ghost" aria-hidden="true">ARIKA</div>
          <div className="parallax-copy">
            <p className="eyebrow">Private residences · India &amp; beyond</p>
            <h1><span>Built beyond</span><em>the expected.</em></h1>
            <p>Rare addresses. Considered architecture.<br/>A legacy shaped around you.</p>
            <a href="#legacy">Discover ARIKA <Arrow/></a>
          </div>
          <img className="parallax-house" src="/parallax-house.png" alt="Contemporary luxury residence represented by ARIKA REALTY" />
          <img className="parallax-cloud parallax-cloud-near" src="/parallax-cloud-near-alpha.png" alt="" aria-hidden="true" />
          <div className="parallax-vignette" />
          <div className="parallax-meta"><span>AR—00</span><span>Scroll to enter</span><i>↓</i></div>
        </div>
      </section>

      <section className="hero hero-secondary" id="legacy">
        <div className="hero-media" />
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">Extraordinary homes · India & beyond</p>
          <h1><span>Space to live.</span><em>Room to become.</em></h1>
          <p className="hero-sub">Exceptional homes, quietly discovered. Personal representation for people who expect more than a transaction.</p>
        </div>
        <a className="explore" href="#residences"><span>Explore<br/>residences</span><b>↓</b></a>
        <div className="hero-index"><span>AR—01</span><span>18.5204° N</span></div>
      </section>

      <section className="intro" id="story">
        <div className="intro-top reveal"><p className="eyebrow">The ARIKA perspective</p><span>( Since 2012 )</span></div>
        <p className="manifesto reveal">A home is not an address.<br/>It is the <em>architecture</em> of a life.</p>
        <div className="intro-bottom reveal"><p>We represent a considered collection of remarkable homes and the people drawn to them. Every introduction is personal. Every detail, intentional.</p><a className="circle-link" href="#contact">Our approach <Arrow/></a></div>
      </section>

      <section className="finder" aria-label="Property search" onPointerMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--fx", `${event.clientX - bounds.left}px`);
        event.currentTarget.style.setProperty("--fy", `${event.clientY - bounds.top}px`);
      }}>
        <div className="finder-head reveal"><div><p className="eyebrow">Begin your search</p><h2>Where will life<br/><em>take you?</em></h2></div><div className={`mode-switch ${mode === "Rent" ? "is-rent" : ""}`}>{["Buy","Rent"].map(x => <button type="button" aria-pressed={mode===x} onClick={() => setMode(x)} className={mode===x?"active":""} key={x}>{x}</button>)}</div></div>
        <form className="search-bar reveal" onSubmit={(e) => e.preventDefault()}>
          <label><span>01 / Location</span><input aria-label="Location" placeholder="City, neighbourhood or landmark" /></label>
          <label><span>02 / Property type</span><select aria-label="Property type"><option>All residences</option><option>Villa</option><option>Penthouse</option><option>Estate</option></select></label>
          <label><span>03 / Price range</span><select aria-label="Price range"><option>Any price</option><option>₹5–10 Cr</option><option>₹10–20 Cr</option><option>₹20 Cr+</option></select></label>
          <button className="search-submit"><span className="mode-copy" key={mode}>View {mode === "Buy" ? "properties" : "rentals"}</span> <Arrow/></button>
        </form>
      </section>

      <section className="featured" id="residences">
        <div className="section-title reveal"><div><p className="eyebrow">Private collection · 2026</p><h2>Curated<br/><em>residences</em></h2></div><p>Architecture of consequence.<br/>Locations without compromise.</p></div>
        <div className="property-grid">
          {properties.map((p, i) => <article className="property reveal" key={p.name}>
            <div className="property-image" style={{backgroundPosition:p.pos}}><span>0{i+1}</span><button aria-label={`Save ${p.name}`} className={saved.includes(i)?"saved":""} onClick={() => setSaved(v => v.includes(i)?v.filter(x=>x!==i):[...v,i])}>♡</button><a href="#contact" aria-label={`View ${p.name}`}>View residence <Arrow/></a></div>
            <div className="property-info"><div><p>{p.place}</p><h3>{p.name}</h3><small>{p.meta}</small></div><strong>{p.price}</strong></div>
          </article>)}
        </div>
        <a className="text-link reveal" href="#contact">Explore the complete collection <Arrow/></a>
      </section>

      <section className="services">
        <p className="eyebrow reveal">What moves you</p>
        {["Find","Sell","Invest"].map((x,i)=><a
          href="#contact"
          className="service reveal"
          key={x}
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--mx", `${event.clientX - bounds.left}px`);
            event.currentTarget.style.setProperty("--my", `${event.clientY - bounds.top}px`);
          }}
        >
          <small className="service-index">0{i+1}</small>
          <span className="service-title">{x}</span>
          <p>{i===0?"Discover a place that feels inevitable.":i===1?"Position your property with precision.":"Build a portfolio with quiet confidence."}</p>
          <b aria-hidden="true">↗</b>
        </a>)}
      </section>

      <section className="quote" id="journal"><p className="eyebrow reveal">Private advisory</p><blockquote className="reveal">“The finest service is felt<br/>in what you <em>never</em> have<br/>to ask for.”</blockquote><p className="quote-note reveal">Local intelligence. Global perspective.<br/>Absolute discretion.</p></section>

      <footer id="contact">
        <div className="footer-top reveal"><p className="eyebrow">Your next chapter</p><h2>Let’s find<br/><em>what moves you.</em></h2><a href="mailto:hello@arikarealty.com">Start a conversation <Arrow/></a></div>
        <div className="footer-mid"><div><small>ENQUIRIES</small><a href="mailto:hello@arikarealty.com">hello@arikarealty.com</a><a href="tel:+919810001001">+91 98100 01001</a></div><div><small>VISIT</small><p>Mumbai · Bengaluru · Goa<br/>By private appointment</p></div><div><small>FOLLOW</small><a href="#">Instagram</a><a href="#">LinkedIn</a></div><form onSubmit={e=>e.preventDefault()}><small>PRIVATE NOTES</small><label><input type="email" aria-label="Email address" placeholder="Your email address"/><button aria-label="Subscribe">→</button></label></form></div>
        <div className="footer-brand"><img src="/arika-logo-transparent.png" alt="ARIKA REALTY — Building Legacies" width="1280" height="853"/></div><div className="legal"><span>© 2026 ARIKA REALTY</span><span>Privacy · Terms · RERA</span><span>Made for remarkable living</span></div>
      </footer>
    </main>
  );
}
