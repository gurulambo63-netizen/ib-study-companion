import { execSync } from "child_process";
import { readFileSync } from "fs";

console.log("=== CWD ===");
console.log(process.cwd());

console.log("\n=== package.json scripts ===");
const pkg = JSON.parse(readFileSync("/vercel/share/v0-project/package.json", "utf8"));
console.log(JSON.stringify(pkg.scripts, null, 2));
console.log("type:", pkg.type);
console.log("packageManager:", pkg.packageManager);

console.log("\n=== Config files present ===");
try { execSync("ls /vercel/share/v0-project/*.config.* /vercel/share/v0-project/*.config.js /vercel/share/v0-project/*.config.cjs /vercel/share/v0-project/*.config.ts 2>/dev/null", { stdio: "pipe" }); } catch {}
try {
  const files = execSync("ls /vercel/share/v0-project/ 2>&1", { encoding: "utf8" });
  console.log(files);
} catch (e) { console.log(e.message); }

console.log("\n=== Running: npm run build ===");
try {
  const out = execSync("cd /vercel/share/v0-project && npm run build 2>&1", {
    encoding: "utf8",
    timeout: 120000,
  });
  console.log("BUILD SUCCESS:");
  console.log(out);
} catch (e) {
  console.log("BUILD FAILED:");
  console.log("stdout:", e.stdout || "");
  console.log("stderr:", e.stderr || "");
  console.log("message:", e.message || "");
}
