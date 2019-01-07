const fetch = require("node-fetch");

async function api(url) {
    return fetch(url)
      .then(response => response.json())
      .then(json => {
        return json;
      });
}

module.exports = api;
  

