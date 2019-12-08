var child_process = require("child_process");
var Prism = require('prismjs');

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

var HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function escapeHtml(str) {
  if (/[&<>"]/.test(str)) {
    return str.replace(/[&<>"]/g, replaceUnsafeChar);
  }
  return str;
}

module.exports = function asciiDiagram(md, options) {
  md.renderer.rules.text = function (tokens, idx, options, env) {
    const a = tokens[idx].content.split(" ")
    if (a[0] == "+++" && a[1]) {
      const isGithub = /github.com/.test(a[1])
      const url = isGithub ? a[1].replace("github.com", "raw.githubusercontent.com").replace("/blob/", "/") : a[1]
      let data = child_process.spawnSync("curl", [url]).stdout.toString()
      const hasLines = a[1].match(/#L[0-9]+-L[0-9]+$/)
      if (data && hasLines) {
        const [lineStart, lineEnd] = hasLines && hasLines[0].replace(/#/g, "").replace(/L/g, "").split("-")
        data = data.split("\n").slice(+lineStart - 1, +lineEnd).join("\n")
      }
      return `<code-block url="${a[1]}" value="${escapeHtml(data.toString())}"></code-block>`
    }
    return escapeHtml(tokens[idx].content);
  };
};
