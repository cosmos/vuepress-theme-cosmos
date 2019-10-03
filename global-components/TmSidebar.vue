<template lang="pug">
  div
    .container
      div
        router-link(to="/")
          img(:src="$withBase(logo)" v-if="logo")
          div(v-else).logo Documentation
        tm-search
        div(v-for="group in sidebar")
          .title {{group.title}}
          .section(v-for="section in sortGroup(group.children)" v-if="showSection(section)")
            .section__title
              a.section__outbound(v-if="outboundUrl(section.path)" :href="section.path" target="_blank") {{section.title}}
              router-link(v-else :to="url(section)" :class="[`section__${active(section) ? 'active' : 'inactive'}`]") {{title(section)}}
            div(v-if="active(section)")
              div(v-for="item in sortBy(section.children, ['frontmatter.order'])")
                router-link(:to="item.path" tag="div" v-if="item.path" :class="{'section__child__active': $page.path == item.path || $route.path == item.path}").section__child {{item.title}}
                router-link(:to="indexFile(item).path" tag="div" v-else-if="indexFile(item)" :class="{'section__child__active': $page.path == (indexFile(item) && indexFile(item).path) || $route.path == (indexFile(item) && indexFile(item).path)}").section__child {{indexFile(item) && indexFile(item).title}}
      //- .footer
      //-   a(href="https://cosmos.network").footer__item
      //-     svg(width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg").footer__item__icon
      //-       path(d="M7 1.5L1.5 7L7 12.5" stroke="#161931" stroke-width="1.5" stroke-linecap="round")
      //-     .footer__item__text Back to Cosmos
</template>

<style lang="stylus" scoped>
.logo
  margin-top 2rem
  font-weight 600

.container
  padding 0 2rem 2rem
  height 100%
  overflow-y scroll
  position relative
  display flex
  flex-direction column
  justify-content space-between
  align-items flex-start

.title
  font-size 0.75rem
  text-transform uppercase
  letter-spacing 0.2em
  color #666
  margin-top 2rem
  margin-bottom .5rem

.section
  font-size 0.875rem
  letter-spacing 0.01em
  line-height 20px
  margin-top 0.75rem
  margin-bottom 0.75rem

  &__child
    margin-top 0.5rem
    margin-bottom 0.5rem
    cursor pointer
    position relative
    padding-left 1.5rem

    &__active
      font-weight 500

      &:before
        content ''
        position absolute
        top 0.25rem
        left 0
        height 1rem
        width 1rem
        background url('./images/bullet-hex-blue.svg') no-repeat top left

  &__title
    font-weight 500
    position relative
    padding-left 1.5rem

  &__active
    &:before
      content ''
      position absolute
      top 0.55rem
      left 0
      height 1rem
      width 1rem
      background url('./images/bullet-dash.svg') no-repeat top left

  &__inactive
    &:before
      content ''
      position absolute
      top 0.25rem
      left 0
      height 1rem
      width 1rem
      background url('./images/bullet-hex-full.svg') no-repeat top left

  &__outbound
    &:before
      content ''
      position absolute
      top 0.25rem
      left 0
      height 1rem
      width 1rem
      background url('./images/icon-outbound.svg') no-repeat top left

.footer
  margin-top 1.5rem
  background-color var(--sidebar-bg)

  &__item
    color #161931
    text-transform uppercase
    font-size 0.875rem
    display flex
    align-items center
    box-shadow inset 0 0 0 2px rgba(140, 145, 177, 0.32)
    padding 0.75rem 1rem
    border-radius 0.25rem
    font-weight 500

    &__icon
      margin-right 1rem
</style>

<script>
import {
  includes,
  isString,
  isPlainObject,
  isArray,
  sortBy,
  last,
  find
} from "lodash";

export default {
  props: ["value"],
  computed: {
    logo() {
      return this.$themeConfig.logo;
    },
    sidebar() {
      return this.value;
      // return [
      //   { title: "Reference", children: this.value },
      //   ...(this.$themeConfig.sidebar || [])
      // ];
      // return this.$themeConfig.sidebar.map(item => {
      //   if (isString(item)) {
      //     return {
      //       title: item,
      //       path: item
      //     };
      //   }
      //   if (isPlainObject(item)) {
      //     return {
      //       title: item.title,
      //       children: item.children
      //     };
      //   }
      //   if (isArray(item)) {
      //     return {
      //       url: item[0],
      //       title: item[1] || item[0]
      //     };
      //   }
      // });
    }
  },
  methods: {
    showSection(section) {
      const index = this.indexFile(section);
      const parent = index && index.frontmatter.parent;
      const order = parent && parent.order;
      return order !== false;
    },
    sortGroup(group) {
      return sortBy(group, section => {
        const index = this.indexFile(section);
        if (index && index.frontmatter.parent)
          return index.frontmatter.parent.order;
      });
    },
    outboundUrl(url) {
      return /^[a-z]+:/i.test(url);
    },
    active(section) {
      return (
        section.children &&
        find(section.children, item => {
          return (
            item.path == this.$page.path ||
            item.path == this.$route.path ||
            (item &&
              item.children &&
              (this.indexFile(item) && this.indexFile(item).path) ==
                this.$page.path)
          );
        })
      );
    },
    url(section) {
      const children = section.children;
      if (!children) return "";
      const index = this.indexFile(section);
      if (index) return index.path;
      if (children[0].path) return children[0].path;
      if (this.indexFile(children[0])) return this.indexFile(children[0]).path;
      return "";
    },
    indexFile(section) {
      if (!section.children) return false;
      return find(section.children, item => {
        if (!item.relativePath) return false;
        const name = last(item.relativePath.split("/")).toLowerCase();
        return name === "readme.md" || name == "index.md";
      });
    },
    title(section) {
      const index = this.indexFile(section);
      if (
        index &&
        index.frontmatter &&
        index.frontmatter.parent &&
        index.frontmatter.parent.title
      ) {
        return index.frontmatter.parent.title;
      } else {
        return index.title;
      }
      // if (index) {
      //   const frontmatter =
      //     index.frontmatter.parent && index.frontmatter.parent.title;
      //   return frontmatter ? frontmatter : index.title;
      // }
      // return section.title;
    },
    sortBy
  }
};
</script>