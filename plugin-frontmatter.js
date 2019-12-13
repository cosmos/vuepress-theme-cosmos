const matter = require('gray-matter');
const md = require("markdown-it")()

module.exports = (options = {}, context) => ({
  extendPageData($page) {
    const tokens = md.parse($page._content, {})
    // const rendered = md.render($page._content)
    // $page.rendered = rendered
    tokens.forEach((t, i) => {
      if (t.type === 'heading_open' && ['h1'].includes(t.tag)) {
        $page.title = tokens[i + 1].content
      }
    })
    // $page.tokes = tokens
    $page.frontmatter = {
      ...$page.frontmatter,
      ...matter($page._content, { delims: ['<!--', '-->'] }).data
    }
  }
})