import React, { useState } from 'react';

export default function FaqSection({ onOpenContact }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Are the cars really clean, intact, and as described?",
      a: "Yes, 100%. We strictly inspect and handpick every car. We reject vehicles with structural frame damage, flood history, or mechanical defects. Every vehicle in our 50-car inventory has 5 to 10 verified photographs showing interior, exterior, engine bay, and undercarriage, plus a full 120-point mechanical inspection report."
    },
    {
      q: "How does the down payment reservation work?",
      a: "To reserve any vehicle and hold it exclusively in your name, you only need to put down an affordable down payment ($300 to $800 depending on the vehicle). This locks the car, starts export paperwork prep, and books vessel space. The remaining balance is completed prior to final port loading, or via milestone escrow."
    },
    {
      q: "How long does shipping take from the US to my port?",
      a: "Transit times vary by destination port and vessel schedule. Generally, RoRo shipments to West Africa (Lagos, Tema) take 18–24 days; Europe (Rotterdam, Antwerp) takes 10–15 days; East Africa (Mombasa) takes 22–28 days; and the Caribbean takes 12–18 days. We provide you with the vessel name and live AIS maritime tracking link."
    },
    {
      q: "Is ocean shipping included in the vehicle listed price?",
      a: "No. The price displayed on each car card is the wholesale vehicle purchase price. Shipping freight is quoted separately based on your specific destination port and whether you choose Roll-on Roll-off (RoRo) or dedicated ocean container. This ensures complete transparency with zero hidden markups."
    },
    {
      q: "Who handles customs clearance and pays import duties?",
      a: "Import duties, port handling charges, and destination taxes are set by your country's customs authority and paid upon arrival. We provide all necessary original documents (US Title, Bill of Sale, 3/3 Original Ocean Bill of Lading, Export Clearance) couriered via DHL directly to you or your clearing agent."
    },
    {
      q: "Can I request a specific make, model, or year not in stock?",
      a: "Yes! If you are looking for a specific vehicle (e.g. Toyota Prado, Lexus RX, Mercedes-Benz, Ford Mustang GT, etc.), send us your preferred model, year range, and budget. Our dealer network will source, inspect, and present you with photos and condition reports within 24 to 48 hours."
    },
    {
      q: "What payment methods are supported?",
      a: "We accept secure international bank wire transfers (SWIFT/IBAN), verified Escrow services, cashier's checks, and major corporate debit/credit transfers. You will receive an official commercial invoice and bill of sale with full company registration details."
    },
    {
      q: "What guarantee do I have on the vehicle condition?",
      a: "We stand firmly behind our inspection reports. If any major mechanical defect is discovered upon port arrival that was not documented in our pre-shipment inspection report, we provide compensation or part replacement under our 12-month powertrain warranty."
    }
  ];

  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-subtitle">Common Inquiries</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-caption">
              Everything you need to know about purchasing, inspecting, down payments, and shipping cars internationally with Larry with Larry.
            </p>
          </div>
          <button
            type="button"
            className="pill-action"
            onClick={onOpenContact}
          >
            Have Another Question? Ask Us ↗
          </button>
        </div>

        <div className="faq-accordion" style={{ maxWidth: '920px', margin: '0 auto' }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="faq-item">
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: 'var(--blue)', transition: 'transform 0.2s', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="faq-answer animate-fade">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
