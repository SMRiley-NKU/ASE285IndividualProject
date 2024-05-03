'use strict';

// Import required modules
const fs = require('fs');
const { makepassword } = require('./makepassword.js');


// Define an asynchronous function to handle password updates
async function passwordjs() {
    // Define expected number of command line arguments
    const expectedArgCount = 5; // node command, script name, and three user inputs
    if (process.argv.length !== expectedArgCount) {
        console.log('Usage: node passwordjs.js <password_file> <email> <password>');
        return false;
    }

    // Extract filename, email, and password from command line arguments
    const [filename, email, password] = process.argv.slice(2);

    try {
        // Check if the specified file exists
        if (!fs.existsSync(filename)) {
            console.log(`${filename} does not exist.`);
            return false;
        }

        // Read data from the file and check if the email already exists
        const passwordData = fs.readFileSync(filename, 'utf8').split('\n');
        const emailExists = passwordData.some(entry => {
            const [recordedEmail] = entry.split(':');
            return recordedEmail.trim() === email.trim();
        });

        // If the email does not exist, exit the function
        if (!emailExists) {
            console.log('User does not exhist');
            return false;
        }

        // Validate the password - must not be empty and must meet length criteria
        if (!password || password.trim() === '' || password.length < 12) {
            console.log('password - must not be empty and must meet length criteria of 12');
            return false;
        }

        // Append new email and password to the password file
        fs.appendFileSync(filename, `${email}:${password}\n`);

        // Call the makepassword function to update encrypted password file
        await makepassword(filename, '../password.enc.txt');

        // Confirm success to the console
        console.log('true');
        return true;
    } catch (error) {
        // Log any errors that occur during the process
        console.error('An error occurred:', error);
        return false;
    }
}

// If this script is run directly, execute the function
if (require.main === module) {
    passwordjs();
}

// Export the function for external use
module.exports = { passwordjs };
