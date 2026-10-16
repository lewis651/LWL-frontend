import React, { useState } from 'react';
import { submitContactInquiry } from '../services/api';

export default function ContactSection({ prefillCar }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    carWanted: prefillCar ? `${prefillCar.title} ($${prefillCar.price})` : '',
    destinationPort: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      await submitContactInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        destinationPort: formData.destinationPort || formData.country,
        preferredCar: formData.carWanted || 'General Inquiry',
        budget: formData.country,
        message: formData.message,
        source: 'contact_form'
      });
      setSubmitted(true);
    } catch (err) {
      console.warn('API submission error:', err);
      // If server is offline or errors, still provide graceful recovery
      setErrorMsg(err.message || 'Unable to submit to server. You can also message Larry directly on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="section-subtitle">Get in Touch</span>
            <h2 className="section-title">Talk to Larry with Larry</h2>
            <p className="section-caption">
              Ask about a specific vehicle, request an ocean freight shipping quote, or tell us what car you want us to source for you.
            </p>
          </div>
        </div>

        <div className="contact-grid">
          {/* Form */}
          <div className="form-card">
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <span style={{ fontSize: '48px', display: 'block', marginBottom: '16px' }}>🎉</span>
                <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>
                  Thank you! Your request has been received.
                </h3>
                <p style={{ color: 'var(--ink-secondary)', fontSize: '15px', maxWidth: '420px', margin: '0 auto 20px' }}>
                  Larry or an export logistics coordinator will reach out to you via WhatsApp / Email within 2 to 4 business hours with full photos and quotes.
                </p>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', country: '', carWanted: '', destinationPort: '', message: '' });
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontSize: '20px', marginBottom: '20px' }}>Direct Vehicle & Shipping Inquiry</h3>
                <div className="form-grid-fields">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>WhatsApp / Phone (with Country Code) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+234, +233, +254, +44, +1..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Country of Residence *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ghana, Nigeria, Kenya, Germany"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Destination Seaport</label>
                    <input
                      type="text"
                      placeholder="e.g. Lagos, Tema, Mombasa, Rotterdam"
                      value={formData.destinationPort}
                      onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Car You Want / Stock #</label>
                    <input
                      type="text"
                      placeholder="e.g. 2020 Honda Civic Si or Stock #1"
                      value={formData.carWanted}
                      onChange={(e) => setFormData({ ...formData, carWanted: e.target.value })}
                    />
                  </div>

                  <div className="form-group form-field-full">
                    <label>Message / Questions</label>
                    <textarea
                      rows="4"
                      placeholder="Tell us any specific requirements, timing, or payment questions..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  {errorMsg && (
                    <div className="form-field-full" style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#f87171',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      fontSize: '13px'
                    }}>
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <div className="form-field-full">
                    <button type="submit" disabled={isSubmitting} className="btn-submit-form" style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                      {isSubmitting ? 'Sending Request...' : 'Send Request to Larry with Larry ↗'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Direct Contact Information Cards */}
          <div className="contact-info-card">
            <div>
              <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Direct Communication</h3>
              <p style={{ color: 'var(--mut)', fontSize: '13px', lineHeight: 1.6 }}>
                Reach out directly through any of our official verified channels. We are available Monday through Saturday.
              </p>

              <div className="info-list-block">
                <div className="info-item">
                  <h4>💬 Fast Track WhatsApp</h4>
                  <p>
                    <a
                      href="https://wa.me/18477378213"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--emerald)', fontWeight: 600 }}
                    >
                      +1 (847) 737-8213 (Chat Directly with Larry)
                    </a>
                  </p>
                </div>

                <div className="info-item">
                  <h4>📧 Export Desk Email</h4>
                  <p>sales@larrywithlarryautos.com</p>
                  <p style={{ fontSize: '12px', color: 'var(--mut)' }}>Average reply time: under 2 hours</p>
                </div>

                <div className="info-item">
                  <h4>📍 Holding Yard & Export Facility</h4>
                  <p>Automotive Sales, Larry with Larry LLC</p>
                  <p style={{ fontSize: '13px', color: 'var(--mut)' }}>1420 Ocean Terminal Blvd, Port of Newark & Jacksonville, FL</p>
                </div>

                <div className="info-item">
                  <h4>⏰ Operating Hours</h4>
                  <p>Mon – Fri: 8:00 AM – 7:00 PM EST</p>
                  <p>Sat: 9:00 AM – 4:00 PM EST (WhatsApp 24/7)</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px', background: '#0e121a', border: '1px solid var(--line)', padding: '16px', borderRadius: '12px' }}>
              <span style={{ fontSize: '12px', color: 'var(--emerald)', fontWeight: 700, display: 'block', marginBottom: '2px' }}>
                ✓ Verified Business Entity
              </span>
              <p style={{ fontSize: '12px', color: 'var(--mut)' }}>
                Licensed motor vehicle dealer & bonded US export forwarder. Escrow payment options available for total buyer protection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
