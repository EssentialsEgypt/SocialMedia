import { getAuthorizationUrl } from '../../../../services/platforms/snapchat.js';

export default function snapchatLogin(req, res) {
  const { redirectUri } = req.query;
  const callback = redirectUri || `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/snapchat/callback`;
  const state = Date.now().toString();
  const url = getAuthorizationUrl(state, callback);
  res.status(200).json({ url });
}