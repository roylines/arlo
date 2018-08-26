const r2 = require('r2');
const session = require('./session');

const url = path => {
  return `https://arlo.netgear.com/hmsweb/${path}`;
}

const data = {
  get: async(path, json) => {
    let resp = await r2.get(url(path), session.get(json)).json
    return resp.data;
  },
  post: async(path, json) => {
    let resp = await r2.post(url(path), session.get(json)).json
    return resp.data;
  },
  put: async(path, json) => {
    let resp = await r2.put(url(path), session.get(json)).json
    return resp.data;
  }
}

module.exports = data
