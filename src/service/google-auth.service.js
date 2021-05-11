const readline = require('readline');
const { google } = require('googleapis');


const newOAuth2Client = (credentials) => {
  const { client_id, client_secret, redirect_uri } = credentials;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
  return oAuth2Client;
};


const authorize = (credentials, tokenRepository) => {
  const oAuth2Client = newOAuth2Client(credentials);
  let token = tokenRepository.get();
  if (!token) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: credentials.access_type,
      scope: credentials.scope
    });

    return { ok: false, authenticationNeeded: true, authenticationUrl: authUrl };
  }

  oAuth2Client.setCredentials(token);
  return { ok: true, oAuth2Client: oAuth2Client };
};


const getToken = (code, credentials, tokenRepository) => {
  console.log(`Retrieving token using the code: ${code}`);
  const oAuth2Client = newOAuth2Client(credentials);
  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      return console.error('Error while trying to retrieve token', err);
    }

    oAuth2Client.setCredentials(token);
    tokenRepository.save(token);
  });
};


module.exports = {
  authorize,
  getToken,
};

