import { test, expect } from "vitest";
import { createRequire } from "module";
import { runInThisContext } from "vm";
import { readFileSync } from "fs";
import { fileURLToPath, pathToFileURL } from "url";
import { dirname, join } from "path";

// These tests exercise the actual built dist/ artifacts (not src/) against
// the exact usage patterns documented in README.md, so a regression in the
// build config or the CJS-default patch script gets caught here instead of
// only in a one-off manual check.

const require = createRequire(import.meta.url);
const distDir = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");

test('README: const Base62Str = require("base62str").default;', () => {
    const Base62Str = require(join(distDir, "index.js")).default;
    expect(Base62Str.createInstance().encodeStr("Hello World!")).toBe("T8dgcjRGkZ3aysdN");
});

test('bonus: require("base62str") also works directly (no .default needed)', () => {
    const Base62Str = require(join(distDir, "index.js"));
    expect(Base62Str.createInstance().encodeStr("Hello World!")).toBe("T8dgcjRGkZ3aysdN");
});

test('README: import Base62Str from "base62str";', async () => {
    const mod = await import(pathToFileURL(join(distDir, "index.mjs")).href);
    const Base62Str = mod.default;
    expect(Base62Str.createInstance().encodeStr("Hello World!")).toBe("T8dgcjRGkZ3aysdN");
});

test('README: <script src=".../dist/index.global.js"> exposes a Base62Str global', () => {
    const code = readFileSync(join(distDir, "index.global.js"), "utf8");
    runInThisContext(code, { filename: "index.global.js" });
    try {
        const Base62Str = (globalThis as unknown as { Base62Str: any }).Base62Str;
        expect(Base62Str.createInstance().encodeStr("Hello World!")).toBe("T8dgcjRGkZ3aysdN");
    } finally {
        Reflect.deleteProperty(globalThis, "Base62Str");
    }
});
