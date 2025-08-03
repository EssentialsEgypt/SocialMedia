import { getAuthorizationUrl } from '../../../../services/platforms/shopify.js';

export default function shopifyLogin(req, res) {
  const { shop, redirectUri } = req.query;
  if (!shop) {
    return res.status(400).json({ error: 'Missing shop parameter' });
  }
  const callback = redirectUri || `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/shopify/callback`;
  const state = Date.now().toString();
  const url = getAuthorizationUrl(shop, state, callback);
  res.status(200).json({ url });
}