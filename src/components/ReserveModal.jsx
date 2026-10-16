import React, { useState } from 'react';
import { submitContactInquiry } from '../services/api';

const WHATSAPP_NUMBER = '18477378213';

export default function ReserveModal({ car, onClose }) {
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');

  if (!car) return null;

  const remainingBalance = (car.price || 0) - (car.downPayment || 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Silently log hold to backend so admin sees it in inquiries portal
    submitContactInquiry({
      name: buyerName,
      email: buyerEmail,
      phone: buyerPhone,
      preferredCar: `${car.title} (Stock #${car.id})`,
      budget: `Down Payment: $${car.downPayment} / Total: $${car.price}`,
      message: `Reservation Hold Request for ${car.title} (Stock #${car.id}). Remaining balance: $${remainingBalance.toLocaleString()}.`,
      source: 'reserve_modal'
    }).catch((err) => console.warn('Hold logging error:', err));

    const message = encodeURIComponent(
      `Hello Larry! I would like to place a reservation hold on the following vehicle:\n\n` +
      `🚗 Vehicle: ${car.title}\n` +
      `📋 Stock #: ${car.id}\n` +
      `💰 Total Price: $${car.price?.toLocaleString()}\n` +
      `💵 Down Payment: $${car.downPayment?.toLocaleString()}\n` +
      `📊 Remaining Balance: $${remainingBalance.toLocaleString()}\n\n` +
      `👤 My Details:\n` +
      `Name: ${buyerName}\n` +
      `Email: ${buyerEmail}\n` +
      `Phone/WhatsApp: ${buyerPhone}\n\n` +
      `Please confirm availability and send me the payment details. Thank you!`
    );

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="car-modal-overlay" onClick={onClose}>
      <div
        className="car-modal-window"
        style={{ maxWidth: '640px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <span style={{ background: 'var(--blue-soft)', color: 'var(--blue)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>
                STOCK #{car.id}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--emerald)', fontWeight: 700 }}>
                ✓ Instant Reservation Hold
              </span>
            </div>

            <h2 style={{ fontSize: '22px', marginBottom: '6px' }}>Reserve {car.title}</h2>
            <p style={{ color: 'var(--mut)', fontSize: '13px', marginBottom: '20px' }}>
              Lock this vehicle exclusively in your name with the required down payment.
            </p>

            {/* Price Breakdown */}
            <div style={{ background: '#0e121a', border: '1px solid var(--line)', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--mut)', fontSize: '13px' }}>Total Vehicle Price:</span>
                <strong style={{ color: '#fff', fontSize: '14px' }}>${car.price?.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ color: 'var(--emerald)', fontSize: '13px', fontWeight: 700 }}>Down Payment to Reserve Today:</span>
                <strong style={{ color: 'var(--emerald)', fontSize: '18px' }}>${car.downPayment?.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '6px', borderTop: '1px solid var(--line)' }}>
                <span style={{ color: 'var(--mut)', fontSize: '12px' }}>Remaining Balance Prior to Vessel Release:</span>
                <span style={{ color: 'var(--ink-secondary)', fontSize: '12px', fontWeight: 600 }}>${remainingBalance.toLocaleString()}</span>
              </div>
            </div>

            {/* Inputs */}
            <div style={{ display: 'grid', gap: '14px' }}>
              <div className="form-group">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Adebayo"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                />
              </div>

              <div className="reserve-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+234, +233, +1..."
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginTop: '8px' }}>
                <button type="submit" className="btn-cta" style={{ width: '100%', padding: '16px', fontSize: '15px' }}>
                  Confirm Reservation — Chat with Larry on WhatsApp ↗
                </button>
              </div>

              <p style={{ fontSize: '11px', color: 'var(--mut)', textAlign: 'center', marginTop: '-6px' }}>
                You will be redirected to WhatsApp with your reservation details pre-filled.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
