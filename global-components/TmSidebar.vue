<template lang="pug">
  div
    .container
      .wrapper
        .main
          router-link(to="/")
            img(:src="$withBase(logo)" v-if="logo")
            div(v-else).logo Documentation
          tm-search(v-model="search.query")
          div(v-if="search.query")
            .title Search results
            .section(v-for="item in searchResults")
              .section__title
                router-link(:to="item.path" v-if="item.path && item.title" tag="a").section__inactive {{item.title}}
          div(v-for="item in value")
            .title {{item.title}}
            client-only
              tm-sidebar-tree(:value="item.children" v-if="item.children" :tree="tree" :level="0").section
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
        // background url('./images/bullet-hex-blue.svg') no-repeat top left
        fill red

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
      // background url('./images/bullet-dash.svg') no-repeat top left

  &__inactive
    &:before
      content ''
      position absolute
      top 0.25rem
      left 0
      height 1rem
      width 1rem
      // background url('./images/bullet-hex-full.svg') no-repeat top left

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
  display grid
  grid-auto-flow column
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

    &__icon
      height 30px
      margin-bottom .25rem

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
  props: ["value", "tree"],
  data: function() {
    return {
      search: {
        query: null
      },
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
          url: "https://tendermint.com/docs/",
          color: "#00BB00"
        }
      ]
    };
  },
  computed: {
    searchResults() {
      return this.$site.pages.filter(page => {
        const headers = page.headers ? page.headers.map(h => h.title) : [];
        const title = page.title;
        return (
          title &&
          [title, ...headers]
            .join(" ")
            .toLowerCase()
            .match(this.search.query.toLowerCase())
        );
      });
    },
    logo() {
      return this.$themeConfig.logo;
    },
    sidebar() {
      return this.value;
    }
  }
};
</script>