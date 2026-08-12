"use client";

import { useEffect, useState } from "react";

const projects = [
  ["Onyx", "Worli Sea Face", "62-storey residential tower", "/home-4/images/project-onyx.jpg"],
  ["Meridian", "Alibaug", "Twelve waterfront villas", "/home-4/images/project-meridian.jpg"],
  ["Solstice", "Bandra West", "Limited-edition residences", "/home-4/images/project-solstice.jpg"],
  ["Riviera", "Juhu", "Sea-facing duplexes", "/home-4/images/project-riviera.jpg"],
];

const amenities = [
  ["The Sky Pool", "Level 48", "/home-4/images/amenity-pool.jpg"],
  ["The Terrace", "Level 12", "/home-4/images/amenity-deck.jpg"],
  ["Wellness Floor", "Level 6", "/home-4/images/amenity-gym.jpg"],
  ["The Reading Room", "Level 3", "/home-4/images/amenity-library.jpg"],
];

export default function HomeFour() {
  const [menu, setMenu] = useState(false);
  const [amenity, setAmenity] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add("visible")), { threshold: .12 });
    document.querySelectorAll(".h4-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <main className="home-four">
    <header className="h4-nav">
      <a className="h4-logo" href="/home-4"><img src="/arika-emblem.png" alt=""/><span>ARIKA<small>DEVELOPERS</small></span></a>
      <nav>
        <div className="h4-home-menu"><button>Home <span>⌄</span></button><div><a href="/">01 · Homepage 1</a><a href="/home-2">02 · Homepage 2</a><a href="/home-3">03 · Homepage 3</a><a className="active" href="/home-4">04 · Homepage 4</a></div></div>
        <a href="#philosophy">Philosophy</a><a href="#projects">Projects</a><a href="#amenities">Amenities</a>
      </nav>
      <a className="h4-enquire" href="#enquire">Enquire ↗</a>
      <button className="h4-menu" onClick={()=>setMenu(!menu)}>{menu?"Close":"Menu"}</button>
      <div className={`h4-mobile ${menu?"open":""}`}><a href="/">Homepage 1</a><a href="/home-2">Homepage 2</a><a href="/home-3">Homepage 3</a><a href="/home-4">Homepage 4</a></div>
    </header>

    <section className="h4-hero">
      <video autoPlay muted loop playsInline poster="/home-4/images/tower-upward.jpg"><source src="/home-4/video/hero.mp4" type="video/mp4"/></video>
      <div className="h4-hero-shade"/>
      <div className="h4-hero-copy"><p>Residential architecture · Mumbai</p><h1>We do not<br/>build <em>ordinary.</em></h1><div><span>Since 1997</span><span>Scroll to explore ↓</span></div></div>
    </section>

    <section className="h4-manifesto" id="philosophy"><p className="h4-kicker h4-reveal">Our position</p><h2 className="h4-reveal">Architecture should hold its ground for generations—not simply occupy it.</h2><p className="h4-note h4-reveal">We develop residential and mixed-use places with a singular belief: consequence comes from refusing the convenient answer.</p></section>

    <section className="h4-tower"><img src="/home-4/images/tower-upward.jpg" alt="Tower rising into the Mumbai sky"/><div className="h4-tower-copy h4-reveal"><span>01 — Form</span><h2>One tower.<br/>Every horizon.</h2><p>A single slab turned off the grid so that every residence holds the Arabian Sea in full width.</p></div></section>

    <section className="h4-projects" id="projects"><div className="h4-heading h4-reveal"><p>Selected developments</p><h2>Work that<br/><em>holds its ground.</em></h2></div><div className="h4-project-rail">{projects.map((p,i)=><article key={p[0]} className="h4-project h4-reveal"><div><img src={p[3]} alt={p[0]}/><span>0{i+1}</span></div><p>{p[1]}</p><h3>{p[0]}</h3><small>{p[2]}</small></article>)}</div></section>

    <section className="h4-interlude"><img src="/home-4/images/interior-living.jpg" alt="ARIKA residence interior"/><blockquote className="h4-reveal">“The drawing is a promise,<br/>not a proposal.”</blockquote></section>

    <section className="h4-amenities" id="amenities"><div className="h4-amenity-image"><img key={amenities[amenity][2]} src={amenities[amenity][2]} alt={amenities[amenity][0]}/></div><div className="h4-amenity-list"><p>Designed around living</p>{amenities.map((a,i)=><button className={i===amenity?"active":""} onClick={()=>setAmenity(i)} key={a[0]}><span>0{i+1}</span><strong>{a[0]}</strong><small>{a[1]}</small></button>)}</div></section>

    <section className="h4-stats"><div><strong>28</strong><span>Years building in Mumbai</span></div><div><strong>41</strong><span>Completed developments</span></div><div><strong>9.6M</strong><span>Square feet delivered</span></div><div><strong>100%</strong><span>Delivered on schedule</span></div></section>

    <section className="h4-location"><div className="h4-heading h4-reveal"><p>Our city</p><h2>Mumbai,<br/><em>in full measure.</em></h2></div><div className="h4-location-grid">{[["Fort & Colaba","mumbai-gateway.jpg"],["The Civic Quarter","mumbai-bmc.jpg"],["The Harbour","mumbai-harbour.jpg"]].map(x=><figure key={x[0]}><img src={`/home-4/images/${x[1]}`} alt={x[0]}/><figcaption>{x[0]}</figcaption></figure>)}</div></section>

    <section className="h4-contact" id="enquire"><div><p>Private enquiries</p><h2>Begin with<br/>a conversation.</h2><a href="mailto:residences@arika.com">residences@arika.com ↗</a></div><img src="/home-4/images/interior-atrium.jpg" alt="ARIKA interior atrium"/></section>
    <footer className="h4-footer"><div className="h4-footer-word">ARIKA</div><div><span>© 2026 ARIKA DEVELOPERS</span><span>Mumbai · Since 1997</span><a href="/">Homepage 1</a><a href="/home-2">Homepage 2</a><a href="/home-3">Homepage 3</a><a href="/home-4">Homepage 4</a></div></footer>
  </main>;
}
