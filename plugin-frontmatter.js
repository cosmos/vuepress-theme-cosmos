const matter = require('gray-matter');
const attrs = require('markdown-it-attrs')
const md = require("markdown-it")().use(attrs, {
  allowedAttributes: ['prereq', 'hide', 'synopsis']
})
const cheerio = require('cheerio')

module.exports = (options = {}, context) => ({
  extendPageData($page) {
    const tokens = md.parse($page._content, {})
    const $ = cheerio.load(md.render($page._content))
    $page.frontmatter = {
      synopsis: $('[synopsis]').text(),
      ...$page.frontmatter,
      ...matter($page._content, { delims: ['<!--', '-->'] }).data,
    }
    tokens.forEach((t, i) => {
      if (t.type === 'heading_open' && ['h1'].includes(t.tag)) {
        $page.title = tokens[i + 1].content
        return;
      }
    })
  }
})