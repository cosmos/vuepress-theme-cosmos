<template lang="pug">
div
  .layout
    .layout__sidebar
      tm-sidebar-content(:value="tree" :tree="directoryTree")
    .layout__main
      .mode-switch-container
        tm-mode-switch
      .layout__main__navbar
        tm-top-bar(@sidebar="sidebarVisible = $event" @search="searchPanel = $event")
      .layout__main__content(:class="[`aside__${!($frontmatter.aside === false)}`]")
        .layout__main__content__body(id="content-scroll")
          .layout__main__content__body__breadcrumbs(v-if="!($frontmatter.aside === false)")
            tm-breadcrumbs(@visible="rsidebarVisible = $event")
          .layout__main__content__body__wrapper
            div.test(style="width: 100%")
              .search__container
                .search(@click="$emit('search', true)")
                  .search__icon
                    icon-search
                  .search__text Search
              .container
                slot
                tm-content-cards(v-if="$frontmatter.cards")
        .layout__main__content__aside__container(v-if="!($frontmatter.aside === false)" :style="{'--height-banners': heightBanners + 'px'}")
          .layout__main__content__aside(:class="[`aside__bottom__${!!asideBottom}`]")
            client-only
              tm-aside(id="aside-scroll" @search="searchPanel = $event" @bannerError="asideBanners = null" v-bind="{asideBanners, asideBannersUrl, prereq}")
          .layout__main__content__aside__banners(ref="banners" v-if="editLink")
            a(:href="editLink" target="_blank")
              card-banner
      .layout__main__gutter(v-if="!($frontmatter.aside === false)")
        tm-footer-links(:tree="tree")
      .layout__main__footer
        tm-footer(:tree="directoryTree" :full="$page.frontmatter.footer && $page.frontmatter.footer.newsletter === false")
  tm-sidebar(:visible="sidebarVisible" @visible="sidebarVisible = $event").sheet__sidebar
    tm-sidebar-content(:value="tree" :tree="directoryTree" :compact="true")
  tm-sidebar(:visible="searchPanel" @visible="searchPanel = $event" max-width="100vw" width="480px" side="right" box-shadow="0 0 50px 10px rgba(0,0,0,.1)" background-color="rgba(0,0,0,0)").sheet__sidebar
    section-search(@visible="searchPanel = $event" :base="$site.base" @cancel="searchPanel = false" :algoliaConfig="algoliaConfig" @select="searchSelect($event)" :query="searchQuery" @query="searchQuery = $event" :site="$site")
  tm-sidebar(:visible="rsidebarVisible"  @visible="rsidebarVisible = $event" side="right").sheet__sidebar.sheet__sidebar__toc
    tm-toc-menu(@visible="rsidebarVisible = $event")
</template>

<style lang="stylus" scoped>
.search
  display flex
  align-items center
  color var(--color-text)
  padding-top 1rem
  width calc(var(--aside-width) - 6rem)
  cursor pointer
  position absolute
  top 1rem
  right 4rem
  justify-content flex-end
  transition color .15s ease-out

  &:hover
    color var(--color-text, black)

  &__container
    visibility hidden
    display flex
    justify-content flex-end
    margin-top 1rem
    margin-bottom 1rem

  &__icon
    width 1.5rem
    height 1.5rem
    fill #aaa
    margin-right 0.5rem
    transition fill .15s ease-out

  &:hover &__icon
    fill var(--color-text, black)

.footer__links
  padding-top 5rem
  padding-bottom 1rem
  border-top 1px solid rgba(176, 180, 207, 0.2)
  margin-top 5rem

.links
  display flex
  justify-content space-between
  margin-top 4rem

  a
    box-shadow none
    color var(--color-link, blue)

.container
  position relative
  width 100%
  max-width 45rem

.content
  padding-right var(--sidebar-width)
  width 100%
  position relative

  &.noAside
    padding-right 0

  &__container
    width 100%
    padding-left 4rem
    padding-right 2rem

    &.noAside
      max-width initial

/deep/
  .codeblock
    margin-top 2rem
    margin-bottom 2rem
    letter-spacing 0

  .custom-block
    &.danger
      margin-top 1.5rem
      margin-bottom 1.5rem

    &.danger, &.warning, &.tip
      padding 1rem 1.5rem 1rem 3.5rem
      border-radius 0.5rem
      position relative

      & :first-child
        margin-top 0

      & :last-child
        margin-bottom 0

      &:before
        content ''
        height 24px
        width 24px
        position absolute
        display block
        top 1rem
        left 1rem
        background-repeat no-repeat

    &.danger
      background #FFF6F9

      &:before
        background-image url("./images/icon-danger.svg")

    &.warning
      &:before
        background-image url("./images/icon-warning.svg")

    &.tip
      &:before
        background-image url("./images/icon-tip.svg")

  h2, h3, h4, h5, h6
    &:hover
      a.header-anchor
        opacity 1

  a.header-anchor
    opacity 0
    position absolute
    font-weight 400
    left -1.5em
    width 1.5em
    text-align center
    box-sizing border-box
    color var(--semi-transparent-color)
    outline-color var(--color-link, blue)
    transition all 0.25s

    &:after
      transition all 0.25s
      border-radius 0.25rem
      content attr(data-header-anchor-text)
      max-width 4rem
      color var(--background-color-secondary)
      position absolute
      top -2.4em
      padding 7px 12px
      white-space nowrap
      left 50%
      transform translateX(-50%)
      font-size 0.8125rem
      line-height 1
      letter-spacing 0
      opacity 0
      box-shadow 0px 16px 32px rgba(22, 25, 49, 0.08), 0px 8px 12px rgba(22, 25, 49, 0.06), 0px 1px 0px rgba(22, 25, 49, 0.05)
      background var(--color-text, black)

    &:before
      transition all 0.25s
      content ''
      background-image url("data:image/svg+xml,  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24'><path fill='rgb(22, 25, 49)' d='M12 21l-12-18h24z'/></svg>")
      position absolute
      width 8px
      height 8px
      top -0.7em
      left 50%
      font-size 0.5rem
      transform translateX(-50%)
      opacity 0

    &:focus,
    &:focus:before,
    &:hover:before
      opacity 1

    &:focus:after,
    &:hover:after
      opacity 1

  h1[id*='requisite'], h2[id*='requisite'], h3[id*='requisite'], h4[id*='requisite'], h5[id*='requisite'], h6[id*='requisite']
    display none
    align-items baseline
    cursor pointer

    &:before
      content ''
      width 1.5rem
      height 1.5rem
      display block
      flex none
      margin-right 0.5rem
      background url('./images/icon-chevron.svg')
      transition transform 0.2s ease-out

  h1[id*='requisite'].prereqTitleShow, h2[id*='requisite'].prereqTitleShow, h3[id*='requisite'].prereqTitleShow, h4[id*='requisite'].prereqTitleShow, h5[id*='requisite'].prereqTitleShow, h6[id*='requisite'].prereqTitleShow
    &:before
      transform rotate(90deg)

  h1[id*='requisite'] + ul, h2[id*='requisite'] + ul, h3[id*='requisite'] + ul, h4[id*='requisite'] + ul, h5[id*='requisite'] + ul, h6[id*='requisite'] + ul
    display none

  li[prereq]
    display none
    max-width 28rem
    margin-left 2rem

  li[prereq].prereqLinkShow
    display block

  li[prereq] a[href]
    box-shadow 0px 2px 4px rgba(22, 25, 49, 0.05), 0px 0px 1px rgba(22, 25, 49, 0.2), 0px 0.5px 0px rgba(22, 25, 49, 0.05)
    padding 1rem
    border-radius 0.5rem
    color var(--color-text, black)
    font-size 1rem
    font-weight 600
    line-height 1.25rem
    margin 1rem 0
    display block
    transition box-shadow 0.25s ease-out, transform 0.25s ease-out, opacity 0.4s ease-out

    &:hover:not(:active)
      color inherit
      text-decoration none
      box-shadow 0px 10px 20px rgba(0, 0, 0, 0.05), 0px 2px 6px rgba(0, 0, 0, 0.05), 0px 1px 0px rgba(0, 0, 0, 0.05)
      transform translateY(-2px)
      transition-duration 0.1s

    &:active
      opacity 0.7
      transition-duration 0s

  [synopsis]
    padding 1.5rem 2rem
    background-color rgba(176, 180, 207, 0.09)
    border-radius 0.5rem
    margin-top 3rem
    margin-bottom 3rem
    color rgba(22, 25, 49, 0.9)
    font-size 1rem
    line-height 1.625rem

    &:before
      content 'Synopsis'
      display block
      color rgba(22, 25, 49, 0.65)
      text-transform uppercase
      font-size 0.75rem
      margin-bottom 0.5rem
      letter-spacing 0.2em

  a[target='_blank']
    &:after
      content '↗'
      position absolute
      bottom 0.166em
      padding-left 0.1875em
      font-size 0.75em
      line-height 1
      word-break none
      transition transform 0.2s ease-out
    &:hover:after,
    &:focus:after
      transform translate(2px, -2px)

  .icon.outbound
    display none

  table
    display block
    width 100% // fallback
    width max-content
    max-width 100%
    overflow auto
    line-height 1.5rem
    margin-top 2rem
    margin-bottom 2rem
    box-shadow 0 0 0 1px rgba(140, 145, 177, 0.32)
    border-radius 0.5rem
    border-collapse collapse
    font-size 1rem

  th
    text-align left
    font-weight 700
    font-size 0.875rem

  td, th
    padding 0.75rem

  tr
    box-shadow 0 1px 0 0 rgba(140, 145, 177, 0.32)

  tr:only-child
    box-shadow none

  thead tr:only-child
    box-shadow 0 1px 0 0 rgba(140, 145, 177, 0.32)

  tr + tr:last-child
    box-shadow none

  tr:last-child td
    border-bottom none

  .code-block__container
    margin-top 2rem
    margin-bottom 2rem

  .content__default
    width 100%

  h1, h2, h3, h4
    font-weight 700

  h1 code, h2 code, h3 code
    font-weight normal

  .content__container
    img
      max-width 100%

  .term
    text-decoration underline

  img
    width 100%
    height auto
    display block
    margin-bottom 2rem
    margin-top 2rem

  .tooltip

    // temporary fixes for tooltips coming from cosmos-ui
    &__wrapper
      background white
      padding 1rem

    h1
      font-size 0.875rem
      line-height 1.25rem
      letter-spacing .01em
      font-weight 600
      margin-top 0
      margin-bottom 0

    p
      font-size 0.8125rem
      line-height 1.125rem
      margin-top 0.375rem
      margin-bottom 0

  hr
    border-width 1px
    border-style solid
    border-color rgba(0,0,0,0.1)
    margin-top 2.5rem
    margin-bottom 2.5rem

  strong
    font-weight 600
    letter-spacing .01em

  em
    font-style italic

  h1
    font-size 3rem
    margin-top 4rem
    margin-bottom 4rem
    line-height 3.5rem
    letter-spacing -0.02em

    &:first-child
      margin-top 0

  h2
    font-size 2rem
    margin-top 3.75rem
    margin-bottom 1.25rem
    line-height 2.5rem
    letter-spacing -0.01em

  h3
    font-size 1.5rem
    margin-top 2.5rem
    margin-bottom 1rem
    letter-spacing 0
    line-height 2rem

  h4
    font-size 1.25rem
    margin-top 2.25rem
    margin-bottom 0.875rem
    line-height 1.75rem
    letter-spacing .01em

  p,ul,ol
    font-size 1.125rem
    line-height 1.8125rem

  p
    margin-top 1em
    margin-bottom 1em

  ul, ol
    margin-top 1em
    margin-bottom 1.5em
    margin-left 0
    padding-left 0

  li
    padding-left 0
    margin-left 2rem
    margin-bottom 1rem
    position relative

  blockquote
    padding-left 2rem
    padding-right 2rem
    border-left 0.25rem solid rgba(0,0,0,0.1)
    color var(--color-text, inherit)
    margin-top 1.75rem
    margin-bottom 1.75rem

  code
    background-color rgba(176, 180, 207, 0.175)
    border 1px solid rgba(176, 180, 207, 0.09)
    border-radius 0.25em
    padding-left 0.25em
    padding-right 0.25em
    font-size 0.8333em
    line-height 1.06666em
    letter-spacing 0
    color var(--color-code, inherit)
    margin-top 3rem
    overflow-wrap break-word
    word-wrap break-word
    -ms-word-break break-all
    word-break break-word

  h1, h2, h3, h4, h5, h6
    code
      font-size inherit

  h1, h2, h3, h4, h5, h6
    a
      color var(--color-link, blue)
      outline none
      position relative

    a[target='_blank']
      &:after
        position relative

  p, ul, ol
    a
      color var(--color-link, blue)
      outline-color var(--color-link, blue)
      border-radius 0.25rem
      position relative
      transition opacity 0.3s ease-out
      overflow-wrap break-word
      word-wrap break-word
      -ms-word-break break-all
      word-break break-word

    a[target='_blank']
      margin-right 0.888em

    a:hover
      text-decoration underline

    a:active
      opacity 0.65
      transition-duration 0s

    a code
      color inherit
      transition background-color 0.15s ease-out

    a:hover code,
    a:focus code
      background-color rgba(59, 66, 125, 0.12)

  td
    a
      color var(--color-link, blue)
      position relative
      transition opacity 0.3s ease-out
      overflow-wrap break-word
      word-wrap break-word
      -ms-word-break break-all
      word-break inherit
    a[target='_blank']
      &:after
        display none

@media screen and (max-width: 1136px)
  >>> h2, >>> h3, >>> h4, >>> h5, >>> h6
    padding-right 1.75rem

  >>> a.header-anchor
    left initial
    right 0
    text-align right
    opacity 1

    &:after
      transform none
      left initial
      right -5px

  >>> h1 a.header-anchor
    display none

@media screen and (max-width: 1024px)
  .content
    padding-right 0

    &__container
      padding-left 2rem

@media screen and (max-width: 1136px) and (min-width: 833px)
  .search__container
    visibility visible

@media screen and (max-width: 1136px)
  >>> h1[id*='requisite'], >>> h2[id*='requisite'], >>> h3[id*='requisite'], >>> h4[id*='requisite'], >>> h5[id*='requisite'], >>> h6[id*='requisite']
    display flex

  >>> h1[id*='requisite'] + ul, >>> h2[id*='requisite'] + ul, >>> h3[id*='requisite'] + ul, >>> h4[id*='requisite'] + ul, >>> h5[id*='requisite'] + ul, >>> h6[id*='requisite'] + ul
    display block

@media screen and (max-width: 480px)
  >>> h1
    font-size 2.5rem
    margin-bottom 3rem
    line-height 3rem

  >>> h2
    font-size 1.75rem
    margin-top 3.5rem
    margin-bottom 1rem
    line-height 2.25rem

  >>> h3
    font-size 1.25rem
    margin-top 2.25rem
    margin-bottom 0.875rem
    line-height 1.75rem

  >>> h4
    font-size 1.125rem
    margin-top 2rem
    margin-bottom 0.75rem
    line-height 1.5rem

  >>> p, >>> ul, >>> ol
    font-size 1rem
    line-height 1.625rem

  >>> [synopsis]
    padding 1rem
    font-size 0.875rem
    line-height 1.25rem

.mode-switch-container
  position absolute
  padding-top 1rem
  top 1rem
  left 4rem

.sheet
  &__sidebar
    z-index 10000
    position relative

    &__toc
      display none

.layout__main__content__aside.aside__bottom__true
  position absolute
  bottom var(--height-banners, 0)
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
  background-color  var(--background-color-primary)

  &__sidebar
    position sticky
    top 0
    height 100vh
    overflow-y scroll

    &::-webkit-scrollbar
      background rgba(255, 255, 255, 0)
      width 6px
      transition background 0.25s

    &::-webkit-scrollbar-thumb
      background rgba(255, 255, 255, 0)
      border-radius 6px
      transition background 0.25s

    &:hover
      &::-webkit-scrollbar
        background rgba(255, 255, 255, 0)

      &::-webkit-scrollbar-thumb
        background #eee

  &__main
    position relative
    
    &__navbar
      padding-left 2.5rem
      padding-right 2.5rem
      display none
      position sticky
      top 0
      width 100%
      background var(--background-color-primary)
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

        &::-webkit-scrollbar
          background rgba(255, 255, 255, 0)
          width 6px
          transition background 0.25s

        &::-webkit-scrollbar-thumb
          background rgba(255, 255, 255, 0)
          border-radius 6px
          transition background 0.25s

        &:hover
          &::-webkit-scrollbar
            background rgba(255, 255, 255, 0)

          &::-webkit-scrollbar-thumb
            background #eee

        &__container
          position relative
          height 100%
          padding-bottom var(--height-banners, 0)

        &__banners
          width 100%
          position absolute
          bottom 0
          right 0
          padding-left 2rem
          padding-right 1.5rem
          box-sizing border-box

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

          &__banners
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
        padding-top 1rem
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
        padding-left 0.25rem
        padding-right 0.25rem

      &__content
        &__body
          &__breadcrumbs
            padding-left 0.25rem
            padding-right 0.25rem

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
import copy from "clipboard-copy";
import { SectionSearch } from "@cosmos-ui/vue";
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
  map,
  findIndex
} from "lodash";
import hotkeys from "hotkeys-js";
import axios from "axios";

const endingSlashRE = /\/$/;
const outboundRE = /^[a-z]+:/i;

export default {
  props: {
    aside: {
      type: Boolean,
      default: true
    }
  },
  components: {
    SectionSearch
  },
  data: function() {
    return {
      sidebarVisible: null,
      headerSelected: null,
      rsidebarVisible: null,
      searchPanel: null,
      asideBottom: null,
      searchQuery: null,
      prereq: null,
      heightBanners: null,
      status: null,
      asideBannersUrl: "https://v1.cosmos.network/aside-banners",
      asideBanners: null,
    };
  },
  mounted() {
    this.emitPrereqLinks();
    const headerAnchorClick = event => {
      event.target.setAttribute("data-header-anchor-text", "Copied!");
      copy(event.target.href);
      setTimeout(() => {
        event.target.setAttribute("data-header-anchor-text", "Copy link");
      }, 4000);
      event.preventDefault();
    };
    document
      .querySelectorAll(
        'h1[id*="requisite"], h2[id*="requisite"], h3[id*="requisite"], h4[id*="requisite"], h5[id*="requisite"], h6[id*="requisite"]'
      )
      .forEach(node => {
        node.addEventListener("click", this.prereqToggle);
      });
    document
      .querySelectorAll(".content__default a.header-anchor")
      .forEach(node => {
        node.setAttribute("data-header-anchor-text", "Copy link");
        node.addEventListener("click", headerAnchorClick);
      });
    if (window.location.hash) {
      const elementId = document.querySelector(window.location.hash);
      if (elementId) elementId.scrollIntoView();
    }
  },
  methods: {
    emitPrereqLinks() {
      const prereq = [...document.querySelectorAll("[prereq]")].map(item => {
        const link = item.querySelector("[href]");
        return {
          href: link.getAttribute("href"),
          text: link.innerText
        };
      });
      this.$emit("prereq", prereq);
    },
    prereqToggle(e) {
      if (e.target.classList.contains('header-anchor')) return
      e.target.classList.toggle("prereqTitleShow");
      document.querySelectorAll("[prereq]").forEach(node => {
        node.classList.toggle("prereqLinkShow");
      });
    },
    searchSelect(e) {
      if (e.id) {
        const page = find(this.$site.pages, ["key", e.id]);
        if (page && page.regularPath) {
          if (this.$page.regularPath != page.regularPath) {
            this.$router.push(page.regularPath);
            this.searchPanel = false;
          }
        }
      } else if (e.url) {
        window.location.assign(e.url);
      }
    },
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }
      
      const rawBase = 'https://raw.githubusercontent.com/' + docsRepo +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path

      // Unable to XHR GitHub URL due to CORS
      // Use raw.githubusercontent.com instead
      axios.get(rawBase)
        .then(response => this.status = response.status)
        .catch(() => this.status = 404)

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;

      if (this.status !== 200) {
        return `https://github.com/${docsRepo}/issues`
      } else {
        return (
          base.replace(endingSlashRE, "") +
          `/edit` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path
        );
      }
    },

    searchVisible(bool) {
      this.searchPanel = bool;
    },
    overlayClick(e) {
      this.sidebarVisible = false;
      this.rsidebarVisible = false;
      this.searchPanel = false;
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
  beforeMount() {
    const fetchAsideBanner = axios.get(`${this.asideBannersUrl}/index.json`)
      .then(response => response.data)
      .catch(() => console.log(`Error in fetching data from ${this.asideBannersUrl}`))

    Promise.all([fetchAsideBanner]).then(responses => {
      this.asideBanners = responses[0]
    })
  },
  mounted() {
    document.addEventListener("scroll", () => {
      const banners = this.$refs.asideBanners;
      if (banners) {
        this.heightBanners = banners.offsetHeight;
      }
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
          content.getBoundingClientRect().height - this.heightBanners;
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
    noAside() {
      return !this.aside;
    },
    linkPrevNext() {
      if (!this.tree) return;
      let result = {};
      const search = tree => {
        return tree.forEach(item => {
          const children = item.children;
          if (children) {
            const index = findIndex(children, ["regularPath", this.$page.path]);
            if (index >= 0 && children[index - 1]) {
              result.prev = children[index - 1];
            }
            if (index >= 0 && children[index + 1]) {
              result.next = children[index + 1];
            }
            return search(item.children);
          }
        });
      };
      search(this.tree);
      return result;
    },
    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo
      } = this.$site.themeConfig;
      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
    },
    algoliaConfig() {
      const algolia = this.$themeConfig.algolia;
      return algolia ? algolia : {};
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
        this.$themeConfig.sidebar.auto == false
          ? { title: "", children: this.directoryTree } //{}
          : { title: "", children: this.directoryTree };
      return [autoSidebar, ...(this.$themeConfig.sidebar.nav || [])];
    }
  }
};
</script>
