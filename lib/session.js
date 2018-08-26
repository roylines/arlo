const r2 = require('r2');

var config = {};
const set = token => {
  config = {
    headers: {
      DNT: '1',
      schemaVersion: '1',
      Host: 'arlo.netgear.com',
      Referer: 'https://arlo.netgear.com/',
      "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B202 NETGEAR/v1 (iOS Vuezone)',
      Authorization: token
    }
  }
}

const get = json => {
  return Object.assign({json}, config);
}

const reset = () => {
  config = {};
}

const session = {
  set,
  get,
  reset
}

module.exports = session;
