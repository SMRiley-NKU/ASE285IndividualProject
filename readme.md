# Project Overview

This project consists of two main functionalities:
1. **Encrypting and Storing Passwords**: Takes a plaintext file containing user emails and passwords (`password.txt`), encrypts the passwords, saves the encrypted passwords to a new file (`password.enc.txt`), and uploads the information into a MongoDB database using Mongoose.
2. **Authentication**: Checks provided user credentials (email and password) against the stored data and returns `true` or `false` based on the validation results.

## Prerequisites

Before running the scripts, ensure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB (Ensure MongoDB is running on your local machine or you have access to a MongoDB server)

## Installation

1. **Clone the Repository**
   - Clone this repository to your local machine or download the files directly.

2. **Install Dependencies**
   - Navigate to the project directory and run the following command to install necessary dependencies:
     ```bash
     npm install
     ```

## Files Description

- **`passwordjs.js`**: Script for validating user credentials. It takes command line inputs for the password file, email, and password.
- **`makepassword.js`**: Script for encrypting passwords and uploading them to a MongoDB database.
- **Utility and Database Modules** (not included, assumed to be in the project):
  - **`utility.js`**: Contains helper functions like `readFile`, `writeFile`, `hash` for handling file operations and hashing passwords.
  - **`database.js`**: Contains functions and configurations for database connection and disconnection.

## Configuration

- **Database Connection**: Ensure you configure the MongoDB connection string in your `database.js` module to connect to your database.
- **Environment Variables**: Set up environment variables for database access if necessary to ensure security, especially in production environments.

## Running the Scripts

1. **Encrypting Passwords and Storing in Database**
   - Run `makepassword.js` by using the command:
     ```bash
     node makepassword.js <path_to_password.txt> <path_to_output_encrypted_file>
     ```
   - Example:
     ```bash
     node makepassword.js ./password.txt ./password.enc.txt
     ```

2. **Validating User Credentials**
   - Run `passwordjs.js` by providing the required command line arguments:
     ```bash
     node passwordjs.js <path_to_password_file> <email> <password>
     ```
   - Example:
     ```bash
     node passwordjs.js ./password.txt user@example.com password123
     ```

## Testing

- Ensure you write and run tests to validate both scripts using Jest. Test cases should include file operations, database interactions, and input validations.

## Further Development

- Enhance security features by integrating more complex hashing algorithms and possibly adding salt to passwords.
- Implement a user interface for easier interaction with the system for non-technical users.
