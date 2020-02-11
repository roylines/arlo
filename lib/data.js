//const r2 = require('r2');
const rp = require('request-promise-native');
const session = require('./session');

const request = async ({path, body, headers}, method) => {
  let options = {
    uri: `https://arlo.netgear.com/hmsweb/${path}`,
    method,
    headers: {...session.get(), ...headers},
    body,
    json: true,
  };

  let resp = await rp(options);
  return resp.data;
};

const data = {
  get: async opts => {
    return await request(opts, 'GET');
  },
  post: async opts => {
    return await request(opts, 'POST');
  },
  put: async opts => {
    return await request(opts, 'PUT');
  },
};

module.exports = data;
