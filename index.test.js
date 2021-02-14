const arlo = require(".");

describe("arlo", () => {
  beforeAll(async () => {
    const auth = {
      email: process.env.ARLO_USER,
      password: process.env.ARLO_PASSWORD,
    };
    await arlo.login(auth);
  });

  afterAll(async () => {
    await arlo.logout();
  });

  it.skip("can set mode", async () => {
    let active = await arlo.modes.active();

    await arlo.modes.set("mode1");
    let newActive = await arlo.modes.active();

    await arlo.modes.set(active);
    newActive.should.equal("mode1");
  });

  it("can login", async () => {});

  it("can get active mode", async () => {
    const mode = await arlo.modes.active();
    expect(mode).toEqual(expect.stringContaining("mode"));
  });

  it("can get devices", async () => {
    const devices = await arlo.devices.get();
    expect(devices.length).toBeGreaterThan(0);
  });

  it("can get cameras", async () => {
    const cameras = await arlo.cameras.get();
    expect(cameras.length).toBeGreaterThan(0);
  });

  it("can get basestation", async () => {
    const basestation = await arlo.basestation.get();
    expect(basestation.deviceType).toEqual("basestation");
  });

  it("can get recordings", async () => {
    let from = new Date();
    from.setDate(from.getDate() - 1);
    const recordings = await arlo.recordings.get({ from });
    expect(recordings.length).toBeGreaterThan(0);
  });
});
