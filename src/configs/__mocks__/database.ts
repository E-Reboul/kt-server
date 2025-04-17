const mockConnection = {
    execute: jest.fn().mockResolvedValue([]),
    query: jest.fn().mockResolvedValue([]),
  };
  
  export default mockConnection;