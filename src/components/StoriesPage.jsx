import React, { useState, useRef } from 'react';
import { TESTIMONIAL_IMAGES, TESTIMONIAL_VIDEOS, CLIENT_STORIES } from '../data/carsData';

export default function StoriesPage({ onOpenContact }) {
  const [filter, setFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Touch swipe support
  const touchStartX = useRef(null);
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) nextStory();
      else prevStory();
    }
    touchStartX.current = null;
  };

  const galleryItems = [
    ...TESTIMONIAL_VIDEOS.map((src, idx) => ({
      id: `vid-${idx + 1}`,
      type: 'video',
      src,
      title: `Client Delivery Video Review #${idx + 1}`,
      subtitle: `Recorded live upon port collection · Verified Client`,
      tag: 'Video Testimonial'
    })),
    ...TESTIMONIAL_IMAGES.map((src, idx) => ({
      id: `img-${idx + 1}`,
      type: 'image',
      src,
      title: `Client Handover #${idx + 1}`,
      subtitle: `Vehicle arrival & customs release inspection`,
      tag: 'Port Delivery'
    }))
  ];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'photos') return item.type === 'image';
    if (filter === 'videos') return item.type === 'video';
    return true;
  });

  const stories = CLIENT_STORIES.slice(0, 3);
  const prevStory = () => setCarouselIdx((p) => (p - 1 + stories.length) % stories.length);
  const nextStory = () => setCarouselIdx((p) => (p + 1) % stories.length);

  return (
    <div className="animate-fade">
      {/* Page Header */}
      <div className="stories-header-box">
        <div className="wrap">
          <div style={{ maxWidth: '780px' }}>
            <span className="section-subtitle">Real Clients · Real Deliveries Worldwide</span>
            <h1 style={{ fontSize: 'clamp(28px, 5vw, 54px)', marginBottom: '14px' }}>
              Customer Stories & Delivery Gallery
            </h1>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
              Every car we sell has a destination and a happy owner. Browse real client collection moments, port arrivals, container unloadings, and live video reviews from buyers across Africa, the Caribbean, Europe, and the Middle East.
            </p>

            <div className="stories-filter-tabs">
              <button type="button" className={`story-tab-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
                All Stories ({galleryItems.length})
              </button>
              <button type="button" className={`story-tab-btn ${filter === 'photos' ? 'active' : ''}`} onClick={() => setFilter('photos')}>
                📸 Photos ({TESTIMONIAL_IMAGES.length})
              </button>
              <button type="button" className={`story-tab-btn ${filter === 'videos' ? 'active' : ''}`} onClick={() => setFilter('videos')}>
                🎥 Videos ({TESTIMONIAL_VIDEOS.length})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap" style={{ marginTop: '40px' }}>

        {/* ── Testimonial Cards: desktop = 3-col grid, mobile = carousel ── */}

        {/* Desktop grid (hidden on mobile via CSS) */}
        <div className="testimonial-grid-desktop">
          {stories.map((st) => (
            <div key={st.id} className="testimonial-card">
              <div>
                <div style={{ color: 'var(--gold)', marginBottom: '12px', fontSize: '15px' }}>★★★★★</div>
                <p style={{ fontSize: '14px', color: 'var(--ink-secondary)', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '16px' }}>
                  "{st.quote}"
                </p>
              </div>
              <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px' }}>
                <strong style={{ display: 'block', fontSize: '14px', color: 'var(--ink)' }}>{st.client}</strong>
                <span style={{ fontSize: '12px', color: 'var(--blue)' }}>{st.car} · {st.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Interactive carousel — 1 card per swipe */}
        <div
          className="testimonial-carousel-mobile"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="testimonial-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ color: 'var(--gold)', fontSize: '15px' }}>★★★★★</div>
              <span className="guide-step-pill">Review {carouselIdx + 1} of {stories.length}</span>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--ink-secondary)', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '16px' }}>
              "{stories[carouselIdx]?.quote}"
            </p>
            <div style={{ borderTop: '1px solid var(--line)', paddingTop: '12px' }}>
              <strong style={{ display: 'block', fontSize: '14px', color: 'var(--ink)' }}>{stories[carouselIdx]?.client}</strong>
              <span style={{ fontSize: '12px', color: 'var(--blue)' }}>{stories[carouselIdx]?.car} · {stories[carouselIdx]?.location}</span>
            </div>
          </div>

          <div className="carousel-controls">
            <button type="button" className="carousel-nav-btn" onClick={prevStory} aria-label="Previous review">‹</button>
            <div className="carousel-dots">
              {stories.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`carousel-dot ${i === carouselIdx ? 'active' : ''}`}
                  onClick={() => setCarouselIdx(i)}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
            <button type="button" className="carousel-nav-btn" onClick={nextStory} aria-label="Next review">›</button>
          </div>
        </div>

        {/* Gallery Masonry */}
        <div className="gallery-masonry">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="gallery-item"
              onClick={() => setLightboxItem(item)}
            >
              {item.type === 'video' ? (
                <video src={item.src} muted autoPlay loop playsInline preload="metadata" />
              ) : (
                <img src={item.src} alt={item.title} loading="lazy" />
              )}
            </div>
          ))}
        </div>

        {/* Story CTA Banner */}
        <div className="stories-cta-box">
          <div>
            <h2 style={{ fontSize: 'clamp(20px, 3.5vw, 28px)', marginBottom: '8px' }}>Want to be our next happy car delivery story?</h2>
            <p style={{ color: 'var(--mut)', fontSize: '15px' }}>
              Pick any vehicle from our 50 verified listings or tell us what model you are looking for.
            </p>
          </div>
          <button type="button" className="btn-cta" onClick={onOpenContact} style={{ padding: '14px 28px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            Start Your Order Today ↗
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="lightbox-modal" onClick={() => setLightboxItem(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lightbox-close" onClick={() => setLightboxItem(null)}>✕</button>

            {lightboxItem.type === 'video' ? (
              <video src={lightboxItem.src} controls autoPlay muted playsInline style={{ width: '100%', borderRadius: '12px' }} />
            ) : (
              <img src={lightboxItem.src} alt={lightboxItem.title} style={{ width: '100%', borderRadius: '12px' }} />
            )}

            <div style={{ marginTop: '16px', textAlign: 'center', color: '#fff' }}>
              <h3 style={{ fontSize: '18px' }}>{lightboxItem.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--mut)', marginTop: '4px' }}>{lightboxItem.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
