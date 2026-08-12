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

const developments = [
  ["Onyx", "Worli Sea Face", "62-storey residential tower", "/home-4/images/project-onyx.jpg"],
  ["Meridian", "Alibaug", "Twelve waterfront villas", "/home-4/images/project-meridian.jpg"],
  ["Solstice", "Bandra West", "Limited-edition residences", "/home-4/images/project-solstice.jpg"],
  ["Riviera", "Juhu", "Sea-facing duplexes", "/home-4/images/project-riviera.jpg"],
];

export default function HomeTwo() {
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
      gsap.to(".z-collage-card", { y: (i) => -40 - i * 18, rotate: (i) => (i - 1) * 2, ease: "none", scrollTrigger: { trigger: ".z-discover", start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    return () => { ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return <main className="z-page">
    <header className="z-nav">
      <a className="z-brand" href="/" aria-label="Arika Realty home"><img src="/arika-header-lockup.png" alt="Arika Realty" /></a>
      <nav className={menu ? "open" : ""}>
        <a href="/">Home</a>
        <a href="#about">About</a><a href="#developments">Developments</a><a href="#contact">Contact</a>
      </nav>
      <a className="z-contact-link" href="#contact">Talk to us <span>↗</span></a>
      <button className="z-menu-toggle" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">{menu ? "Close" : "Menu"}</button>
    </header>

    <section className="z-hero">
      <div className="z-sun" />
      <div className="z-wordmark" aria-hidden="true">ARIKA</div>
      <div className="z-house-shell"><img className="z-house" src="/home-2-front-villa.png" alt="Front-facing contemporary private residence at dusk" /></div>
      <div className="z-hero-detail z-hero-left"><span>Private realty</span><p>India · 18.5204° N<br/>73.8567° E</p></div>
      <div className="z-hero-detail z-hero-right"><span>Curated living</span><p>Rare homes for<br/>remarkable lives.</p></div>
      <a className="z-scroll" href="#about"><span>↓</span> Scroll to discover</a>
    </section>

    <section className="z-statement" id="about">
      <p className="z-label z-reveal">Our perspective</p>
      <h1 className="z-reveal">We build homes that feel<br/>like they were waiting<br/><em>only for you.</em></h1>
      <div className="z-statement-note z-reveal"><span>( 01 )</span><p>ARIKA is a private real estate advisory for design-led residences across India’s most compelling destinations.</p></div>
    </section>

    <div className="z-h4-insert">
      <section className="h4-projects" id="developments">
        <div className="h4-heading z-reveal"><p>Selected developments</p><h2>Work that<br/><em>holds its ground.</em></h2></div>
        <div className="h4-project-rail">{developments.map((project, i) => <article key={project[0]} className="h4-project z-reveal"><div><img src={project[3]} alt={project[0]}/><span>0{i + 1}</span></div><p>{project[1]}</p><h3>{project[0]}</h3><small>{project[2]}</small></article>)}</div>
      </section>
      <section className="h4-stats">
        <div className="z-reveal"><strong>28</strong><span>Years building in Mumbai</span></div>
        <div className="z-reveal"><strong>41</strong><span>Completed developments</span></div>
        <div className="z-reveal"><strong>9.6M</strong><span>Square feet delivered</span></div>
        <div className="z-reveal"><strong>100%</strong><span>Delivered on schedule</span></div>
      </section>
    </div>

    <section className="z-discover">
      <div className="z-discover-copy z-reveal"><p className="z-label">Made personal</p><h2>Homes.<br/>Places.<br/>Stories.<br/><em>Yours.</em></h2><p>Tell us how you want to live. We’ll bring the place, the people and the perspective together.</p><a href="#contact">Begin your search <span>→</span></a></div>
      <div className="z-collage">
        {residences.slice(0,3).map((home,i) => <figure className={`z-collage-card card-${i}`} key={home.name}><img src={home.image} alt=""/><figcaption><b>{home.name}</b><span>{home.place}</span></figcaption></figure>)}
      </div>
    </section>

    <section className="z-contact" id="contact"><p className="z-label">A private conversation</p><h2 className="z-reveal">A remarkable home<br/>begins with <em>hello.</em></h2><a href="mailto:hello@arikarealty.com">hello@arikarealty.com <span>↗</span></a></section>
    <footer className="z-footer"><a className="z-footer-brand" href="/" aria-label="Arika Realty home"><img src="/arika-emblem.png" alt=""/><span>ARIKA <b>REALTY</b></span></a><p>Private residences · India and beyond</p><div><a href="#about">About</a><a href="#contact">Contact</a><span>© 2026</span></div></footer>
  </main>;
}
