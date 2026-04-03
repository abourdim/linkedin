const fs = require('fs');

/**
 * Load a JS file into globalThis so `const Foo = {...}` becomes accessible.
 * Replaces `const NAME = {` with `globalThis.NAME = {` before eval.
 * Also strips DOMContentLoaded auto-init wrappers.
 */
function loadModule(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  // Replace const/let/var top-level object declarations
  code = code.replace(/^(const|let|var)\s+(\w+)\s*=/gm, 'globalThis.$2 =');
  // Strip DOMContentLoaded auto-init
  code = code.replace(/document\.addEventListener\(['"]DOMContentLoaded['"],\s*\(\)\s*=>\s*\{?[^}]*\}?\s*\);?/g, '');
  eval(code);
}

module.exports = { loadModule };
