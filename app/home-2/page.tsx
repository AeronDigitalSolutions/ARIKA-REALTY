"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const chapters = [
  { city: "Mumbai", title: "The House Above the Sea", meta: "Worli · 14,800 sq ft", image: "/pexels-abhishek-mishra-277771722-17343501.jpg.jpeg" },
  { city: "Goa", title: "A Private Kind of Paradise", meta: "Assagao · 9,200 sq ft", image: "/pexels-omergulen-19366884.jpg.jpeg" },
  { city: "Bengaluru", title: "The Garden Residence", meta: "Nandi Hills · 12,600 sq ft", image: "/pexels-shox-31640057.jpg.jpeg" },
];

const services = [
  ["01", "Private acquisition", "Quiet access to exceptional homes before they reach the wider market."],
  ["02", "Portfolio intelligence", "Research-led advice shaped around wealth, legacy and long-term value."],
  ["03", "Architectural advisory", "A singular team connecting site, architect, material and way of life."],
];

export default function HomeTwo() {
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, wheelMultiplier: .82 });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const heroModel = document.querySelector<HTMLElement>(".h2-hero-architecture");
    const hero = document.querySelector<HTMLElement>(".h2-hero");
    const followPointer = (event: PointerEvent) => {
      if (!heroModel || !hero || window.innerWidth < 851) return;
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      gsap.to(heroModel, { rotateY: x * 18, rotateX: -y * 12, x: x * 18, y: y * 12, duration: 1.1, ease: "power3.out", overwrite: true });
    };
    const resetModel = () => heroModel && gsap.to(heroModel, { rotateY: -10, rotateX: 5, x: 0, y: 0, duration: 1.3, ease: "expo.out" });
    hero?.addEventListener("pointermove", followPointer);
    hero?.addEventListener("pointerleave", resetModel);

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .fromTo(".h2-nav", { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 })
        .fromTo(".h2-hero-kicker", { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: .8 }, "<.15")
        .fromTo(".h2-title-line span", { yPercent: 115, rotate: 3 }, { yPercent: 0, rotate: 0, duration: 1.35, stagger: .11 }, "<")
        .fromTo(".h2-hero-aside", { x: 42, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, "<.45")
        .fromTo(".h2-hero-media", { clipPath: "inset(0 0 100% 0)", scale: 1.14 }, { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.7 }, "<-.15")
        .fromTo(".h2-hero-architecture", { opacity: 0, scale: .68, rotateY: -45, rotateX: 18, z: -180 }, { opacity: 1, scale: 1, rotateY: -10, rotateX: 5, z: 0, duration: 1.75 }, "<.2");

      gsap.to(".h2-hero-media img", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".h2-hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".h2-orbit", { rotate: 160, ease: "none", scrollTrigger: { trigger: ".h2-hero", start: "top top", end: "bottom top", scrub: 1.2 } });
      gsap.to(".h2-hero-architecture", { rotateY: 24, rotateX: -8, yPercent: 30, scale: .9, opacity: .28, ease: "none", scrollTrigger: { trigger: ".h2-hero", start: "35% top", end: "bottom top", scrub: 1 } });

      gsap.utils.toArray<HTMLElement>(".h2-reveal").forEach((el) => {
        gsap.fromTo(el, { y: 75, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.25, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 84%", toggleActions: "play reverse play reverse" } });
      });
      gsap.utils.toArray<HTMLElement>(".h2-image-reveal").forEach((el, i) => {
        gsap.fromTo(el, { clipPath: i % 2 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", scale: 1.08 }, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.45, ease: "expo.inOut", scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play reverse play reverse" } });
      });
      gsap.to(".h2-marquee-track", { xPercent: -42, ease: "none", scrollTrigger: { trigger: ".h2-marquee", start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".h2-manifesto-image img", { yPercent: 10, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".h2-manifesto", start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    ScrollTrigger.refresh();
    return () => { hero?.removeEventListener("pointermove", followPointer); hero?.removeEventListener("pointerleave", resetModel); ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  return <main className="home-two">
    <header className="h2-nav">
      <a href="/home-2" className="h2-logo"><img src="/arika-logo-lockup.png" alt="ARIKA REALTY" /></a>
      <nav>
        <div className="home-dropdown h2-home-dropdown">
          <button className="home-dropdown-trigger">Home <span>⌄</span></button>
          <div className="home-dropdown-panel">
            <a href="/"><span>01</span>Homepage 1</a>
            <a href="/home-2" className="active"><span>02</span>Homepage 2</a>
          </div>
        </div>
        <a href="#collection">Collection</a><a href="#philosophy">Philosophy</a><a href="#journal">Journal</a>
      </nav>
      <a className="h2-nav-cta" href="#contact"><span>Private desk</span><b>↗</b></a>
    </header>

    <section className="h2-hero">
      <div className="h2-hero-copy">
        <p className="h2-hero-kicker">Private residences · India and beyond</p>
        <h1>
          <span className="h2-title-line"><span>Property is finite.</span></span>
          <span className="h2-title-line h2-title-serif"><span>Perspective</span></span>
          <span className="h2-title-line h2-title-indent"><span>is everything.</span></span>
        </h1>
        <div className="h2-hero-aside"><p>For people who see a home not as an address, but as an expression of everything they value.</p><a href="#collection">Enter the private collection <span>↓</span></a></div>
      </div>
      <div className="h2-hero-media">
        <img src="/pexels-john-zook-2388999-5223143.jpg.jpeg" alt="Sunlit private residence" />
        <div className="h2-hero-architecture" aria-hidden="true">
          <div className="h2-model-floor h2-model-floor-one" />
          <div className="h2-model-floor h2-model-floor-two" />
          <div className="h2-model-core" />
          <div className="h2-model-roof" />
          <div className="h2-model-glow" />
        </div>
        <div className="h2-model-caption"><span>Living sculpture</span><b>01 / Spatial study</b></div>
      </div>
      <div className="h2-orbit"><span>ARIKA · PRIVATE REALTY · EST. 2012 ·</span></div>
      <span className="h2-folio">AR—02 / 2026</span>
    </section>

    <section className="h2-intro h2-reveal" id="philosophy">
      <p className="h2-eyebrow">Our point of view</p>
      <h2>We represent the rarest homes—and the people whose lives give them meaning.</h2>
      <div className="h2-intro-foot"><span>Beyond brokerage</span><p>Part intelligence practice, part creative studio, ARIKA brings discretion, cultural fluency and architectural instinct to every mandate.</p></div>
    </section>

    <div className="h2-marquee" aria-hidden="true"><div className="h2-marquee-track"><span>Rare by nature</span><i>✦</i><span>Personal by design</span><i>✦</i><span>Built for legacy</span><i>✦</i><span>Rare by nature</span></div></div>

    <section className="h2-collection" id="collection">
      <div className="h2-section-heading h2-reveal"><p className="h2-eyebrow">The private collection</p><h2>Three ways of <em>living remarkably.</em></h2><span>01—03</span></div>
      <div className="h2-chapter-stage">
        <div className="h2-chapter-image h2-image-reveal"><img key={chapters[activeChapter].image} src={chapters[activeChapter].image} alt={chapters[activeChapter].title} /></div>
        <div className="h2-chapter-copy h2-reveal">
          <span className="h2-chapter-city">{chapters[activeChapter].city} · India</span>
          <h3>{chapters[activeChapter].title}</h3><p>{chapters[activeChapter].meta}</p>
          <a href="#contact">Request private dossier <b>↗</b></a>
          <div className="h2-chapter-tabs">{chapters.map((item, i) => <button key={item.city} className={i === activeChapter ? "active" : ""} onClick={() => setActiveChapter(i)}><span>0{i + 1}</span>{item.city}</button>)}</div>
        </div>
      </div>
    </section>

    <section className="h2-numbers">
      <div className="h2-number h2-reveal"><strong>₹1,200<span>Cr+</span></strong><p>Private transactions advised</p></div>
      <div className="h2-number h2-reveal"><strong>17</strong><p>Global lifestyle destinations</p></div>
      <div className="h2-number h2-reveal"><strong>82%</strong><p>Introduced off market</p></div>
      <div className="h2-number h2-reveal"><strong>01</strong><p>Client represented at a time</p></div>
    </section>

    <section className="h2-manifesto">
      <div className="h2-manifesto-image h2-image-reveal"><img src="/pexels-vishnu-murali-204762399-15068164.jpg.jpeg" alt="Architectural detail" /></div>
      <div className="h2-manifesto-copy h2-reveal"><p className="h2-eyebrow">The ARIKA standard</p><h2>Luxury is not more.<br/><em>It is more considered.</em></h2><p>We look beyond polished surfaces—to light, proportion, provenance, privacy and the feeling a place leaves behind.</p><a href="#contact">Discover our approach <span>↗</span></a></div>
    </section>

    <section className="h2-services">
      <div className="h2-section-heading h2-reveal"><p className="h2-eyebrow">Private office</p><h2>One relationship.<br/><em>Every advantage.</em></h2></div>
      <div className="h2-service-list">{services.map(([n,t,d]) => <article className="h2-service h2-reveal" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><b>↗</b></article>)}</div>
    </section>

    <section className="h2-quote h2-reveal"><span>“</span><blockquote>A truly exceptional advisor sees what cannot be searched for—and understands what should never be advertised.</blockquote><p>ARIKA PRIVATE OFFICE</p></section>

    <section className="h2-journal" id="journal">
      <div className="h2-section-heading h2-reveal"><p className="h2-eyebrow">Field notes</p><h2>Intelligence for a<br/><em>life well placed.</em></h2></div>
      <div className="h2-journal-grid">
        {[['The new geography of legacy','/pexels-safwanck-10964081.jpg.jpeg'],['Why quiet architecture endures','/pexels-shox-34360413.jpg.jpeg'],['The case for living with less—but better','/pexels-asim-34160274-7096209.jpg.jpeg']].map(([t,img],i)=><article className="h2-journal-card h2-reveal" key={t}><div><img src={img} alt={t}/><span>0{i+1}</span></div><p>Perspective · 7 min</p><h3>{t}</h3><a href="#">Read note <b>↗</b></a></article>)}
      </div>
    </section>

    <section className="h2-contact" id="contact"><div className="h2-contact-copy h2-reveal"><p className="h2-eyebrow">Begin privately</p><h2>Tell us what<br/><em>moves you.</em></h2><a href="mailto:contact@arikarealty.com">contact@arikarealty.com <span>↗</span></a></div><div className="h2-contact-image h2-image-reveal"><img src="/pexels-volkerthimm-27307398.jpg.jpeg" alt="Serene architectural landscape"/></div></section>

    <footer className="h2-footer"><img src="/arika-logo-lockup.png" alt="ARIKA REALTY"/><div><span>© 2026 ARIKA REALTY</span><span>Mumbai · Bengaluru · Goa</span><a href="/">Homepage 1 ↗</a></div></footer>
  </main>;
}
