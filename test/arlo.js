const arlo = require('../index.js');
const should = require('chai').should();

const auth = {
  email: process.env.ARLO_USER,
  password: process.env.ARLO_PASSWORD
};

describe('arlo', () => {
  
  before(async () => {
    await arlo.login(auth);
  })

  after(async() => {
    await arlo.logout();
  })

  it('can set mode', async () => {
    let active = await arlo.modes.active();
    
    await arlo.modes.set('mode1');
    let newActive = await arlo.modes.active();
    
    await arlo.modes.set(active);
    newActive.should.equal('mode1');
  });

  it('can get active mode', async () => {
    const mode = await arlo.modes.active();
    mode.should.have.string('mode');
  });
  
  it('can get devices', async () => {
    const devices = await arlo.devices.get();
    devices.should.be.an('array');
    devices.should.not.be.empty;
  });
  
  it('can get cameras', async () => {
    const cameras = await arlo.cameras.get();
    cameras.should.be.an('array');
    cameras.should.not.be.empty;
  });
  
  it('can get basestation', async () => {
    const basestation = await arlo.basestation.get();
    basestation.should.have.property('deviceType');
    basestation.deviceType.should.equal('basestation');
  });
  
  it('can get recordings', async () => {
    let from = new Date();
    from.setDate(from.getDate() - 1);
    const recordings = await arlo.recordings.get({ from });
    recordings.should.be.an('array');
    recordings.should.not.be.empty;
  });
});
