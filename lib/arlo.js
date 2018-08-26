const data = require('./data');
const session = require('./session');

// https://github.com/jeffreydwalter/arlo/blob/master/Arlo.py
// http://www.robertogallea.com/blog/netgear-arlo-api
const arlo = {
  login: async(auth) => {
    let d = await data.post('login/v2', auth);
    session.set(d.token);
  },
  logout: async() => {
    await data.put('logout');
    session.reset();
  },
  devices: {
    get: async() => {
      return await data.get('users/devices');
    }
  },
  recordings: {
    get: async() => {
      const json = {
        dateFrom: '20180820',
        dateTo: '20180826'
      }
      return await data.post('users/library', json);
    },
    delete: async(recordings) => {
      const json = {
        data: [].concat(recordings || [])
      };
      return await r2.post('users/library/recycle', json);
    },
  },
}
module.exports = arlo
