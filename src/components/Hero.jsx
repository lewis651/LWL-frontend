import React, { useState, useMemo } from 'react';
import { CARS_DATA } from '../data/carsData';
import CustomSelect from './CustomSelect';

export default function Hero({ onSearchSubmit, onSelectCar, featuredCar }) {
  const [selectedMake, setSelectedMake] = useState('Any');
  const [selectedBody, setSelectedBody] = useState('Any');
  const [selectedPrice, setSelectedPrice] = useState('Any');
  const [destinationPort, setDestinationPort] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Available makes derived directly from inventory
  const availableMakes = useMemo(() => {
    const set = new Set(CARS_DATA.map((c) => c.make).filter(Boolean));
    return Array.from(set).sort();
  }, []);

  // Dropdown options
  const makeOptions = useMemo(() => [
    { value: 'Any', label: `All Makes (${availableMakes.length})` },
    ...availableMakes.map((m) => ({ value: m, label: m }))
  ], [availableMakes]);

  const bodyOptions = useMemo(() => [
    { value: 'Any', label: 'All Body Types' },
    { value: 'Sedan', label: 'Sedan' },
    { value: 'SUV', label: 'SUV' },
    { value: 'Coupe', label: 'Coupe' },
    { value: 'Pickup', label: 'Pickup / Truck' },
    { value: 'Hatchback', label: 'Hatchback' }
  ], []);

  const priceOptions = useMemo(() => [
    { value: 'Any', label: 'Any Price' },
    { value: '3000', label: 'Under $3,000' },
    { value: '5000', label: 'Under $5,000' },
    { value: '8000', label: 'Under $8,000' },
    { value: '12000', label: 'Under $12,000' },
    { value: '15000', label: 'Under $15,000' },
    { value: '20000', label: 'Under $20,000' }
  ], []);

  // Calculate matching cars live for instant responsive feedback
  const matchCount = useMemo(() => {
    return CARS_DATA.filter((c) => {
      if (selectedMake !== 'Any' && c.make.toLowerCase() !== selectedMake.toLowerCase()) return false;
      if (selectedBody !== 'Any' && c.bodyType.toLowerCase() !== selectedBody.toLowerCase()) return false;
      if (selectedPrice !== 'Any' && c.price > parseInt(selectedPrice, 10)) return false;
      return true;
    }).length;
  }, [selectedMake, selectedBody, selectedPrice]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit({
      make: selectedMake,
      bodyType: selectedBody,
      maxPrice: selectedPrice,
      destinationPort: destinationPort
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-decor-glow"></div>
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="hero-tag">
              <span>✦ Direct Dealer Inventory · No Middleman Markup</span>
            </div>
            <h1 className="hero-title">
              Clean Used Cars. <br />
              <span className="highlight">Honest Low Prices.</span>
            </h1>
            <p className="hero-desc">
              <strong>AUTOMOTIVE SALES, LARRY WITH LARRY</strong> sells clean, well-kept, and fully inspected used vehicles at transparent wholesale prices. We handle export documentation and book secure shipping to your destination port worldwide.
            </p>

            <div className="hero-metrics">
              <div className="metric-item">
                <b>70+</b>
                <span>Cars In Stock</span>
              </div>
              <div className="metric-item">
                <b>100%</b>
                <span>Inspected & Tested</span>
              </div>
              <div className="metric-item">
                <b>$300</b>
                <span>Min Down Payment</span>
              </div>
              <div className="metric-item">
                <b>35+</b>
                <span>Ports Worldwide</span>
              </div>
            </div>
          </div>

          {/* Hero Media Showcase replacing dummy SVG */}
          <div className="hero-visual">
            <div className="hero-video-box">
              <video
                src="/assets/vid1.mp4"
                poster="/assets/img1.jpg"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Larry with Larry inventory and loading showcase"
              />
              <div className="hero-video-overlay">
                <div className="hero-badge-live">
                  <span className="dot-live"></span>
                  <span>LIVE YARD INVENTORY</span>
                </div>
                {featuredCar && (
                  <div
                    className="hero-floating-card"
                    onClick={() => onSelectCar(featuredCar)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div>
                      <h4>{featuredCar.title}</h4>
                      <p>{featuredCar.mileage} · {featuredCar.transmission}</p>
                    </div>
                    <div className="price-tag">
                      ${featuredCar.price?.toLocaleString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="floating-stat">
              <div className="floating-stat-icon">✓</div>
              <div>
                <strong style={{ fontSize: '13px', display: 'block', color: '#fff' }}>Verified Clean Titles</strong>
                <span style={{ fontSize: '11px', color: 'var(--mut)' }}>No Salvage, No Flood Damage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="search-wrapper">
          <div className="search-container">
            <div className="search-tabs">
              <button type="button" className="search-tab-btn active">
                Search Inventory (70+ Vehicles)
              </button>
            </div>

            <form onSubmit={handleSearch} className="search-bar-fields">
              <CustomSelect
                id="hero-make-select"
                label="Vehicle Make"
                value={selectedMake}
                onChange={setSelectedMake}
                options={makeOptions}
                ariaLabel="Filter by vehicle make"
              />

              <CustomSelect
                id="hero-body-select"
                label="Body Style"
                value={selectedBody}
                onChange={setSelectedBody}
                options={bodyOptions}
                ariaLabel="Filter by body style"
              />

              <CustomSelect
                id="hero-price-select"
                label="Max Price"
                value={selectedPrice}
                onChange={setSelectedPrice}
                options={priceOptions}
                ariaLabel="Filter by maximum price"
              />

              <div className="field-box" id="hero-port-box">
                <span className="field-label">Ship To Port / Country</span>
                <input
                  id="hero-port-input"
                  type="text"
                  placeholder="e.g. Lagos, Tema, Mombasa"
                  value={destinationPort}
                  onChange={(e) => setDestinationPort(e.target.value)}
                  aria-label="Enter destination port or country"
                />
              </div>

              <button type="submit" className="btn-search-trigger">
                <span>🔍 Search {matchCount > 0 ? `${matchCount} Cars` : 'Cars'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
