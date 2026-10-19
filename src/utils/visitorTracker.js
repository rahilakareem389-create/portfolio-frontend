/**
 * Privacy-Friendly Anonymous Visitor Tracking Client
 * Records anonymous page views and visitor counts.
 * DOES NOT collect passwords, personal data, or intrusive tracking.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-omega-tan.vercel.app';

function getOrCreateVisitorId() {
  try {
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
