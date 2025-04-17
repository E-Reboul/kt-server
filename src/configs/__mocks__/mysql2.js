module.exports = {
    createConnection: jest.fn().mockReturnValue({
      execute: jest.fn().mockResolvedValue([]),
      query: jest.fn().mockResolvedValue([]),
      end: jest.fn().mockResolvedValue(true)
    })
  };