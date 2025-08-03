import { getAuthorizationUrl } from '../../../../services/platforms/tiktok.js';

export default function tiktokLogin(req, res) {
  const { redirectUri } = req.query;
  const callback = redirectUri || `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/tiktok/callback`;
  const state = Date.now().toString();
  const url = getAuthorizationUrl(state, callback);
  res.status(200).json({ url });
}