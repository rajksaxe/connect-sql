const yargs = require('yargs');
const defaultConfig = require('./config.json');

function getConfig() {
  const argv = yargs
    .option('server', {
      alias: 's',
      description: 'Database server',
      type: 'string',
    })
    .option('database', {
      alias: 'd',
      description: 'Database name',
      type: 'string',
    })
    .option('username', {
      alias: 'u',
      description: 'Database username',
      type: 'string',
    })
    .option('password', {
      alias: 'p',
      description: 'Database password',
      type: 'string',
    })
    .help()
    .alias('help', 'h')
    .argv;

  return {
    ...defaultConfig,
    server: argv.server || defaultConfig.server,
    database: argv.database || defaultConfig.database,
    username: argv.username || defaultConfig.username,
    password: argv.password || defaultConfig.password,
  };
}

module.exports = { getConfig } ;