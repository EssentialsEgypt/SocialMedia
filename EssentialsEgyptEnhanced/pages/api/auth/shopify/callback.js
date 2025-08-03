import { getToken } from '../../../../services/platforms/shopify.js';
import supabase from '../../../../utils/supabaseClient.js';
import jwtMiddleware from '../../../../middleware/jwt.js';
import { logAudit } from '../../../../services/logging/audit.js';

async function handler(req, res) {
  try {
    const { code, shop } = req.query;
    if (!code || !shop) {
      return res.status(400).json({ error: 'Missing code or shop' });
    }
    const tokenData = await getToken(shop, code);
    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const { access_token, expires_in } = tokenData;
    const expires_at = expires_in ? new Date(Date.now() + expires_in * 1000).toISOString() : null;
    const { error } = await supabase
      .from('connections')
      .upsert({
        user_id,
        provider: 'shopify',
        access_token,
        refresh_token: null,
        expires_at,
        shop
      });
    if (error) {
      throw new Error(error.message);
    }
    await logAudit(user_id, 'shopify', 'connected');
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

export default jwtMiddleware(handler);