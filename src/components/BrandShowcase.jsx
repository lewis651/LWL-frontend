import React from 'react';
import { CARS_DATA } from '../data/carsData';

export default function BrandShowcase({ onSelectBrand, activeBrand }) {
  const brandDefinitions = [
    { name: 'Toyota', logo: '/assets/logos/toyota.svg' },
    { name: 'Honda', logo: '/assets/logos/honda.svg' },
    { name: 'BMW', logo: '/assets/logos/bmw.svg' },
    { name: 'Chevrolet', logo: '/assets/logos/chevrolet.svg' },
    { name: 'Ford', logo: '/assets/logos/ford.svg' },
    { name: 'Dodge', logo: '/assets/logos/dodge.svg' },
    { name: 'Mercedes-Benz', logo: '/assets/logos/mercedes.svg' },
    { name: 'Jeep', logo: '/assets/logos/jeep.svg' },
    { name: 'Audi', logo: '/assets/logos/audi.svg' },
    { name: 'Lexus', logo: '/assets/logos/lexus.svg' },
    { name: 'Nissan', logo: '/assets/logos/nissan.svg' },
    { name: 'Tesla', logo: '/assets/logos/tesla.svg' },
  ];

  const brands = brandDefinitions.map((b) => {
    const count = CARS_DATA.filter(
      (c) => c.make.toLowerCase() === b.name.toLowerCase()
    ).length;
    return {
      ...b,
      count: `${count} ${count === 1 ? 'Car' : 'Cars'}`,
    };
  });

  return (
    <section className="section" id="brands">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-subtitle">Verified Makes</span>
            <h2 className="section-title">Shop by Popular Brand</h2>
            <p className="section-caption">
              Select any brand to filter our clean used vehicle inventory instantly.
            </p>
          </div>
          <button
            type="button"
            className="pill-action"
            onClick={() => onSelectBrand('All')}
          >
            View All {CARS_DATA.length} Cars ↗
          </button>
        </div>

        {/* Clean Brand Logo Cards Grid */}
        <div className="brand-logos-grid">
          {brands.map((b) => {
            const isActive = activeBrand?.toLowerCase() === b.name.toLowerCase();
            return (
              <div
                key={b.name}
                className={`brand-logo-card ${isActive ? 'active-brand' : ''}`}
                onClick={() => onSelectBrand(b.name)}
                tabIndex={0}
                role="button"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectBrand(b.name); }}
                aria-label={`Filter by ${b.name}`}
              >
                <div className="brand-logo-wrap">
                  <img
                    src={b.logo}
                    alt={`${b.name} logo`}
                    className="brand-logo-img"
                    loading="lazy"
                  />
                </div>
                <div className="brand-logo-info">
                  <strong className="brand-logo-name">{b.name}</strong>
                  <span className="brand-logo-count">{b.count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
