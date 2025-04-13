const { getSqlServerConnection } = require('../util/dbConnection');

async function fetchTableData(table, where = '') {
  try {
    const pool = await getSqlServerConnection();
    const query = `SELECT * FROM ${table} ${where ? `WHERE ${where}` : ''}`;
    console.log("Executing fetch query:", query); // Log the query for debugging
    const result = await pool.query(query);
    return result.recordset;
  } catch (err) {
    console.error("Failed to fetch data:", err);
    throw err;
  }
}

async function fetchTableDataInDetail(table, columns = '*', where = '') {
  try {
    const pool = await getSqlServerConnection();
    const query = `SELECT ${columns} FROM ${table} ${where ? `WHERE ${where}` : ''}`;
    console.log("Executing fetch query [detail]:", query); // Log the query for debugging
    const result = await pool.query(query);
    return result.recordset;
  } catch (err) {
    console.error("Failed to fetch data:", err);
    throw err;
  }
}

module.exports = { fetchTableData, fetchTableDataInDetail };
