const express = require('express');
const env = require('dotenv');
env.config();

const googleCredentials = require('./config/google-credentials');
const googleSpreadsheets = require('./config/google-spreadsheets');

const tokenRepository = require('./repository/token.repository');

const googleAuthService = require('./service/google-auth.service');


const app = express();

app.get('/authorize', (request, response) => {
  const googleOAuthCredentials = googleCredentials.loadGoogleAuthCredentials();
  const authorization = googleAuthService.authorize(googleOAuthCredentials, tokenRepository, response);
  if (!authorization.ok && authorization.authenticationNeeded) {
    console.log('Authentication Needed for this App.');
    const authenticationUrl = authorization.authenticationUrl;
    console.log(`Client was redirected to ${authenticationUrl}`);
    return response.redirect(authenticationUrl);
  }

  return response.status(200).json({ ok: true });
});

app.get('/callback', (request, response) => {
  const googleOAuthCredentials = googleCredentials.loadGoogleAuthCredentials();
  googleAuthService.getToken(request.query.code, googleOAuthCredentials, tokenRepository);
  const token = tokenRepository.get();
  return response.status(200).json({ token });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
