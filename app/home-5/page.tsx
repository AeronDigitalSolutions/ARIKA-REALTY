"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

const services = [
  ["01", "Hospitality", "Thoughtfully conceived destinations where warm service, restorative spaces and memorable experiences come together.", "/home-4/images/project-onyx.jpg"],
  ["02", "Healthcare", "Purpose-built healthcare environments designed around clinical excellence, human comfort and enduring trust.", "/home-4/images/project-meridian.jpg"],
  ["03", "Real Estate", "Distinctive places shaped by thoughtful planning, refined architecture and long-term value for every community.", "/home-4/images/project-solstice.jpg"],
];

const journals = [
  ["The quiet architecture of belonging", "Design · 8 min read", "/home-4/images/interior-atrium.jpg"],
  ["Why the best homes begin with their setting", "Perspective · 6 min read", "/home-4/images/mumbai-harbour.jpg"],
  ["A new language for modern Indian living", "Journal · 5 min read", "/home-4/images/interior-living.jpg"],
];

export default function HomeFive() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = reduce ? null : new Lenis({ duration: 1.2, smoothWheel: true });
    const tick = (time: number) => lenis?.raf(time * 1000);
    lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".f5-nav", { y: -32, opacity: 0, duration: .8 })
        .from(".f5-intro > *", { y: 42, opacity: 0, stagger: .1, duration: 1 }, "<.15")
        .from(".f5-house", { yPercent: 28, opacity: 0, duration: 1.4, ease: "expo.out" }, "<")
        .from(".f5-cloud-a,.f5-cloud-b", { opacity: 0, scale: 1.12, duration: 1.5 }, "<");

      if (!reduce) {
        const hero = gsap.timeline({
          scrollTrigger: { trigger: ".f5-hero", start: "top top", end: "62% top", scrub: 1.1 }
        });
        hero
          .to(".f5-intro", { y: "48vh", opacity: 0, ease: "none", duration: 1.1 }, 0)
          .to(".f5-house", { yPercent: -12, scale: 1.23, ease: "none", duration: 1.45 }, 0)
          .to(".f5-cloud-a", { xPercent: -10, yPercent: -18, ease: "none", duration: 1.4 }, 0)
          .to(".f5-cloud-b", { xPercent: -2, yPercent: -24, scale: 1.07, ease: "none", duration: 1.4 }, 0)
          .fromTo(".f5-outline", { opacity: 0, scale: .88 }, { opacity: .82, scale: 1, duration: .55 }, .78)
          .to(".f5-house", { opacity: 0, filter: "blur(7px)", duration: .5 }, 1.25)
          .to(".f5-outline", { opacity: 0, duration: .25 }, 1.3)
          .fromTo(".f5-masked-logo", { opacity: 0, scale: .97, filter: "blur(8px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: .55 }, 1.28);

        gsap.fromTo(".f5-curtain", { yPercent: 52 }, {
          yPercent: -45,
          ease: "none",
          scrollTrigger: { trigger: ".f5-hero", start: "68% top", end: "bottom bottom", scrub: .8 }
        });
        gsap.fromTo(".f5-curtain img", { yPercent: 12, scale: 1.08 }, {
          yPercent: -8,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: ".f5-hero", start: "68% top", end: "bottom bottom", scrub: .8 }
        });
        gsap.to(".f5-house", {
          clipPath: "inset(100% 0 0 0)",
          filter: "blur(7px)",
          ease: "none",
          scrollTrigger: { trigger: ".f5-hero", start: "50% top", end: "60% top", scrub: .5 }
        });

        const arrows = gsap.timeline({
          scrollTrigger: {
            trigger: ".f5-vision",
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: .9,
            anticipatePin: 1
          }
        });
        arrows
          .fromTo(".f5-vision-title", { y: 45, opacity: 0 }, { y: 0, opacity: 1, duration: .7 }, 0)
          .fromTo(".f5-shapes figure", { x: -75, opacity: 0, filter: "blur(8px)" }, {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: .75,
            stagger: .48,
            ease: "power2.out"
          }, .42)
          .fromTo(".f5-vision-note", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .65 }, 2.05);

        gsap.utils.toArray<HTMLElement>(".f5-service").forEach((row) => {
          ScrollTrigger.create({
            trigger: row,
            start: "top 50%",
            end: "bottom 50%",
            toggleClass: { targets: row, className: "is-active" }
          });
        });
      }

      gsap.utils.toArray<HTMLElement>(".f5-reveal").forEach((el) => gsap.from(el, {
        y: 55, opacity: 0, filter: "blur(7px)", duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", toggleActions: "play none none reverse" }
      }));
      gsap.utils.toArray<HTMLElement>(".f5-pan").forEach((el) => gsap.fromTo(el, { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 } }));

      gsap.to(".f5-progress-bar", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: .25 } });
      ScrollTrigger.create({ start: 90, end: "max", toggleClass: { targets: ".f5-nav", className: "is-compact" } });
      ScrollTrigger.create({ trigger: ".f5-services", start: "top 75px", end: "bottom 75px", toggleClass: { targets: ".f5-nav", className: "is-dark" } });

      gsap.utils.toArray<HTMLElement>(".f5-emphasis").forEach((block) => {
        const lines = block.querySelectorAll("span");
        gsap.fromTo(lines, { opacity: .16, y: 18 }, {
          opacity: 1,
          y: 0,
          stagger: .32,
          ease: "none",
          scrollTrigger: { trigger: block, start: "top 78%", end: "bottom 42%", scrub: .7 }
        });
      });

      gsap.utils.toArray<HTMLElement>(".f5-mask-reveal").forEach((figure) => {
        gsap.fromTo(figure, { clipPath: "inset(10% 0 90% 0)" }, {
          clipPath: "inset(0% 0 0% 0)",
          duration: 1.25,
          ease: "power4.inOut",
          scrollTrigger: { trigger: figure, start: "top 86%", toggleActions: "play none none reverse" }
        });
      });
    });

    const magnetic = Array.from(document.querySelectorAll<HTMLElement>(".f5-pill, .f5-final a"));
    const moveMagnet = (event: MouseEvent) => {
      const el = event.currentTarget as HTMLElement;
      const box = el.getBoundingClientRect();
      gsap.to(el, { x: (event.clientX - box.left - box.width / 2) * .13, y: (event.clientY - box.top - box.height / 2) * .13, duration: .45, ease: "power3.out" });
    };
    const resetMagnet = (event: Event) => gsap.to(event.currentTarget as HTMLElement, { x: 0, y: 0, duration: .7, ease: "elastic.out(1,.4)" });
    magnetic.forEach((el) => { el.addEventListener("mousemove", moveMagnet); el.addEventListener("mouseleave", resetMagnet); });
    return () => {
      magnetic.forEach((el) => { el.removeEventListener("mousemove", moveMagnet); el.removeEventListener("mouseleave", resetMagnet); });
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  }, []);

  return <main className="f5-page">
    <div className="f5-progress"><i className="f5-progress-bar" /></div>
    <section className="f5-hero">
      <div className="f5-stage">
        <header className="f5-nav">
          <a href="/" className="f5-brand"><img src="/arika-header-lockup.png" alt="ARIKA Realty" /></a>
          <nav><a href="#why">Why ARIKA</a><a href="#vision">Our vision</a><a href="#services">What we build</a><a href="#journal">Journal</a></nav>
          <a href="#contact" className="f5-pill">Enquire <span>↗</span></a>
        </header>
        <img className="f5-sky" src="/home-5-premium-sky.png" alt="" />
        <img className="f5-cloud-a" src="/parallax-cloud-white-far.png" alt="" />
        <img className="f5-cloud-b" src="/parallax-cloud-white-near.png" alt="" />
        <div className="f5-intro"><h1>Find What Moves You</h1><p>Thoughtful architecture. Enduring quality. Homes built for what comes next.</p><a className="f5-pill" href="#why">Explore our projects <span>→</span></a></div>
        <img className="f5-house" src="/home-2-front-villa.png" alt="Contemporary ARIKA residence" />
        <div className="f5-outline"><strong>ARIKA</strong><span>REALTY</span></div>
        <div className="f5-masked-logo"><strong>ARIKA</strong><span>REALTY</span></div>
        <div className="f5-curtain"><img src="/cloud-curtain-bank.png" alt="" /></div>
        <div className="f5-next"><span>Scroll to discover</span><i>↓</i></div>
      </div>
    </section>

    <section className="f5-why" id="why">
      <div className="f5-side f5-reveal"><span>Why ARIKA</span><b>01</b></div>
      <div className="f5-why-copy f5-reveal"><p>Your life is changing. Your home should move with it.</p><h2 className="f5-emphasis"><span>We don’t simply develop addresses.</span><span>We create the setting for what comes next—</span><span>with thoughtful design, enduring materials</span><span>and confidence in every detail.</span></h2></div>
      <figure className="f5-wide f5-reveal f5-mask-reveal"><img className="f5-pan" src="/arika-builder-development.png" alt="Contemporary ARIKA real estate development" /></figure>
    </section>

    <section className="f5-vision" id="vision">
      <div className="f5-side f5-reveal"><span>Our point of view</span><b>02</b></div>
      <div className="f5-vision-title"><h2>This isn’t just <span>about real estate.</span></h2></div>
      <div className="f5-shapes">
        {["/home-4/images/project-meridian.jpg","/home-4/images/amenity-pool.jpg","/home-4/images/interior-living.jpg","/pexels-shox-31640057.jpg.jpeg"].map((src,i)=><figure key={src} className={`shape-${i}`}><img className="f5-pan" src={src} alt="" /></figure>)}
      </div>
      <p className="f5-vision-note">It’s about identity. Progress. Getting unstuck. You’re not just looking for a place. You’re looking for alignment. That’s what ARIKA helps you build.</p>
    </section>

    <section className="f5-story">
      <figure className="f5-story-small f5-reveal f5-mask-reveal"><img className="f5-pan" src="/home-4/images/amenity-library.jpg" alt="Material details" /></figure>
      <div className="f5-story-copy f5-reveal"><span>Built with purpose</span><h2>Clarity at every step.<br/>Character in every space.</h2><p>We build slowly enough to notice what matters—and decisively enough to deliver on every promise.</p><a href="#services">Our approach ↗</a></div>
      <figure className="f5-story-large f5-reveal f5-mask-reveal"><img className="f5-pan" src="/home-4/images/project-verdant.jpg" alt="ARIKA residential development" /></figure>
    </section>

    <section className="f5-testimonials">
      <div className="f5-side f5-reveal"><span>In their words</span><b>03</b></div>
      <h2 className="f5-reveal">Don’t take our<br/>word for it.</h2>
      <div className="f5-people f5-reveal"><img src="/pexels-abhishek-mishra-277771722-17343501.jpg.jpeg" alt="Resident"/><img src="/pexels-vishnu-murali-204762399-15068164.jpg.jpeg" alt="Resident"/></div>
      <blockquote className="f5-reveal">“ARIKA understood that we weren’t choosing square feet. We were choosing the way our family would live.”<footer>★★★★★ <span>— The Mehta family, Mumbai</span></footer></blockquote>
    </section>

    <section className="f5-services" id="services">
      <div className="f5-service-head f5-reveal"><span>What we do</span><h2>How ARIKA<br/>moves you forward.</h2></div>
      {services.map(([n,title,copy,image])=><article className="f5-service" key={title}>
        <img className="f5-pan" src={image} alt=""/><div className="f5-service-shade"/><span>{n}</span><h3>{title}</h3><p>{copy}</p><a href="#contact">↗</a>
      </article>)}
      <div className="f5-beyond f5-reveal"><span>Beyond the building</span><h2>Support beyond<br/>brick and mortar.</h2><div>{["Design direction","Ownership experience","Long-term value"].map((x,i)=><figure key={x}><img src={["/home-4/images/amenity-lounge.jpg","/home-4/images/amenity-deck.jpg","/home-4/images/tower-upward.jpg"][i]} alt=""/><figcaption>0{i+1} — {x}</figcaption></figure>)}</div></div>
    </section>

    <section className="f5-journal" id="journal">
      <div className="f5-journal-head f5-reveal"><span>Journal & resources</span><h2>Ideas for living<br/>with intention.</h2><a href="#">View all stories ↗</a></div>
      {journals.map(([title,meta,image],i)=><article className="f5-journal-row f5-reveal" key={title}><span>0{i+1}</span><div><small>{meta}</small><h3>{title}</h3><a href="#">Read story →</a></div><figure><img className="f5-pan" src={image} alt=""/></figure></article>)}
    </section>

    <section className="f5-final" id="contact"><img className="f5-pan" src="/home-4/images/mumbai-gateway.jpg" alt="Mumbai waterfront"/><div><span>Begin a conversation</span><h2>Find your place.<br/>We’ll build what’s next.</h2><a className="f5-pill" href="mailto:hello@arikarealty.com">Talk to ARIKA <b>↗</b></a></div></section>
    <footer className="f5-footer"><div className="f5-group-links"><span>ARIKA Group</span><a href="#">Arika Hospitality</a><a href="#">Arika Healthcare</a><a href="#">Arika Developers</a><a href="#">Arika Realty</a></div><div><span>Visit</span><p>Mumbai, Maharashtra<br/>India</p></div><div><span>Write</span><a href="mailto:hello@arikarealty.com">hello@arikarealty.com</a></div><div><span>Follow</span><a href="#">Instagram</a><a href="#">LinkedIn</a></div><div className="f5-footer-marquee"><img src="/arika-logo-white-transparent.png" alt="ARIKA Realty"/><strong>ARIKA</strong></div><small>© 2026 ARIKA Realty · Privacy · Terms</small></footer>
  </main>;
}
