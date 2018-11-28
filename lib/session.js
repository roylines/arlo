var config;

const set = ({ token }) => {
  config = {
      DNT: "1",
      schemaVersion: "1",
      Host: "arlo.netgear.com",
      Referer: "https://arlo.netgear.com/",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 11_1_2 like Mac OS X) AppleWebKit/604.3.5 (KHTML, like Gecko) Mobile/15B202 NETGEAR/v1 (iOS Vuezone)",
      "Content-Type": "application/json;charset=utf-8",
      Authorization: token
  }
}

const get = () => {
  return config;
}

const reset = () => {
  set({});
}

const session = {
  set,
  get,
  reset
}

reset();

module.exports = session;
