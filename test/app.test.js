// app.test.js
jest.mock('../config/configManager', () => ({
  getConfig: jest.fn(),
}));

jest.mock('./../src/util/dbConnection', () => ({
  getSqlServerConnection: jest.fn(),
  closeSqlServerConnection: jest.fn(),
}));

const request = require('supertest');
const express = require('express');
const app = require('../app'); // Import the app
const {
  fetchTableData,
  fetchTableDataInDetail
} = require('../src/action/fetchTableData');
const { insertTableData } = require('../src/action/insertTableData');
const { getSqlServerConnection, closeSqlServerConnection } = require('../src/util/dbConnection');

// Mock dependencies
jest.mock('./../src/action/fetchTableData');
jest.mock('./../src/action/insertTableData');
jest.mock('./../src/util/dbConnection');

describe('App Routes', () => {
  beforeAll(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeSqlServerConnection();
  });

  describe('GET /fetch/:table', () => {
    it('should fetch data successfully (positive case)', async () => {
      fetchTableData.mockResolvedValue([{ id: 1, name: 'Test' }]);
      const response = await request(app).get('/fetch/users');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ id: 1, name: 'Test' }]);
      expect(fetchTableData).toHaveBeenCalledWith('users', '');
    });

    it('should handle errors when fetching data (negative case)', async () => {
      fetchTableData.mockRejectedValue(new Error('Database error'));
      const response = await request(app).get('/fetch/users');
      expect(response.status).toBe(500);
      expect(response.text).toBe('Failed to fetch data');
    });
  });
});
