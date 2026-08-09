"use client";

import React, { useState } from "react";

export default function Home() {
  const [savedProperties, setSavedProperties] = useState<Record<string, boolean>>({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heroBgIndex, setHeroBgIndex] = useState(0);

  const heroImages = [
    { name: "Westlake Estate", image: "/neighborhood-westlake.jpg" },
    { name: "Austin Horizon", image: "/neighborhood-austin.jpg" },
    { name: "Highland Modern", image: "/neighborhood-highland.jpg" },
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
      avatar: "/neighborhood-austin.jpg",
    },
    {
      id: "[02]",
      quote: "Unlike many other agents, ARIKA REALTY didn't ask us to sign an exclusive commitment before taking us on our first private tour. Truly world-class advisory.",
      name: "Dianne Russell",
      role: "Advanced Techniquishian Coach",
      avatar: "/neighborhood-highland.jpg",
    },
    {
      id: "[03]",
      quote: "Their market analytics and data-driven guidance gave us complete confidence during our $8.9M acquisition in Westlake Hills. Unmatched attention to detail.",
      name: "Marcus Vance",
      role: "Private Equity Partner",
      avatar: "/neighborhood-westlake.jpg",
    },
  ];

  const neighborhoods = [
    {
      id: "downtown-austin",
      name: "Downtown Austin",
      specs: "3 beds · 2 baths · 1,650 sq ft",
      address: "1234 Maple Street, Austin, TX 78701",
      price: "$4,800,000",
      image: "/neighborhood-austin.jpg",
    },
    {
      id: "highland-park",
      name: "Highland Park",
      specs: "4 beds · 4 baths · 3,850 sq ft",
      address: "7820 Crescent Way, Dallas, TX 75205",
      price: "$6,250,000",
      image: "/neighborhood-highland.jpg",
    },
    {
      id: "westlake-hills",
      name: "Westlake Hills",
      specs: "5 beds · 6 baths · 5,200 sq ft",
      address: "4100 Skyline Terrace, Austin, TX 78746",
      price: "$8,900,000",
      image: "/neighborhood-westlake.jpg",
    },
    {
      id: "the-heights",
      name: "The Heights",
      specs: "4 beds · 5 baths · 4,100 sq ft",
      address: "1902 Woodland Vista, Houston, TX 77008",
      price: "$5,400,000",
      image: "/neighborhood-heights.jpg",
    },
  ];

  const insights = [
    {
      title: "5 Tips for First-Time Home Buyers in Today's Market",
      meta: "By Jessica Park · March 15, 2025 · 5 min read",
      image: "/neighborhood-heights.jpg",
    },
    {
      title: "How Architectural Design Influences Long-Term Value",
      meta: "By David Chen · March 10, 2025 · 7 min read",
      image: "/neighborhood-westlake.jpg",
    },
    {
      title: "Navigating Private Real Estate Transactions in 2026",
      meta: "By Elena Rostova · March 2, 2025 · 4 min read",
      image: "/neighborhood-highland.jpg",
    },
  ];

  return (
    <div className="main-app">
      {/* ----------------------------------------------------
         1. NAVBAR
      ---------------------------------------------------- */}
      <header className="navbar">
        <div className="nav-brand">
          <img src="/arika-logo-transparent.png" alt="ARIKA REALTY" className="nav-logo-img" />
          <span>ARIKA REALTY</span>
        </div>

        <nav className="nav-links">
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
        <img
          src={heroImages[heroBgIndex].image}
          alt="Luxury Architecture"
          className="hero-bg-media"
        />
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
                onClick={() => setHeroBgIndex(idx)}
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
          <p className="hero-sub-text">
            Discrete acquisitions, private representation, and world-class architectural advisory across premier global destinations.
          </p>

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
        </div>

        {/* Hero Bottom Key Metrics Row */}
        <div className="hero-metrics-row">
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
      </section>

      {/* Value Proposition Cards Section */}
      <section className="section-wrapper" style={{ paddingTop: "20px", paddingBottom: "40px" }}>
        <div className="value-props-grid">
          <div className="value-card">
            <p>Work with our dedicated advisory team who understand local market trends, private listings, and seamless closings.</p>
            <button className="btn-card-action">Find an agent ↗</button>
          </div>

          <div className="value-card">
            <p>Get prequalified with our trusted lending partners for competitive rates, customized terms, and expedited approvals.</p>
            <button className="btn-card-action">Get prequalified ↗</button>
          </div>

          <div className="value-card">
            <p>Comprehensive market reports, valuation insights, and data-driven trends to maximize your investment portfolio.</p>
            <button className="btn-card-action">Learn more ↗</button>
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
            <img src="/neighborhood-westlake.jpg" alt="Luxury Architecture Night View" />
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
              <img src="/neighborhood-austin.jpg" alt="Client Avatar" className="author-avatar" />
              <div className="author-info">
                <h4 style={{ color: "var(--text-main)" }}>Dianne Russell</h4>
                <p style={{ color: "var(--text-muted)" }}>Advanced Technique Coach</p>
              </div>
            </div>

            <div className="testimonial-mini-card">
              <img src="/neighborhood-highland.jpg" alt="Client Avatar" className="author-avatar" />
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
        <img src="/neighborhood-highland.jpg" alt="Ready to find your dream home" />
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

          <div className="footer-brand-title">ARIKA REALTY</div>

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
