<template lang="pug">
  div(style="position: relative")
    .tags-filter
      .tag-item(
        v-if="$themeConfig.tags" 
        v-for="(tag, key) in $themeConfig.tags" 
        v-bind:key="key" 
        v-bind:style="isTagActive(key) ? {'background': tag.color || ''} : {}"
        v-on:click="onTagClick(key)"
        v-bind:class="isTagActive(key) ? 'tag-item__active' : ''"
      ) {{tag.label || ''}}

    .container
      .items(:class="[`footer__compact__${!!(compact === true)}`]")
        div(v-for="item in value" v-if="isVisible(item.title)").sidebar
          .tm-overline.tm-rf-1.tm-lh-title.tm-medium.tm-muted.title.mb-4 {{item.title}}
          client-only
            tm-sidebar-tree(:value="item.children.sort((a, b) => a.order - b.order)" v-if="item.children" :tree="tree" :level="0" :filterTags="filterTags").section
        .sidebar.version
          tm-select-version
      .footer(:class="[`footer__compact__${!!(compact === true)}`]" v-if="!$themeConfig.custom && !$themeConfig.sidebar.hideProducts")
        a(:href="product.url" target="_blank" rel="noreferrer noopener" v-for="product in products" :style="{'--color': product.color}" v-if="$themeConfig.label != product.label").footer__item
          component(:is="`tm-logo-${product.label}`").footer__item__icon
          .footer__item__title(v-html="md(product.name)")
</template>

<style lang="stylus" scoped>
.tags-filter
  display flex
  margin-top 40px
  flex-wrap wrap

  .tag-item
    border-radius 8px
    padding 8px
    flex-shrink 0
    height fit-content
    margin-right 8px
    margin-block auto
    margin-bottom 8px
    border 1px solid var(--semi-transparent-color-3)
    background none
    color var(--semi-transparent-color-3)
    font-size var(--font-size--1)
    cursor pointer

    &__active
      border none !important
      color white !important

    &:hover
      border 1px solid var(--color-text-strong)
      color var(--color-text-strong, black)


.container
  display flex
  flex-direction column
  height 100%

.logo
  padding 1.5rem 2rem
  display flex
  align-items center

  &:active
    outline none

  &__img
    width 2.5rem
    height 2.5rem
    margin-right 0.75rem

    &__custom
      width 100%
      height 2.5rem
      margin-right 0.75rem

      img
        max-width 100%
        max-height 100%

  &__text
    font-weight 600

.logo__container
  position sticky
  display block
  background var(--background-color-primary)
  z-index 1
  top 0

  &:after
    position absolute
    content ''
    top 100%
    left 0
    right 0
    background linear-gradient(to bottom, var(--background-color-primary), var(--background-color-primary))
    height 25px

.sidebar
  padding-right 24px
  margin-top 64px

.version
  margin-top 2rem
  display none

.items
  flex-grow 1
  padding-bottom 2rem

  &.footer__compact__true
    flex-grow 0

.title
  color var(--semi-transparent-color-3)

.footer.footer__compact__true
  padding-bottom 150px
  bottom initial
  margin-top 0
  position relative
  flex-grow 1

.footer
  height var(--sidebar-footer-height)
  padding-top 1rem
  padding-bottom 1rem
  background-color var(--sidebar-bg)
  position sticky
  bottom 0
  width 100%
  display grid
  grid-auto-flow column
  padding-right 24px
  align-items center
  grid-auto-columns 1fr

  &:before
    content ''
    position absolute
    top -50px
    left 0
    right 0
    bottom 100%
    background linear-gradient(to top, var(--background-color-primary), transparent)
    pointer-events none

  &__item
    align-self flex-start
    display flex
    align-items center
    flex-direction column
    fill var(--color-text)

    &__icon
      height 32px
      margin-bottom 0.25rem

    &:hover
      fill var(--color)

    &__title
      text-align center
      font-size 0.6875rem
      line-height 0.875rem

@media screen and (max-width: 1138px)
  .version
    display block
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
  omit,
} from "lodash";
import { isIDAMode } from "../utils/helpers";

export default {
  props: ["value", "tree", "compact"],
  data: function() {
    return {
      search: {
        query: null,
      },
      products: [
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
          url: "https://ibcprotocol.org",
          color: "#E6900A",
        },
        {
          label: "core",
          name: "Tendermint<br>Core",
          url: "https://docs.tendermint.com/",
          color: "#00BB00",
        },
      ],
      filterTags: []
    };
  },
  computed: {
    searchResults() {
      return this.$site.pages.filter((page) => {
        const headers = page.headers ? page.headers.map((h) => h.title) : [];
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
  },
  methods: {
    isVisible(title) {
      let visible = true;

      if (typeof window !== 'undefined') {
        visible = !(this.$themeConfig.sidebar.auto == false && title === '');
      }

      return visible;
    },
    isTagActive(key) {
      return this.filterTags.includes(key);
    },
    onTagClick(key) {
      if (this.isTagActive(key)) {
        const index = this.filterTags.indexOf(key)
        if (index !== -1) this.filterTags.splice(index, 1);
      } else {
        this.filterTags.push(key);
      }
    }
  }
};
</script>
