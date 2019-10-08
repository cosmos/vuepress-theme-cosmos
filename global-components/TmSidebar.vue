<template lang="pug">
  div
    .container
      .wrapper
        .main
          router-link(to="/")
            img(:src="$withBase(logo)" v-if="logo")
            div(v-else).logo Documentation
          tm-search
          div(v-for="group in sidebar")
            .title {{group.title}}
            .section(v-for="section in sortGroup(group.children)" v-if="showSection(section)")
              .section__title
                a.section__outbound(v-if="outboundUrl(section.path)" :href="section.path" target="_blank") {{section.title}}
                a.section__outbound(v-if="section.path && section.static" :href="section.path" target="_blank") {{section.title}}
                router-link(v-else :to="url(section)" :class="[`section__${active(section) ? 'active' : 'inactive'}`]") {{title(section)}}
              div(v-if="active(section)")
                div(v-for="item in showChildren(section.children)")
                  router-link(:to="item.path" tag="div" v-if="item.path" :class="{'section__child__active': $page.path == item.path || $route.path == item.path}").section__child {{item.title}}
                  router-link(:to="indexFile(item).path" tag="div" v-else-if="indexFile(item)" :class="{'section__child__active': $page.path == (indexFile(item) && indexFile(item).path) || $route.path == (indexFile(item) && indexFile(item).path)}").section__child {{indexFile(item) && indexFile(item).title}}
        .footer
          a(:href="product.url" target="_blank" v-for="product in products" :style="{'--color': product.color}" v-if="$themeConfig.label != product.label").footer__item
            component(:is="`tm-logo-${product.label}`").footer__item__icon
            div.footer__item__title {{product.name}}
</template>

<style lang="stylus" scoped>
.main
  padding 0 2rem 2rem

.logo
  margin-top 2rem
  font-weight 600

.container
  height 100vh
  position relative

.wrapper
  height calc(100vh - var(--sidebar-footer-height))
  position relative
  overflow-y scroll
  background linear-gradient(rgba(255,255,255,0), var(--sidebar-bg) 70%) 0 100%, linear-gradient(rgba(0,0,0,0), rgba(0,0,0,.05)) 0 100%
  background-repeat no-repeat
  background-size 100% 40px, 100% 14px
  background-attachment local, scroll

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
  height var(--sidebar-footer-height)
  overflow-x scroll
  padding-top 1rem
  padding-bottom 1rem
  background-color var(--sidebar-bg)
  position fixed
  bottom 0
  width var(--sidebar-width)
  display flex
  padding-left .75rem
  padding-right .75rem
  align-items center
  overflow-y hidden

  &__item
    flex-grow 1
    padding-left 1rem
    padding-right 1rem
    display flex
    align-items center
    flex-direction column
    fill rgba(14, 33, 37, 0.26)

    &:hover
      fill var(--color)

    &__title
      text-align center
      font-size .625rem
</style>

<script>
import {
  includes,
  isString,
  isPlainObject,
  isArray,
  sortBy,
  last,
  find,
  omit
} from "lodash";

export default {
  props: ["value"],
  data: function() {
    return {
      products: [
        {
          label: "sdk",
          name: "Cosmos SDK",
          url: "https://cosmos.network/docs/",
          color: "#5064FB"
        },
        // {
        //   label: "ibc",
        //   name: "IBC Protocol",
        //   url: "https://cosmos.network/docs/spec/ibc/",
        //   color: "#E6900A"
        // },
        {
          label: "hub",
          name: "Cosmos Hub",
          url: "https://hub.cosmos.network/",
          color: "#BA3FD9"
        },
        {
          label: "core",
          name: "Tendermint Core",
          url: "https://cosmos.network/docs/spec/ibc/",
          color: "#00BB00"
        }
      ]
    };
  },
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
    showChildren(childrenList) {
      const children = childrenList.filter(child => {
        if (child.frontmatter) return child.frontmatter.order !== false;
        if (child.children) return true;
      });
      return sortBy(children, ["frontmatter.order"]);
    },
    showSection(section) {
      if (section.path) return section.path;
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
      if (section.path) return section.path;
      const children = section.children;
      if (!children) return "";
      const index = this.indexFile(section);
      if (index && index.frontmatter.order != false) return index.path;
      const childrenSorted = sortBy(omit(children, this.indexFile(children)), [
        "frontmatter.order"
      ]).filter(child => child.frontmatter && child.frontmatter.order != false);
      if (childrenSorted[0] && childrenSorted[0].path)
        return childrenSorted[0].path;
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
      // if (
      //   index &&
      //   index.frontmatter &&
      //   index.frontmatter.parent &&
      //   index.frontmatter.parent.title
      // ) {
      //   return index.frontmatter.parent.title;
      // } else {
      //   return section.title;
      // }
      if (index) {
        const frontmatter =
          index.frontmatter.parent && index.frontmatter.parent.title;
        return frontmatter ? frontmatter : index.title;
      }
      return section.title;
    },
    sortBy
  }
};
</script>