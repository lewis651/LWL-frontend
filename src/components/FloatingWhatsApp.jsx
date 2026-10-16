import React, { useState } from 'react';

const WHATSAPP_NUMBER = '18477378213';
const DEFAULT_MESSAGE = "Hello Larry, I'm browsing your clean used car inventory on the website and would like to speak with you.";

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="floating-wa-container"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`floating-wa-tooltip ${hovered ? 'visible' : ''}`}>
        <span className="floating-wa-status-dot"></span>
        <div className="floating-wa-text">
          <strong>Chat with Larry</strong>
          <small>Direct WhatsApp · Instant Reply</small>
        </div>
      </div>

      <button
        type="button"
        className="floating-wa-btn"
        onClick={handleClick}
        aria-label="Chat with Larry on WhatsApp (+1 847 737-8213)"
        title="Direct WhatsApp with Larry"
      >
        <span className="floating-wa-pulse"></span>
        <svg
          viewBox="0 0 32 32"
          width="30"
          height="30"
          fill="currentColor"
          className="floating-wa-icon"
        >
          <path d="M16.01 2.003C8.283 2.003 2 8.286 2 16.013c0 2.65.736 5.228 2.133 7.464L2.05 30.05l6.76-2.03a13.924 13.924 0 0 0 7.2 1.996h.006c7.726 0 14.01-6.283 14.01-14.01 0-3.742-1.458-7.26-4.108-9.91A13.918 13.918 0 0 0 16.01 2.003zm0 25.66c-2.28 0-4.516-.614-6.467-1.776l-.463-.275-4.8 1.44 1.48-4.675-.3-.48a11.603 11.603 0 0 1-1.79-6.16c0-6.43 5.234-11.664 11.67-11.664 3.116 0 6.046 1.214 8.25 3.418a11.6 11.6 0 0 1 3.42 8.246c0 6.43-5.234 11.666-11.67 11.666zm6.395-8.73c-.35-.175-2.072-1.023-2.394-1.14-.322-.116-.556-.175-.79.176-.234.35-.904 1.14-1.11 1.374-.204.234-.41.263-.76.088-.35-.175-1.478-.545-2.815-1.738-1.04-.928-1.743-2.074-1.948-2.424-.204-.35-.022-.54.153-.714.158-.157.35-.41.525-.614.175-.204.234-.35.35-.584.117-.234.059-.438-.03-.613-.087-.176-.79-1.9-1.08-2.6-.283-.684-.57-.59-.79-.602l-.67-.012c-.234 0-.613.088-.934.438-.32.35-1.227 1.2-1.227 2.924 0 1.724 1.256 3.39 1.43 3.624.176.234 2.47 3.774 5.986 5.292.836.36 1.49.576 2 .738.84.267 1.604.23 2.21.14.673-.1 2.072-.847 2.364-1.665.292-.818.292-1.52.204-1.666-.088-.146-.32-.234-.67-.41z"/>
        </svg>
      </button>
    </div>
  );
}
