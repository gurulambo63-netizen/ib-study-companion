import { execSync } from "child_process";
import { existsSync, readdirSync } from "fs";
import path from "path";

const root = "/vercel/share/v0-project";

console.log("=== NODE VERSION ===");
console.log(process.version);

console.log("\n=== FILES IN ROOT ===");
readdirSync(root).forEach(f => console.log(f));

console.log("\n=== LOCKFILES ===");
["package-lock.json","bun.lockb","bun.lock","yarn.lock","pnpm-lock.yaml"].forEach(f => {
  console.log(`${f}: ${existsSync(path.join(root, f)) ? "EXISTS" : "missing"}`);
});

console.log("\n=== RUNNING npm run build ===");
try {
  const output = execSync("cd /vercel/share/v0-project && npm run build 2>&1", {
    encoding: "utf8",
    timeout: 120000,
  });
  console.log(output);
} catch (err) {
  console.log("BUILD FAILED:");
  console.log("stdout:", err.stdout);
  console.log("stderr:", err.stderr);
  console.log("message:", err.message);
}
