"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const residences = [
  { name: "Aster House", place: "Alibaug, Maharashtra", type: "Coastal residence", image: "/villa-hero-facade.jpg" },
  { name: "Casa Serein", place: "Assagao, Goa", type: "Courtyard villa", image: "/pexels-omergulen-19366884.jpg.jpeg" },
  { name: "The Canopy", place: "Nandi Hills, Bengaluru", type: "Garden estate", image: "/pexels-shox-31640057.jpg.jpeg" },
  { name: "Solace 18", place: "Worli, Mumbai", type: "Sky residence", image: "/pexels-volkerthimm-27307398.jpg.jpeg" },
];

export default function HomeTwo() {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".z-nav", { y: -30, opacity: 0, duration: .9 })
        .fromTo(".z-house-shell", { yPercent: 12, opacity: 0, clipPath: "inset(100% 0 0 0)" }, { yPercent: 0, opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.65, ease: "expo.inOut" }, "<.05")
        .fromTo(".z-wordmark", { yPercent: 115, opacity: 0, letterSpacing: ".04em" }, { yPercent: 0, opacity: 1, letterSpacing: "-.075em", duration: 1.4, ease: "expo.out" }, "-=.2")
        .from(".z-hero-detail > *", { y: 20, opacity: 0, stagger: .08, duration: .8 }, "<.35");
      gsap.fromTo(".z-house", { yPercent: 0 }, { yPercent: 2.5, ease: "none", scrollTrigger: { trigger: ".z-hero", start: "top top", end: "bottom top", scrub: 1.4, invalidateOnRefresh: true } });
      gsap.utils.toArray<HTMLElement>(".z-reveal").forEach((el) => gsap.from(el, { y: 65, opacity: 0, filter: "blur(8px)", duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play none none reverse" } }));
      gsap.utils.toArray<HTMLElement>(".z-service-row").forEach((el) => gsap.from(el, { xPercent: -9, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" } }));
      gsap.to(".z-collage-card", { y: (i) => -40 - i * 18, rotate: (i) => (i - 1) * 2, ease: "none", scrollTrigger: { trigger: ".z-discover", start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return <main className="z-page">
    <header className="z-nav">
      <a className="z-brand" href="/home-2" aria-label="Arika Realty home"><img src="/arika-emblem.png" alt="" /><span>ARIKA <b>REALTY</b></span></a>
      <nav className={menu ? "open" : ""}>
        <div className="z-home-menu">
          <button aria-haspopup="true">Home <span>＋</span></button>
          <div className="z-home-panel"><a href="/"><b>01</b> Homepage 1</a><a className="active" href="/home-2"><b>02</b> Homepage 2</a><a href="/home-3"><b>03</b> Homepage 3</a></div>
        </div>
        <a href="#residences">Residences</a><a href="#services">Services</a><a href="#about">About</a>
      </nav>
      <a className="z-contact-link" href="#contact">Talk to us <span>↗</span></a>
      <button className="z-menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? "Close" : "Menu"}</button>
    </header>

    <section className="z-hero">
      <div className="z-sun" />
      <div className="z-wordmark" aria-hidden="true">ARIKA</div>
      <div className="z-house-shell"><img className="z-house" src="/parallax-house-cropped.png" alt="Contemporary private residence at dusk" /></div>
      <div className="z-hero-detail z-hero-left"><span>Private realty</span><p>India · 18.5204° N<br/>73.8567° E</p></div>
      <div className="z-hero-detail z-hero-right"><span>Curated living</span><p>Rare homes for<br/>remarkable lives.</p></div>
      <a className="z-scroll" href="#about"><span>↓</span> Scroll to discover</a>
    </section>

    <section className="z-statement" id="about">
      <p className="z-label z-reveal">Our perspective</p>
      <h1 className="z-reveal">We find homes that feel<br/>like they were waiting<br/><em>only for you.</em></h1>
      <div className="z-statement-note z-reveal"><span>( 01 )</span><p>ARIKA is a private real estate advisory for design-led residences across India’s most compelling destinations.</p></div>
    </section>

    <section className="z-residences" id="residences">
      <div className="z-section-top z-reveal"><p className="z-label">Selected residences</p><span>What we found remarkable</span></div>
      <div className="z-property-stage">
        <img key={residences[active].image} src={residences[active].image} alt={residences[active].name} />
        <div className="z-property-caption"><span>0{active + 1} / 04</span><div><h2>{residences[active].name}</h2><p>{residences[active].place} · {residences[active].type}</p></div><a href="#contact">View residence ↗</a></div>
      </div>
      <div className="z-residence-list">{residences.map((home, i) => <button className={active === i ? "active" : ""} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} key={home.name}><span>0{i + 1}</span><strong>{home.name}</strong><small>{home.place}</small><b>↗</b></button>)}</div>
    </section>

    <section className="z-services" id="services">
      <div className="z-section-top z-reveal"><p className="z-label">Our services</p><span>What we do—and do really well</span></div>
      {[["01","Private acquisitions","Quiet access, thoughtful shortlists and an unhurried search."],["02","Residence sales","A considered presentation for homes that deserve the right audience."],["03","Portfolio advisory","Clear intelligence for property decisions that compound over time."],["04","Relocation concierge","From first visit to move-in, every detail handled with care."]].map(([n,t,d]) => <article className="z-service-row" key={n}><span>/{n}</span><h2>{t}</h2><p>{d}</p><a href="#contact">See more ↗</a></article>)}
    </section>

    <section className="z-discover">
      <div className="z-discover-copy z-reveal"><p className="z-label">Made personal</p><h2>Homes.<br/>Places.<br/>Stories.<br/><em>Yours.</em></h2><p>Tell us how you want to live. We’ll bring the place, the people and the perspective together.</p><a href="#contact">Begin your search <span>→</span></a></div>
      <div className="z-collage">
        {residences.slice(0,3).map((home,i) => <figure className={`z-collage-card card-${i}`} key={home.name}><img src={home.image} alt=""/><figcaption><b>{home.name}</b><span>{home.place}</span></figcaption></figure>)}
      </div>
    </section>

    <section className="z-contact" id="contact"><p className="z-label">A private conversation</p><h2 className="z-reveal">A remarkable home<br/>begins with <em>hello.</em></h2><a href="mailto:hello@arikarealty.com">hello@arikarealty.com <span>↗</span></a></section>
    <footer className="z-footer"><a className="z-footer-brand" href="/home-2" aria-label="Arika Realty home"><img src="/arika-emblem.png" alt=""/><span>ARIKA <b>REALTY</b></span></a><p>Private residences · India and beyond</p><div><a href="/">Homepage 1</a><a href="/home-2">Homepage 2</a><span>© 2026</span></div></footer>
  </main>;
}
