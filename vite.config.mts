import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// The library's own package.json "name" is "base62str", so Vite's built-in
// self-referencing-package resolution otherwise wins and resolves this
// specifier to the built `dist/` output instead of source. `enforce: 'pre'`
// makes this plugin's resolveId run ahead of that built-in resolution.
function importFromSource(): Plugin {
    const target = resolve(import.meta.dirname, 'src/index.ts');
    return {
        name: 'base62str-import-from-source',
        enforce: 'pre',
        resolveId(source) {
            if (source === 'base62str') {
                return target;
            }
        },
    };
}

export default defineConfig({
    plugins: [react(), importFromSource()],
    root: 'demo',
    base: '/base62str/',
    build: {
        outDir: '../docs',
        emptyOutDir: true,
    },
});
