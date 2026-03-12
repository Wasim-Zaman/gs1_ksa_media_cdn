import "dotenv/config";
import express from "express";
import path from "path";
import fs from "fs";

const app = express();

const PORT = process.env.PORT ?? 3000;
const STATIC_PATH = process.env.STATIC_PATH;

if (!STATIC_PATH) {
  console.error("❌ STATIC_PATH is not defined in .env");
  process.exit(1);
}

const resolvedPath = path.resolve(STATIC_PATH);

console.log("📁 Resolved path:", resolvedPath);
console.log("📂 Directory exists:", fs.existsSync(resolvedPath));
console.log("📄 Directory contents:", fs.readdirSync(resolvedPath));

app.use((req, _res, next) => {
  console.log("➡️  Request:", req.url);
  next();
});

app.use("/", express.static(resolvedPath));

app.listen(PORT, () => {
  console.log(`✅ Serving "${resolvedPath}" at http://localhost:${PORT}`);
});
