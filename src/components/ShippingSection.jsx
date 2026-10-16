import React from 'react';

export default function ShippingSection({ onOpenContact }) {
  const steps = [
    {
      num: 1,
      title: "1. Pick Your Car",
      desc: "Browse our 50 clean, low-priced cars with 5 to 10 verified photos per car. Request any specific details or walkaround videos."
    },
    {
      num: 2,
      title: "2. Review Written Report",
      desc: "Check the multi-point inspection report, engine diagnostic health, and title documents before committing any payment."
    },
    {
      num: 3,
      title: "3. Down Payment & Paperwork",
      desc: "Secure the vehicle with a low down payment ($300 - $800). We prepare export clearance, title endorsement, and book the carrier vessel."
    },
    {
      num: 4,
      title: "4. Port Arrival & Collection",
      desc: "Track the vessel voyage live. Clear customs smoothly using our DHL-couriered original Bill of Lading, and drive your car away."
    }
  ];

  return (
    <section className="section" id="shipping">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-subtitle">Worldwide Ocean Logistics</span>
            <h2 className="section-title">How International Car Shipping Works</h2>
            <p className="section-caption">
              From our dealership facility to your seaport of choice. Over 10 years of trusted export experience to Africa, Europe, the Caribbean, and Middle East.
            </p>
          </div>
          <button
            type="button"
            className="pill-action"
            onClick={onOpenContact}
          >
            Get Custom Shipping Quote ↗
          </button>
        </div>

        {/* Steps Grid */}
        <div className="shipping-steps-grid">
          {steps.map((st) => (
            <div key={st.num} className="step-card">
              <div className="step-card-num">{st.num}</div>
              <h3>{st.title}</h3>
              <p>{st.desc}</p>
            </div>
          ))}
        </div>

        {/* Shipping Methods Comparison */}
        <div style={{ marginTop: '50px' }}>
          <div className="methods-grid">
            <div className="method-box dark">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Roll-on Roll-off (RoRo)</h3>
                <span style={{ background: 'var(--blue-soft)', color: 'var(--blue)', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
                  Best Value
                </span>
              </div>
              <p style={{ marginTop: '8px' }}>
                Your car is driven directly into a specialized multi-level automotive carrier ship and secured below deck against waves and weather.
              </p>
              <ul>
                <li>✓ Lowest freight cost per car</li>
                <li>✓ High-frequency scheduled sailings worldwide</li>
                <li>✓ Car must run and drive under its own power</li>
                <li>✓ Personal effects inside the cabin are generally prohibited by shipping lines</li>
              </ul>
            </div>

            <div className="method-box blue">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3>Sealed Shipping Container (FCL / LCL)</h3>
                <span style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '6px' }}>
                  Maximum Security
                </span>
              </div>
              <p style={{ marginTop: '8px' }}>
                The vehicle is strapped, chocked, and locked inside a heavy-gauge steel ocean container (20ft or 40ft shared).
              </p>
              <ul>
                <li>✓ Highest protection against ocean salt spray and weather</li>
                <li>✓ Allowed to load spare tires, parts, or personal belongings with the car</li>
                <li>✓ Can consolidate 2 to 3 cars in a 40ft high-cube container to split costs</li>
                <li>✓ Ideal for premium luxury, performance, and collector vehicles</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Required Documents Section */}
        <div style={{ marginTop: '40px', background: 'var(--card)', borderRadius: '18px', padding: '32px', border: '1px solid var(--line)' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>Export Documents Handled & Provided by Larry with Larry</h3>
          <p style={{ fontSize: '14px', color: 'var(--mut)', marginBottom: '20px' }}>
            We guarantee complete compliance with all US Customs & Border Protection (CBP) export mandates and your destination country port regulations:
          </p>

          <div className="shipping-docs-grid">
            {[
              { doc: 'Original Certificate of Title', note: 'Validated and stamped by Customs' },
              { doc: 'Commercial Bill of Sale / Invoice', note: 'Itemized valuation for duty calculation' },
              { doc: 'Ocean Bill of Lading (B/L)', note: 'Original 3/3 set couriered via DHL express' },
              { doc: 'Pre-Shipment Inspection Certificate', note: 'Where required by destination port' },
              { doc: 'Dock Receipt & Loading Photos', note: 'Clear photos of your car loaded into ship' },
              { doc: 'Marine Transit Cargo Insurance', note: 'Full coverage from yard release to port' }
            ].map((d, i) => (
              <div key={i} style={{ background: '#0e121a', padding: '14px', borderRadius: '10px', border: '1px solid var(--line)' }}>
                <strong style={{ display: 'block', fontSize: '13px', color: '#fff' }}>📄 {d.doc}</strong>
                <span style={{ fontSize: '12px', color: 'var(--mut)' }}>{d.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
