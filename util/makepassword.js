'use strict';
// Import the required modules
const fs = require('fs');
const { readFile, writeFile, hash } = require('./utility');
const connectToDatabase = require('./config');


// Define an asynchronous function to process password files
async function makepassword(inputFileName, outputFileName) {
    try {
        // Connect to the database
        await connectToDatabase();
        // Read passwords from the input file
        const passwordList = readFile(inputFileName);
        // Initialize an array to hold encrypted password records
        const encryptedPasswordList = [];

        // Iterate over each line in the password file
        for (const record of passwordList) {
            try {
                // Split the line into email and password
                const [email, password] = record.split(':');
                // Continue to next iteration if email or password is missing
                if (!email || !password) continue;

                // Trim whitespace from email and password
                const cleanEmail = email.trim();
                const encryptedPassword = hash(password.trim());
                // Check if a user already exists with the given email
                const userExists = await User.findOne({ email: cleanEmail });

                // If the user exists, skip to next iteration
                if (userExists) {
                    console.log(`User email ${cleanEmail} already exists, skipping.`);
                    continue;
                }

                // Create a new user with the encrypted password
                await User.create({ email: cleanEmail, hashedPassword: encryptedPassword });
                // Add the new user's credentials to the encrypted list
                encryptedPasswordList.push(`${cleanEmail}:${encryptedPassword}`);
            } catch (err) {
                // Log any errors encountered during processing of a line
                console.error(`Error processing record: ${record}`, err);
            }
        }

        // Write the encrypted passwords to the output file
        writeFile(outputFileName, encryptedPasswordList.join('\n'));
        // Disconnect from the database
        await disconnect();
        console.log('Encrypted password file has been saved.');
    } catch (err) {
        // Log any errors encountered during the main process
        console.error(err);
    }
}

// Execute the function if this file is run directly
if (require.main === module) {
    makepassword('../password.txt', '../password.enc.txt');
}

// Export the makepassword function for use in other modules
module.exports = { makepassword };
