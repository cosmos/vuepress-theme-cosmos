# Cosmos theme for VuePress

[![npm version](https://img.shields.io/npm/v/vuepress-theme-cosmos)](https://www.npmjs.com/package/vuepress-theme-cosmos)

## Install

```sh
# Remove previously installed version (optional)
rm -rf node_modules

# If there is no package.json file, initialize npm package
npm init

# Install or update the theme
npm install --save vuepress-theme-cosmos
```

## Usage

Minimal config in `.vuepress/config.js` to enable the theme:

```js
module.exports = {
  theme: "cosmos",
};
```

### Run dev server

```sh
vupress dev
```

### Build the website

```
vuepress build
```

## Configuration

Most of the configuration happens in the `.vuepress/config.js` file. All parameters all optional, except `theme`.

```js
module.exports = {
  // Enable the theme
  theme: "cosmos",
  // Configure default title
  title: "Default title",
  themeConfig: {
    // Logo in the top left corner, file in .vuepress/public/
    logo: "/logo.svg",
    // Configure the manual sidebar
    header: {
      img: {
        // Image in ./vuepress/public/logo.svg
        src: "/logo.svg",
        // Image width relative to the sidebar
        width: "75%",
      },
      title: "Documentation",
    },
    // custom must be false, topbar.banner is true to enable
    topbar: {
      banner: false
    },
    sidebar: {
      // Auto-sidebar, true by default
      auto: false,
      children: [
        // Array of sections
        {
          title: "Section title",
          children: [
            {
              title: "External link",
              path: "https://example.org/",
            },
            {
              title: "Internal link",
              path: "/url/path/",
            },
            {
              title: "Directory",
              path: "/path/to/directory/",
              directory: true,
            },
            {
              title: "Link to ./vuepress/public/foo/index.html",
              path: "/foo/",
              static: true,
            },
          ],
        },
        // Configure Resources
        {
          title: "Resources",
          children: [
            {
              title: "Default resource 1",
              path: "https://github.com/cosmos/vuepress-theme-cosmos",
            },
            {
              title: "Default resource 2",
              path: "https://github.com/cosmos/vuepress-theme-cosmos",
            },
          ],
        },
      ],
    },
  },
};
```

### Header

`themeConfig.header` property is responsible for the sidebar header component.

If `header` is `undefined`, then a default image (hexagon, width 40px) is used along with a title "Documentation".

If `header` is a string, `header` is used as a path to the logo. For example, `"/logo.svg"` uses `.vuepress/public/logo.svg` in user's directory. Title string is hidden.

If `header` is an object and has a `logo` property. If `logo` is a string, it is used as a path to the logo with the width of 50% and title string is hidden unless `header.title` is defined. If `logo` is an object and has `src` property, `logo.src` is used as a path string with a width of 50% unless `logo.width` is defined.

Title string has a value of `header.title` if it is defined. If it is undefined and `header.logo` is defined, the value is "Documentation".

## File configuration

Markdown files can contain YAML frontmatter. Several properties (all of which are optional) are used by the theme:

```yaml
---
# title is displayed in the sidebar
title: Title of the file
# order specifies file's priority in the sidebar
order: 2
# parent is readme.md or index.md parent directory
parent:
  title: Directory title
  order: 1
---

```

Setting `order: false` removes the item (file or directory) from the sidebar. It is, however, remains accessible by means other than the sidebar. It is valid use a `readme.md` to set an order of a parent-directory and hide the file with `order: false`.

## Docs search

The search bar is currently using Fuse.js by default. We have since integrated with [Algolia Docsearch](https://github.com/cosmos/vuepress-theme-cosmos/pull/48) to improve the search experience. In order to use Algolia Docssearch, you're required to [join the program](https://docsearch.algolia.com). Once you have acquired all the necessary Algolia config keys, you can modify the themeConfig.algolia in the `config.js` as such:

```
algolia: {
  id: "BH4D9OD16A",
  key: "ac317234e6a42074175369b2f42e9754",
  index: "cosmos-sdk"
},
```