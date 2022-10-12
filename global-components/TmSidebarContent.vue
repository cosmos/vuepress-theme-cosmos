<template lang="pug">
  div(style="position: relative")
    .tags-filter(v-if="$themeConfig.sidebar.filterByTagEnabled")
      .tags-filter__header
        .tags-filter__select(@click="onFilterSelectClick")
          icon-arrow.tags-filter__select__arrow(type="bottom" :style="{'--fill-color': showFilters ? 'var(--color-text-strong)' : 'var(--semi-transparent-color-3)'}" :fill="'var(--fill-color)'" :class="showFilters ? 'tags-filter__select__arrow__expanded' : 'tags-filter__select__arrow__collapsed'")
          .tags-filter__select__label(:class="showFilters ? 'tags-filter__select__label__expanded' : 'tags-filter__select__label__collapsed'") {{ filterTags.length || ''}} {{ filterTags.length == 1 ? 'Filter' : 'Filters'}}
        .tags-filter__clear(v-if="showFilters && filterTags.length > 0" @click="onFilterClearClick") clear

      .tags-filter__wrapper(v-if="$themeConfig.tags && showFilters")
        .tag-item(
          v-for="(tag, key) in $themeConfig.tags"
          v-bind:key="key"
          v-on:click="onTagClick(key)"
        )
          tag(
            :color="tag.color"
            :label="tag.label"
            :active="isTagActive(key)"
            :bright="tag.isBright"
          )

    .container
      .items(:class="[`footer__compact__${!!(compact === true)}`]")
        div(v-for="item in value.sort((a, b) => a.order - b.order)" v-if="isVisible(item.title)").sidebar
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
  margin-top 40px
  padding-right 24px

  &__clear
    cursor pointer
    color var(--semi-transparent-color-3)
    &:hover
      color var(--color-text-strong)

  &__header
    display flex
    justify-content space-between
    flex-grow 1

  &__wrapper
    display flex
    flex-wrap wrap
    margin-top var(--spacing-6)

  &__select
    cursor pointer
    display flex
    flex-grow 1

    &:hover
      .tags-filter__select__label
        color var(--color-text-strong)

    &__label
      &__expanded
        color var(--color-text-strong)
      &__collapsed
        color var(--semi-transparent-color-3)


    &__arrow
      width 15px
      height 15px
      margin-block auto
      margin-right var(--spacing-4)

      &__expanded 
        transform rotate(180deg)
        -webkit-transform rotate(180deg)
        -ms-transform rotate(180deg)
        transition transform 0.2s linear

      &__collapsed
        transform rotate(0deg)
        -webkit-transform rotate(0deg)
        -ms-transform rotate(0deg)
        transition transform 0.2s linear

  .tag-item
    margin-right 8px
    margin-block auto
    margin-bottom 8px
    cursor pointer

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
      filterTags: [],
      showFilters: false
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
  mounted() {
    const storedTags = JSON.parse(localStorage?.getItem("vuepress-theme-cosmos-sidebar-filter-tags"));
    if (storedTags) {
      this.filterTags = storedTags;
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
    updateFilterTags() {
      localStorage?.setItem("vuepress-theme-cosmos-sidebar-filter-tags", JSON.stringify(this.filterTags));
    },
    onTagClick(key) {
      if (this.isTagActive(key)) {
        const index = this.filterTags.indexOf(key)
        if (index !== -1) this.filterTags.splice(index, 1);
      } else {
        this.filterTags.push(key);
      }
      this.updateFilterTags();
    },
    onFilterSelectClick() {
      this.showFilters = !this.showFilters;
    },
    onFilterClearClick() {
      this.filterTags = [];
      this.updateFilterTags();
    }
  }
};
</script>
