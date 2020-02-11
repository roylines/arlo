const data = require('./data');
const dateFormat = require('dateformat');
const session = require('./session');

// https://github.com/jeffreydwalter/arlo/blob/master/Arlo.py
// http://www.robertogallea.com/blog/netgear-arlo-api

var userId;

const timeout = ms => new Promise(res => setTimeout(res, ms));

const arlo = {
  login: async auth => {
    let d = await data.post({path: 'login/v2', body: auth});
    userId = d.userId;
    session.set(d);
  },
  logout: async () => {
    await data.put({path: 'logout'});
    session.reset();
  },
  modes: {
    set: async mode => {
      let {deviceId, xCloudId} = await arlo.basestation.get();

      let headers = {
        xCloudId,
      };

      let body = {
        from: `${userId}_web`,
        to: deviceId,
        action: 'set',
        resource: 'modes',
        publishResponse: true,
        properties: {
          active: mode,
        },
      };

      let ret = await data.post({
        path: `users/devices/notify/${deviceId}`,
        body,
        headers,
      });
      var active = await arlo.modes.active();
      while (active != mode) {
        await timeout(50);
        active = await arlo.modes.active();
      }

      return ret;
    },
    active: async () => {
      let automations = await data.get({
        path: 'users/devices/automation/active',
      });
      return automations[0].activeModes[0];
    },
  },
  devices: {
    get: async () => {
      return await data.get({path: 'users/devices'});
    },
  },
  basestation: {
    get: async () => {
      let devices = await arlo.devices.get();
      return devices.filter(({deviceType}) => deviceType == 'basestation')[0];
    },
  },
  cameras: {
    get: async () => {
      let devices = await arlo.devices.get();
      return devices.filter(({deviceType}) => deviceType == 'camera');
    },
  },
  recordings: {
    get: async ({from = new Date(), to = new Date()} = {}) => {
      const body = {
        dateFrom: dateFormat(from, 'yyyymmdd'),
        dateTo: dateFormat(to, 'yyyymmdd'),
      };

      return await data.post({path: 'users/library', body});
    },
    delete: async recordings => {
      const body = {
        data: [].concat(recordings || []),
      };
      return await r2.post({path: 'users/library/recycle', body});
    },
  },
};
module.exports = arlo;
