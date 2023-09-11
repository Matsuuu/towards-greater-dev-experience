/**
 * @typedef VariableImport
 * @property { string } prod
 * @property { string } dev
 */

/**
 * @type { Record<string, string | VariableImport> }
 */
const imports = {
    "lit": Math.random() > 0.5 ? 'https://cdn.jsdelivr.net/npm/lit/' : "https://unpkg.com/lit/"
};

function isDevMode() {
    return location.hostname === "localhost" || location.hostname === "127.0.0.1"
}

function injectImportMap() {
    const script = document.createElement("script");
    script.type = "importmap";
    script.innerHTML = JSON.stringify({ imports: parseImports(imports) });
    document.head.appendChild(script);
}

function parseImports(importsToParse) {
    const isDev = isDevMode();
    return Object.fromEntries(
        Object.entries(importsToParse).map(entry => {
            if (typeof entry[1] === "string") {
                return entry;
            }
            const variants = entry[1];
            return [entry[0], isDev ? variants.dev : variants.prod];
        })
    );
}

injectImportMap();
