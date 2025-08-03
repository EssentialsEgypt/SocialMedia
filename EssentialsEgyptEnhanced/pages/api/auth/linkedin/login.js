import { getAuthorizationUrl } from '../../../../services/platforms/linkedin.js';

export default function linkedinLogin(req, res) {
  const { redirectUri } = req.query;
  const callback = redirectUri || `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/linkedin/callback`;
  const state = Date.now().toString();
  const url = getAuthorizationUrl(state, callback);
  res.status(200).json({ url });
}