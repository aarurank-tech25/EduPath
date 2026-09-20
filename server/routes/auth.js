const express = require('express');
const router = express.Router();
const axios = require('axios');

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/google/callback';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// GET /auth/google - Initiate Google OAuth 2.0 Flow
router.get('/google', (req, res) => {
  const isPlaceholder = !CLIENT_ID ||
    CLIENT_ID === 'your_google_client_id_here' ||
    !CLIENT_SECRET ||
    CLIENT_SECRET === 'your_google_client_secret_here';

  if (isPlaceholder) {
    return res.status(400).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Google OAuth Setup Required - EduPath</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; background: #ffffff; color: #000; padding: 40px 20px; }
            .card { max-width: 600px; margin: 0 auto; border: 1.5px solid #000; border-radius: 8px; padding: 32px; background: #fff; }
            h1 { font-size: 22px; font-weight: 800; margin-bottom: 12px; }
            p { font-size: 14px; color: #444; line-height: 1.5; margin-bottom: 16px; }
            pre { background: #f4f4f4; border: 1px solid #000; padding: 14px; border-radius: 4px; font-family: monospace; font-size: 13px; overflow-x: auto; }
            a.btn { display: inline-block; background: #000; color: #fff; text-decoration: none; padding: 10px 18px; border-radius: 4px; font-weight: 700; font-size: 14px; margin-top: 12px; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>⚠️ Google OAuth Setup Required</h1>
            <p>Real Google OAuth 2.0 credentials are not configured in <code>server/.env</code> yet.</p>
            <p>Please open <code>server/.env</code> and populate your Google Cloud Console keys:</p>
            <pre>GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_actual_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback</pre>
            <p>Once populated, restart your Node backend server and try logging in again.</p>
            <a href="${FRONTEND_URL}" class="btn">← Return to EduPath</a>
          </div>
        </body>
      </html>
    `);
  }

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(CLIENT_ID)}` +
    `&redirect_uri=${encodeURIComponent(CALLBACK_URL)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent('openid profile email')}` +
    `&access_type=offline` +
    `&prompt=consent`;

  res.redirect(googleAuthUrl);
});

// GET /auth/google/callback - Handle Google OAuth 2.0 Callback
router.get('/google/callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).redirect(`${FRONTEND_URL}/?auth_error=No authorization code provided`);
  }

  try {
    // 1. Exchange authorization code for tokens
    const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: CALLBACK_URL,
      grant_type: 'authorization_code'
    });

    const accessToken = tokenRes.data.access_token;

    // 2. Fetch authenticated user profile from Google UserInfo endpoint
    const userRes = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const profile = userRes.data;

    const authenticatedUser = {
      name: profile.name || profile.given_name || 'Google User',
      email: profile.email,
      picture: profile.picture,
      googleId: profile.id,
      provider: 'google',
      targetRole: 'Full Stack Developer'
    };

    // 3. Redirect back to frontend with user payload
    const userJson = encodeURIComponent(JSON.stringify(authenticatedUser));
    res.redirect(`${FRONTEND_URL}/?auth_success=google&user=${userJson}`);
  } catch (err) {
    console.error('Google OAuth Exchange Error:', err.response?.data || err.message);
    const errMessage = encodeURIComponent(err.response?.data?.error_description || err.message || 'OAuth exchange failed');
    res.redirect(`${FRONTEND_URL}/?auth_error=${errMessage}`);
  }
});

module.exports = router;