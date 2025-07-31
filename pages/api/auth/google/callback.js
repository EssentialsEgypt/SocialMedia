import { getToken } from '../../../../services/platforms/google';
import supabase from '../../../../utils/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, state } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  try {
    // Construct redirectUri dynamically or use environment variable
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;

    const tokenData = await getToken(code, redirectUri);

    // Save token data to Supabase
    // Assuming user_id is passed in state or retrieved from session
    const user_id = state; // Adjust as per your state management

    if (!user_id) {
      return res.status(400).json({ error: 'Missing user identification in state' });
    }

    const { access_token, refresh_token, expires_in, id_token } = tokenData;

    // Upsert token data into google_tokens table
    const { error } = await supabase
      .from('google_tokens')
      .upsert({
        user_id,
        access_token,
        refresh_token,
        expires_in,
        id_token,
        updated_at: new Date(),
      }, { onConflict: 'user_id' });

    if (error) {
      throw error;
    }

    return res.status(200).json({ message: 'Google OAuth token saved successfully' });
  } catch (error) {
    console.error('Error in Google OAuth callback:', error);
    return res.status(500).json({ error: 'Failed to exchange token' });
  }
}
