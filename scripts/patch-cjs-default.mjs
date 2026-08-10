import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// tsup emits `module.exports = Base62Str` for the CJS build (a single default
// export). The library has always documented `require("base62str").default`,
// so patch in a `.default` alias pointing back to the same class.
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const cjsPath = join(root, "dist", "index.js");
const patch = "module.exports.default = module.exports;\n";

const source = readFileSync(cjsPath, "utf8");
if (source.includes(patch)) {
  process.exit(0);
}

const marker = "//# sourceMappingURL=";
const markerIndex = source.indexOf(marker);
const patched = markerIndex === -1
  ? source + patch
  : source.slice(0, markerIndex) + patch + source.slice(markerIndex);

writeFileSync(cjsPath, patched);
