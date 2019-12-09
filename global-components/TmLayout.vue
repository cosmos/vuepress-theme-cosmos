<template lang="pug">
  div
    .search__container
      transition(name="panel")
        client-only
          section-search(@visible="searchPanel = $event" v-show="searchPanel" :visible="searchPanel").search__panel
      .search__overlay(v-if="searchPanel" @click="overlayClick")
    .rsidebar(v-if="rsidebarVisible")
      tm-toc-menu
    .container
      transition(name="fade")
        .sidebar__overlay(v-if="sidebarVisible || rsidebarVisible" @click="overlayClick")
      .sidebar__container(:class="[`sidebar__container__${!!sidebarVisible}`]")
        .sidebar
          tm-sidebar(:value="tree" :tree="directoryTree")
      div
        .content__wrapper(:class="[`content__aside__${aside}`]")
          .content(id="content-scroll")
            .top-bar
              tm-top-bar(@sidebar="sidebarVisible = $event" @search="searchPanel = $event")
            tm-breadcrumbs(@rsidebar="rsidebarVisible = true").breadcrumbs
            tm-content(:tree="directoryTree" @selected="selectHeader($event)" @sidebar="sidebarVisible = !sidebarVisible")
              template(v-slot:content)
                slot(name="content")
          .aside(v-if="aside" :key="$route.fullPath" :class="[`aside__bottom__${!!asideBottom}`]")
            tm-aside(@search="searchPanel = $event" id="aside-scroll")
        .footer
          tm-footer(:tree="directoryTree" :full="$page.frontmatter.footer && $page.frontmatter.footer.newsletter === false")
</template>

<style lang="stylus" scoped>
.rsidebar
  position fixed
  max-width 225px
  width 100%
  z-index 100000
  right 0
  top 0
  bottom 0
  background-color white
  visibility hidden
  overflow-y scroll

.search__panel
  position fixed
  z-index 200000
  max-width 600px
  width 100%
  right 0
  top 0
  bottom 0
  background-color white
  box-shadow 0px 0px 40px rgba(22, 25, 49, 0.1), 0px 0px 16px rgba(22, 25, 49, 0.08), 0px 0px 0px rgba(22, 25, 49, 0.05)

.search__overlay
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 100000

.top-bar
  grid-area 1/1/2/2

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
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);

.sidebar__container
  transition transform .5s
  max-width var(--sidebar-width)
  width 100%

.sidebar
  position sticky
  background white
  top 0
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
  overflow-y scroll
  overflow-x hidden

  &__overlay
    position fixed
    z-index 10000
    top 0
    left 0
    right 0
    height 100vh
    height: calc(var(--vh, 1vh) * 100);
    background rgba(51, 54, 74, 0.4)
    visibility hidden

.content
  min-height 100vh
  width 100%
  padding 3rem 3rem 0
  // grid-area 2/1/3/2
  overflow-x hidden

.content__wrapper
  display grid
  width 100%
  position relative
  // grid-template-rows 50px auto
  grid-template-columns calc(100% - var(--aside-width)) var(--aside-width)

.content__wrapper.content__aside__false
  display block

.content__container
  display grid
  grid-template-columns 1fr 1fr
  width 100%
  position relative

.aside
  position sticky
  top 0
  width var(--aside-width)
  z-index 2000
  overflow-x hidden
  height 100vh
  // grid-area auto
  // padding 1rem 2rem

  &__bottom__true
    position absolute
    bottom 0
    right 0
    top initial
    height initial

.footer
  // grid-area auto
  z-index 5000
  // grid-columns span 2
  position relative
  // grid-area auto / auto / auto / span 2
  transform translateZ(0)
  // grid-area 3/1/4/3

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

.fade-enter-active, .fade-leave-active
  transition opacity .25s

.fade-enter
  opacity 0

.fade-enter-to
  opacity 1

.fade-leave
  opacity 1

.fade-leave-to
  opacity 0

@media screen and (max-width: 1392px)
  .container
    --sidebar-width 304px

@media screen and (max-width: 1135px)
  .container
    --sidebar-width 256px

  .aside
    display none

  .content__wrapper
    display block

@media screen and (max-width: 752px)
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
    transform translateX(0)

  .sidebar__overlay
    visibility visible

  .rsidebar
    visibility visible
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

export default {
  data: function() {
    return {
      sidebarVisible: null,
      headerSelected: null,
      rsidebarVisible: null,
      searchPanel: null,
      asideBottom: null
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
    }
  }
};
</script>