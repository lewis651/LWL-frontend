import React, { useState, useEffect, useMemo } from 'react';
import {
  adminLogin,
  verifyAdminSession,
  clearAdminSession,
  fetchAdminInquiries,
  fetchAdminStats,
  updateInquiryStatus,
  deleteInquiryById,
  adminChangePassword,
  getStoredUser
} from '../services/api';

export default function AdminPortal({ onBackToSite }) {
  // Auth state
  const [user, setUser] = useState(getStoredUser());
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, unread: 0, contacted: 0, archived: 0, topPorts: [] });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [notesDraft, setNotesDraft] = useState('');

  // Password change modal
  const [isPwModalOpen, setIsPwModalOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const [isSubmittingPw, setIsSubmittingPw] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    let isMounted = true;
    verifyAdminSession().then((verifiedUser) => {
      if (isMounted) {
        if (verifiedUser) {
          setUser(verifiedUser);
        } else {
          setUser(null);
        }
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Fetch inquiries and stats when authenticated
  const loadDashboardData = async () => {
    if (!user) return;
    setIsLoadingData(true);
    try {
      const [inqData, statsData] = await Promise.all([
        fetchAdminInquiries(activeFilter, searchQuery),
        fetchAdminStats()
      ]);
      setInquiries(inqData);
      setStats(statsData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user, activeFilter]);

  // Debounced search trigger
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => {
      loadDashboardData();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Handle Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const data = await adminLogin(loginEmail, loginPassword);
      setUser(data.user);
    } catch (err) {
      setLoginError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    clearAdminSession();
    setUser(null);
    setInquiries([]);
    setSelectedInquiry(null);
  };

  // Status updates
  const handleStatusChange = async (inquiryId, newStatus) => {
    try {
      const updated = await updateInquiryStatus(inquiryId, newStatus);
      setInquiries((prev) => prev.map((item) => (item.id === inquiryId ? { ...item, status: updated.status } : item)));
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry((prev) => ({ ...prev, status: updated.status }));
      }
      // Refresh stats
      fetchAdminStats().then(setStats);
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  // Save dealer notes
  const handleSaveNotes = async (inquiryId) => {
    try {
      await updateInquiryStatus(inquiryId, undefined, notesDraft);
      setInquiries((prev) => prev.map((item) => (item.id === inquiryId ? { ...item, notes: notesDraft } : item)));
      if (selectedInquiry?.id === inquiryId) {
        setSelectedInquiry((prev) => ({ ...prev, notes: notesDraft }));
      }
      setEditingNotesId(null);
    } catch (err) {
      alert('Failed to save notes: ' + err.message);
    }
  };

  // Delete inquiry
  const handleDelete = async (inquiryId) => {
    if (!window.confirm('Are you sure you want to permanently delete this customer inquiry?')) return;
    try {
      await deleteInquiryById(inquiryId);
      setInquiries((prev) => prev.filter((item) => item.id !== inquiryId));
      if (selectedInquiry?.id === inquiryId) setSelectedInquiry(null);
      fetchAdminStats().then(setStats);
    } catch (err) {
      alert('Failed to delete inquiry: ' + err.message);
    }
  };

  // Password change submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess('');

    if (newPw.length < 8) {
      setPwError('New password must be at least 8 characters long.');
      return;
    }
    if (newPw !== confirmPw) {
      setPwError('New passwords do not match.');
      return;
    }

    setIsSubmittingPw(true);
    try {
      await adminChangePassword(currentPw, newPw);
      setPwSuccess('Password successfully updated!');
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
      setTimeout(() => {
        setIsPwModalOpen(false);
        setPwSuccess('');
      }, 1500);
    } catch (err) {
      setPwError(err.message || 'Failed to update password');
    } finally {
      setIsSubmittingPw(false);
    }
  };

  // Format date nicely
  const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Clean phone number for WhatsApp link
  const getWhatsAppLink = (phone, name, car) => {
    const cleanPhone = (phone || '').replace(/[^\d]/g, '');
    const message = encodeURIComponent(`Hello ${name}, this is Larry from Automotive Sales, Larry with Larry. Thank you for your inquiry regarding "${car}". I am ready to assist you with vehicle photos, condition report, and shipping details.`);
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  // -------------------------------------------------------------
  // 1. LOGIN SCREEN (If not authenticated)
  // -------------------------------------------------------------
  if (!user) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }} className="animate-fade">
        <div style={{
          maxWidth: '460px',
          width: '100%',
          background: 'var(--card)',
          border: '1px solid var(--line-strong)',
          borderRadius: '24px',
          padding: 'clamp(28px, 5vw, 44px)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)'
        }}>
          {/* Logo & Header */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <div className="logo-badge">L<b>w</b>L</div>
              <strong style={{ fontSize: '13px', color: '#fff', letterSpacing: '0.04em' }}>AUTOMOTIVE SALES</strong>
            </div>
            <h1 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>Admin Portal Login</h1>
            <p style={{ color: 'var(--mut)', fontSize: '13px', lineHeight: 1.5 }}>
              Restricted dealer access. Log in to view customer contact inquiries, reservations, and ocean shipping requests.
            </p>
          </div>

          {loginError && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '12px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              marginBottom: '20px'
            }}>
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label>Admin Email or Username</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@larrywithlarry.com"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ margin: 0 }}>Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="btn-cta"
              style={{ padding: '14px', width: '100%', justifyContent: 'center', marginTop: '6px' }}
            >
              {isLoggingIn ? 'Verifying Credentials...' : 'Sign In to Admin Portal ↗'}
            </button>

            <button
              type="button"
              className="btn-outline"
              onClick={onBackToSite}
              style={{ padding: '12px', width: '100%', justifyContent: 'center' }}
            >
              ← Return to Main Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. AUTHENTICATED DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="animate-fade" style={{ padding: '30px 0 60px' }}>
      <div className="wrap">

        {/* Top Header Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          paddingBottom: '24px',
          borderBottom: '1px solid var(--line)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div className="logo-badge">L<b>w</b>L</div>
              <h1 style={{ fontSize: 'clamp(20px, 4vw, 28px)', margin: 0 }}>Dealer Admin Portal</h1>
              <span style={{
                background: 'rgba(16, 185, 129, 0.15)',
                color: 'var(--emerald)',
                fontSize: '11px',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '999px',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}>
                ● Live & Secure
              </span>
            </div>
            <p style={{ color: 'var(--mut)', fontSize: '13px', margin: 0 }}>
              Logged in as <strong>{user.name || user.email}</strong> · Managing customer inquiries, hold requests, and port destinations.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn-outline"
              onClick={() => setIsPwModalOpen(true)}
              style={{ fontSize: '13px', padding: '9px 16px' }}
            >
              🔒 Security & Password
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={onBackToSite}
              style={{ fontSize: '13px', padding: '9px 16px' }}
            >
              🌐 View Live Website
            </button>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: 'rgba(239, 68, 68, 0.12)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#f87171',
                padding: '9px 16px',
                borderRadius: '999px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Sign Out ⎋
            </button>
          </div>
        </div>

        {/* Dashboard KPI Stats Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '28px'
        }}>
          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px' }}>
            <span style={{ fontSize: '12px', color: 'var(--mut)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
              Total Inquiries
            </span>
            <div style={{ fontSize: '32px', fontWeight: 800, color: '#fff', marginTop: '4px' }}>
              {stats.total}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--ink-secondary)' }}>All-time customer requests</span>
          </div>

          <div style={{
            background: stats.unread > 0 ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, var(--card) 100%)' : 'var(--card)',
            border: stats.unread > 0 ? '1px solid var(--blue)' : '1px solid var(--line)',
            borderRadius: '16px',
            padding: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: stats.unread > 0 ? 'var(--blue)' : 'var(--mut)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.04em' }}>
                New / Unread
              </span>
              {stats.unread > 0 && (
                <span style={{ background: 'var(--blue)', color: '#07090d', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px' }}>
                  ACTION NEEDED
                </span>
              )}
            </div>
            <div style={{ fontSize: '32px', fontWeight: 800, color: stats.unread > 0 ? 'var(--blue)' : '#fff', marginTop: '4px' }}>
              {stats.unread}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--ink-secondary)' }}>Awaiting dealer response</span>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px' }}>
            <span style={{ fontSize: '12px', color: 'var(--mut)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
              Followed Up
            </span>
            <div style={{ fontSize: '32px', fontWeight: 800, color: 'var(--emerald)', marginTop: '4px' }}>
              {stats.contacted}
            </div>
            <span style={{ fontSize: '12px', color: 'var(--ink-secondary)' }}>Contacted via WhatsApp/Email</span>
          </div>

          <div style={{ background: 'var(--card)', border: '1px solid var(--line)', borderRadius: '16px', padding: '20px' }}>
            <span style={{ fontSize: '12px', color: 'var(--mut)', textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.04em' }}>
              Top Seaports
            </span>
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {stats.topPorts?.length > 0 ? (
                stats.topPorts.slice(0, 3).map((p, i) => (
                  <div key={i} style={{ fontSize: '12px', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--ink-secondary)' }}>{p.name.split(',')[0]}</span>
                    <strong>{p.count} req</strong>
                  </div>
                ))
              ) : (
                <span style={{ fontSize: '12px', color: 'var(--mut)' }}>No port data yet</span>
              )}
            </div>
          </div>
        </div>

        {/* Filter and Search Toolbar */}
        <div style={{
          marginTop: '36px',
          background: 'var(--card)',
          border: '1px solid var(--line)',
          borderRadius: '18px',
          padding: '18px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px'
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: `All (${stats.total})` },
              { id: 'unread', label: `Unread (${stats.unread})` },
              { id: 'contacted', label: `Contacted (${stats.contacted})` },
              { id: 'archived', label: `Archived (${stats.archived || 0})` }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`chip-btn ${activeFilter === tab.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(tab.id)}
                style={{ fontSize: '13px' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input & Refresh */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flex: '1', maxWidth: '380px', minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Search by customer name, phone, car, or port..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: '#0d1016',
                border: '1px solid var(--line)',
                padding: '10px 16px',
                borderRadius: '999px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="button"
              className="btn-outline"
              onClick={loadDashboardData}
              title="Refresh inquiries"
              style={{ padding: '8px 14px', borderRadius: '999px' }}
            >
              ↻
            </button>
          </div>
        </div>

        {/* Inquiries List View */}
        <div style={{ marginTop: '24px' }}>
          {isLoadingData ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--mut)' }}>
              Loading inquiries...
            </div>
          ) : inquiries.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: 'var(--card)',
              borderRadius: '20px',
              border: '1px solid var(--line)'
            }}>
              <span style={{ fontSize: '42px', display: 'block', marginBottom: '12px' }}>📬</span>
              <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '6px' }}>No Inquiries Found</h3>
              <p style={{ color: 'var(--mut)', fontSize: '14px', maxWidth: '400px', margin: '0 auto' }}>
                {searchQuery
                  ? 'No inquiries match your current search query.'
                  : 'Customer inquiries submitted via the website contact form or car hold modal will appear here.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {inquiries.map((inq) => {
                const isUnread = inq.status === 'unread';
                const isContacted = inq.status === 'contacted';

                return (
                  <div
                    key={inq.id}
                    style={{
                      background: 'var(--card)',
                      border: isUnread ? '1px solid var(--blue)' : '1px solid var(--line)',
                      borderRadius: '16px',
                      padding: 'clamp(18px, 3vw, 24px)',
                      boxShadow: isUnread ? '0 8px 24px rgba(37, 99, 235, 0.12)' : 'none',
                      transition: 'border-color 0.2s ease'
                    }}
                  >
                    {/* Inquiry Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      gap: '12px',
                      marginBottom: '14px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <strong style={{ fontSize: '18px', color: '#fff' }}>{inq.name}</strong>

                        {isUnread && (
                          <span style={{
                            background: 'var(--blue)',
                            color: '#07090d',
                            fontSize: '11px',
                            fontWeight: 800,
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            NEW INQUIRY
                          </span>
                        )}

                        {isContacted && (
                          <span style={{
                            background: 'rgba(16, 185, 129, 0.15)',
                            color: 'var(--emerald)',
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                          }}>
                            ✓ CONTACTED
                          </span>
                        )}

                        {inq.status === 'archived' && (
                          <span style={{
                            background: '#1f242f',
                            color: 'var(--mut)',
                            fontSize: '11px',
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}>
                            ARCHIVED
                          </span>
                        )}

                        <span style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          fontSize: '11px',
                          color: 'var(--mut)',
                          padding: '3px 8px',
                          borderRadius: '6px'
                        }}>
                          Source: {inq.source === 'reserve_modal' ? 'Car Hold / Reservation' : 'Direct Contact Form'}
                        </span>
                      </div>

                      <span style={{ fontSize: '12px', color: 'var(--mut)' }}>
                        {formatDate(inq.createdAt)}
                      </span>
                    </div>

                    {/* Meta Info Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '12px',
                      background: '#0d1016',
                      padding: '14px 18px',
                      borderRadius: '12px',
                      border: '1px solid var(--line)',
                      marginBottom: '16px'
                    }}>
                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Phone / WhatsApp</span>
                        <strong style={{ fontSize: '14px', color: 'var(--emerald)' }}>{inq.phone}</strong>
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Email Address</span>
                        <span style={{ fontSize: '14px', color: '#fff' }}>{inq.email || 'Not provided'}</span>
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Vehicle of Interest</span>
                        <strong style={{ fontSize: '14px', color: 'var(--blue)' }}>{inq.preferredCar}</strong>
                      </div>

                      <div>
                        <span style={{ display: 'block', fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase' }}>Destination Seaport</span>
                        <span style={{ fontSize: '14px', color: '#fff' }}>{inq.destinationPort}</span>
                      </div>
                    </div>

                    {/* Customer Message Body */}
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      borderLeft: '3px solid var(--blue)',
                      padding: '14px 18px',
                      borderRadius: '0 8px 8px 0',
                      marginBottom: '16px'
                    }}>
                      <span style={{ display: 'block', fontSize: '11px', color: 'var(--mut)', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Customer Message
                      </span>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--ink-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                        {inq.message}
                      </p>
                    </div>

                    {/* Dealer Internal Notes */}
                    <div style={{ marginBottom: '18px' }}>
                      {editingNotesId === inq.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <textarea
                            rows="2"
                            placeholder="Add private dealer notes (e.g., Sent invoice #104, promised RoRo booking date...)"
                            value={notesDraft}
                            onChange={(e) => setNotesDraft(e.target.value)}
                            style={{
                              background: '#0d1016',
                              border: '1px solid var(--blue)',
                              borderRadius: '8px',
                              padding: '10px 14px',
                              color: '#fff',
                              fontSize: '13px',
                              width: '100%',
                              boxSizing: 'border-box'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              type="button"
                              className="btn-cta"
                              onClick={() => handleSaveNotes(inq.id)}
                              style={{ padding: '6px 14px', fontSize: '12px' }}
                            >
                              Save Notes
                            </button>
                            <button
                              type="button"
                              className="btn-outline"
                              onClick={() => setEditingNotesId(null)}
                              style={{ padding: '6px 14px', fontSize: '12px' }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                          <span style={{ fontSize: '12px', color: inq.notes ? '#fff' : 'var(--mut)', fontStyle: inq.notes ? 'normal' : 'italic' }}>
                            📝 Dealer Note: {inq.notes || 'No internal notes added yet.'}
                          </span>
                          <button
                            type="button"
                            onClick={() => { setEditingNotesId(inq.id); setNotesDraft(inq.notes || ''); }}
                            style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: '12px', cursor: 'pointer', padding: 0 }}
                          >
                            {inq.notes ? 'Edit' : '+ Add Note'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                      paddingTop: '14px',
                      borderTop: '1px solid var(--line)'
                    }}>
                      {/* Customer Communication Buttons */}
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <a
                          href={getWhatsAppLink(inq.phone, inq.name, inq.preferredCar)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-cta"
                          style={{
                            background: '#25D366',
                            color: '#07090d',
                            fontSize: '13px',
                            padding: '8px 16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}
                        >
                          💬 WhatsApp {inq.name.split(' ')[0]}
                        </a>

                        {inq.email && (
                          <a
                            href={`mailto:${inq.email}?subject=${encodeURIComponent(`Automotive Sales, Larry with Larry - Inquiry regarding ${inq.preferredCar}`)}`}
                            className="btn-outline"
                            style={{ fontSize: '13px', padding: '8px 14px' }}
                          >
                            ✉️ Send Email
                          </a>
                        )}
                      </div>

                      {/* Status & Delete Actions */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                        {isUnread && (
                          <button
                            type="button"
                            className="btn-outline"
                            onClick={() => handleStatusChange(inq.id, 'contacted')}
                            style={{ fontSize: '12px', padding: '6px 12px', color: 'var(--emerald)' }}
                          >
                            ✓ Mark Contacted
                          </button>
                        )}

                        {!isUnread && (
                          <button
                            type="button"
                            className="btn-outline"
                            onClick={() => handleStatusChange(inq.id, 'unread')}
                            style={{ fontSize: '12px', padding: '6px 12px' }}
                          >
                            Mark as Unread
                          </button>
                        )}

                        {inq.status !== 'archived' && (
                          <button
                            type="button"
                            className="btn-outline"
                            onClick={() => handleStatusChange(inq.id, 'archived')}
                            style={{ fontSize: '12px', padding: '6px 12px' }}
                          >
                            Archive
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDelete(inq.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#f87171',
                            fontSize: '12px',
                            cursor: 'pointer',
                            padding: '6px 10px'
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
      {isPwModalOpen && (
        <div className="lightbox-modal" onClick={() => setIsPwModalOpen(false)}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--line-strong)',
              borderRadius: '20px',
              padding: '32px',
              maxWidth: '440px',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>Update Admin Password</h3>
              <button
                type="button"
                onClick={() => setIsPwModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--mut)', fontSize: '20px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {pwError && (
              <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '14px' }}>
                ⚠️ {pwError}
              </div>
            )}
            {pwSuccess && (
              <div style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--emerald)', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '14px' }}>
                ✓ {pwSuccess}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="Enter current password"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div className="form-group">
                <label>New Password (min 8 characters)</label>
                <input
                  type="password"
                  required
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="Enter new strong password"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div className="form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  placeholder="Re-enter new password"
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="submit"
                  disabled={isSubmittingPw}
                  className="btn-cta"
                  style={{ flex: 1, padding: '12px', justifyContent: 'center' }}
                >
                  {isSubmittingPw ? 'Updating...' : 'Save New Password'}
                </button>
                <button
                  type="button"
                  className="btn-outline"
                  onClick={() => setIsPwModalOpen(false)}
                  style={{ padding: '12px 18px' }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
