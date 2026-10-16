import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandShowcase from './components/BrandShowcase';
import CarCard from './components/CarCard';
import CarDetailsModal from './components/CarDetailsModal';
import ReserveModal from './components/ReserveModal';
import StoriesPage from './components/StoriesPage';
import InspectionPromo from './components/InspectionPromo';
import ShippingSection from './components/ShippingSection';
import WhyLarrySection from './components/WhyLarrySection';
import BuyersGuide from './components/BuyersGuide';
import AboutPage from './components/AboutPage';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import AdminPortal from './components/AdminPortal';
import DayInLifePage from './components/DayInLifePage';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { CARS_DATA, TESTIMONIAL_IMAGES, TESTIMONIAL_VIDEOS, SITE_NAME } from './data/carsData';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [reserveCar, setReserveCar] = useState(null);

  // Theme toggle state (dark / light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lwl_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('lwl_theme', theme);
  }, [theme]);

  // Dynamic SEO Page Titles
  useEffect(() => {
    const titles = {
      home: 'Automotive Sales, Larry with Larry | Clean Used Cars, Shipped Worldwide',
      cars: '70+ Clean Used Cars in Stock | Larry with Larry',
      stories: 'Customer Stories & 57+ Testimonials | Larry with Larry',
      dayinlife: 'A Day in Our Lives - Behind the Scenes | Larry with Larry',
      shipping: 'Worldwide Ocean Freight & Shipping Guide | Larry with Larry',
      guide: "Used Car Buyer's Guide & Inspection Checklist | Larry with Larry",
      about: 'About Us | Automotive Sales, Larry with Larry',
      faq: 'Frequently Asked Questions & Export Policies | Larry with Larry',
      contact: 'Contact Us & Custom Vehicle Request | Larry with Larry',
      admin: 'Staff Portal | Larry with Larry',
    };
    document.title = titles[activePage] || titles.home;
  }, [activePage]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Filters for inventory
  const [filterMake, setFilterMake] = useState('All');
  const [filterBody, setFilterBody] = useState('All');
  const [filterMaxPrice, setFilterMaxPrice] = useState('All');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Handle Hash routing for clean deep linking and browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      if (['home', 'cars', 'stories', 'shipping', 'guide', 'about', 'faq', 'contact', 'admin', 'dayinlife'].includes(hash)) {
        setActivePage(hash);
      } else if (!hash) {
        setActivePage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    window.location.hash = `#/${pageId}`;
  };

  // Search filter handler from Hero
  const handleHeroSearch = ({ make, bodyType, maxPrice, destinationPort }) => {
    setFilterMake(make === 'Any' ? 'All' : make);
    setFilterBody(bodyType === 'Any' ? 'All' : bodyType);
    setFilterMaxPrice(maxPrice === 'Any' ? 'All' : maxPrice);
    handlePageChange('cars');

    setTimeout(() => {
      const el = document.getElementById('inventory-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Unique makes sorted alphabetically
  const allMakes = useMemo(() => {
    const set = new Set(CARS_DATA.map((c) => c.make).filter(Boolean));
    return Array.from(set).sort();
  }, []);

  // Filtered & sorted cars
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Make filter
      if (filterMake !== 'All' && car.make.toLowerCase() !== filterMake.toLowerCase()) {
        return false;
      }
      // Body filter
      if (filterBody !== 'All' && car.bodyType.toLowerCase() !== filterBody.toLowerCase()) {
        return false;
      }
      // Max price filter
      if (filterMaxPrice !== 'All') {
        const max = parseInt(filterMaxPrice, 10);
        if (car.price > max) return false;
      }
      // Keyword search
      if (searchKeyword.trim()) {
        const q = searchKeyword.toLowerCase();
        const matchesTitle = car.title.toLowerCase().includes(q);
        const matchesMake = car.make.toLowerCase().includes(q);
        const matchesModel = car.model.toLowerCase().includes(q);
        const matchesDesc = car.description?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesMake && !matchesModel && !matchesDesc) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'year-desc') return b.year - a.year;
      if (sortBy === 'mileage-asc') {
        const mA = parseInt(a.mileage?.replace(/[^\d]/g, '') || '0', 10);
        const mB = parseInt(b.mileage?.replace(/[^\d]/g, '') || '0', 10);
        return mA - mB;
      }
      return a.id - b.id; // default featured
    });
  }, [filterMake, filterBody, filterMaxPrice, searchKeyword, sortBy]);

  // Budget filter helper
  const handleBudgetClick = (max) => {
    setFilterMaxPrice(max.toString());
    setFilterMake('All');
    setFilterBody('All');
    handlePageChange('cars');
  };

  return (
    <div className="app-container">
      {/* Sticky Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        carCount={CARS_DATA.length}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* PAGE: HOME */}
      {activePage === 'home' && (
        <main className="animate-fade">
          <Hero
            onSearchSubmit={handleHeroSearch}
            onSelectCar={setSelectedCar}
            featuredCar={CARS_DATA[0]}
          />

          {/* Brands Showcase */}
          <BrandShowcase
            onSelectBrand={(brand) => {
              setFilterMake(brand);
              setFilterBody('All');
              handlePageChange('cars');
            }}
            activeBrand={filterMake}
          />

          {/* Trending / Featured Inventory Grid */}
          <section className="section" id="trending-cars">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <span className="section-subtitle">Verified Direct Inventory</span>
                  <h2 className="section-title">Trending Clean Used Cars</h2>
                  <p className="section-caption">
                    Showing top hand-selected clean vehicles with certified inspection clearance and transparent wholesale pricing.
                  </p>
                </div>
                <button
                  type="button"
                  className="pill-action"
                  onClick={() => handlePageChange('cars')}
                >
                  View All {CARS_DATA.length} Cars in Stock ↗
                </button>
              </div>

              {/* Display top 6 cars on home */}
              <div className="cars-grid">
                {CARS_DATA.slice(0, 6).map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onSelectCar={setSelectedCar}
                  />
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '36px' }}>
                <button
                  type="button"
                  className="btn-cta"
                  style={{ padding: '14px 36px', fontSize: '15px' }}
                  onClick={() => handlePageChange('cars')}
                >
                  Explore All 70 Vehicles with Multi-Angle Photos ↗
                </button>
              </div>
            </div>
          </section>

          {/* Inspection Promo with real photo */}
          <InspectionPromo onBrowseCars={() => handlePageChange('cars')} />

          {/* Shipping Section */}
          <ShippingSection onOpenContact={() => handlePageChange('contact')} />

          {/* Why Larry Section with facility photos */}
          <WhyLarrySection onSelectCar={setSelectedCar} cars={CARS_DATA} />

          {/* Shop by Budget */}
          <section className="section">
            <div className="wrap">
              <div className="section-head">
                <div>
                  <span className="section-subtitle">Budget Friendly</span>
                  <h2 className="section-title">Shop by Price Range</h2>
                  <p className="section-caption">
                    Direct dealer pricing makes clean cars accessible to every budget.
                  </p>
                </div>
              </div>

              <div className="budget-grid">
                <div className="budget-card" onClick={() => handleBudgetClick(3000)}>
                  <span>Starter & Reliable Commuters</span>
                  <b>Under $3,000</b>
                </div>
                <div className="budget-card" onClick={() => handleBudgetClick(5000)}>
                  <span>Everyday Sedans & Hatches</span>
                  <b>$3,000 – $5,000</b>
                </div>
                <div className="budget-card" onClick={() => handleBudgetClick(8000)}>
                  <span>Family SUVs & Clean Trucks</span>
                  <b>$5,000 – $8,000</b>
                </div>
                <div className="budget-card" onClick={() => handleBudgetClick(15000)}>
                  <span>Performance & Luxury Exotics</span>
                  <b>$8,000 – $15,000</b>
                </div>
              </div>
            </div>
          </section>

          {/* Client Stories Preview Section on Home */}
          <section className="section" style={{ background: '#0e121a', padding: '80px 0', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
            <div className="wrap">
              <div className="section-head">
                <div>
                  <span className="section-subtitle">Real Proof & Transparency</span>
                  <h2 className="section-title">Recent Client Deliveries & Stories</h2>
                  <p className="section-caption">
                    Browse real photos and client delivery videos from car collections across Africa, the Caribbean, Europe, and UAE.
                  </p>
                </div>
                <button
                  type="button"
                  className="pill-action"
                  onClick={() => handlePageChange('stories')}
                >
                  View All 46 Stories & Videos ↗
                </button>
              </div>

              <div className="stories-preview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {/* 2 muted videos + 2 photos */}
                {TESTIMONIAL_VIDEOS.slice(0, 2).map((vid, i) => (
                  <div
                    key={`v-${i}`}
                    className="gallery-item"
                    onClick={() => handlePageChange('stories')}
                    style={{ aspectRatio: '16/10' }}
                  >
                    <video src={vid} autoPlay muted loop playsInline />
                  </div>
                ))}

                {TESTIMONIAL_IMAGES.slice(0, 2).map((img, i) => (
                  <div
                    key={`p-${i}`}
                    className="gallery-item"
                    onClick={() => handlePageChange('stories')}
                    style={{ aspectRatio: '16/10' }}
                  >
                    <img src={img} alt="Client handover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to action */}
          <section className="section">
            <div className="wrap">
              <div className="cta-banner">
                <div>
                  <h2>Looking for a specific vehicle? Larry will find it for you.</h2>
                  <p style={{ color: 'var(--ink-secondary)', marginTop: '8px', fontSize: '15px' }}>
                    Send us your target model, year, and budget. We will locate, inspect, and quote it within 24 hours.
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-cta"
                  onClick={() => handlePageChange('contact')}
                  style={{ padding: '14px 28px', fontSize: '14px' }}
                >
                  Request a Custom Car ↗
                </button>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* PAGE: ALL CARS INVENTORY (ALL 50 VEHICLES) */}
      {activePage === 'cars' && (
        <div className="animate-fade">
          <div className="stories-header-box" id="inventory-section">
            <div className="wrap">
              <span className="section-subtitle">Verified Wholesale Stock</span>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', marginBottom: '12px' }}>
                Cars in Stock ({CARS_DATA.length} Available)
              </h1>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', maxWidth: '640px' }}>
                Every car below is clean, intact, and mechanically verified. Click any vehicle to inspect its full multi-angle photo gallery, complete technical specifications, down payment amount, and port shipping costs.
              </p>
            </div>
          </div>

          <div className="wrap" style={{ marginTop: '36px' }}>
            {/* Filter Bar */}
            <div className="filter-chips-bar">
              <div className="chips-group">
                {['All', 'Sedan', 'SUV', 'Coupe', 'Pickup', 'Hatchback'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={`chip-btn ${filterBody === type ? 'active' : ''}`}
                    onClick={() => setFilterBody(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Search input */}
                <input
                  type="text"
                  placeholder="Filter by keyword (e.g. Civic, V8, AWD)..."
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  style={{
                    background: 'var(--card)',
                    border: '1px solid var(--line)',
                    padding: '8px 14px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    color: 'var(--ink)',
                    outline: 'none',
                    width: '220px'
                  }}
                />

                {/* Make selector */}
                <select
                  value={filterMake}
                  onChange={(e) => setFilterMake(e.target.value)}
                  className="sort-select"
                >
                  <option value="All">All Makes ({CARS_DATA.length})</option>
                  {allMakes.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                {/* Sort selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured Stock</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Year: Newest First</option>
                  <option value="mileage-asc">Lowest Mileage</option>
                </select>
              </div>
            </div>

            {/* Inventory Count Indicator */}
            <div style={{ marginBottom: '20px', color: 'var(--mut)', fontSize: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Showing <strong>{filteredCars.length}</strong> of <strong>{CARS_DATA.length}</strong> clean vehicles</span>
              {(filterMake !== 'All' || filterBody !== 'All' || filterMaxPrice !== 'All' || searchKeyword) && (
                <button
                  type="button"
                  onClick={() => { setFilterMake('All'); setFilterBody('All'); setFilterMaxPrice('All'); setSearchKeyword(''); }}
                  style={{ color: 'var(--blue)', fontSize: '13px', fontWeight: 600 }}
                >
                  Clear Filters ✕
                </button>
              )}
            </div>

            {/* Grid of All 50 Cars */}
            {filteredCars.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: 'var(--card)', borderRadius: '16px', border: '1px solid var(--line)' }}>
                <p style={{ fontSize: '18px', color: '#fff', marginBottom: '8px' }}>No cars matched your exact filter.</p>
                <p style={{ color: 'var(--mut)', fontSize: '14px', marginBottom: '16px' }}>Try resetting your filters or search keywords.</p>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => { setFilterMake('All'); setFilterBody('All'); setFilterMaxPrice('All'); setSearchKeyword(''); }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="cars-grid">
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onSelectCar={setSelectedCar}
                  />
                ))}
              </div>
            )}

            {/* Stock Count and Guarantee Banner */}
            <div className="inventory-footer-bar">
              <div>
                <strong style={{ display: 'block', fontSize: '15px', color: '#fff' }}>
                  All 70 vehicles verified clean title & intact
                </strong>
                <span style={{ fontSize: '13px', color: 'var(--mut)' }}>
                  Need help choosing? Larry and our export advisors are ready to assist.
                </span>
              </div>
              <button
                type="button"
                className="btn-cta"
                onClick={() => handlePageChange('contact')}
              >
                Inquire With Larry ↗
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PAGE: STORIES & TESTIMONIALS */}
      {activePage === 'stories' && (
        <StoriesPage onOpenContact={() => handlePageChange('contact')} />
      )}

      {/* PAGE: SHIPPING GUIDE */}
      {activePage === 'shipping' && (
        <div className="animate-fade">
          <div className="stories-header-box">
            <div className="wrap">
              <span className="section-subtitle">Ocean Freight Logistics</span>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', marginBottom: '12px' }}>
                International Shipping Guide
              </h1>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', maxWidth: '640px' }}>
                Everything you need to know about booking, loading, sailing, customs clearance, and collecting your car at your home port.
              </p>
            </div>
          </div>
          <ShippingSection onOpenContact={() => handlePageChange('contact')} />
        </div>
      )}

      {/* PAGE: BUYER'S GUIDE */}
      {activePage === 'guide' && (
        <div className="animate-fade">
          <div className="stories-header-box">
            <div className="wrap">
              <span className="section-subtitle">Inspection Wisdom</span>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', marginBottom: '12px' }}>
                Used Car Buyer's Guide
              </h1>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', maxWidth: '640px' }}>
                Six crucial checks that protect your investment when buying used cars from overseas.
              </p>
            </div>
          </div>
          <BuyersGuide onBrowseCars={() => handlePageChange('cars')} />
        </div>
      )}

      {/* PAGE: ABOUT US */}
      {activePage === 'about' && (
        <AboutPage
          onBrowseCars={() => handlePageChange('cars')}
          onOpenContact={() => handlePageChange('contact')}
        />
      )}

      {/* PAGE: FAQ */}
      {activePage === 'faq' && (
        <div className="animate-fade">
          <div className="stories-header-box">
            <div className="wrap">
              <span className="section-subtitle">Answers & Policies</span>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', marginBottom: '12px' }}>
                Frequently Asked Questions
              </h1>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', maxWidth: '640px' }}>
                Transparent explanations of our inspection standards, down payment reservation process, ocean freight schedules, and title clearance.
              </p>
            </div>
          </div>
          <FaqSection onOpenContact={() => handlePageChange('contact')} />
        </div>
      )}

      {/* PAGE: CONTACT */}
      {activePage === 'contact' && (
        <div className="animate-fade">
          <div className="stories-header-box">
            <div className="wrap">
              <span className="section-subtitle">Direct Assistance</span>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 54px)', marginBottom: '12px' }}>
                Contact Larry with Larry
              </h1>
              <p style={{ color: 'var(--ink-secondary)', fontSize: '16px', maxWidth: '640px' }}>
                We respond promptly to every inquiry. Reach us directly via WhatsApp, email, or our custom request form below.
              </p>
            </div>
          </div>
          <ContactSection prefillCar={selectedCar} />
        </div>
      )}

      {/* PAGE: ADMIN PORTAL */}
      {activePage === 'admin' && (
        <AdminPortal onBackToSite={() => handlePageChange('home')} />
      )}

      {/* PAGE: DAY IN OUR LIVES */}
      {activePage === 'dayinlife' && (
        <DayInLifePage />
      )}

      {/* Global Vehicle Details Modal */}
      {selectedCar && (
        <CarDetailsModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onOpenReserve={(car) => {
            setSelectedCar(null);
            setReserveCar(car);
          }}
        />
      )}

      {/* Global Vehicle Reservation Hold Modal */}
      {reserveCar && (
        <ReserveModal
          car={reserveCar}
          onClose={() => setReserveCar(null)}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handlePageChange} />

      {/* Floating WhatsApp Quick Action Button */}
      {activePage !== 'admin' && <FloatingWhatsApp />}
    </div>
  );
}
