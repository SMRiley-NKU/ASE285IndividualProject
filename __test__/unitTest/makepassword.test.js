
const { makepassword } = require('../../util/makepassword');
const fs = require('fs');
const util = require('../../util/utility');
const { User, connectToDatabase, disconnect } = require('./database'); // Assuming these are part of your actual implementation

// Mocking dependencies
jest.mock('fs');
jest.mock('./utility', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  hash: jest.fn()
}));
jest.mock('./database', () => ({
  User: {
    findOne: jest.fn(),
    create: jest.fn()
  },
  connectToDatabase: jest.fn(),
  disconnect: jest.fn()
}));

describe('makepassword function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should process valid password records and save encrypted file', async () => {
    util.readFile.mockReturnValue(['user@example.com:password123']);
    util.hash.mockReturnValue('encryptedPassword123');
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({});

    await makepassword('input.txt', 'output.txt');

    expect(util.readFile).toHaveBeenCalledWith('input.txt');
    expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(User.create).toHaveBeenCalledWith({
      email: 'user@example.com',
      hashedPassword: 'encryptedPassword123'
    });
    expect(util.writeFile).toHaveBeenCalledWith('output.txt', 'user@example.com:encryptedPassword123\n');
    expect(console.log).toHaveBeenCalledWith('Encrypted password file has been saved.');
  });

  test('should skip processing for existing users', async () => {
    util.readFile.mockReturnValue(['user@example.com:password123']);
    User.findOne.mockResolvedValue(true);

    await makepassword('input.txt', 'output.txt');

    expect(util.readFile).toHaveBeenCalledWith('input.txt');
    expect(User.findOne).toHaveBeenCalledWith({ email: 'user@example.com' });
    expect(User.create).not.toHaveBeenCalled();
  });

  test('should handle errors during password processing', async () => {
    util.readFile.mockReturnValue(['user@example.com:password123']);
    User.findOne.mockImplementation(() => {
      throw new Error('Database error');
    });

    await makepassword('input.txt', 'output.txt');

    expect(console.error).toHaveBeenCalled();
  });
});

