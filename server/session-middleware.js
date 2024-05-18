import dotenv from "dotenv";
import path from "path";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const path = require("path");
// const expressSession = require("express-session");
// const sessonFileStore = require("session-file-store");

const FileStore = sessionFileStore(expressSession);

const sessionMiddleware = expressSession({
  secret: process.env.SESSION_SECRET,
  cookie: {
    sameSite: true,
    httpOnly: process.env.NODE_ENV === "production",
    maxAge: parseInt(process.env.SESSION_EXPIRY, 10),
  },
  resave: true,
  rolling: true,
  store: new FileStore({
    retries: 0,
    ttl: 28800,
    path: path.join(__dirname, "sessions/"),
  }),
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
});

export default sessionMiddleware;
