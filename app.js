#!/usr/bin/env node

const express = require('express');
const bodyParser = require('body-parser');
const { getSqlServerConnection, closeSqlServerConnection } = require('./src/util/dbConnection');
const { fetchTableData, fetchTableDataInDetail } = require('./src/action/fetchTableData');
const { insertTableData } = require('./src/action/insertTableData');
const {getConfig} = require('./config/configManager');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const config = getConfig();

app.get('/fetch/:table', async (req, res) => {
  const table = req.params.table;
  const where = req.query.where || '';
  try {
    const data = await fetchTableData(table, where);
    res.json(data);
  } catch (err) {
    res.status(500).send("Failed to fetch data");
  }
});

app.post('/fetch/:table', async (req, res) => {
  const table = req.params.table;
  const { columns, where } = req.body;
  try {
    const data = await fetchTableDataInDetail(table, columns, where);
    res.json(data);
  } catch (err) {
    res.status(500).send("Failed to fetch data");
  }
});

app.post('/insert/:table', async (req, res) => {
  const table = req.params.table;
  const data = req.body;
  try {
    await insertTableData(table, data);
    res.status(201).send("Data inserted successfully");
  } catch (err) {
    res.status(500).send("Failed to insert data");
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

process.on('SIGINT', async () => {
  await closeSqlServerConnection();
  process.exit(0);
});

getSqlServerConnection(config).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Failed to initialize database connection:", err);
  process.exit(1);
});

module.exports = app; // Export the app for testing