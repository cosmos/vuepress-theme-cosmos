const fs = require('fs');

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

module.exports = (md) => {
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx, options] = args
    const token = tokens[idx]
    if (fs.existsSync(token.src)) {
      token.content = fs.readFileSync(token.src, 'utf8')
    }
    return `<code-block language="${token.info}" value="${escapeHtml(JSON.stringify(token))}"></code-block>`
  }
}