"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [savedProperties, setSavedProperties] = useState<Record<string, boolean>>({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroBgIndex, setHeroBgIndex] = useState(0);
  const [heroCycleVersion, setHeroCycleVersion] = useState(0);
  const [elixirDone, setElixirDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setElixirDone(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const heroImages = [
    { name: "Westlake Estate", image: "/pexels-john-zook-2388999-5223143.jpg.jpeg" },
    { name: "Austin Horizon", image: "/pexels-omergulen-19366884.jpg.jpeg" },
    { name: "Highland Modern", image: "/pexels-volkerthimm-27307398.jpg.jpeg" },
  ];

  const toggleSave = (id: string) => {
    setSavedProperties((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const testimonials = [
    {
      id: "[01]",
      quote: "The team made my first home buying experience incredibly smooth. They were patient, knowledgeable, and helped me find the perfect starter home in Downtown Austin.",
      name: "Sarah Johnson",
      role: "Tech Executive",
      avatar: "/pexels-abhishek-mishra-277771722-17343501.jpg.jpeg",
    },
    {
      id: "[02]",
      quote: "Unlike many other agents, ARIKA REALTY didn't ask us to sign an exclusive commitment before taking us on our first private tour. Truly world-class advisory.",
      name: "Dianne Russell",
      role: "Advanced Techniquishian Coach",
      avatar: "/pexels-vishnu-murali-204762399-15068164.jpg.jpeg",
    },
    {
      id: "[03]",
      quote: "Their market analytics and data-driven guidance gave us complete confidence during our $8.9M acquisition in Westlake Hills. Unmatched attention to detail.",
      name: "Marcus Vance",
      role: "Private Equity Partner",
      avatar: "/pexels-omergulen-19366884.jpg.jpeg",
    },
  ];

  const neighborhoods = [
    {
      id: "downtown-austin",
      name: "Downtown Austin",
      specs: "3 beds · 2 baths · 1,650 sq ft",
      address: "1234 Maple Street, Austin, TX 78701",
      price: "$4,800,000",
      image: "/pexels-john-zook-2388999-5223143.jpg.jpeg",
    },
    {
      id: "highland-park",
      name: "Highland Park",
      specs: "4 beds · 4 baths · 3,850 sq ft",
      address: "7820 Crescent Way, Dallas, TX 75205",
      price: "$6,250,000",
      image: "/pexels-shox-31640057.jpg.jpeg",
    },
    {
      id: "westlake-hills",
      name: "Westlake Hills",
      specs: "5 beds · 6 baths · 5,200 sq ft",
      address: "4100 Skyline Terrace, Austin, TX 78746",
      price: "$8,900,000",
      image: "/pexels-volkerthimm-27307398.jpg.jpeg",
    },
    {
      id: "the-heights",
      name: "The Heights",
      specs: "4 beds · 5 baths · 4,100 sq ft",
      address: "1902 Woodland Vista, Houston, TX 77008",
      price: "$5,400,000",
      image: "/pexels-shox-34360413.jpg.jpeg",
    },
  ];

  const insights = [
    {
      title: "5 Tips for First-Time Home Buyers in Today's Market",
      meta: "By Jessica Park · March 15, 2025 · 5 min read",
      image: "/pexels-vishnu-murali-204762399-15068164.jpg.jpeg",
    },
    {
      title: "How Architectural Design Influences Long-Term Value",
      meta: "By David Chen · March 10, 2025 · 7 min read",
      image: "/pexels-aj33-449362239-28796447.jpg.jpeg",
    },
    {
      title: "Navigating Private Real Estate Transactions in 2026",
      meta: "By Elena Rostova · March 2, 2025 · 4 min read",
      image: "/pexels-asim-34160274-7096209.jpg.jpeg",
    },
  ];

  useEffect(() => {
    const heroCycle = window.setInterval(() => {
      setHeroBgIndex((current) => (current + 1) % heroImages.length);
    }, 3500);
    return () => window.clearInterval(heroCycle);
  }, [heroCycleVersion]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({ duration: 1.18, smoothWheel: true, wheelMultiplier: .88, anchors: true });
    const lenisTick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(lenisTick);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      heroTimeline
        .fromTo(".navbar", { y: -26, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.05 })
        .fromTo(".hero-top-badge-row > *", { y: 24, opacity: 0, filter: "blur(7px)" }, { y: 0, opacity: 1, filter: "blur(0px)", stagger: .09, duration: 1 }, "<.16")
        .fromTo(".hero-display-title", { y: 70, opacity: 0, filter: "blur(12px)", clipPath: "inset(0 0 24% 0)" }, { y: 0, opacity: 1, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)", duration: 1.45 }, "<.08")
        .fromTo(".hero-glass-search", { y: 44, opacity: 0, scale: .975, filter: "blur(9px)" }, { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.15 }, "<.42")
        .fromTo(".hero-metric-item", { y: 28, opacity: 0 }, { y: 0, opacity: 1, stagger: .075, duration: .9 }, "<.25");

      gsap.fromTo(".hero-bg-media", { scale: 1.035 }, { scale: 1.095, yPercent: 2.5, ease: "none", scrollTrigger: { trigger: ".worldclass-hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".hero-center-content", { y: -42, opacity: .66, ease: "none", scrollTrigger: { trigger: ".worldclass-hero", start: "55% top", end: "bottom top", scrub: .8 } });

      const motionSections = [
        { section: ".value-props-grid", targets: ".value-card", stagger: .1 },
        { section: "#market", targets: ".market-info-side > *, .stat-box, .market-image-side", stagger: .07 },
        { section: "#testimonials", targets: ".section-header-flex > *, .testimonial-feature-card, .testimonial-mini-card", stagger: .075 },
        { section: "#insights", targets: ".section-header-flex > *, .insight-card", stagger: .085 },
        { section: ".cta-banner", targets: ".cta-content > *", stagger: .09 },
        { section: ".footer", targets: ".footer-email-link, .footer-col, .footer-brand-title, .footer-bottom-row", stagger: .07 },
      ];

      motionSections.forEach(({ section, targets, stagger }) => {
        const sectionElement = document.querySelector<HTMLElement>(section);
        if (!sectionElement) return;
        const elements = sectionElement.querySelectorAll<HTMLElement>(targets);
        gsap.fromTo(elements,
          { y: 58, opacity: 0, scale: .985, filter: "blur(9px)", clipPath: "inset(0 0 10% 0)" },
          { y: 0, opacity: 1, scale: 1, filter: "blur(0px)", clipPath: "inset(0 0 0% 0)", duration: 1.25, stagger, ease: "power4.out", scrollTrigger: { trigger: sectionElement, start: "top 82%", once: true } }
        );

        gsap.fromTo(sectionElement,
          { y: 0, opacity: 1 },
          { y: -16, opacity: .84, ease: "none", scrollTrigger: { trigger: sectionElement, start: "bottom 9%", end: "bottom top", scrub: .65 } }
        );
      });

      const neighborhoodsSection = document.querySelector<HTMLElement>("#neighborhoods");
      if (neighborhoodsSection) {
        gsap.fromTo(neighborhoodsSection.querySelectorAll<HTMLElement>(".section-header-flex > *"),
          { y: 44, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.15, stagger: .08, ease: "power4.out", scrollTrigger: { trigger: neighborhoodsSection, start: "top 84%", once: true } }
        );

        const neighborhoodCards = neighborhoodsSection.querySelectorAll<HTMLElement>(".neighborhood-card");
        const neighborhoodsGrid = neighborhoodsSection.querySelector<HTMLElement>(".neighborhoods-grid");
        gsap.fromTo(neighborhoodCards,
          {
            x: (index) => index % 2 === 0 ? -150 : 150,
            opacity: 0,
            filter: "blur(10px)",
          },
          {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.45,
            stagger: .14,
            ease: "power4.out",
            scrollTrigger: {
              trigger: neighborhoodsGrid ?? neighborhoodsSection,
              start: "top 50%",
              end: "bottom 8%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".neighborhood-image-box, .market-image-side, .insight-image-box").forEach((frame) => {
        gsap.fromTo(frame,
          { clipPath: "inset(8% 0 8% 0)", scale: .97 },
          { clipPath: "inset(0% 0 0% 0)", scale: 1, duration: 1.45, ease: "power4.out", scrollTrigger: { trigger: frame, start: "top 88%", once: true } }
        );
      });

      gsap.fromTo(".cta-banner img", { scale: 1.08 }, { scale: 1.015, ease: "none", scrollTrigger: { trigger: ".cta-banner", start: "top bottom", end: "bottom top", scrub: 1.1 } });
    });

    ScrollTrigger.refresh();
    return () => {
      context.revert();
      gsap.ticker.remove(lenisTick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="main-app">
      {/* ----------------------------------------------------
         ELIXIR ENTRANCE PRELOADER
      ---------------------------------------------------- */}
      <div className={`elixir-entrance ${elixirDone ? "done" : ""}`}>
        <div className="elixir-portal-glow" />
        <div className="elixir-content">
          <img src="/arika-logo-white-transparent.png" alt="ARIKA REALTY" className="elixir-logo" />
          <p className="elixir-text">ARIKA REALTY &middot; PRIVATE ADVISORY</p>
          <div className="elixir-progress-bar">
            <div className="elixir-progress-fill" />
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------
         1. NAVBAR
      ---------------------------------------------------- */}
      <header className="navbar">
        <div className="nav-brand">
          <img src="/arika-logo-transparent.png" alt="ARIKA REALTY — Building Legacies" className="nav-logo-img" />
        </div>

        <nav className="nav-links">
          <div className="home-dropdown">
            <button className="home-dropdown-trigger">Home <span>⌄</span></button>
            <div className="home-dropdown-panel">
              <a href="/" className="active"><span>01</span>Homepage 1</a>
              <a href="/home-2"><span>02</span>Homepage 2</a>
            </div>
          </div>
          <a href="#residences">Residences</a>
          <a href="#neighborhoods">Neighborhoods</a>
          <a href="#market">Market Analysis</a>
          <a href="#testimonials">Client Stories</a>
          <a href="#insights">Insights</a>
        </nav>

        <div className="nav-actions">
          <button className="btn-secondary">Get prequalified</button>
          <button className="btn-primary">
            <span>Private consultation</span>
            <span aria-hidden="true">↗</span>
          </button>
        </div>

        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* ----------------------------------------------------
         2. WORLD-CLASS CINEMATIC ARCHITECTURAL HERO
      ---------------------------------------------------- */}
      <section className="worldclass-hero">
        <div className="hero-bg-stack" aria-live="polite">
          {heroImages.map((item, index) => <img
            src={item.image}
            alt={index === heroBgIndex ? item.name : ""}
            aria-hidden={index !== heroBgIndex}
            className={`hero-bg-media ${index === heroBgIndex ? "active" : ""}`}
            key={item.image}
          />)}
        </div>
        <div className="hero-bg-overlay" />

        {/* Hero Top Floating Row */}
        <div className="hero-top-badge-row">
          <span className="hero-gold-badge">
            <span>✦</span> PRIVATE ADVISORY &middot; EST. 2012
          </span>

          <div className="hero-residence-tabs">
            {heroImages.map((item, idx) => (
              <button
                key={item.name}
                className={`residence-tab-btn ${idx === heroBgIndex ? "active" : ""}`}
                onClick={() => {
                  setHeroBgIndex(idx);
                  setHeroCycleVersion((version) => version + 1);
                }}
              >
                0{idx + 1} / {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Center Display Content */}
        <div className="hero-center-content">
          <h1 className="hero-display-title">
            Unrivaled Private Residences &amp; <em>Architectural Masterpieces</em>
          </h1>
        </div>

        {/* Frosted Glass Floating Search Bar */}
        <div className="hero-glass-search">
            <div className="search-field">
              <label>Location</label>
              <input type="text" defaultValue="Austin, Texas &amp; Beyond" placeholder="City or Neighborhood" />
            </div>

            <div className="search-divider" />

            <div className="search-field">
              <label>Property Type</label>
              <select defaultValue="villa">
                <option value="villa">Private Residences &amp; Estates</option>
                <option value="penthouse">Penthouses</option>
                <option value="waterfront">Waterfront Properties</option>
              </select>
            </div>

            <div className="search-divider" />

            <div className="search-field">
              <label>Price Range</label>
              <select defaultValue="4m">
                <option value="4m">$3M &ndash; $10M+</option>
                <option value="10m">$10M &ndash; $25M</option>
                <option value="25m">$25M+</option>
              </select>
            </div>

            <button className="search-submit-btn">
              <span>Explore Portfolio</span>
              <span aria-hidden="true">↗</span>
            </button>
        </div>

      </section>

      {/* Hero metrics sit outside the image so the architecture can breathe. */}
      <div className="hero-metrics-row hero-metrics-exterior">
          <div className="hero-metric-item">
            <h4>$1.2B+</h4>
            <p>Exclusive Portfolio Transactions</p>
          </div>
          <div className="hero-metric-item">
            <h4>100%</h4>
            <p>Off-Market Private Representation</p>
          </div>
          <div className="hero-metric-item">
            <h4>4.9 ★</h4>
            <p>Client Satisfaction Rating</p>
          </div>
          <div className="hero-metric-item">
            <h4>48 Hrs</h4>
            <p>Average Inquiry Response</p>
          </div>
      </div>

      {/* Value Proposition Cards Section */}
      <section className="section-wrapper" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
        <div className="value-props-grid">
          <div className="value-card">
            <p>Work with our dedicated advisory team who understand local market trends, private listings, and seamless closings.</p>
            <button className="btn-card-action"><span>Find an agent</span><span className="btn-card-arrow" aria-hidden="true">↗</span></button>
          </div>

          <div className="value-card">
            <p>Get prequalified with our trusted lending partners for competitive rates, customized terms, and expedited approvals.</p>
            <button className="btn-card-action"><span>Get prequalified</span><span className="btn-card-arrow" aria-hidden="true">↗</span></button>
          </div>

          <div className="value-card">
            <p>Comprehensive market reports, valuation insights, and data-driven trends to maximize your investment portfolio.</p>
            <button className="btn-card-action"><span>Learn more</span><span className="btn-card-arrow" aria-hidden="true">↗</span></button>
          </div>
        </div>
      </section>

      <section className="section-wrapper" id="neighborhoods">
        <div className="section-header-flex">
          <div>
            <h2 className="section-title">Featured Neighborhoods</h2>
            <p className="section-subtitle">Explore the most popular areas with current market trends</p>
          </div>
          <a href="#all" className="btn-secondary">View All Portfolio ↗</a>
        </div>

        <div className="neighborhoods-grid">
          {neighborhoods.map((item) => (
            <div className="neighborhood-card" key={item.id}>
              <div className="neighborhood-image-box">
                <img src={item.image} alt={item.name} />
                <button
                  className={`heart-btn ${savedProperties[item.id] ? "active" : ""}`}
                  onClick={() => toggleSave(item.id)}
                  title="Save property"
                >
                  {savedProperties[item.id] ? "♥" : "♡"}
                </button>
              </div>

              <div className="neighborhood-meta-content">
                <h3 className="neighborhood-name">{item.name}</h3>
                <p className="neighborhood-specs">{item.specs}</p>
                <p className="neighborhood-address">{item.address}</p>
                <p className="neighborhood-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="market-section" id="market">
        <div className="market-inner">
          <div className="market-info-side">
            <h2 className="section-title">Comprehensive Market Performance Analysis</h2>
            <p className="section-subtitle">
              Real-time insights and data-driven trends from the local real estate market to help buyers, sellers, and investors make smarter decisions.
            </p>

            <div className="stats-quad-grid">
              <div className="stat-box dark">
                <span className="stat-number">18 Days</span>
                <span className="stat-label">Average on Market</span>
              </div>

              <div className="stat-box light">
                <span className="stat-number">96%</span>
                <span className="stat-label">List to Sale Ratio</span>
              </div>

              <div className="stat-box light">
                <span className="stat-number">15+</span>
                <span className="stat-label">Homes Sold This Quarter</span>
              </div>

              <div className="stat-box light">
                <span className="stat-number">$425K</span>
                <span className="stat-label">Average Price / Sq Ft</span>
              </div>
            </div>
          </div>

          <div className="market-image-side">
            <img src="/pexels-safwanck-10964081.jpg.jpeg" alt="Contemporary residential architecture" />
          </div>
        </div>
      </section>

      <section className="testimonials-section" id="testimonials">
        <div className="section-header-flex">
          <div>
            <h2 className="section-title">What Our Happy Clients Say</h2>
            <p className="section-subtitle">Real stories from real clients who found their dream homes with us</p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              className="btn-secondary"
              style={{ width: "44px", height: "44px", borderRadius: "50%", padding: 0, display: "grid", placeItems: "center" }}
              onClick={() => setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
            >
              ←
            </button>
            <button
              className="btn-secondary"
              style={{ width: "44px", height: "44px", borderRadius: "50%", padding: 0, display: "grid", placeItems: "center" }}
              onClick={() => setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
            >
              →
            </button>
          </div>
        </div>

        <div className="testimonial-container">
          <div className="testimonial-feature-card">
            <span className="testimonial-quote-num">{testimonials[currentTestimonial].id}</span>
            <p className="testimonial-quote-text">{testimonials[currentTestimonial].quote}</p>
            <div className="testimonial-author-row">
              <img src={testimonials[currentTestimonial].avatar} alt={testimonials[currentTestimonial].name} className="author-avatar" />
              <div className="author-info">
                <h4>{testimonials[currentTestimonial].name}</h4>
                <p>{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </div>

          <div className="testimonial-side-cards">
            <div className="testimonial-mini-card">
              <img src="/pexels-abhishek-mishra-277771722-17343501.jpg.jpeg" alt="Client Avatar" className="author-avatar" />
              <div className="author-info">
                <h4 style={{ color: "var(--text-main)" }}>Dianne Russell</h4>
                <p style={{ color: "var(--text-muted)" }}>Advanced Technique Coach</p>
              </div>
            </div>

            <div className="testimonial-mini-card">
              <img src="/pexels-vishnu-murali-204762399-15068164.jpg.jpeg" alt="Client Avatar" className="author-avatar" />
              <div className="author-info">
                <h4 style={{ color: "var(--text-main)" }}>Sarah Johnson</h4>
                <p style={{ color: "var(--text-muted)" }}>Tech Executive · Austin TX</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrapper" id="insights">
        <div className="section-header-flex">
          <div>
            <h2 className="section-title">Real Estate Insights</h2>
            <p className="section-subtitle">Articles, guides, and strategic market advice from our research team</p>
          </div>
          <a href="#all-insights" className="btn-secondary">View All Articles ↗</a>
        </div>

        <div className="insights-grid">
          {insights.map((article, idx) => (
            <div className="insight-card" key={idx}>
              <div className="insight-image-box">
                <img src={article.image} alt={article.title} />
              </div>
              <div className="insight-body">
                <span className="insight-meta">{article.meta}</span>
                <h3 className="insight-title">{article.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="cta-banner">
        <img src="/pexels-omergulen-19366884.jpg.jpeg" alt="Ready to find your dream home" />
        <div className="cta-overlay" />
        <div className="cta-content">
          <h2 className="cta-title">Ready to Find Your Dream Home?</h2>
          <p className="cta-sub">
            Join thousands of satisfied clients who have found their perfect home with our expert guidance, market analysis, and personalized service.
          </p>
          <div className="cta-buttons">
            <button className="btn-white">Start Your Search</button>
            <button className="btn-glass">Speak with an Agent</button>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top-row">
            <a href="mailto:contact@arikarealty.com" className="footer-email-link">
              <span>contact@arikarealty.com</span>
              <span>↗</span>
            </a>

            <div className="footer-nav-cols">
              <div className="footer-col">
                <h5>Join</h5>
                <ul>
                  <li><a href="#agent">Become an Agent</a></li>
                  <li><a href="#referrals">Get Referrals</a></li>
                  <li><a href="#careers">Careers</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h5>About</h5>
                <ul>
                  <li><a href="#why">Why Choose Us?</a></li>
                  <li><a href="#community">Community Impact</a></li>
                  <li><a href="#press">Press</a></li>
                  <li><a href="#blog">Blog</a></li>
                </ul>
              </div>

              <div className="footer-col">
                <h5>Find Us</h5>
                <ul>
                  <li><a href="#contact">Contact Us</a></li>
                  <li><a href="#help">Help Center</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-brand-title">
            <img src="/arika-logo-white-transparent.png" alt="ARIKA REALTY — Building Legacies" className="footer-logo-img" />
          </div>

          <div className="footer-bottom-row">
            <p>&copy; 2026 ARIKA REALTY LLC. All rights reserved.</p>
            <div className="footer-legal-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#accessibility">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
