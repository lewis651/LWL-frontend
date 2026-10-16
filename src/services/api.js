const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

const TOKEN_KEY = 'lwl_admin_token';
const USER_KEY = 'lwl_admin_user';

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}

export function getStoredUser() {
  const u = localStorage.getItem(USER_KEY);
  if (!u) return null;
  try {
    return JSON.parse(u);
  } catch {
    return null;
  }
}

export function setAdminSession(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAdminSession() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

/**
 * Public: Submit contact form or car hold inquiry
 */
export async function submitContactInquiry(data) {
  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to submit inquiry');
    }
    return result;
  } catch (err) {
    console.error('API submitContactInquiry error:', err);
    throw err;
  }
}

/**
 * Admin: Login with email & password
 */
export async function adminLogin(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Authentication failed');
  }
  setAdminSession(data.token, data.user);
  return data;
}

/**
 * Admin: Verify current session token
 */
export async function verifyAdminSession() {
  const token = getStoredToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (!res.ok) {
      clearAdminSession();
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
}

/**
 * Admin: Change Password
 */
export async function adminChangePassword(currentPassword, newPassword) {
  const token = getStoredToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ currentPassword, newPassword })
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update password');
  }
  return data;
}

/**
 * Admin: Fetch dashboard statistics
 */
export async function fetchAdminStats() {
  const token = getStoredToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${API_BASE}/admin/stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch statistics');
  }
  return data.stats;
}

/**
 * Admin: Fetch customer inquiries list
 */
export async function fetchAdminInquiries(status = 'all', search = '') {
  const token = getStoredToken();
  if (!token) throw new Error('Not authenticated');

  const params = new URLSearchParams();
  if (status && status !== 'all') params.append('status', status);
  if (search && search.trim()) params.append('search', search.trim());

  const res = await fetch(`${API_BASE}/admin/inquiries?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch inquiries');
  }
  return data.inquiries;
}

/**
 * Admin: Update inquiry status or notes
 */
export async function updateInquiryStatus(id, status, notes) {
  const token = getStoredToken();
  if (!token) throw new Error('Not authenticated');

  const body = {};
  if (status !== undefined) body.status = status;
  if (notes !== undefined) body.notes = notes;

  const res = await fetch(`${API_BASE}/admin/inquiries/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update inquiry');
  }
  return data.inquiry;
}

/**
 * Admin: Delete inquiry
 */
export async function deleteInquiryById(id) {
  const token = getStoredToken();
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${API_BASE}/admin/inquiries/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Failed to delete inquiry');
  }
  return true;
}
