var ghmd = require("./markdown-it-gh.js")

module.exports = (opts, ctx) => {
  return {
    extendMarkdown: md => {
      md.use(ghmd)
    }
  }
}
