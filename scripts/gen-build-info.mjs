// Generates lib/build-info.ts with the current git commit SHA + a build
// timestamp, so the DEPLOYED build is identifiable from view-source
// (data-build-* attributes on <html> and x-build-* <meta> tags).
//
// Runs automatically via the "prebuild" and "predev" npm hooks. The output
// file is git-ignored so it never causes `git pull` conflicts on the server.
import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const tryCmd = (cmd) => {
  try {
    return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
  } catch {
    return "";
  }
};

// Managed hosts often inject the commit SHA as an env var; fall back to git.
const sha =
  process.env.SOURCE_VERSION ||
  process.env.GIT_COMMIT ||
  process.env.COMMIT_REF ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  tryCmd("git rev-parse HEAD") ||
  "unknown";

const shortSha = sha === "unknown" ? "unknown" : sha.slice(0, 8);
const builtAt = new Date().toISOString();

const out = `// AUTO-GENERATED at build time by scripts/gen-build-info.mjs — do not edit by hand.
export const BUILD_INFO = {
  sha: ${JSON.stringify(sha)},
  shortSha: ${JSON.stringify(shortSha)},
  builtAt: ${JSON.stringify(builtAt)},
} as const;
`;

const target = fileURLToPath(new URL("../lib/build-info.ts", import.meta.url));
writeFileSync(target, out);
console.log(`[build-info] ${shortSha} @ ${builtAt}`);
