# Connect-SQL

Connect-SQL is a Node.js application that connects to a SQL Server database and provides endpoints to fetch and insert data.

## Folder Structure
connect-sql/ ├── config/ │ └── config.json ├── src/ │ ├── app.js │ ├── dbConnection.js │ ├── fetchTableData.js │ └── insertTableData.js ├── package.json └── README.md

## Configuration

Update the `config/config.json` file with your database connection details:

```json
{
    "server": "localhost",
    "database": "test",
    "username": "root1",
    "password": "admin"
}

Installation
Clone the repository:
git clone https://github.com/yourusername/connect-sql.git
cd connect-sql

Install dependencies:
npm install

Usage
1. Start the server:
npm start

2. The server will be running on http://localhost:3000.

API Endpoints
Fetch Data
Fetch data from a table with an optional WHERE clause.
GET /fetch/:table?where=condition

:table - The name of the table to fetch data from.
where - Optional query parameter to filter results.
Example:
GET /fetch/users?where=age>30

Insert Data
Insert data into a table.
POST /insert/:table

:table - The name of the table to insert data into.
Request body should contain the data to be inserted in JSON format.
Example:
POST /insert/users
{
    "name": "John Doe",
    "age": 25
}
Health Check
Check the health status of the server.
GET /health

Author
Raj Saxena

```