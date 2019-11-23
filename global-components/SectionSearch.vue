<template lang="pug">
  div
    .container
      .search-box
        .search-box__icon
          icon-search
        .search-box__input
          input(type="text" placeholder="Search" id="search-box-input" ref="search" v-model="searchQuery").search-box__input__input
        .search-box__clear
          icon-circle-cross(v-if="searchQuery && searchQuery.length > 0" @click.native="searchQuery = ''" @keydown.enter="searchQuery = ''" tabindex="1").search-box__clear__icon
        a.search-box__button(@click="$emit('visible', false)" @keydown.enter="$emit('visible', false)" tabindex="1") Cancel
      .results
        .results__noresults__container(v-if="searchQuery && (searchResults.length <= 0)")
          .results__noresults
            .results__noresults__icon
              icon-search
            .results__noresults__h1 No results for #[strong “{{searchQuery}}”]
            .results__noresults__p
              span Try queries such as #[span.results__noresults__a(@click="searchQuery = 'auth'" @keydown.enter="searchQuery = 'auth'" tabindex="0") auth], #[span.results__noresults__a(@click="searchQuery = 'slashing'" @keydown.enter="searchQuery = 'slashing'" tabindex="0") slashing], or #[span.results__noresults__a(@click="searchQuery = 'staking'" @keydown.enter="searchQuery = 'staking'" tabindex="0") staking].
        .results__item(@keydown.40="focusNext" @keydown.38="focusPrev" tabindex="0" ref="result" v-for="result in searchResults" v-if="searchResults && result.path && searchQuery" @keydown.enter="itemClick(result)" @click="itemClick(result)")
          .results__item__title {{result.title}}
          .results__item__path
            .results__item__path__item(v-for="item in itemPath(result)") {{item}}
          .results__item__desc(v-html="result.frontmatter.synopsis && md(result.frontmatter.synopsis)")
</template>

<style lang="stylus" scoped>
strong
  font-weight 500

.container
  height 100vh
  overflow-y scroll
  -webkit-overflow-scrolling touch
  display flex
  flex-direction column
  background-color #F8F9FC

.search-box
  width 100%
  display grid
  grid-auto-flow column
  align-items center
  box-shadow inset 0 -1px 0 0 rgba(176, 180, 207, 0.2)
  padding-left 2rem
  padding-right 2rem
  grid-template-columns 1.5rem 1fr 1.25rem
  gap 1rem

  &__input

    &__input
      border none
      background none
      outline none
      font-size 1.25rem
      width 100%
      padding 1.5rem .5rem

      &::-webkit-input-placeholder
        color rgba(14, 33, 37, 0.26)

  &__clear

    &__icon
      cursor pointer
      fill rgba(0,0,0,.15)
      margin-top .25rem

      &:hover, &:focus
        fill rgba(0,0,0,.25)
        outline none
  
  &__button
    text-transform uppercase
    color var(--accent-color)
    font-weight 500
    cursor pointer

.results
  overflow-y scroll
  padding-bottom 3rem
  display flex
  flex-direction column
  flex-grow 1

  &__noresults__container
    height 100%
    display flex
    flex-direction column
    align-items center
    justify-content center
    flex-grow 1

  &__noresults
    display flex
    flex-direction column
    align-items center
    justify-content center

    &__icon
      max-width 80px
      margin-bottom 2rem

    &__h1
      color rgba(22, 25, 49, 0.65)
      font-size 1.5rem
      margin-bottom 1rem

    &__p
      color rgba(22, 25, 49, 0.65)

    &__a
      cursor pointer
      color var(--accent-color)

  &__item
    padding 1rem 2rem
    cursor pointer

    &:focus
      outline none
      background-color white

    &__title
      color var(--accent-color)

    &__path
      font-size .75rem
      opacity .75
      margin-top .25rem
      margin-bottom .25rem
      
      &__item
        display inline-block

        &:after
          content ">"
          margin-left .25rem
          margin-right .25rem

        &:last-child

          &:after
            content ""

    &__desc
      text-overflow ellipsis
      white-space nowrap
      overflow hidden
</style>

<script>
import lunr from "lunr";
import { find, last } from "lodash";

export default {
  props: ["visible"],
  data: function() {
    return {
      lunr: null,
      searchResults: null,
      searchQuery: null
    };
  },
  watch: {
    searchQuery: function(e) {
      this.search(e);
    },
    visible(becomesVisible) {
      const search = this.$refs.search;
      if (becomesVisible && search) search.focus();
    }
  },
  mounted() {
    this.$refs.search.addEventListener("keydown", e => {
      if (e.keyCode == 27) {
        this.$emit("visible", false);
        return;
      }
      if (e.keyCode == 40) {
        console.log(this.$refs.result[0]);
        this.$refs.result[0].focus();
        return;
      }
    });
    // Promise.all([
    //   import(
    //     /* webpackChunkName: "docsearch" */ "docsearch.js/dist/cdn/docsearch.min.js"
    //   ),
    //   import(
    //     /* webpackChunkName: "docsearch" */ "docsearch.js/dist/cdn/docsearch.min.css"
    //   )
    // ]).then(([docsearch]) => {
    //   docsearch = docsearch.default;
    //   docsearch(
    //     Object.assign(
    //       {},
    //       {
    //         apiKey: "59f0e2deb984aa9cdf2b3a5fd24ac501",
    //         indexName: "tendermint"
    //       },
    //       {
    //         inputSelector: "#search-box-input",
    //         handleSelected: (input, event, suggestion) => {
    //           const { pathname, hash } = new URL(suggestion.url);
    //           this.$router.push(`${pathname}${hash}`);
    //         }
    //       }
    //     )
    //   );
    // });
    const documents = this.$site.pages;
    this.lunr = lunr(function() {
      this.ref("key");
      this.field("title");
      this.field("synopsis");
      this.metadataWhitelist = ["position"];
      documents.forEach(function(doc) {
        this.add({
          key: doc.key,
          title: doc.title,
          synopsis: doc.frontmatter.synopsis
        });
      }, this);
    });
  },
  methods: {
    search(e) {
      this.searchResults = this.lunr
        .search(e)
        .map(item => find(this.$site.pages, { key: item.ref }));
    },
    itemByKey(key) {
      return find(this.$site.pages, { key });
    },
    itemSynopsis(item) {
      return (
        this.itemByKey(item.ref) &&
        this.itemByKey(item.ref).frontmatter &&
        this.itemByKey(item.ref).frontmatter.synopsis &&
        this.md(this.itemByKey(item.ref).frontmatter.synopsis)
      );
    },
    itemClick(item) {
      this.$emit("visible", false);
      if (item.path != this.$page.path) this.$router.push(item.path);
    },
    itemPath(sourceItem) {
      let path = sourceItem.path
        .split("/")
        .filter(item => item !== "")
        .map((currentValue, index, array) => {
          let path = array.slice(0, index + 1).join("/");
          return "/" + path;
        })
        .map(item => {
          return /\.html$/.test(item) ? item : `${item}/`;
        });
      path = path.map(item => {
        const found = find(this.$site.pages, page => {
          return page.regularPath === item;
        });
        const noIndex = {
          title: last(item.split("/").filter(e => e !== "")),
          path: ""
        };
        return found ? found : noIndex;
      });
      return path.map(p => p.title).slice(0, -1);
    },
    focusNext(e) {
      const next = e.target.nextSibling;
      if (next && next.focus) next.focus();
      e.preventDefault();
    },
    focusPrev(e) {
      const prev = e.target.previousSibling;
      if (prev && prev.focus) prev.focus();
      e.preventDefault();
    }
  }
};
</script>