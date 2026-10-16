import React from 'react';

export default function InspectionPromo({ onBrowseCars }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="promo-box">
          <div className="promo-txt">
            <span className="promo-badge">🛡️ 100% Certified Inspection Guarantee</span>
            <h2>Free Written Condition & Inspection Report on Every Single Car</h2>
            <p>
              Know exactly what you are purchasing before sending a single dollar. Every vehicle at <strong>AUTOMOTIVE SALES, LARRY WITH LARRY</strong> undergoes a rigorous 120-point mechanical evaluation, OBD2 engine diagnostic scan, frame alignment verification, and flood/salvage title check.
            </p>

            <div className="promo-stats-flex">
              <div className="promo-blue-stat">
                <b>100%</b>
                <span>Pre-Export Inspected</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '6px' }}>
                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>✓ High-definition multi-angle photos</span>
                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>✓ Cold A/C, engine & transmission tested</span>
                <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>✓ Guaranteed clean title export papers</span>
              </div>
            </div>

            <div style={{ marginTop: '28px' }}>
              <button
                type="button"
                className="btn-cta"
                onClick={onBrowseCars}
                style={{ padding: '12px 24px' }}
              >
                Inspect All 70 Cars in Stock ↗
              </button>
            </div>
          </div>

          <div className="promo-img-side">
            <img
              src="/assets/img8.jpg"
              alt="Automotive Sales, Larry with Larry vehicle inspection facility"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
