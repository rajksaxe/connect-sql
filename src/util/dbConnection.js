const sql = require('mssql');
const {getConfig} = require('./../../config/configManager');

let pool;

async function getSqlServerConnection() {
  if (!pool) {
    const { server, database, username, password } = getConfig();
    console.log("Connecting to SQL Database {", database, "} on {", server, "}");
    const dbConfig = {
      user: username,
      password: password,
      server: server,
      database: database,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };
    console.log("Connection successful!");
    pool = await sql.connect(dbConfig);
  }
  try {
    return pool;
  } catch (err) {
    console.error("Connection failed:", err);
    throw err;
  }
}

async function closeSqlServerConnection() {
  if (pool) {
    await pool.close();
    pool = null;
  }
}

module.exports = { getSqlServerConnection, closeSqlServerConnection };
