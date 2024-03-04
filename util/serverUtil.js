require("dotenv").config();
const session = require("express-session");
const mongoDBStore = require("connect-mongo");

const sessionMiddleware = session({
  secret: "5ad070abf4844032b8e2e0312580db53",
  resave: false,
  saveUninitialized: false,
  store: mongoDBStore.create({
    mongoUrl: process.env.DATABASE_KEY,
    collectionName: "sessions",
  }),
  cookie: { maxAge: 86400000 },
});

const corsConfig = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://njs-asm3-client.onrender.com",
  ],
  credentials: true,
};

module.exports = { sessionMiddleware, corsConfig };
