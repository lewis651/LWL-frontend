import React, { useState } from 'react';

export default function Navbar({ activePage, setActivePage, carCount, theme, toggleTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Credibility Notice Bar */}
      <div className="top-notice">
        <div className="wrap top-notice-content">
          <div className="top-notice-pills">
            <div className="top-notice-item">
              <span className="dot-live"></span>
              <span><strong>70 Verified Cars</strong> in Stock Ready for Export</span>
            </div>
            <div className="top-notice-item">
              <span>🛡️ 120-Point Inspection Guaranteed</span>
            </div>
            <div className="top-notice-item">
              <span>🚢 RoRo & Container Shipping to Africa, Europe, Caribbean & Middle East</span>
            </div>
          </div>
          <div className="top-notice-item">
            <span>💬 Direct WhatsApp / Phone: <strong>+1 (847) 737-8213</strong></span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <div className="nav-wrapper">
        <header className="navbar">
          <div className="nav-brand" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
            <div className="logo-badge">L<b>w</b>L</div>
            <div>
              <span className="brand-name">AUTOMOTIVE SALES, LARRY WITH LARRY</span>
              <span className="brand-sub">Clean used cars, shipped worldwide</span>
            </div>
          </div>

          <nav aria-label="Main Navigation">
            <ul className="nav-links">
              <li>
                <button
                  type="button"
                  className={activePage === 'home' ? 'active' : ''}
                  onClick={() => handleNavClick('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activePage === 'cars' ? 'active' : ''}
                  onClick={() => handleNavClick('cars')}
                >
                  All Cars <span className="nav-badge-pill">{carCount}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activePage === 'stories' ? 'active' : ''}
                  onClick={() => handleNavClick('stories')}
                >
                  Stories & Testimonies <span className="nav-badge-pill">57</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activePage === 'shipping' ? 'active' : ''}
                  onClick={() => handleNavClick('shipping')}
                >
                  Shipping
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activePage === 'guide' ? 'active' : ''}
                  onClick={() => handleNavClick('guide')}
                >
                  Buyer's Guide
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activePage === 'about' ? 'active' : ''}
                  onClick={() => handleNavClick('about')}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activePage === 'faq' ? 'active' : ''}
                  onClick={() => handleNavClick('faq')}
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activePage === 'contact' ? 'active' : ''}
                  onClick={() => handleNavClick('contact')}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className={activePage === 'dayinlife' ? 'active' : ''}
                  onClick={() => handleNavClick('dayinlife')}
                >
                  Day in Our Lives
                </button>
              </li>
            </ul>
          </nav>

          <div className="nav-actions">
            <button
              type="button"
              className="btn-outline"
              onClick={() => handleNavClick('contact')}
            >
              Request a Car
            </button>
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label="Toggle light/dark theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <span>{theme === 'dark' ? '☀️ Light' : '🌙 Dark'}</span>
            </button>
            <button
              type="button"
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </header>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              marginTop: '10px',
              background: 'var(--card)',
              border: '1px solid var(--line)',
              borderRadius: '16px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <button
              type="button"
              className="theme-toggle-btn-mobile"
              onClick={() => { toggleTheme(); }}
            >
              <span>{theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}</span>
            </button>

            {[
              { id: 'home', label: 'Home' },
              { id: 'cars', label: `All Cars (${carCount})` },
              { id: 'stories', label: 'Stories & Testimonies (57)' },
              { id: 'shipping', label: 'Shipping' },
              { id: 'guide', label: "Buyer's Guide" },
              { id: 'about', label: 'About Larry' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact Us' },
              { id: 'dayinlife', label: 'Day in Our Lives' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  background: activePage === item.id ? 'var(--blue-soft)' : 'transparent',
                  color: activePage === item.id ? 'var(--blue)' : 'var(--ink)',
                  fontWeight: 600,
                  fontSize: '14px'
                }}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
