"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const properties = [
  { place: "Goa · India", name: "Casa Aurelia", meta: "5 beds · 7 baths · 11,200 sq ft", price: "₹18.5 Cr", image: "/pexels-john-zook-2388999-5223143.jpg.jpeg", pos: "center 42%", description: "A light-filled coastal residence shaped by courtyards, native planting and an uninterrupted relationship with the sea." },
  { place: "Alibaug · India", name: "The Quiet House", meta: "4 beds · 5 baths · 8,400 sq ft", price: "₹12.8 Cr", image: "/pexels-volkerthimm-27307398.jpg.jpeg", pos: "center 48%", description: "A private retreat where monolithic stone, deep verandas and tropical gardens create a rare sense of stillness." },
  { place: "Bengaluru · India", name: "Atelier 27", meta: "4 beds · 4 baths · 6,100 sq ft", price: "₹9.4 Cr", image: "/pexels-shox-34360413.jpg.jpeg", pos: "center 52%", description: "A contemporary city home balancing gallery-like volumes with warm, intimate spaces for everyday life." },
];

const advisoryServices = [
  { title: "Find a residence", text: "Private access to homes selected around the way you want to live.", image: "/pexels-abhishek-mishra-277771722-17343501.jpg.jpeg" },
  { title: "Sell with ARIKA", text: "Precise positioning, discreet introductions and a story worthy of the address.", image: "/pexels-aj33-449362239-28796447.jpg.jpeg" },
  { title: "Private investment", text: "Clear intelligence for considered acquisitions and enduring value.", image: "/pexels-asim-34160274-7096209.jpg.jpeg" },
  { title: "Bespoke advisory", text: "One trusted point of view across property, place and possibility.", image: "/pexels-omergulen-19366884.jpg.jpeg" },
];

const testimonials = [
  { quote: "ARIKA understood that we were not simply buying a house. They helped us find the setting for our family’s next chapter.", name: "Private client", role: "Goa residence" },
  { quote: "Every introduction was thoughtful, every detail anticipated. The entire experience felt calm, exacting and entirely personal.", name: "Ananya & Rohan M.", role: "Bengaluru" },
  { quote: "Their discretion and market instinct gave us the confidence to make an exceptional acquisition before it ever reached the market.", name: "Family office", role: "Mumbai" },
];

const journal = [
  { category: "Architecture", title: "Designing homes for enduring value", image: "/pexels-vishnu-murali-204762399-15068164.jpg.jpeg" },
  { category: "Perspective", title: "The new language of quiet luxury", image: "/pexels-safwanck-10964081.jpg.jpeg" },
  { category: "Intelligence", title: "India’s emerging private-residence markets", image: "/pexels-shox-31640057.jpg.jpeg" },
];

function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [mode, setMode] = useState("Buy");
  const [saved, setSaved] = useState<number[]>([]);
  const [activeProperty, setActiveProperty] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const cursor = useRef<HTMLDivElement>(null);
  const parallax = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ duration: 1.35, smoothWheel: !reduceMotion, wheelMultiplier: .85, anchors: true });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onMove = (e: MouseEvent) => {
      if (!cursor.current) return;
      gsap.to(cursor.current, { x: e.clientX, y: e.clientY, duration: .55, ease: "power3.out", overwrite: true });
    };

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".reveal", { opacity: 1, y: 0, filter: "none", clipPath: "inset(0 0 0% 0)" });
        return;
      }

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(element,
          { opacity: 0, y: 55, filter: "blur(8px)", clipPath: "inset(0 0 10% 0)" },
          { opacity: 1, y: 0, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)", duration: 1.4, ease: "power4.out", scrollTrigger: { trigger: element, start: "top 86%", toggleActions: "play none none reverse", onEnter: () => element.classList.add("is-visible"), onEnterBack: () => element.classList.add("is-visible"), onLeaveBack: () => element.classList.remove("is-visible") } }
        );

        gsap.to(element, {
          opacity: .18,
          y: -34,
          scale: .988,
          filter: "blur(5px)",
          ease: "none",
          scrollTrigger: { trigger: element, start: "bottom 18%", end: "bottom top", scrub: .75 }
        });
      });

      [
        [".service-card", 70],
        [".journal-card", 85],
      ].forEach(([selector, stagger]) => {
        const items = gsap.utils.toArray<HTMLElement>(selector as string);
        if (!items.length) return;
        gsap.from(items, {
          y: 80,
          opacity: 0,
          scale: .965,
          filter: "blur(10px)",
          duration: 1.35,
          stagger: Number(stagger) / 1000,
          ease: "power4.out",
          scrollTrigger: { trigger: items[0].parentElement, start: "top 82%", toggleActions: "play none none reverse" }
        });
      });

      gsap.utils.toArray<HTMLElement>(".showcase-image, .journal-card>div, .consultation").forEach((frame) => {
        gsap.fromTo(frame, { clipPath: "inset(7% 0 7% 0)", scale: .97 }, { clipPath: "inset(0% 0 0% 0)", scale: 1, duration: 1.65, ease: "power4.out", scrollTrigger: { trigger: frame, start: "top 88%", toggleActions: "play none none reverse" } });
      });

      gsap.fromTo(".testimonial-card", { rotateX: 5, transformPerspective: 1200, y: 70 }, { rotateX: 0, y: 0, duration: 1.6, ease: "power4.out", scrollTrigger: { trigger: ".testimonials", start: "top 70%", toggleActions: "play none none reverse" } });

      gsap.utils.toArray<HTMLElement>(".property-image").forEach((image) => {
        gsap.fromTo(image, { clipPath: "inset(12% 0 12% 0)", scale: .94 }, { clipPath: "inset(0% 0 0% 0)", scale: 1, ease: "none", scrollTrigger: { trigger: image, start: "top 92%", end: "top 35%", scrub: 1.2 } });
      });

      gsap.fromTo(".quote blockquote", { scale: .94, filter: "blur(9px)" }, { scale: 1, filter: "blur(0px)", ease: "none", scrollTrigger: { trigger: ".quote", start: "top 75%", end: "center center", scrub: 1.2 } });

      if (parallax.current) {
        gsap.timeline({ scrollTrigger: { trigger: parallax.current, start: "top top", end: "bottom bottom", scrub: 1.15 } })
          .to(parallax.current, { "--p": 1, duration: .5, ease: "none" })
          .to(parallax.current, { "--c": 1, duration: .3, ease: "none" })
          .to(parallax.current, { "--n": 1, duration: .2, ease: "none" });
      }
    });

    window.addEventListener("mousemove", onMove);
    ScrollTrigger.refresh();
    return () => {
      window.removeEventListener("mousemove", onMove);
      context.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
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
          <img className="parallax-sky" src="/parallax-sky-bright.png" alt="" aria-hidden="true" />
          <div className="parallax-haze" />
          <img className="parallax-cloud parallax-cloud-far" src="/parallax-cloud-white-far.png" alt="" aria-hidden="true" />
          <div className="parallax-ghost" aria-hidden="true">ARIKA</div>
          <div className="parallax-copy">
            <p className="eyebrow">Private residences · India &amp; beyond</p>
            <h1><span>Built beyond</span><em>the expected.</em></h1>
          </div>
          <img className="parallax-house" src="/parallax-house.png" alt="Contemporary luxury residence represented by ARIKA REALTY" />
          <img className="parallax-cloud parallax-cloud-near" src="/parallax-cloud-white-near.png" alt="" aria-hidden="true" />
          <div className="parallax-vignette" />
          <div className="parallax-statement">
            <span>Rare addresses · Considered architecture</span>
            <p>A legacy shaped around you.</p>
          </div>
          <a className="parallax-cta" href="#legacy"><span>Discover<br/>ARIKA</span><b aria-hidden="true">↗</b></a>
          <div className="cloud-curtain-wash" aria-hidden="true" />
          <img className="cloud-curtain cloud-curtain-side" src="/parallax-cloud-white-near.png" alt="" aria-hidden="true" />
          <img className="cloud-curtain cloud-curtain-veil" src="/parallax-cloud-white-far.png" alt="" aria-hidden="true" />
          <img className="cloud-curtain cloud-curtain-bank" src="/parallax-cloud-white-near.png" alt="" aria-hidden="true" />
          <div className="hero hero-secondary parallax-next-preview" id="legacy">
            <div className="hero-media" />
            <div className="hero-shade" />
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">Extraordinary homes · India &amp; beyond</p>
              <h1><span>Space to live.</span><em>Room to become.</em></h1>
              <p className="hero-sub">Exceptional homes, quietly discovered. Personal representation for people who expect more than a transaction.</p>
            </div>
            <a className="explore" href="#residences"><span>Explore<br/>residences</span><b>↓</b></a>
            <div className="hero-index"><span>AR—01</span><span>18.5204° N</span></div>
          </div>
          <div className="parallax-meta"><span>AR—00</span><span>Scroll to enter</span><i>↓</i></div>
        </div>
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
        <div className="collection-heading reveal"><div><p className="eyebrow">Private collection · 2026</p><h2>Featured <em>residences</em></h2></div><a href="#contact">View all residences <Arrow/></a></div>
        <article className="residence-showcase reveal" aria-live="polite">
          <div className="showcase-image" key={properties[activeProperty].image} style={{backgroundImage:`url('${properties[activeProperty].image}')`, backgroundPosition:properties[activeProperty].pos}}>
            <span className="showcase-number">0{activeProperty + 1}</span>
            <button aria-label={`Save ${properties[activeProperty].name}`} className={saved.includes(activeProperty)?"saved":""} onClick={() => setSaved(v => v.includes(activeProperty)?v.filter(x=>x!==activeProperty):[...v,activeProperty])}>♡</button>
          </div>
          <div className="showcase-copy" key={properties[activeProperty].name}>
            <p className="eyebrow">{properties[activeProperty].place}</p>
            <h3>{properties[activeProperty].name}</h3>
            <p className="showcase-description">{properties[activeProperty].description}</p>
            <div className="showcase-facts"><span>{properties[activeProperty].meta}</span><strong>{properties[activeProperty].price}</strong></div>
            <a className="pill-link" href="#contact">View residence <Arrow/></a>
            <div className="showcase-nav"><span>{String(activeProperty + 1).padStart(2,"0")} / {String(properties.length).padStart(2,"0")}</span><i><b style={{width:`${((activeProperty + 1) / properties.length) * 100}%`}}/></i><button aria-label="Previous residence" onClick={() => setActiveProperty(v => (v - 1 + properties.length) % properties.length)}>←</button><button aria-label="Next residence" onClick={() => setActiveProperty(v => (v + 1) % properties.length)}>→</button></div>
          </div>
        </article>
        <div className="residence-tabs reveal">
          {properties.map((property, index) => <button className={index === activeProperty ? "active" : ""} onClick={() => setActiveProperty(index)} key={property.name}><span>0{index + 1}</span>{property.name}</button>)}
        </div>
      </section>

      <section className="services" id="our-approach">
        <div className="services-head reveal"><div><p className="eyebrow">Private realty, personally considered</p><h2>How we can<br/><em>move you.</em></h2></div><p>From first conversation to final detail, every engagement is shaped around one client, one ambition and one remarkable outcome.</p></div>
        <div className="service-cards">
          {advisoryServices.map((service,i)=><a href="#contact" className="service-card reveal" key={service.title}>
            <img src={service.image} alt="" />
            <span className="service-card-index">0{i+1}</span>
            <div><h3>{service.title}</h3><p>{service.text}</p><b>Discover more <Arrow/></b></div>
          </a>)}
        </div>
      </section>

      <section className="testimonials">
        <div className="testimonial-intro reveal"><p className="eyebrow">Private advisory</p><h2>Service you feel<br/>in what you <em>never</em><br/>have to ask for.</h2><p>Local intelligence. Global perspective. Absolute discretion.</p></div>
        <article className="testimonial-card reveal" aria-live="polite">
          <span className="quote-mark">“</span>
          <blockquote key={activeTestimonial}>{testimonials[activeTestimonial].quote}</blockquote>
          <div className="testimonial-person"><i>{testimonials[activeTestimonial].name.charAt(0)}</i><p><strong>{testimonials[activeTestimonial].name}</strong><span>{testimonials[activeTestimonial].role}</span></p></div>
          <div className="testimonial-nav"><span>{String(activeTestimonial + 1).padStart(2,"0")} / {String(testimonials.length).padStart(2,"0")}</span><button aria-label="Previous testimonial" onClick={() => setActiveTestimonial(v => (v - 1 + testimonials.length) % testimonials.length)}>←</button><button aria-label="Next testimonial" onClick={() => setActiveTestimonial(v => (v + 1) % testimonials.length)}>→</button></div>
        </article>
      </section>

      <section className="journal" id="journal">
        <div className="journal-head reveal"><div><p className="eyebrow">Journal · Perspectives</p><h2>Insights and <em>inspiration.</em></h2></div><a href="#contact">See all insights <Arrow/></a></div>
        <div className="journal-grid">{journal.map((article,index)=><a className="journal-card reveal" href="#contact" key={article.title}><div><img src={article.image} alt=""/><span>0{index+1}</span></div><p>{article.category} · 6 min read</p><h3>{article.title}</h3><b>Read perspective <Arrow/></b></a>)}</div>
      </section>

      <section className="consultation reveal">
        <img src="/pexels-omergulen-19366884.jpg.jpeg" alt="Contemporary residence at sunset"/>
        <div className="consultation-shade"/>
        <div className="consultation-copy"><p className="eyebrow">A private conversation</p><h2>Let’s create your<br/><em>next chapter.</em></h2></div>
        <div className="consultation-action"><p>Tell us what you are looking for. We will bring clarity, discretion and the right possibilities.</p><a className="pill-link light" href="mailto:hello@arikarealty.com">Start a conversation <Arrow/></a></div>
      </section>

      <footer id="contact">
        <div className="footer-top reveal"><p className="eyebrow">Your next chapter</p><h2>Let’s find<br/><em>what moves you.</em></h2><a href="mailto:hello@arikarealty.com">Start a conversation <Arrow/></a></div>
        <div className="footer-mid"><div><small>ENQUIRIES</small><a href="mailto:hello@arikarealty.com">hello@arikarealty.com</a><a href="tel:+919810001001">+91 98100 01001</a></div><div><small>VISIT</small><p>Mumbai · Bengaluru · Goa<br/>By private appointment</p></div><div><small>FOLLOW</small><a href="#">Instagram</a><a href="#">LinkedIn</a></div><form onSubmit={e=>e.preventDefault()}><small>PRIVATE NOTES</small><label><input type="email" aria-label="Email address" placeholder="Your email address"/><button aria-label="Subscribe">→</button></label></form></div>
        <div className="footer-brand" aria-label="ARIKA REALTY">
          <span>ARIKA</span>
          <div className="footer-emblem"><img src="/arika-logo-transparent.png" alt="ARIKA REALTY — Building Legacies" width="1280" height="853"/></div>
          <span>REALTY</span>
        </div><div className="legal"><span>© 2026 ARIKA REALTY</span><span>Privacy · Terms · RERA</span><span>Made for remarkable living</span></div>
      </footer>
    </main>
  );
}
