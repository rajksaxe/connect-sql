const { getSqlServerConnection } = require('../util/dbConnection');

async function insertTableData(table, data) {
  try {
    const pool = await getSqlServerConnection();
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data).map(value => `'${value}'`).join(', ');
    const query = `INSERT INTO ${table} (${columns}) VALUES (${values})`;
    console.log("Executing insert query:", query); // Log the query for debugging
    await pool.request().query(query);
  } catch (err) {
    console.error("Failed to insert data:", err);
    throw err;
  }
}

module.exports = { insertTableData };
