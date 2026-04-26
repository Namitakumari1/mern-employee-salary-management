
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create Sequelize instance using environment variables
const db = new Sequelize(
    process.env.DB_NAME,     // database name
    process.env.DB_USER,     // database username
    process.env.DB_PASSWORD, // database password
    {
        host: process.env.DB_HOST, // database host
        dialect: "mysql"
    }
);

export default db;
