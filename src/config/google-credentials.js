const loadGoogleAuthCredentials = () => {
  const credentials = {
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: 'http://localhost:3000/callback',
    scope: [
      'https://www.googleapis.com/auth/spreadsheets.readonly'
    ],
    access_type: 'offline',
  };

  return credentials;
};

module.exports = {
  loadGoogleAuthCredentials,
};
