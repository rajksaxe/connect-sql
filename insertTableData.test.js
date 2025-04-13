const { insertTableData } = require('../src/action/insertTableData');
const { getSqlServerConnection } = require('../src/util/dbConnection');

jest.mock('../src/util/dbConnection', () => ({
  getSqlServerConnection: jest.fn(),
  closeSqlServerConnection: jest.fn(),
}));

describe('insertTableData', () => {
  it('should insert data into the database', async () => {
    const mockConnection = { query: jest.fn().mockResolvedValue({ affectedRows: 1 }) };
    getSqlServerConnection.mockResolvedValue(mockConnection);

    const data = { id: 1, name: 'Test' };
    const result = await insertTableData('testTable', data);
    expect(result).toEqual({ affectedRows: 1 });
    expect(mockConnection.query).toHaveBeenCalledWith('INSERT INTO testTable SET ?', data);
  });

  it('should throw an error if the database connection fails', async () => {
    getSqlServerConnection.mockRejectedValue(new Error('Connection failed'));

    await expect(insertTableData('testTable', { id: 1 })).rejects.toThrow('Connection failed');
  });
});