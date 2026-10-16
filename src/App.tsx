import WarpText from './components/WarpText';
import './App.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function App() {

  return (
    <div className="page-wrapper">
      {/* ==================================================
          A. TRANSPARENT MINIMAL HEADER
          ================================================== */}
      <header className="site-header" role="banner">
        <div className="content-container">
          <div className="header-inner">
            <div className="header-brand-placeholder" />
          </div>
        </div>
      </header>

      {/* ==================================================
          B. HERO SECTION
          feazto Logo Centered Above the Grand COMING SOON Heading
          ================================================== */}
      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-main-title">
          {/* Animated Heritage Chariot & Subtle Floating Food Doodles */}
          <div className="chariot-bg-stage" aria-hidden="true">
            <img
              src="/chariot-cutout.webp"
              alt=""
              className="chariot-moving-asset"
              width="548"
              height="903"
              decoding="async"
            />
            {/* Realistic Floating Food Doodles (Gentle drifting, no spin, zero overlap) */}
            <div className="food-doodles-layer">
              <img
                src="/doodle-dosa.webp"
                alt=""
                className="floating-food-doodle doodle-pos-top-left"
                width="240"
                height="160"
                decoding="async"
              />
              <img
                src="/doodle-biryani.webp"
                alt=""
                className="floating-food-doodle doodle-pos-top-right"
                width="220"
                height="195"
                decoding="async"
              />
              <img
                src="/doodle-idli.webp"
                alt=""
                className="floating-food-doodle doodle-pos-mid-left"
                width="200"
                height="160"
                decoding="async"
              />
              <img
                src="/doodle-chai.webp"
                alt=""
                className="floating-food-doodle doodle-pos-mid-right"
                width="170"
                height="175"
                decoding="async"
              />
              <img
                src="/doodle-naan.webp"
                alt=""
                className="floating-food-doodle doodle-pos-bottom-left"
                width="210"
                height="145"
                decoding="async"
              />
              <img
                src="/doodle-samosa.webp"
                alt=""
                className="floating-food-doodle doodle-pos-bottom-right"
                width="190"
                height="130"
                decoding="async"
              />
            </div>
          </div>

          <div className="content-container">
            <div className="hero-content-box">
              {/* Centered feazto Logo - Transparent Background */}
              <div className="hero-center-logo-wrap">
                <img
                  src="/feazto-logo-transparent.png"
                  alt="feazto — FOOD • CULTURE • CONNECT"
                  className="hero-center-logo-img"
                  width="330"
                  height="97"
                  decoding="async"
                />
              </div>

              {/* Main Character: Grand COMING SOON Heading with WarpText */}
              <div className="coming-soon-hero-stage">
                <div className="coming-soon-supertitle">A NEW FOOD EXPERIENCE IS ON ITS WAY</div>
                <h1 id="hero-main-title" className="grand-coming-soon-title">
                  <span className="sr-only">Feazto — Food, Culture, Connect | Coming Soon</span>
                  <WarpText
                    text="COMING SOON"
                    segments={[
                      { text: 'COMING ', color: '#121212' },
                      { text: 'SOON', color: '#121212' }
                    ]}
                    color="#121212"
                    warpStrength={0.08}
                    warpScale={1.7}
                    speed={0.55}
                    pointerInfluence={0.42}
                    pointerStrength={0.38}
                    refraction={0.018}
                    chromatic={0.35}
                    ripple={true}
                    clickRipple={true}
                    idleDrift={0.2}
                    lens="bulge"
                    intro={true}
                    fontSize="clamp(4.2rem, 13vw, 11rem)"
                    fontWeight={900}
                    fontFamily="var(--font-display)"
                    letterSpacing="-0.04em"
                    lineHeight={0.92}
                    className="hero-warp-text"
                    style={{ height: 'clamp(80px, 14vw, 170px)', width: '100%', maxWidth: '1200px', margin: '0 auto' }}
                  />
                </h1>
                <div className="hero-subhead">
                  Something delicious is on its way.
                </div>
              </div>

              {/* Description Paragraph */}
              <p className="hero-lead-paragraph">
                feazto is crafting a vibrant culinary experience—bringing you closer to authentic regional kitchens, timeless flavours, and the warmth of home.
              </p>

              {/* Primary Call to Action */}
              <div className="hero-cta-group">
                <a href="#notify-me" className="primary-cta-button" id="cta-stay-in-the-loop">
                  Stay in the loop
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
                <span className="hero-tagline-whisper">
                  A little closer to the flavours of home.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            LOWER SHOWCASE ZONE (2ND PAGE DOWN TO FOOTER)
            - Tall Banana Trees spanning the entire web border across both cards
            - Brown Kolam Art in the background
            ================================================== */}
        <div className="lower-showcase-zone">
          {/* Large Brown Kolam Background Art (Ultra HD 1024x1024) */}
          <div className="showcase-kolam-bg-stage" aria-hidden="true">
            <img
              src="/kolam-brown-hd.webp"
              alt=""
              className="showcase-bg-kolam-img"
              width="1024"
              height="1024"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Grand Botanical Banana Trees spanning full vertical length along borders */}
          <div className="showcase-border-trees" aria-hidden="true">
            <img
              src="/banana-tree-left.webp"
              alt=""
              className="showcase-tree tree-left"
              width="500"
              height="1400"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/banana-tree-right.webp"
              alt=""
              className="showcase-tree tree-right"
              width="500"
              height="1400"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* C. BRAND STATEMENT */}
          <section className="brand-statement-section" aria-labelledby="statement-heading">
            <div className="content-container">
              <div className="statement-card">
                {/* Kolam Corner Art: Left & Right Halves with cut edge attached to card border */}
                <img
                  src="/kolam-1-right.webp"
                  alt=""
                  aria-hidden="true"
                  className="card-kolam-corner card-kolam-left"
                  width="141"
                  height="281"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src="/kolam-1-left.webp"
                  alt=""
                  aria-hidden="true"
                  className="card-kolam-corner card-kolam-right"
                  width="141"
                  height="281"
                  loading="lazy"
                  decoding="async"
                />

                <div className="ornament-divider" aria-hidden="true">
                  <span className="ornament-line"></span>
                  <span className="ornament-line"></span>
                </div>

                <h2 id="statement-heading" className="statement-headline">
                  More than a meal.
                  <br />
                  A connection to home.
                </h2>
                <p className="statement-paragraph">
                  feazto is building a space where food brings people closer to the flavours, kitchens, and stories that make every region special.
                </p>
              </div>
            </div>
          </section>

          {/* D. LAUNCH TOUCHPOINT / CONNECT */}
          <section id="notify-me" className="connect-section" aria-labelledby="connect-heading">
            <div className="content-container">
              <div className="connect-card">
                {/* Kolam Corner Art: Left & Right Halves with cut edge attached to card border */}
                <img
                  src="/kolam-3-right.webp"
                  alt=""
                  aria-hidden="true"
                  className="card-kolam-corner card-kolam-left"
                  width="141"
                  height="281"
                  loading="lazy"
                  decoding="async"
                />
                <img
                  src="/kolam-3-left.webp"
                  alt=""
                  aria-hidden="true"
                  className="card-kolam-corner card-kolam-right"
                  width="142"
                  height="281"
                  loading="lazy"
                  decoding="async"
                />

                <h2 id="connect-heading" className="connect-headline">
                  Be there from the beginning.
                </h2>
                <p className="connect-paragraph">
                  Stay connected and be among the first to hear when feazto is ready.
                </p>
                <div className="connect-actions">
                  <a
                    href="mailto:feazto26@gmail.com?subject=Feazto%20Early%20Access%20Inquiry"
                    className="contact-team-btn"
                    id="contact-email-btn"
                    aria-label="Contact our Launch Team via email at feazto26@gmail.com"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    Contact our Launch Team
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* ==================================================
          E. EXPANDED FOOTER WITH HERITAGE ARCHITECTURE SKYLINE
          ================================================== */}
      <footer className="site-footer" role="contentinfo">
        <div className="content-container footer-content-wrap">
          <div className="footer-inner">
            <div className="footer-brand-wrap">
              <img
                src="/feazto-logo-transparent.png"
                alt="feazto — FOOD • CULTURE • CONNECT"
                className="footer-logo-img"
                width="394"
                height="116"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="footer-summary">A new way to discover food is coming.</p>
            <p className="footer-copyright">
              © {CURRENT_YEAR} feazto. All rights reserved.
            </p>
          </div>
        </div>

        {/* Heritage Architecture Skyline Doodle Art resting along the lower base (single panorama) */}
        <div className="footer-skyline-container" aria-hidden="true">
          <img
            src="/skyline-doodle.webp"
            alt=""
            className="footer-skyline-art"
            width="1376"
            height="451"
            loading="lazy"
            decoding="async"
          />
        </div>
      </footer>
    </div>
  );
}
