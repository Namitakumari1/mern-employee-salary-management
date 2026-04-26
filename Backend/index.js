import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';

import SequelizeStore from 'connect-session-sequelize';
import FileUpload from 'express-fileupload';

import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js';

// Load env first
dotenv.config();

const app = express();

// Session store
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

// Middleware
app.use(session({
    secret: process.env.SESS_SECRET || "secret123",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://localhost:5175']
}));

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

// Routes
app.use(UserRoute);
app.use(AuthRoute);

// Correct DB connection + sync
(async () => {
  try {
    await db.authenticate();
    console.log("Database Connected");

    // Sync database and create/update tables automatically
    await db.sync({ alter: true });
    console.log("Tables synced");

  } catch (error) {
    console.log("DB Error:", error);
  }
})();

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});