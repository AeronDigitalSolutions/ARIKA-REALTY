"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const homes = [
  ["Goa · India", "Casa Aurelia", "5 beds · 7 baths · 11,200 sq ft", "₹18.5 Cr", "/arika-hero.png"],
  ["Alibaug · India", "The Quiet House", "4 beds · 5 baths · 8,400 sq ft", "₹12.8 Cr", "/pexels-omergulen-19366884.jpg.jpeg"],
  ["Bengaluru · India", "Atelier 27", "4 beds · 4 baths · 6,100 sq ft", "₹9.4 Cr", "/pexels-shox-31640057.jpg.jpeg"],
];

export default function HomeThree() {
  const [menu, setMenu] = useState(false);
  const [mode, setMode] = useState("Buy");
  const [saved, setSaved] = useState<number[]>([]);
  const parallax = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    }), { threshold: .12 });
    document.querySelectorAll(".h3-reveal").forEach((el) => observer.observe(el));
    const context = gsap.context(() => {
      if (parallax.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.timeline({ scrollTrigger: { trigger: parallax.current, start: "top top", end: "bottom bottom", scrub: 1.15 } })
          .to(parallax.current, { "--p": 1, ease: "none" });
      }
    });
    ScrollTrigger.refresh();
    return () => { observer.disconnect(); context.revert(); };
  }, []);

  return <main className="home-three">
    <div className="h3-grain" />
    <header className="h3-nav">
      <a className="h3-brand" href="/home-3"><img src="/arika-emblem.png" alt=""/><span>ARIKA<small>REALTY</small></span></a>
      <nav>
        <div className="h3-home-menu"><button>Home <span>⌄</span></button><div><a href="/">01 · Homepage 1</a><a href="/home-2">02 · Homepage 2</a><a className="active" href="/home-3">03 · Homepage 3</a></div></div>
        <a href="#residences">Residences</a><a href="#story">Our story</a><a href="#journal">Journal</a>
      </nav>
      <a className="h3-nav-cta" href="#contact">Private consultation ↗</a>
      <button className="h3-menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu}>{menu ? "Close" : "Menu"}</button>
    </header>
    <div className={`h3-mobile-menu ${menu ? "open" : ""}`}><a href="/">Homepage 1</a><a href="/home-2">Homepage 2</a><a href="/home-3">Homepage 3</a><a href="#residences">Residences</a></div>

    <section className="parallax-hero h3-parallax-hero" ref={parallax}>
      <div className="parallax-stage">
        <img className="parallax-sky" src="/parallax-sky-bright.png" alt="" aria-hidden="true" />
        <div className="parallax-atmosphere" />
        <img className="parallax-cloud parallax-cloud-far" src="/parallax-cloud-white-far.png" alt="" aria-hidden="true" />
        <div className="parallax-ghost" aria-hidden="true">ARIKA</div>
        <div className="parallax-copy"><p className="eyebrow">Private residences · India &amp; beyond</p><h1><span>Built beyond</span><em>the expected.</em></h1></div>
        <img className="parallax-house" src="/parallax-house.png" alt="Contemporary luxury residence represented by ARIKA Realty" />
        <img className="parallax-cloud parallax-cloud-near" src="/parallax-cloud-white-near.png" alt="" aria-hidden="true" />
        <div className="parallax-vignette" />
        <div className="parallax-statement"><span>Rare addresses · Considered architecture</span><p className="statement-bold-white">A legacy shaped around you.</p></div>
        <a className="parallax-cta" href="#story"><span>Discover<br/>ARIKA</span><b>↗</b></a>
        <div className="parallax-meta"><span>AR—03</span><span>Scroll to enter</span><i>↓</i></div>
      </div>
    </section>

    <section className="h3-intro" id="story"><div className="h3-rule h3-reveal"><p className="h3-eyebrow">The ARIKA perspective</p><span>( Since 2012 )</span></div><h2 className="h3-reveal">A home is not an address.<br/>It is the <em>architecture</em> of a life.</h2><div className="h3-intro-note h3-reveal"><p>We represent a considered collection of remarkable homes and the people drawn to them. Every introduction is personal. Every detail, intentional.</p><a href="#contact">Our approach ↗</a></div></section>

    <section className="h3-finder"><div className="h3-finder-head h3-reveal"><div><p className="h3-eyebrow">Begin your search</p><h2>Where will life<br/><em>take you?</em></h2></div><div className="h3-mode">{["Buy","Rent"].map(x=><button className={mode===x?"active":""} onClick={()=>setMode(x)} key={x}>{x}</button>)}</div></div><form onSubmit={e=>e.preventDefault()} className="h3-search h3-reveal"><label><span>01 / Location</span><input placeholder="City, neighbourhood or landmark"/></label><label><span>02 / Property type</span><select><option>All residences</option><option>Villa</option><option>Penthouse</option></select></label><label><span>03 / Price range</span><select><option>Any price</option><option>₹5–10 Cr</option><option>₹20 Cr+</option></select></label><button>View {mode === "Buy" ? "properties" : "rentals"} ↗</button></form></section>

    <section className="h3-featured" id="residences"><div className="h3-section-title h3-reveal"><div><p className="h3-eyebrow">Private collection · 2026</p><h2>Curated<br/><em>residences</em></h2></div><p>Architecture of consequence.<br/>Locations without compromise.</p></div><div className="h3-grid">{homes.map((home,i)=><article className="h3-property h3-reveal" key={home[1]}><div className="h3-property-image"><img src={home[4]} alt={home[1]}/><span>0{i+1}</span><button onClick={()=>setSaved(v=>v.includes(i)?v.filter(x=>x!==i):[...v,i])} aria-label={`Save ${home[1]}`}>{saved.includes(i)?"♥":"♡"}</button><a href="#contact">View residence ↗</a></div><div className="h3-property-info"><div><p>{home[0]}</p><h3>{home[1]}</h3><small>{home[2]}</small></div><strong>{home[3]}</strong></div></article>)}</div></section>

    <section className="h3-services">{["Find","Sell","Invest"].map((x,i)=><a className="h3-service h3-reveal" href="#contact" key={x}><small>0{i+1}</small><span>{x}</span><p>{i===0?"Discover a place that feels inevitable.":i===1?"Position your property with precision.":"Build a portfolio with quiet confidence."}</p><b>↗</b></a>)}</section>
    <section className="h3-quote" id="journal"><p className="h3-eyebrow">Private advisory</p><blockquote className="h3-reveal">“The finest service is felt<br/>in what you <em>never</em> have<br/>to ask for.”</blockquote><p>Local intelligence. Global perspective.<br/>Absolute discretion.</p></section>
    <footer className="h3-footer" id="contact"><p className="h3-eyebrow">Your next chapter</p><h2 className="h3-reveal">Let’s find<br/><em>what moves you.</em></h2><a href="mailto:hello@arikarealty.com">Start a conversation ↗</a><div className="h3-footer-meta"><span>hello@arikarealty.com</span><span>Mumbai · Bengaluru · Goa</span><span>Instagram · LinkedIn</span></div><div className="h3-footer-word">ARIKA</div><div className="h3-legal"><span>© 2026 ARIKA REALTY</span><span>Privacy · Terms · RERA</span><span>Made for remarkable living</span></div></footer>
  </main>;
}
