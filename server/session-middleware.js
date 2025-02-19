import dotenv from "dotenv";
import expressSession from "express-session";
import sessionFileStore from "session-file-store";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envPath });

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
