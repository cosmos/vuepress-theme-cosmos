<template lang="pug">
  div
    .container
      .main
        router-link(to="/").logo__container
          .logo
            .logo__img
              component(:is="`logo-${$themeConfig.label}`")
            .logo__text {{$site.title || 'Documentation'}}
        .items
          div(v-for="item in value").sidebar
            .title {{item.title}}
            client-only
              tm-sidebar-tree(:value="item.children" v-if="item.children" :tree="tree" :level="0").section
        .footer
          a(:href="product.url" target="_blank" v-for="product in products" :style="{'--color': product.color}" v-if="$themeConfig.label != product.label").footer__item
            component(:is="`tm-logo-${product.label}`").footer__item__icon
            div.footer__item__title {{product.name}}
</template>

<style lang="stylus" scoped>
.logo
  padding 1rem 2rem
  display flex
  align-items center

  &__img
    width 40px
    height 40px
    margin-right 0.75rem

  &__text
    font-weight 500

.logo__container
  position sticky
  display block
  background white
  z-index 10000
  top 0

  &:after
    position absolute
    content ''
    top 100%
    left 0
    right 0
    background linear-gradient(to bottom, white, rgba(255, 255, 255, 0))
    height 25px

.sidebar
  padding-left 2rem
  padding-right 2rem
  overflow-x hidden

.items
  padding-bottom 125px

.title
  font-size 0.75rem
  text-transform uppercase
  letter-spacing 0.2em
  color #666
  margin-top 2rem
  margin-bottom 0.5rem

.footer
  height var(--sidebar-footer-height)
  padding-top 1rem
  padding-bottom 1rem
  background-color var(--sidebar-bg)
  position fixed
  bottom 0
  width var(--sidebar-width)
  display grid
  grid-auto-flow column
  padding-left .75rem
  padding-right 0.75rem
  align-items center
  z-index 200
  grid-auto-columns 1fr

  &:before
    content ''
    position absolute
    top -50px
    left 0
    right 0
    bottom 100%
    background linear-gradient(to top, white, rgba(255, 255, 255, 0))
    pointer-events none

  &__item
    // flex-grow 1
    padding-left 0.75rem
    padding-right 0.75rem
    display flex
    align-items center
    flex-direction column
    fill rgba(51, 54, 74, 0.4)

    &__icon
      height 32px
      margin-bottom 0.25rem

    &:hover
      fill var(--color)

    &__title
      text-align center
      font-size 0.6875rem
      line-height 14px

@media screen and (max-width: 752px)
  .logo
    display none
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
        {
          label: "hub",
          name: "Cosmos Hub",
          url: "https://hub.cosmos.network/",
          color: "#BA3FD9"
        },
        {
          label: "ibc",
          name: "IBC Protocol",
          url: "https://github.com/cosmos/ics",
          color: "#E6900A"
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
