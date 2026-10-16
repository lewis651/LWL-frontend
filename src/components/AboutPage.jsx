import React from 'react';

export default function AboutPage({ onBrowseCars, onOpenContact }) {
  return (
    <div className="animate-fade">
      <div className="stories-header-box">
        <div className="wrap">
          <div style={{ maxWidth: '780px' }}>
            <span className="section-subtitle">Our Philosophy & Heritage</span>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 54px)', marginBottom: '14px' }}>
              About Automotive Sales, Larry with Larry
            </h1>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
              We started with a simple, disruptive premise: <strong>affordable cars should never mean compromised quality.</strong> For over a decade, Larry with Larry has supplied clean, intact, and thoroughly inspected used vehicles to buyers across 35 countries at true direct wholesale prices.
            </p>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: '50px' }}>

        {/* ── What We Stand For ── */}
        <div className="about-main-grid">
          {/* Left – pillars */}
          <div>
            <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', marginBottom: '20px' }}>What We Stand For</h2>
            <div style={{ display: 'grid', gap: '18px' }}>
              {[
                {
                  title: '1. Cheap Should Not Mean Poor',
                  desc: 'A cheap car is only a bargain if it is mechanically sound and reliable. We reject flood-damaged, frame-bent, or salvage inventory. We only buy clean title cars with solid engines and tight transmissions.'
                },
                {
                  title: '2. Full Transparency Over Distance',
                  desc: 'When buying from another continent, trust is everything. We provide multi-angle photographs, cold-start video walkarounds, diagnostic scans, and clear written contracts.'
                },
                {
                  title: '3. Complete Logistics Ownership',
                  desc: "You don't need to coordinate with freight forwarders or customs clearing agents alone. We handle domestic transport to the port, US Customs export filings, and courier original Bill of Lading documents directly to you."
                }
              ].map((item, i) => (
                <div key={i} style={{ background: 'var(--card)', border: '1px solid var(--line)', padding: '22px', borderRadius: '14px' }}>
                  <h3 style={{ fontSize: '17px', color: 'var(--blue)', marginBottom: '6px' }}>{item.title}</h3>
                  <p style={{ color: 'var(--mut)', fontSize: '14px', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – image */}
          <div className="about-image-col">
            <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--card-border)', boxShadow: '0 25px 60px rgba(0,0,0,0.5)' }}>
              <img
                src="/assets/img17.jpg"
                alt="Automotive Sales, Larry with Larry leadership"
                style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
              />
            </div>
            <div style={{ background: 'var(--card)', border: '1px solid var(--line)', padding: '18px', borderRadius: '14px', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '28px' }}>🤝</span>
              <div>
                <strong style={{ display: 'block', fontSize: '14px', color: '#fff' }}>Meet Larry & The Export Team</strong>
                <span style={{ fontSize: '12px', color: 'var(--mut)' }}>Licensed Automotive Dealer & Ocean Freight Specialist</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Global Port Network ── */}
        <div style={{ marginTop: '60px', background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '20px', padding: 'clamp(20px, 4vw, 36px)' }}>
          <h3 style={{ fontSize: 'clamp(18px, 3vw, 22px)', marginBottom: '8px' }}>Global Shipping Reach</h3>
          <p style={{ color: 'var(--mut)', fontSize: '14px', marginBottom: '24px' }}>
            We regularly ship vehicles out of Port of Newark (NJ), Port of Jacksonville (FL), Port of Houston (TX), and Port of Los Angeles (CA) to major global terminals:
          </p>

          <div className="about-ports-grid">
            {[
              { region: 'West Africa', ports: 'Lagos (Apapa/Tin Can), Tema, Takoradi, Cotonou, Abidjan' },
              { region: 'East & Southern Africa', ports: 'Mombasa, Dar es Salaam, Durban, Walvis Bay, Maputo' },
              { region: 'Europe & UK', ports: 'Rotterdam, Antwerp, Bremerhaven, Southampton, Hamburg' },
              { region: 'Caribbean & Americas', ports: 'Kingston, Freeport, Port of Spain, Georgetown, Santo Domingo' }
            ].map((reg, i) => (
              <div key={i} style={{ background: '#0e121a', border: '1px solid var(--line)', padding: '16px', borderRadius: '12px' }}>
                <strong style={{ display: 'block', fontSize: '14px', color: 'var(--blue)', marginBottom: '4px' }}>
                  {reg.region}
                </strong>
                <p style={{ fontSize: '12px', color: 'var(--mut)', lineHeight: 1.5 }}>{reg.ports}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div className="about-stats-row">
          {[
            { val: '70+', label: 'Vehicles in Stock' },
            { val: '35+', label: 'Countries Served' },
            { val: '10+', label: 'Years in Business' },
            { val: '100%', label: 'Clean Title Inventory' },
          ].map((s, i) => (
            <div key={i} className="about-stat-box">
              <b>{s.val}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{ marginTop: '50px', textAlign: 'center', padding: 'clamp(28px, 5vw, 50px) 20px', background: 'linear-gradient(180deg, var(--card) 0%, #10141c 100%)', borderRadius: '24px', border: '1px solid var(--line)' }}>
          <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 32px)', marginBottom: '12px' }}>Ready to find your next clean vehicle?</h2>
          <p style={{ color: 'var(--mut)', fontSize: '15px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Browse our current stock of 50 verified vehicles or submit a special request.
          </p>
          <div className="about-cta-btns">
            <button type="button" className="btn-cta" onClick={onBrowseCars} style={{ padding: '14px 28px' }}>
              Browse Cars in Stock
            </button>
            <button type="button" className="btn-outline" onClick={onOpenContact} style={{ padding: '13px 24px' }}>
              Contact Larry Directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
