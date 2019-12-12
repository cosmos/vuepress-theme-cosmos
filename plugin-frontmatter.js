const matter = require('gray-matter');
const MarkdownIt = require("markdown-it")

module.exports = (options = {}, context) => ({
  extendPageData($page) {
    const md = new MarkdownIt()
    const tokens = md.parse($page._content, {})
    tokens.forEach((t, i) => {
      if (t.type === 'heading_open' && ['h1'].includes(t.tag)) {
        $page.title = tokens[i + 1].content
      }
    })
    $page.frontmatter = {
      ...$page.frontmatter,
      ...matter($page._content, { delims: ['<!--', '-->'] }).data
    }
  }
})