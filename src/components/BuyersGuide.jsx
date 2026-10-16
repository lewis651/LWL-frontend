import React, { useState } from 'react';

export default function BuyersGuide({ onBrowseCars }) {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const guideSteps = [
    {
      title: "1. Bodywork, Paint & Panel Gaps",
      desc: "Check for uniform panel gaps between fenders, doors, and hood. Uneven gaps or mismatched paint overspray indicate previous collision repairs. Look closely at wheel arches and rocker panels for any sign of rust."
    },
    {
      title: "2. Interior Wear vs. Mileage",
      desc: "Examine driver seat bolster wear, pedal rubber, and steering wheel texture. They should align naturally with the odometer reading. Test air conditioning, power windows, switches, touchscreen, and sound system."
    },
    {
      title: "3. Engine Health & Warning Lights",
      desc: "A healthy engine should idle smoothly with zero valve tick or belt squeal. Oil should be golden to light amber, not milky or sludgy. Upon ignition, all dashboard warning lights (Check Engine, ABS, Airbag) must extinguish."
    },
    {
      title: "4. Transmission Shift Quality",
      desc: "Whether automatic, manual, or CVT, gear engagements should feel immediate with zero slipping, harsh clunks, or hesitation between reverse and drive. Transmission fluid should smell clean and show clear red/pink or amber hue."
    },
    {
      title: "5. Title & VIN Documentation",
      desc: "Never purchase a car without verifying that the 17-digit VIN on the dashboard matches the door jamb sticker and the official Certificate of Title. Ensure there are no outstanding liens or salvage brands."
    },
    {
      title: "6. Certified Remote Condition Report",
      desc: "When purchasing online from another country, insist on a comprehensive written condition report with engine compression results, multi-angle photos of the undercarriage, and walkaround videos."
    }
  ];

  const prev = () => setCarouselIdx((p) => (p - 1 + guideSteps.length) % guideSteps.length);
  const next = () => setCarouselIdx((p) => (p + 1) % guideSteps.length);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 40) next();
    else if (diff < -40) prev();
    setTouchStartX(null);
  };

  return (
    <section className="section" id="guide">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-subtitle">Expert Advice</span>
            <h2 className="section-title">Used Car Buyer's Guide</h2>
            <p className="section-caption">
              Six essential mechanical checks every remote buyer should know before purchasing a used vehicle, wherever you buy from.
            </p>
          </div>
          <button type="button" className="pill-action" onClick={onBrowseCars}>
            Explore Inspected Stock ↗
          </button>
        </div>

        {/* Desktop: 3-col grid (hidden on mobile) */}
        <div className="guide-grid-desktop">
          {guideSteps.map((step, i) => (
            <div key={i} className="why-card">
              <div className="why-card-bar"></div>
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Interactive carousel - 1 card per line with swipe & nav */}
        <div
          className="guide-carousel-mobile"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="why-card guide-carousel-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div className="why-card-bar" style={{ marginBottom: 0 }}></div>
              <span className="guide-step-pill">Check {carouselIdx + 1} of {guideSteps.length}</span>
            </div>
            <h3>{guideSteps[carouselIdx].title}</h3>
            <p>{guideSteps[carouselIdx].desc}</p>
          </div>

          <div className="carousel-controls">
            <button type="button" className="carousel-nav-btn" onClick={prev} aria-label="Previous check">‹</button>
            <div className="carousel-dots">
              {guideSteps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel-dot ${i === carouselIdx ? 'active' : ''}`}
                  onClick={() => setCarouselIdx(i)}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
            <button type="button" className="carousel-nav-btn" onClick={next} aria-label="Next check">›</button>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{ marginTop: '50px' }} className="cta-banner">
          <div>
            <h2>Every car listed at Larry with Larry includes a free 120-point condition report.</h2>
            <p style={{ color: 'var(--ink-secondary)', marginTop: '8px', fontSize: '15px' }}>
              We do the tedious mechanical inspections and verify the titles so you can buy with total peace of mind.
            </p>
          </div>
          <button type="button" className="btn-cta" onClick={onBrowseCars} style={{ padding: '14px 28px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            Browse Verified Cars
          </button>
        </div>
      </div>
    </section>
  );
}
