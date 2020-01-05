<template lang="pug">
  div
    cookie-banner
    .layout
      .layout__sidebar
        tm-sidebar-content(:value="tree" :tree="directoryTree")
      .layout__main
        .layout__main__navbar
          tm-top-bar(@sidebar="sidebarVisible = $event" @search="searchPanel = $event")
        .layout__main__content(:class="[`aside__${!($frontmatter.aside === false)}`]")
          .layout__main__content__body(id="content-scroll")
            .layout__main__content__body__breadcrumbs(v-if="!($frontmatter.aside === false)")
              tm-breadcrumbs(@visible="rsidebarVisible = $event")
            .layout__main__content__body__wrapper
              component(:is="layout" :key="$route.path" @search="searchPanel = $event")
                Content
          .layout__main__content__aside__container(v-if="!($frontmatter.aside === false)")
            .layout__main__content__aside(:class="[`aside__bottom__${!!asideBottom}`]")
              tm-aside(id="aside-scroll" @search="searchPanel = $event" :key="$route.path")
        .layout__main__gutter(v-if="!($frontmatter.aside === false)")
          tm-footer-links(:tree="tree")
        .layout__main__footer
          tm-footer(:tree="directoryTree" :full="$page.frontmatter.footer && $page.frontmatter.footer.newsletter === false")
    tm-sidebar(:visible="sidebarVisible" @visible="sidebarVisible = $event").sheet__sidebar
      tm-sidebar-content(:value="tree" :tree="directoryTree" :compact="true")
    tm-sidebar(:visible="searchPanel" @visible="searchPanel = $event" max-width="100vw" width="480px" side="right" box-shadow="0 0 50px 10px rgba(0,0,0,.1)" background-color="rgba(0,0,0,0)").sheet__sidebar
      section-search(@visible="searchPanel = $event" :query="searchQuery" @query="searchQuery = $event")
    tm-sidebar(:visible="rsidebarVisible" @visible="rsidebarVisible = $event" side="right").sheet__sidebar.sheet__sidebar__toc
      tm-toc-menu
</template>

<style lang="stylus" scoped>
.sheet

  &__sidebar
    z-index 10000
    position relative
    scrollbar-color #eee white
      
    &__toc
      display none

.layout__main__content__aside.aside__bottom__true
  position absolute
  bottom 0
  right 0
  max-height initial
  top initial
  height initial

.layout__main__content.aside__false
  display block

.layout
  display grid
  width 100%
  grid-template-columns var(--sidebar-width) calc(100% - var(--sidebar-width))
  max-width var(--layout-max-width, 1540px)
  margin-left auto
  margin-right auto
  position relative

  &__sidebar
    position sticky
    top 0
    height 100vh
    overflow-y scroll
    scrollbar-color #eee white

    &::-webkit-scrollbar
      background rgba(255,255,255,0)
      width 6px
      transition background .25s

    &::-webkit-scrollbar-thumb
      background rgba(255,255,255,0)
      border-radius 6px
      transition background .25s

    &:hover

      &::-webkit-scrollbar
        background rgba(255,255,255,0)
  
      &::-webkit-scrollbar-thumb
        background #eee

  &__main

    &__navbar
      padding-left 2.5rem
      padding-right 2.5rem
      display none
      position sticky
      top 0
      width 100%
      background white
      z-index 500

    &__content
      display grid
      grid-template-columns calc(100% - var(--aside-width)) var(--aside-width)

      &__body

        &__breadcrumbs
          padding-left 3.25rem
          padding-right 3.25rem
          padding-top 6.5rem

        &__wrapper
          padding-left 4rem
          padding-right 4rem

      &__aside
        position sticky
        top 0
        max-height 100vh
        overflow-y scroll
        scrollbar-color #eee white

        &::-webkit-scrollbar
          background rgba(255,255,255,0)
          width 6px
          transition background .25s

        &::-webkit-scrollbar-thumb
          background rgba(255,255,255,0)
          border-radius 6px
          transition background .25s

        &:hover

          &::-webkit-scrollbar
            background rgba(255,255,255,0)
      
          &::-webkit-scrollbar-thumb
            background #eee

        &__container
          position relative
          height 100%

    &__gutter
      max-width calc(100% - var(--aside-width))
      padding-top 4rem
      padding-bottom 4rem
      padding-left 4rem
      padding-right 4rem

    &__footer
      padding-left 4rem
      padding-right 4rem

@media screen and (max-width: 1392px)
  .layout
    --sidebar-width 256px

@media screen and (max-width: 1136px)
  .layout

    &__main

      &__content
        display block

        &__aside
          display none

      &__gutter
        max-width initial

@media screen and (max-width: 832px)
  .layout
    display block

    &__sidebar
      display none

    &__main

      &__navbar
        display block
        padding-left 1.75rem
        padding-right 1.75rem

      &__content

        &__body
          padding-top 0

          &__breadcrumbs
            padding-left 1.75rem
            padding-right 1.75rem
            padding-top 0

          &__wrapper
            padding-left 2.5rem
            padding-right 2.5rem

      &__gutter
        padding-left 2.5rem
        padding-right 2.5rem

      &__footer
        padding-left 2.5rem
        padding-right 2.5rem

@media screen and (max-width: 732px)
  .sheet

    &__sidebar

      &__toc
        display block

  .layout

    &__main

      &__navbar
        padding-left 1.75rem
        padding-right 1.75rem

      &__content

        &__body

          &__breadcrumbs
            padding-left 1.75rem
            padding-right 1.75rem

@media screen and (max-width: 480px)
  .layout

    &__main

      &__navbar
        padding-left .25rem
        padding-right .25rem

      &__content

        &__body

          &__breadcrumbs
            padding-left .25rem
            padding-right .25rem

          &__wrapper
            padding-left 1rem
            padding-right 1rem

      &__gutter
        padding-left 1rem
        padding-right 1rem

      &__footer
        padding-left 1rem
        padding-right 1rem
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
import hotkeys from "hotkeys-js";
import { CookieBanner } from "@cosmos-ui/vue";

export default {
  components: { CookieBanner, },
  data: function() {
    return {
      sidebarVisible: null,
      headerSelected: null,
      rsidebarVisible: null,
      searchPanel: null,
      asideBottom: null,
      searchQuery: null
    };
  },
  mounted() {
    document.addEventListener("scroll", () => {
      const content = document.querySelector("#content-scroll");
      const aside = document.querySelector("#aside-scroll");
      const top = window.scrollY;
      if (aside && aside.getBoundingClientRect().height < window.innerHeight) {
        this.asideBottom = false;
      }
      if (
        content &&
        aside &&
        aside.getBoundingClientRect().height > window.innerHeight
      ) {
        this.asideBottom =
          top + aside.getBoundingClientRect().height >
          content.getBoundingClientRect().height;
      }
    });
    hotkeys("/", (event, handler) => {
      event.preventDefault();
      this.searchPanel = !this.searchPanel;
    });
    hotkeys("escape", (event, handler) => {
      event.preventDefault();
      this.searchPanel = false;
    });
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  },
  computed: {
    layout() {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // You can also check whether layout exists first as the default global layout does.
          return this.$frontmatter.layout;
        }
        return "LayoutDefault";
      }
      return "NotFound";
    },
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
    searchVisible(bool) {
      this.searchPanel = bool;
    },
    overlayClick(e) {
      this.sidebarVisible = false;
      this.rsidebarVisible = false;
      this.searchPanel = false;
      // this.$nextTick(() => {
      //   document.elementFromPoint(e.clientX, e.clientY).click();
      // });
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
    },
    search: {
      type: Boolean,
      default: false
    }
  }
};
</script>