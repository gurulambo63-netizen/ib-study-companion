const { execSync } = require("child_process");
const { readFileSync } = require("fs");
const path = require("path");

// Script lives at <project>/scripts/debug-build.js → project root is one level up
const PROJECT = path.resolve(__dirname, "..");

console.log("=== CWD ===");
console.log(process.cwd());

console.log("\n=== Root files ===");
try {
  console.log(execSync(`ls ${PROJECT}/`, { encoding: "utf8" }));
} catch (e) {
  console.log("ls failed:", e.message);
}

console.log("\n=== package.json ===");
try {
  const pkg = JSON.parse(readFileSync(`${PROJECT}/package.json`, "utf8"));
  console.log("name:", pkg.name);
  console.log("type:", pkg.type);
  console.log("packageManager:", pkg.packageManager);
  console.log("scripts:", JSON.stringify(pkg.scripts, null, 2));
} catch (e) {
  console.log("Could not read package.json:", e.message);
}

console.log("\n=== Running npm run build ===");
try {
  const out = execSync(`cd ${PROJECT} && npm run build 2>&1`, {
    encoding: "utf8",
    timeout: 120000,
  });
  console.log("BUILD SUCCESS:");
  console.log(out);
} catch (e) {
  console.log("BUILD FAILED (exit code:", e.status, ")");
  console.log(e.stdout || "");
  console.log(e.stderr || "");
}
