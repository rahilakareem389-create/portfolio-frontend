/**
 * Client-side Web3Forms automated dispatcher
 * Connected to access key: ad131140-827b-407f-a476-5afd66b1fa0b (wordpressrahila@gmail.com)
 * Executed directly from user's browser so Cloudflare passes it with 100% reliability.
 */

const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'ad131140-827b-407f-a476-5afd66b1fa0b';

/**
 * Dispatches an event directly to Web3Forms from the client's browser.
 * Appears in the Web3Forms dashboard and sends email to wordpressrahila@gmail.com.
 *
 * @param {Object} options
 * @param {string} options.type - e.g. "User Login", "New Review", "New FAQ Question"
 * @param {string} options.subject - Email notification subject line
 * @param {string} options.name - Submitter's name
 * @param {string} options.email - Submitter's email
 * @param {string} [options.message] - Main message body
 * @param {Object} [options.details] - Key-value pair details
 */
export async function sendWeb3FormsNotification({
  type = 'Notification',
  subject,
  name,
  email,
  message,
  details = {}
}) {
  try {
    const formattedDetails = Object.entries(details)
      .filter(([_, v]) => v !== undefined && v !== null && v !== '')
      .map(([k, v]) => `• ${k.replace(/([A-Z])/g, ' $1').toUpperCase()}: ${typeof v === 'object' ? JSON.stringify(v) : v}`)
      .join('\n');

    const formattedMessage = [
      `=== ${type.toUpperCase()} ===`,
      message ? message : '',
      formattedDetails ? `\n--- DETAILS ---\n${formattedDetails}` : '',
      `\nTimestamp: ${new Date().toLocaleString()}`,
      `Portal: Rahila Kareem Portfolio • Client Workspace`
    ]
      .filter(Boolean)
      .join('\n');

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: subject || `[Portfolio Alert] ${type} from ${name || 'User'}`,
      from_name: name || 'Portfolio User',
      name: name || 'Portfolio User',
      email: email || 'wordpressrahila@gmail.com',
      message: formattedMessage,
      form_type: type,
      submitted_at: new Date().toISOString()
    };

    // Flatten simple details for structured columns in Web3Forms dashboard
    Object.entries(details).forEach(([key, val]) => {
      if (val !== undefined && val !== null && typeof val !== 'object') {
        payload[key] = String(val);
      }
    });

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json().catch(() => null);
    return Boolean(res.ok && data?.success);
  } catch (err) {
    console.warn('[Web3Forms] Client dispatch error:', err?.message || err);
    return false;
  }
}
