const { Client } = require("undici");

const session = require("./session");

const parseBody = async ({ body }) => {
  return new Promise((a, r) => {
    body.setEncoding("utf8");
    let resp = "";
    body.on("data", (d) => {
      resp = resp + d;
    });
    body.on("end", () => {
      a(JSON.parse(resp));
    });
  });
};

const request = async ({ path, body, headers }, method) => {
  const client = new Client(`https://arlo.netgear.com`);

  let options = {
    path: `/hmsweb/${path}`,
    method,
    headers: { ...session.get(), ...headers },
    body: JSON.stringify(body),
  };

  const resp = await client.request(options);
  const parsed = await parseBody(resp);
  client.close();
  return parsed.data;
};

const data = {
  get: async (opts) => {
    return await request(opts, "GET");
  },
  post: async (opts) => {
    return await request(opts, "POST");
  },
  put: async (opts) => {
    return await request(opts, "PUT");
  },
};

module.exports = data;
