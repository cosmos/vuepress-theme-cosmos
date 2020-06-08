# Cosmos theme for VuePress

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
  theme: "cosmos"
}
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
    // Auto-sidebar, true by default
    autoSidebar: true,
    // Configure the manual sidebar
    sidebar: [
      // Array of sections
      {
        title: "Section title",
        children: [
          {
            title: "External link",
            path: "https://example.org/"
          },
          {
            title: "Internal link",
            path: "/url/path/"
          },
          {
            title: "Directory",
            path: "/path/to/directory/",
            directory: true
          },
          {
            title: "Link to ./vuepress/public/foo/index.html",
            path: "/foo/",
            static: true
          }
        ]
      },
      // Configure Resources
      {
        title: "Resources",
        children: [
          {
            title: "Default resource 1",
            path: "https://github.com/cosmos/vuepress-theme-cosmos"
          },
          {
            title: "Default resource 2",
            path: "https://github.com/cosmos/vuepress-theme-cosmos"
          }
        ]
      }
    ],
    sidebarFooter: [
      {
        label: "sdk",
        name: "Cosmos<br>SDK",
        url: "https://docs.cosmos.network/",
        color: "#5064FB",
      },
      {
        label: "hub",
        name: "Cosmos<br>Hub",
        url: "https://hub.cosmos.network/",
        color: "#BA3FD9",
      },
      {
        label: "ibc",
        name: "IBC<br>Protocol",
        url: "https://github.com/cosmos/ics/tree/master/ibc",
        color: "#E6900A",
      },
      {
        label: "core",
        name: "Tendermint<br>Core",
        url: "https://docs.tendermint.com/",
        color: "#00BB00",
      },
    ],
  }
}
```

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