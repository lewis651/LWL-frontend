import React, { useState } from 'react';

const PHOTOS = [
  { src: '/assets/move1.jpg', type: 'image' },
  { src: '/assets/move2.jpg', type: 'image' },
  { src: '/assets/move3.jpg', type: 'image' },
  { src: '/assets/move4.jpg', type: 'image' },
  { src: '/assets/move5.jpg', type: 'image' },
  { src: '/assets/move6.jpg', type: 'image' },
  { src: '/assets/move7.jpg', type: 'image' },
  { src: '/assets/move8.jpg', type: 'image' },
  { src: '/assets/move9.jpg', type: 'image' },
  { src: '/assets/move10.jpg', type: 'image' },
  { src: '/assets/move11.mp4', type: 'video' },
  { src: '/assets/move12.mp4', type: 'video' },
];

const VIDEOS = [
  '/assets/vid1.mp4',
  '/assets/vid2.mp4',
  '/assets/vid3.mp4',
  '/assets/vid4.mp4',
  '/assets/vid5.mp4',
  '/assets/vid6.mp4',
  '/assets/vid7.mp4',
  '/assets/vid8.mp4',
];

export default function DayInLifePage() {
  const [lightboxItem, setLightboxItem] = useState(null);
  const openLightbox = (item) => setLightboxItem(item);
  const closeLightbox = () => setLightboxItem(null);

  return (
    <div className="animate-fade">
      <div className="stories-header-box">
        <div className="wrap">
          <span className="section-subtitle">Behind the Scenes</span>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', marginBottom: '12px' }}>
            A Day in Our Lives
          </h1>
          <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', maxWidth: '640px' }}>
            Get an exclusive look at what goes on behind the scenes at Larry with Larry. From thorough multi-point vehicle inspections and export container loading to customer handovers.
          </p>
        </div>
      </div>

      <section style={{ padding: '48px 0', background: 'var(--bg)' }}>
        <div className="wrap">
          <div style={{ marginBottom: '32px' }}>
            <span className="section-subtitle">Photos &amp; Moments</span>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginTop: '8px' }}>Daily Highlights</h2>
          </div>
          <div className="dil-grid">
            {PHOTOS.map((item, idx) => (
              <div
                key={idx}
                className="dil-card"
                onClick={() => openLightbox(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(item)}
              >
                {item.type === 'image' ? (
                  <>
                    <img src={item.src} alt={`Larry with Larry moment ${idx + 1}`} loading="lazy" />
                    <div className="dil-overlay">
                      <span className="dil-icon">&#128269;</span>
                    </div>
                  </>
                ) : (
                  <>
                    <video src={item.src} preload="metadata" muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div className="dil-overlay">
                      <span className="dil-icon">&#9654;</span>
                      <span className="dil-video-badge">Video Clip</span>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '48px 0', background: 'var(--card)' }}>
        <div className="wrap">
          <div style={{ marginBottom: '32px' }}>
            <span className="section-subtitle">Full Videos</span>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', marginTop: '8px' }}>Watch Us in Action</h2>
          </div>
          <div className="dil-videos-grid">
            {VIDEOS.map((src, idx) => (
              <div key={idx} className="dil-video-card">
                <video
                  controls
                  muted
                  preload="metadata"
                  playsInline
                  style={{ width: '100%', display: 'block', maxHeight: '420px', background: '#000' }}
                >
                  <source src={src} type="video/mp4" />
                </video>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxItem && (
        <div className="dil-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button className="dil-lightbox-close" onClick={closeLightbox} aria-label="Close">✕</button>
          <div className="dil-lightbox-content" onClick={(e) => e.stopPropagation()}>
            {lightboxItem.type === 'image' ? (
              <img src={lightboxItem.src} alt="Full view" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }} />
            ) : (
              <video src={lightboxItem.src} controls autoPlay playsInline style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '12px' }} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
