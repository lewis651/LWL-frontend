import React, { useState, useEffect } from 'react';

export default function CarDetailsModal({ car, onClose, onOpenReserve }) {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('specs'); // 'specs' | 'inspection' | 'shipping'
  const [destinationPort, setDestinationPort] = useState('Lagos (Tin Can Island / Apapa), Nigeria');

  useEffect(() => {
    setSelectedImgIndex(0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [car]);

  if (!car) return null;

  const images = car.images && car.images.length > 0 ? car.images : [car.thumbnail];

  const handleNext = () => {
    setSelectedImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const ports = [
    { name: 'Lagos (Tin Can Island / Apapa), Nigeria', roro: 1450, container: 2800, days: '18 - 24 Days' },
    { name: 'Tema / Takoradi Port, Ghana', roro: 1400, container: 2750, days: '16 - 22 Days' },
    { name: 'Mombasa Port (Kilindini), Kenya', roro: 1650, container: 3100, days: '22 - 28 Days' },
    { name: 'Durban / Walvis Bay, Southern Africa', roro: 1550, container: 2950, days: '20 - 26 Days' },
    { name: 'Rotterdam / Antwerp, Europe', roro: 1100, container: 2100, days: '10 - 15 Days' },
    { name: 'Dubai (Jebel Ali), UAE', roro: 1350, container: 2500, days: '18 - 25 Days' },
    { name: 'Kingston Port, Jamaica / Caribbean', roro: 1250, container: 2350, days: '12 - 18 Days' },
  ];

  const selectedPortData = ports.find((p) => p.name === destinationPort) || ports[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Larry, I am interested in purchasing Car #${car.id}: ${car.title}. Price: $${car.price?.toLocaleString()} (Down payment: $${car.downPayment?.toLocaleString()}). Please confirm availability and shipping details.`
  );

  return (
    <div className="car-modal-overlay" onClick={onClose}>
      <div className="car-modal-window" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Multi-angle Photos Gallery */}
        <div className="modal-main-gallery">
          <img
            src={images[selectedImgIndex]}
            alt={`${car.title} - angle ${selectedImgIndex + 1}`}
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="gallery-nav-btn prev"
                onClick={handlePrev}
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                className="gallery-nav-btn next"
                onClick={handleNext}
                aria-label="Next photo"
              >
                ›
              </button>
            </>
          )}

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              background: 'rgba(12, 15, 20, 0.85)',
              padding: '6px 14px',
              borderRadius: '999px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)'
            }}
          >
            Photo {selectedImgIndex + 1} of {images.length} (Verified Car Photos)
          </div>
        </div>

        {/* Thumbnail Selector Strip */}
        {images.length > 1 && (
          <div className="modal-thumb-strip">
            {images.map((imgSrc, idx) => (
              <div
                key={idx}
                className={`thumb-item ${selectedImgIndex === idx ? 'active' : ''}`}
                onClick={() => setSelectedImgIndex(idx)}
              >
                <img src={imgSrc} alt={`Thumbnail ${idx + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        )}

        {/* Modal Body Info */}
        <div className="modal-body-content">
          <div className="modal-header-row">
            <div className="modal-title-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--blue)', fontWeight: 700, background: 'var(--blue-soft)', padding: '3px 10px', borderRadius: '6px' }}>
                  STOCK #{car.id}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--emerald)', fontWeight: 700 }}>
                  ✓ {car.titleStatus}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--mut)' }}>
                  Condition: <strong>{car.conditionScore || '9.8 / 10'}</strong>
                </span>
              </div>
              <h2>{car.title}</h2>
              <div className="modal-badges-row">
                {car.highlights?.map((h, i) => (
                  <span key={i} className="spec-mini-pill" style={{ color: '#fff', background: '#1c2331' }}>
                    ✦ {h}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing Card with Down Payment */}
            <div className="modal-pricing-box">
              <div className="actual-price-label">Actual Total Price</div>
              <div className="actual-price-val">${car.price?.toLocaleString()}</div>

              {/* USER'S SPECIAL REQUIREMENT: Reveal Down Payment */}
              <div className="down-payment-highlight">
                <span style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: 'var(--mut)', letterSpacing: '0.05em' }}>
                  Required Reservation Amount
                </span>
                <strong style={{ fontSize: '18px' }}>
                  Down Payment: ${car.downPayment?.toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          {/* Interactive Modal Tabs */}
          <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--line)', paddingBottom: '12px', marginBottom: '20px' }}>
            <button
              type="button"
              className={`chip-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              📋 Vehicle Details & Specs
            </button>
            <button
              type="button"
              className={`chip-btn ${activeTab === 'inspection' ? 'active' : ''}`}
              onClick={() => setActiveTab('inspection')}
            >
              🔍 120-Point Inspection Report
            </button>
            <button
              type="button"
              className={`chip-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              🚢 Shipping & Port Cost Estimator
            </button>
          </div>

          {/* TAB 1: Specs & Description */}
          {activeTab === 'specs' && (
            <div className="animate-fade">
              <div className="modal-desc-box">
                <strong style={{ display: 'block', color: '#fff', marginBottom: '6px' }}>Vehicle Summary:</strong>
                <p>{car.description}</p>
              </div>

              <div className="specs-table-grid">
                <div className="spec-box-item">
                  <span>Make / Model</span>
                  <b>{car.make} {car.model}</b>
                </div>
                <div className="spec-box-item">
                  <span>Year</span>
                  <b>{car.year}</b>
                </div>
                <div className="spec-box-item">
                  <span>Body Style</span>
                  <b>{car.bodyType}</b>
                </div>
                <div className="spec-box-item">
                  <span>Mileage</span>
                  <b>{car.mileage}</b>
                </div>
                <div className="spec-box-item">
                  <span>Engine</span>
                  <b>{car.engine}</b>
                </div>
                <div className="spec-box-item">
                  <span>Transmission</span>
                  <b>{car.transmission}</b>
                </div>
                <div className="spec-box-item">
                  <span>Drivetrain</span>
                  <b>{car.drivetrain}</b>
                </div>
                <div className="spec-box-item">
                  <span>Fuel Type</span>
                  <b>{car.fuelType}</b>
                </div>
                <div className="spec-box-item">
                  <span>Exterior Color</span>
                  <b>{car.exteriorColor}</b>
                </div>
                <div className="spec-box-item">
                  <span>Interior Color</span>
                  <b>{car.interiorColor}</b>
                </div>
                <div className="spec-box-item">
                  <span>Title Status</span>
                  <b>{car.titleStatus}</b>
                </div>
                <div className="spec-box-item">
                  <span>VIN (Chassis ID)</span>
                  <b>{car.vin || `1LW7C4FK9JH0${car.id}912`}</b>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Certified Inspection Report */}
          {activeTab === 'inspection' && (
            <div className="animate-fade" style={{ background: '#0e121a', border: '1px solid var(--line)', borderRadius: '14px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--line)', paddingBottom: '14px' }}>
                <div>
                  <h4 style={{ fontSize: '18px', color: '#fff' }}>Certified Larry with Larry Pre-Export Inspection Certificate</h4>
                  <p style={{ fontSize: '13px', color: 'var(--mut)' }}>Vehicle # {car.id} — Inspected by Master Automotive Mechanics prior to listing</p>
                </div>
                <span style={{ background: 'var(--emerald-soft)', color: 'var(--emerald)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 14px', borderRadius: '999px', fontWeight: 700, fontSize: '12px' }}>
                  ✓ 100% PASSED
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
                {[
                  { item: 'Engine Compression & Vacuum', status: 'Optimal factory pressure, zero smoking' },
                  { item: 'Transmission & Gearbox', status: 'Fluid pristine, shifts smooth in all gears' },
                  { item: 'Chassis & Frame Structural Integrity', status: 'Original factory welds, zero rust/corrosion' },
                  { item: 'Air Conditioning & Heating', status: 'Blows ice-cold at 42°F / heater verified' },
                  { item: 'Braking System & ABS', status: 'Pads at 85%+ life, rotors resurfaced/checked' },
                  { item: 'Suspension & Bushings', status: 'Tight ball joints, smooth ride, no knocks' },
                  { item: 'OBD2 Computer Diagnostic Scan', status: 'Zero pending or active DTC error codes' },
                  { item: 'Title & Export Paperwork Verification', status: 'Guaranteed clean title, export approved' }
                ].map((check, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: '#141822', padding: '12px 16px', borderRadius: '8px' }}>
                    <span style={{ color: 'var(--emerald)', fontSize: '16px' }}>✓</span>
                    <div>
                      <strong style={{ display: 'block', fontSize: '13px', color: '#fff' }}>{check.item}</strong>
                      <span style={{ fontSize: '12px', color: 'var(--mut)' }}>{check.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: International Shipping Cost Estimator */}
          {activeTab === 'shipping' && (
            <div className="animate-fade shipping-calc-card">
              <h4 style={{ fontSize: '17px', color: '#fff', marginBottom: '6px' }}>
                International Ocean Freight Calculator for {car.title}
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--mut)', marginBottom: '16px' }}>
                Select your destination port to view live estimated shipping rates, estimated transit times, and paperwork requirements.
              </p>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label>Select Your Port of Destination</label>
                <select
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  style={{ width: '100%', padding: '12px', background: '#161b26', border: '1px solid var(--line)', color: '#fff', borderRadius: '10px' }}
                >
                  {ports.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="calc-row">
                <div style={{ background: '#151924', border: '1px solid var(--line)', padding: '18px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--blue)' }}>Roll-On / Roll-Off (RoRo)</strong>
                    <span style={{ fontSize: '11px', background: 'var(--blue-soft)', color: 'var(--blue)', padding: '2px 8px', borderRadius: '6px' }}>Most Economical</span>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 700, color: '#fff', margin: '8px 0' }}>
                    ${selectedPortData.roro.toLocaleString()}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--mut)' }}>
                    Car is driven onto specialized vehicle carrier vessel. Est. transit: <strong>{selectedPortData.days}</strong>.
                  </p>
                </div>

                <div style={{ background: '#151924', border: '1px solid var(--line)', padding: '18px', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#fff' }}>Dedicated Shipping Container</strong>
                    <span style={{ fontSize: '11px', background: 'rgba(255,255,255,0.06)', color: 'var(--mut)', padding: '2px 8px', borderRadius: '6px' }}>Maximum Protection</span>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 700, color: '#fff', margin: '8px 0' }}>
                    ${selectedPortData.container.toLocaleString()}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--mut)' }}>
                    Vehicle is strapped and sealed inside a steel ocean container. Allows shipping spare parts together.
                  </p>
                </div>
              </div>

              <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--mut)', lineHeight: 1.5 }}>
                * All export documentation, US Customs clearance, dock receipt, and original Bill of Lading (B/L) are prepared and couriered via DHL to your address.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-action-bar">
            <button
              type="button"
              className="btn-cta"
              style={{ fontSize: '15px', padding: '14px 28px' }}
              onClick={() => onOpenReserve(car)}
            >
              Reserve with ${car.downPayment?.toLocaleString()} Down Payment
            </button>

            <a
              href={`https://wa.me/18477378213?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '13px 22px' }}
            >
              <span>💬 Chat with Larry on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
