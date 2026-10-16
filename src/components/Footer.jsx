import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => onNavigate('home')}>
              <div className="logo-badge">L<b>w</b>L</div>
              <strong style={{ fontSize: '15px', color: '#fff', letterSpacing: '0.02em' }}>
                AUTOMOTIVE SALES, LARRY WITH LARRY
              </strong>
            </div>
            <p>
              Direct dealer wholesale sales of clean, intact, and fully inspected used vehicles. Specializing in secure worldwide ocean shipping to Africa, Europe, the Caribbean, and Middle East.
            </p>
            <div style={{ marginTop: '16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', background: '#171c26', color: 'var(--emerald)', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                ✓ Licensed & Bonded
              </span>
              <span style={{ fontSize: '12px', background: '#171c26', color: 'var(--blue)', padding: '4px 10px', borderRadius: '6px', fontWeight: 600 }}>
                ✓ 70 Vehicles in Stock
              </span>
            </div>

            <div>
              <a
                href="https://www.facebook.com/share/g/1Dop3cjCdz/?mibextid=wwXlfr"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-fb-btn"
                aria-label="Join our Facebook Community Group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>Join Our Facebook Group</span>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul>
              <li><button type="button" onClick={() => onNavigate('home')}>Home</button></li>
              <li><button type="button" onClick={() => onNavigate('cars')}>All 70 Cars in Stock</button></li>
              <li><button type="button" onClick={() => onNavigate('stories')}>Customer Stories & Videos</button></li>
              <li><button type="button" onClick={() => onNavigate('shipping')}>Ocean Shipping Guide</button></li>
              <li><button type="button" onClick={() => onNavigate('guide')}>Used Car Buyer's Guide</button></li>
              <li><button type="button" onClick={() => onNavigate('about')}>About Larry with Larry</button></li>
              <li><button type="button" onClick={() => onNavigate('faq')}>FAQ</button></li>
              <li><button type="button" onClick={() => onNavigate('contact')}>Contact Us</button></li>
              <li><button type="button" onClick={() => onNavigate('dayinlife')}>Day in Our Lives</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              <li>Wholesale Clean Used Cars</li>
              <li>120-Point Certified Inspections</li>
              <li>US Customs Export Clearance</li>
              <li>Roll-On Roll-Off (RoRo) Bookings</li>
              <li>20ft / 40ft Ocean Containers</li>
              <li>Original Bill of Lading (B/L) Express</li>
              <li>Marine Cargo Transit Insurance</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Seaports We Ship To</h4>
            <ul>
              <li>Nigeria: Lagos (Tin Can / Apapa)</li>
              <li>Ghana: Tema & Takoradi Ports</li>
              <li>Kenya: Port of Mombasa</li>
              <li>South Africa: Durban & Walvis Bay</li>
              <li>Europe: Rotterdam, Antwerp, Hamburg</li>
              <li>Middle East: Dubai (Jebel Ali)</li>
              <li>Caribbean: Kingston, Freeport, Georgetown</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 AUTOMOTIVE SALES, LARRY WITH LARRY. All rights reserved.{' '}
            <button
              type="button"
              onClick={() => onNavigate('admin')}
              aria-label="Staff Login"
              title="Admin"
              style={{
                background: 'none',
                border: 'none',
                opacity: 0.3,
                cursor: 'pointer',
                fontSize: '13px',
                padding: '2px 4px',
                verticalAlign: 'middle',
                lineHeight: 1,
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.3')}
            >
              🔒
            </button>
          </div>
          <div>
            Prices listed in USD, excluding destination port customs duties and local taxes. Clean title guaranteed.
          </div>
        </div>
      </div>
    </footer>
  );
}
