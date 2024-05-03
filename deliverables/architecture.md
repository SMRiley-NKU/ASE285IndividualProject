*               +----------------------+
*               |                      |
*               |       Frontend       |
*               |                      |
*               +----------+-----------+
*                          |
*                          v
*               +----------+-----------+
*               |                      |
*               |       Backend        |
*               |                      |
*               +----------+-----------+
*                          |
*            +-------------+-------------+
*            |                           |
*            v                           v
* +-----------+-----------+   +-----------+-----------+
* |                       |   |                       |
* |  Encryption Module   |   |   Database Module     |
* |                       |   |                       |
* +-----------+-----------+   +-----------+-----------+
*             |                           |
*             +-------------+-------------+
*                           |
*                           v
*                +----------+-----------+
*                |                      |
*                |    MongoDB Database  |
*                |                      |
*                +----------------------+
* 
* 
* 
* 
* Frontend: The terminal is used to interact with this application.
* Modules:
* 
* Encryption Module: Responsible for encrypting passwords *before storing them in the database. In this case, it *utilizes the crypto module to hash passwords.
* 
* Database Module: Handles interactions with the MongoDB database using Mongoose. It includes functions for saving user data and querying the database for authentication.
* Rationale: 
* 
* Frontend: Provides the user interface for interaction. It collects user input and sends it to the backend for processing.
* Backend: Acts as the intermediary between the frontend and the database. It handles requests from the frontend, processes data, interacts with the database, and sends responses back to the frontend.
* Encryption Module: Ensures that passwords are securely stored in the database by encrypting them using a hashing algorithm. This module enhances security by preventing the exposure of plain-text passwords.
* Database Module: Manages interactions with the MongoDB database. It abstracts away the complexities of database operations, making it easier to perform CRUD (Create, Read, Update, Delete) operations on user data.