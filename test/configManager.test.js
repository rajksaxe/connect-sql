const { getConfig } = require('../config/configManager');

describe('getConfig', () => {
  it('should return the default configuration', () => {
    console.log(require('../config/configManager'));
    const config = getConfig();
    
    expect(config).toHaveProperty('database');
    expect(config).toHaveProperty('server');
    expect(config).toHaveProperty('username');
    expect(config).toHaveProperty('password');
  });
});
