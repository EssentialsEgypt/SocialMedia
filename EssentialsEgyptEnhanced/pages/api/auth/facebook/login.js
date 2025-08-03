import { getAuthorizationUrl } from '../../../../services/platforms/facebook.js';

/**
 * API route to initiate the Facebook OAuth flow. Returns a URL that the
 * frontend should redirect the user to. A `redirectUri` query parameter
 * may be provided; otherwise the default callback based on the app URL
 * will be used. We generate a simple state parameter using the current
 * timestamp. In production consider using a cryptographically random value
 * stored in the session.
 */
export default function facebookLogin(req, res) {
  const { redirectUri } = req.query;
  const callback = redirectUri || `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`;
  const state = Date.now().toString();
  const authUrl = getAuthorizationUrl(state, callback);
  return res.status(200).json({ url: authUrl });
}