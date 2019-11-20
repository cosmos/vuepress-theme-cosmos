<template lang="pug">
  div
    .search__container
        transition(name="panel")
          client-only
            section-search(@visible="searchPanel = $event" v-show="searchPanel").search__panel
        .search__overlay(v-if="searchPanel" @click="overlayClick")
    .container
      .sidebar__container(:class="[`sidebar__container__${!!sidebarVisible}`]")
        .sidebar
          tm-sidebar(:value="tree" :tree="directoryTree")
      .content__wrapper(:class="[`content__aside__${aside}`]")
        .top-bar
          tm-top-bar(@search="searchPanel = $event")
        .content
          tm-breadcrumbs.breadcrumbs
          tm-content(:tree="directoryTree" :key="$route.fullPath" @selected="selectHeader($event)" @sidebar="sidebarVisible = !sidebarVisible")
            template(v-slot:content)
              slot(name="content")
        .aside(v-if="aside" :key="$route.fullPath")
          tm-aside
        .footer
          tm-footer(:tree="directoryTree")
        //- tm-footer
        //-   .content__inner
        //-     .topbar
        //-       svg(width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" @click="sidebarVisible = !sidebarVisible").topbar__menu__button
        //-         path(d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z")
        //-           path(d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z")
        //-       tm-breadcrumbs
        //-       //- tm-select-version
        //-       tm-select-language(v-if="hasLocales").topbar__language
        //-     tm-content(:aside="aside" :tree="directoryTree" :key="$route.fullPath" @selected="selectHeader($event)")
        //-       template(v-slot:content)
        //-         slot(name="content")
        //- .footer__wrapper
        //-   tm-footer.footer
      //- .aside__container(v-if="aside")
      //-   .aside
      //-     tm-aside(:selected="headerSelected")
</template>

<style lang="stylus" scoped>
.search__panel
  position fixed
  z-index 200000
  max-width 600px
  width 100%
  right 0
  top 0
  bottom 0
  background-color #F8F9FC
  box-shadow 0px 24px 40px rgba(22, 25, 49, 0.1), 0px 10px 16px rgba(22, 25, 49, 0.08), 0px 1px 0px rgba(22, 25, 49, 0.05)

.search__overlay
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 100000

.top-bar
  grid-area 1/1/1/3

.breadcrumbs
  margin-bottom 1.5rem

.container
  display grid
  width 100%
  grid-template-columns var(--sidebar-width) calc(100% - var(--sidebar-width))
  max-width 1440px
  margin-left auto
  margin-right auto
  position relative

.sidebar__container
  transition transform .25s
  max-width var(--sidebar-width)
  width 100%

.sidebar
  position sticky
  background white
  top 0
  height 100vh
  overflow-y scroll
  overflow-x hidden

.content
  min-height 100vh
  width 100%
  padding 3rem 3rem 0
  grid-area auto

.content__wrapper
  display grid
  width 100%
  position relative

  grid-template-columns calc(100% - var(--aside-width)) var(--aside-width)

.content__wrapper.content__aside__false
  display block

.content__container
  display grid
  grid-template-columns 1fr 1fr
  width 100%

.aside
  position sticky
  float right
  top 0
  width var(--aside-width)
  z-index 2000
  overflow-x hidden
  height 100vh
  grid-area auto
  padding 2rem

.footer
  grid-area auto
  z-index 5000
  position relative
  grid-area auto / auto / auto / span 2
  // Fix for Safari's buggy implementation of `sticky`
  transform translateZ(0)

.panel-enter-active, .panel-leave-active
  transition opacity .25s, transform .35s

.panel-enter
  opacity 0
  transform translateX(50px)

.panel-enter-to
  opacity 1
  transform translateX(0)

.panel-leave
  opacity 1
  transform translateX(0)

.panel-leave-to
  opacity 0
  transform translateX(50px)

@media screen and (max-width: 1000px)
  .content__wrapper
    display block

  .aside
    display none

@media screen and (max-width: 700px)
  .content
    padding 2rem 1.5rem 0

  .container
    display block

  .sidebar__container
    position fixed
    z-index 10000

  .sidebar__container__false
    transform translateX(calc(-1 * var(--sidebar-width)))
    box-shadow initial

  .sidebar__container__true
    box-shadow 0 0 100px 0 rgba(0,0,0,.25)
    transform translateX(0)
</style>

<script>
import {
  find,
  filter,
  forEach,
  remove,
  last,
  omit,
  omitBy,
  sortBy,
  isString,
  isArray,
  flattenDeep,
  map
} from "lodash";

export default {
  data: function() {
    return {
      sidebarVisible: null,
      headerSelected: null,
      searchPanel: null
    };
  },
  computed: {
    hasLocales() {
      return (
        this.$site.locales && Object.entries(this.$site.locales).length > 1
      );
    },
    directoryTree() {
      const files = this.$site.pages;
      const langDirs = Object.keys(this.$site.locales || {}).map(e =>
        e.replace(/\//g, "")
      );
      const langCurrent = (this.$localeConfig.path || "").replace(/\//g, "");
      const langOther = langCurrent.length > 0;
      let tree = {};
      files.forEach(file => {
        let location = file.relativePath.split("/");
        if (location.length === 1) {
          return (tree[location[0]] = file);
        }
        location.reduce((prevDir, currDir, i, filePath) => {
          if (i === filePath.length - 1) {
            prevDir[currDir] = file;
          }
          if (!prevDir.hasOwnProperty(currDir)) {
            prevDir[currDir] = {};
          }
          return prevDir[currDir];
        }, tree);
      });
      tree = langOther ? tree[langCurrent] : omit(tree, langDirs);
      tree = omitBy(tree, e => typeof e.key === "string");
      const toArray = object => {
        return map(object, (page, title) => {
          const properties =
            page.key && isString(page.key)
              ? page
              : { children: this.sortedList(toArray(page)) };
          return {
            title,
            ...properties
          };
        });
      };
      tree = toArray(tree);
      return this.sortedList(tree);
    },
    tree() {
      const autoSidebar =
        this.$themeConfig.autoSidebar == false
          ? {}
          : { title: "Reference", children: this.directoryTree };
      return [autoSidebar, ...(this.$themeConfig.sidebar || [])];
    }
  },
  methods: {
    overlayClick(e) {
      this.searchPanel = false;
      this.$nextTick(() => {
        document.elementFromPoint(e.clientX, e.clientY).click();
      });
    },
    selectHeader(elements) {
      if (elements.length > 0) {
        this.headerSelected = elements[0].target.id;
      }
    },
    indexFile(item) {
      if (!item.children) return false;
      return find(item.children, page => {
        const path = page.relativePath;
        if (!path) return false;
        return (
          path.toLowerCase().match(/index.md$/i) ||
          path.toLowerCase().match(/readme.md$/i)
        );
      });
    },
    sortedList(val) {
      if (!isArray(val)) return val;
      const sorted = sortBy(val, item => {
        if (item.frontmatter) return item.frontmatter.order;
        if (item.children) {
          const index = this.indexFile(item);
          return (
            index &&
            index.frontmatter &&
            index.frontmatter.parent &&
            index.frontmatter.parent.order
          );
        }
      });
      return sorted;
    }
  },
  props: {
    aside: {
      type: Boolean,
      default: true
    }
  }
};
</script>