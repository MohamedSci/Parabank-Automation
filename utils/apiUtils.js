const axios = require('axios');

async function getAuthToken(username, password) {
  const response = await axios.post('/', {
    username,
    password,
  });
  return response.headers['set-cookie'];
}

module.exports = { getAuthToken };
