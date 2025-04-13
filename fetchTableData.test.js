jest.mock('./../src/util/dbConnection', () => ({
  getSqlServerConnection: jest.fn(),
  closeSqlServerConnection: jest.fn(),
}));

const { fetchTableData, fetchTableDataInDetail } = require('./../src/action/fetchTableData');
const { getSqlServerConnection, closeSqlServerConnection } = require('./../src/util/dbConnection');

describe('fetchTableData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await closeSqlServerConnection();
  });

  it('should call getSqlServerConnection and return data', async () => {
    getSqlServerConnection.mockResolvedValue({
      query: jest.fn().mockResolvedValue({ recordset: [{ id: 1, name: 'Test' }] }),
    });

    const result = await fetchTableData('TestTable');
    expect(getSqlServerConnection).toHaveBeenCalled();
    expect(result).toEqual([{ id: 1, name: 'Test' }]);
  });

  it('should fetch detailed table data successfully', async () => {
    // Mock the database connection and query behavior
    const mockQuery = jest.fn().mockResolvedValue({
      recordset: [{ id: 1, name: 'Test Detail' }],
    });
    getSqlServerConnection.mockResolvedValue({ query: mockQuery });

    // Call the function
    const result = await fetchTableDataInDetail('TestTable', 'id, name', 'id=1');

    // Assertions
    expect(getSqlServerConnection).toHaveBeenCalled();
    expect(mockQuery).toHaveBeenCalledWith('SELECT id, name FROM TestTable WHERE id=1');
    expect(result).toEqual([{ id: 1, name: 'Test Detail' }]);
  });

  it('should handle errors gracefully', async () => {
    // Mock the database connection to throw an error
    getSqlServerConnection.mockRejectedValue(new Error('Connection failed'));

    // Call the function and expect it to throw
    await expect(fetchTableDataInDetail('TestTable', 'id, name', 'id=1')).rejects.toThrow('Connection failed');

    // Assertions
    expect(getSqlServerConnection).toHaveBeenCalled();
  });
});