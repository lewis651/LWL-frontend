import React from 'react';

export default function WhyLarrySection({ onSelectCar, cars }) {
  const reasons = [
    {
      title: "Clean and Intact Guarantee",
      desc: "We only source cars with clean body panels, spotless interiors, straight frames, and zero severe mechanical issues. Every vehicle is handpicked."
    },
    {
      title: "Cheap, Honest Direct Prices",
      desc: "Every price is displayed plainly with zero hidden dealership administration fees. Vehicle costs and shipping freight are quoted transparently."
    },
    {
      title: "Written Condition Reports",
      desc: "Each car has a written 120-point mechanical inspection and high-resolution photo set showing all exterior, interior, engine, and trunk angles."
    },
    {
      title: "Full Ocean Shipping Handled",
      desc: "We handle inland carrier pickup, US port delivery, US Customs export validation, and vessel ocean bookings directly with premier shipping lines."
    },
    {
      title: "Proven Dependable Models",
      desc: "Our inventory focuses on Toyota, Honda, Nissan, BMW, and Dodge models that are renowned for durability and easy parts availability in your home market."
    },
    {
      title: "Direct Communication With Larry",
      desc: "No call center bots. Speak or chat on WhatsApp directly with Larry and our export team. We answer questions plainly and provide timely shipping updates."
    }
  ];

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-subtitle">Credibility & Excellence</span>
            <h2 className="section-title">Why Buy from Larry with Larry</h2>
            <p className="section-caption">
              Buying a used car from across the ocean can feel daunting. We eliminate every uncertainty through verified condition reports, honest wholesale pricing, and verified port delivery tracking.
            </p>
          </div>
        </div>

        {/* 6 Core Pillars */}
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-card-bar"></div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
