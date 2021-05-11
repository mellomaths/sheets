const fs = require('fs');

const TOKEN_PATH = process.env.TOKEN_JSON_FILE;

const get = () => {
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) {
      console.log('Error on finding token. Authentication required.');
      return null;
    }

    console.log('Token found.');
    return JSON.parse(token);
  });
};

const save = (token) => {
  fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    if (err) return console.error(err);
    console.log('Token successfully stored.');
  });
};

module.exports = {
  get,
  save,
};
