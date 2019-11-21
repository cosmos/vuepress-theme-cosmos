<template lang="pug">
  div
    .container
      .search-box
        .search-box__icon
          icon-search
        .search-box__input
          input(type="text" placeholder="Search" id="search-box-input" v-model="searchQuery").search-box__input__input
        .search-box__clear
          icon-circle-cross(v-if="searchQuery && searchQuery.length > 0" @click.native="searchQuery = ''").search-box__clear__icon
        a.search-box__button(@click="$emit('visible', false)") Cancel
      .results
        .results__item(v-for="result in searchResults" v-if="searchResults && result.path" @click="itemClick(result)")
          .results__item__title {{result.title}}
          .results__item__path
            .results__item__path__item(v-for="item in itemPath(result)") {{item}}
          .results__item__desc(v-html="result.frontmatter.synopsis && md(result.frontmatter.synopsis)")
</template>

<style lang="stylus" scoped>
.container
  height 100vh
  overflow-y scroll
  -webkit-overflow-scrolling touch

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
      padding-top 1.5rem
      padding-bottom 1.5rem

      &::-webkit-input-placeholder
        color rgba(14, 33, 37, 0.26)

  &__clear

    &__icon
      cursor pointer
      fill rgba(0,0,0,.15)
      margin-top .25rem

      &:hover
        fill rgba(0,0,0,.25)
  
  &__button
    text-transform uppercase
    color var(--accent-color)
    font-weight 500
    cursor pointer

.results

  &__item
    padding 1rem 2rem
    cursor pointer

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
    }
  },
  mounted() {
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
      this.$router.push(item.path);
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
    }
  }
};
</script>