import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

// Protected names are stored only as SHA-256 hashes (lowercase) with their length, so this guard never publishes them.
const PROTECTED: { length: number; sha256: string }[] = [
  { length: 7, sha256: "94dffd38a7e7c471625b98b66b26d099e91260b7a0220984e7354b7c0f87d24b" },
  { length: 6, sha256: "c0dfe986eb2c48c310d18adb1f5bdc611115188a5b5adbee8c874b206d31f05f" },
  { length: 13, sha256: "282af321895ea4da9c8f04823d6375e268990dbd3391b22c263895904125d105" },
  { length: 15, sha256: "defb7fd73c28faadc87eb05f7b3c78c9df521612709063f1760148ca559f3a34" },
  { length: 8, sha256: "61218a603f1e1dba2261237f3ec7fda6a0c29ee73ebedd842170ec003454fc17" },
  { length: 8, sha256: "46166224145ac47311c08231f93badcf6193bb0e1b06431be587d98da5a343bf" },
];
const ROOT = new URL("..", import.meta.url).pathname;
const TEXT_EXT = new Set([".ts", ".tsx", ".css", ".md", ".json", ".txt", ".html", ".svg", ".xml"]);
const sha = (s: string) => createHash("sha256").update(s).digest("hex");

function* textFiles(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) yield* textFiles(path);
    else if (TEXT_EXT.has(extname(name).toLowerCase())) yield path;
  }
}

export function containsProtectedName(text: string): boolean {
  const lower = text.toLowerCase();
  const lengths = new Set(PROTECTED.map((p) => p.length));
  const hashes = new Set(PROTECTED.map((p) => p.sha256));
  for (const len of lengths) {
    for (let i = 0; i + len <= lower.length; i++) {
      if (hashes.has(sha(lower.slice(i, i + len)))) return true;
    }
  }
  return false;
}

test("no protected name appears in published source, tests included", () => {
  const leaks: string[] = [];
  for (const dir of ["app", "components", "lib", "public", "tests"]) {
    for (const file of textFiles(join(ROOT, dir))) {
      if (containsProtectedName(readFileSync(file, "utf8"))) leaks.push(file.replace(ROOT, ""));
    }
  }
  assert.deepEqual(leaks, []);
});
