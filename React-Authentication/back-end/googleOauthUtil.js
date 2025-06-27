const { google } = require('googleapis');
const axios = require('axios');
const { db, saveDb } = require('./db');

const oauthClient = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://congenial-invention-97wp97rw69vjfxvv-5173.app.github.dev/auth/google/callback',
);

const getGoogleOauthUrl = () => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ];

  return oauthClient.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
  });
}

const getGoogleUser = async (code) => {
  const { tokens } = await oauthClient.getToken(code);
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
    { headers: { Authorization: `Bearer ${tokens.id_token}` } },
  )
  return response.data;
}

const updateOrCreateUserFromOauth = async (oauthUserInfo) => {
  const {
    id: googleId,
    verified_email: isVerified,
    email,
  } = oauthUserInfo;

  const existingUser = db.users.find(user => user.email === email);

  if (existingUser) {
    existingUser.googleId = googleId;
    existingUser.isVerified = isVerified || existingUser.isVerified;
    saveDb();
    return existingUser;
  } else {
    const newUser = {
      email,
      googleId,
      isVerified,
      info: {},
    };

    db.users.push(newUser);
    saveDb();
    return newUser;
  }
}

module.exports = { getGoogleOauthUrl, getGoogleUser, updateOrCreateUserFromOauth };