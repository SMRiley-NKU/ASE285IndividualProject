
const { passwordjs } = require('../../util/passwordjs');
const fs = require('fs');
const { makepassword } = require('makepassword.js');

// Mock fs and makepassword module
jest.mock('fs');
jest.mock('makepassword.js');

describe('passwordjs function', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    test('should fail if incorrect number of arguments are provided', async () => {
        process.argv = ['node', 'passwordjs.js'];
        const result = await passwordjs();
        expect(result).toBe(false);
    });

    test('should fail if the file does not exist', async () => {
        process.argv = ['node', 'passwordjs.js', 'testfile.txt', 'user@example.com', 'password123456'];
        fs.existsSync.mockReturnValue(false);
        const result = await passwordjs();
        expect(fs.existsSync).toHaveBeenCalledWith('testfile.txt');
        expect(result).toBe(false);
    });

    test('should fail if the email does not exist in the file', async () => {
        process.argv = ['node', 'passwordjs.js', 'testfile.txt', 'user@example.com', 'password123456'];
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue('user2@example.com:oldpassword\n');
        const result = await passwordjs();
        expect(fs.readFileSync).toHaveBeenCalledWith('testfile.txt', 'utf8');
        expect(result).toBe(false);
    });

    test('should fail if the password is invalid', async () => {
        process.argv = ['node', 'passwordjs.js', 'testfile.txt', 'user@example.com', 'short'];
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue('user@example.com:oldpassword\n');
        const result = await passwordjs();
        expect(result).toBe(false);
    });

    test('should append the new password to the file and update encrypted file', async () => {
        process.argv = ['node', 'passwordjs.js', 'testfile.txt', 'user@example.com', 'validpassword123456'];
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockReturnValue('user@example.com:oldpassword\n');
        const result = await passwordjs();
        expect(fs.appendFileSync).toHaveBeenCalledWith('testfile.txt', 'user@example.com:validpassword123456\n');
        expect(makepassword).toHaveBeenCalledWith('testfile.txt', '../auth/password.enc.txt');
        expect(result).toBe(true);
    });

    test('should handle file operations error', async () => {
        process.argv = ['node', 'passwordjs.js', 'testfile.txt', 'user@example.com', 'validpassword123456'];
        fs.existsSync.mockReturnValue(true);
        fs.readFileSync.mockImplementation(() => {
            throw new Error('File read error');
        });
        const result = await passwordjs();
        expect(result).toBe(false);
    });
});

