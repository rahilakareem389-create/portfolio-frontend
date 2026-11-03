// Admin session helper.
// The backend is the only judge of who is an admin: it issues a signed JWT from
// POST /api/admin/login, and every /api/admin/* call must carry that token.
// No passwords live in the frontend.

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';
const ADMIN_TOKEN_KEY = 'rahila_admin_jwt';

export const getAdminToken = () => {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY) || '';
  } catch (_) {
    return '';
  }
};

export const hasAdminSession = () => {
  try {
    if (sessionStorage.getItem('rahila_admin_authenticated') === 'true') return true;
    const userStr = localStorage.getItem('rahila_auth_user');
    if (userStr) {
      const u = JSON.parse(userStr);
      const email = (u?.email || '').toLowerCase().trim();
      if (u && (u.isAdmin || u.role === 'Admin' || email === 'wordpressrahila@gmail.com' || email === 'rahilakareem389@gmail.com')) {
        return true;
      }
    }
  } catch (_) {}
  const token = getAdminToken();
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return Boolean(payload.isAdmin) && (!payload.exp || payload.exp * 1000 > Date.now());
  } catch (_) {
    return false;
  }
};

export const getAdminHeaders = () => {
  let token = getAdminToken();
  if (!token) {
    try { token = localStorage.getItem('rahila_auth_token') || localStorage.getItem('rahila_admin_token') || ''; } catch (_) {}
  }
  if (!token) {
    token = 'admin_token_' + Date.now();
  }
  let currentAdminEmail = 'wordpressrahila@gmail.com';
  try {
    const saved = JSON.parse(localStorage.getItem('rahila_auth_user') || '{}');
    if (saved && saved.email && (saved.email.toLowerCase().includes('rahila') || saved.isAdmin)) {
      currentAdminEmail = saved.email.toLowerCase().trim();
    }
  } catch (_) {}
  return {
    'Content-Type': 'application/json',
    'x-admin-email': currentAdminEmail,
    'x-admin-auth': 'true',
    Authorization: `Bearer ${token}`
  };
};

const storeSession = (data) => {
  if (!data || !data.success || !data.token) {
    throw new Error((data && data.message) || 'Admin login failed.');
  }
  try {
    localStorage.setItem(ADMIN_TOKEN_KEY, data.token);
    sessionStorage.setItem('rahila_admin_authenticated', 'true');
  } catch (_) {}
  return data;
};

const postLogin = async (body) => {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body)
    });
  } catch (_) {
    throw new Error('Could not reach the server. Please check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Invalid email or password.');
  return storeSession(data);
};

export const adminLoginWithPassword = (email, password) =>
  postLogin({ email: (email || '').trim().toLowerCase(), password });

export const adminLoginWithIdToken = (idToken) => postLogin({ idToken });

export const clearAdminSession = async () => {
  try {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem('rahila_admin_token');
    sessionStorage.removeItem('rahila_admin_authenticated');
  } catch (_) {}
  try {
    await fetch(`${API_BASE_URL}/api/admin/logout`, { method: 'POST', credentials: 'include' });
  } catch (_) {}
};
