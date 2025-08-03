import { getAuthorizationUrl } from '../../../../services/platforms/instagram.js';

export default function instagramLogin(req, res) {
  const { redirectUri } = req.query;
  const callback = redirectUri || `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`;
  const state = Date.now().toString();
  const url = getAuthorizationUrl(state, callback);
  res.status(200).json({ url });
}