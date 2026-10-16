import React from 'react';

export default function CarCard({ car, onSelectCar }) {
  return (
    <article
      className="car-card"
      onClick={() => onSelectCar(car)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectCar(car); }}
      aria-label={`View details for ${car.title}`}
    >
      <div className="car-pic-holder">
        <img
          src={car.thumbnail}
          alt={car.title}
          loading="lazy"
          onError={(e) => {
            // fallback if path glitch
            e.target.src = '/assets/img1.jpg';
          }}
        />
        <div className="car-badge-inspected">
          <span>✓ Inspected</span>
        </div>
        <div className="car-photo-count">
          <span>📸 {car.images?.length || 1} Photos</span>
        </div>
      </div>

      <div className="car-content">
        <div>
          <div className="car-meta-sub">
            <span>{car.year}</span>
            <span>•</span>
            <span>{car.bodyType}</span>
            <span>•</span>
            <span>{car.titleStatus?.split(' ')[0] || 'Clean'} Title</span>
          </div>

          <h3>{car.title}</h3>

          <div className="car-specs-pill-row">
            <span className="spec-mini-pill">{car.transmission}</span>
            <span className="spec-mini-pill">{car.mileage}</span>
            <span className="spec-mini-pill">{car.fuelType}</span>
          </div>
        </div>

        <div className="car-card-bottom">
          <div className="price-block">
            <div className="price-label">Actual Price</div>
            <div className="price-num">${car.price?.toLocaleString()}</div>
          </div>

          <button
            type="button"
            className="btn-view-car"
            onClick={(e) => {
              e.stopPropagation();
              onSelectCar(car);
            }}
          >
            View Details ↗
          </button>
        </div>
      </div>
    </article>
  );
}
