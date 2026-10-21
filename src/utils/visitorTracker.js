/**
 * Privacy-Friendly Anonymous Visitor Tracking Client
 * Respects user cookie consent (GDPR / ePrivacy).
 * Records anonymous page views and visitor counts ONLY when consent is granted.
 * DOES NOT collect passwords, personal data, or intrusive tracking.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

export function getCookieConsent() {
  try {
    return localStorage.getItem('cookie_consent'); // 'accepted' | 'declined' | null
  } catch (_) {
    return null;
  }
}

export function setCookieConsent(status) {
  try {
    localStorage.setItem('cookie_consent', status);
    localStorage.setItem('cookie_consent_date', new Date().toISOString());

    if (status === 'declined') {
      // Remove any existing tracking identifiers if user declined
      localStorage.removeItem('rahila_visitor_id');
    }
  } catch (_) {}
}

function getOrCreateVisitorId() {
  try {
    // If user has explicitly declined, do not generate or store a tracking ID
    if (getCookieConsent() === 'declined') {
      return 'anonymous_declined';
    }

    let vid = localStorage.getItem('rahila_visitor_id');
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
      localStorage.setItem('rahila_visitor_id', vid);
    }
    return vid;
  } catch (_) {
    return 'anon_guest';
  }
}

let lastTrackedPage = '';
let lastTrackedTime = 0;

export async function trackPageView(pageName = 'home') {
  try {
    // Respect user privacy choice: Stop tracking if user explicitly declined cookies
    if (getCookieConsent() === 'declined') {
      return;
    }

    const now = Date.now();
    // Debounce duplicate events for same page within 2 seconds
    if (pageName === lastTrackedPage && now - lastTrackedTime < 2000) {
      return;
    }
    lastTrackedPage = pageName;
    lastTrackedTime = now;

    const visitorId = getOrCreateVisitorId();

    fetch(`${API_BASE_URL}/api/track/visit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        page: pageName,
        visitorId
      }),
      keepalive: true
    }).catch(() => {});
  } catch (_) {
    // Non-blocking, completely silent
  }
}
