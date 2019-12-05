<template lang="pug">
  div
    .container
      .search-box
        .search-box__icon
          icon-search(:stroke="searchQuery ? '#66A1FF' : '#aaa'" :fill="searchQuery ? '#66A1FF' : '#aaa'")
        .search-box__input
          input(type="text" autocomplete="off" placeholder="Search" id="search-box-input" ref="search" v-model="searchQuery").search-box__input__input
        .search-box__clear
          icon-circle-cross(v-if="searchQuery && searchQuery.length > 0" @click.native="searchQuery = ''" @keydown.enter="searchQuery = ''" tabindex="1").search-box__clear__icon
        a.search-box__button(@click="$emit('visible', false)" @keydown.enter="$emit('visible', false)" tabindex="1") Cancel
      .results
        .shortcuts(v-if="!searchQuery")
          .shortcuts__h1 Keyboard shortcuts
          .shortcuts__table
            .shortcuts__table__row
              .shortcuts__table__row__keys
                .shortcuts__table__row__keys__item /
              .shortcuts__table__row__desc Open search window
            .shortcuts__table__row
              .shortcuts__table__row__keys
                .shortcuts__table__row__keys__item(style="font-size: .65rem") esc
              .shortcuts__table__row__desc Close search window
            .shortcuts__table__row
              .shortcuts__table__row__keys
                .shortcuts__table__row__keys__item ↵
              .shortcuts__table__row__desc Open highlighted search result
            .shortcuts__table__row
              .shortcuts__table__row__keys
                .shortcuts__table__row__keys__item(style="font-size: .65rem") ▼
                .shortcuts__table__row__keys__item(style="font-size: .65rem") ▲
              .shortcuts__table__row__desc Navigate between search results
        .results__noresults__container(v-if="searchQuery && (searchResults.length <= 0)")
          .results__noresults
            .results__noresults__icon
              icon-search
            .results__noresults__h1 No results for #[strong “{{searchQuery}}”]
            .results__noresults__p
              span Try queries such as #[span.results__noresults__a(@click="searchQuery = 'auth'" @keydown.enter="searchQuery = 'auth'" tabindex="0") auth], #[span.results__noresults__a(@click="searchQuery = 'slashing'" @keydown.enter="searchQuery = 'slashing'" tabindex="0") slashing], or #[span.results__noresults__a(@click="searchQuery = 'staking'" @keydown.enter="searchQuery = 'staking'" tabindex="0") staking].
        .results__item(@keydown.40="focusNext" @keydown.38="focusPrev" tabindex="0" ref="result" v-for="result in searchResults" v-if="searchResults && result.path && searchQuery" @keydown.enter="itemClick(result)" @click="itemClick(result)")
          .results__item__title #[span(v-if="itemPath(result)") {{itemPath(result)}} /] {{result.title}}
          .results__item__h2(v-if="resultHeader(result)") {{resultHeader(result).join(", ")}}
          .results__item__desc(v-if="result.frontmatter.synopsis && md(result.frontmatter.synopsis)" v-html="result.frontmatter.synopsis && md(result.frontmatter.synopsis)")
</template>

<style lang="stylus" scoped>
.shortcuts
  display flex
  justify-content center
  flex-direction column

  &__h1
    text-align center
    color rgba(22, 25, 49, 0.65)
    text-transform uppercase
    letter-spacing 0.2em
    font-size .75rem
    margin-top 4rem
    margin-bottom 2rem

  &__table

    &__row
      display grid
      grid-template-columns 3fr 7fr
      gap 1.5rem
      align-items center
      margin-top .5rem
      margin-bottom .5rem

      &__keys
        display flex
        justify-content flex-end

        &__item
          color #46509F
          background-color rgba(176, 180, 207, 0.2)
          border 1px solid rgba(176, 180, 207, 0.09)
          border-radius .25rem
          font-size .8125rem
          width 1.5rem
          height 1.5rem
          display flex
          align-items center
          justify-content center
          margin 2px

      &__desc
        color rgba(22, 25, 49, 0.65)

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

    &__h2
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
      white-space nowrap
      overflow hidden
      position relative

      &:after
        content "..."
        background linear-gradient(to right, rgba(248, 249, 252, .5) 0%, rgba(248, 249, 252, 1) 30%)
        height 1em
        width 1em
        padding-bottom .25rem
        text-align right
        position absolute
        top 0
        right 0
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
      if (becomesVisible && search) {
        search.select();
      }
    }
  },
  mounted() {
    this.$refs.search.addEventListener("keydown", e => {
      if (e.keyCode == 27) {
        this.$emit("visible", false);
        return;
      }
      if (e.keyCode == 40) {
        this.$refs.result[0].focus();
        e.preventDefault();
        return;
      }
    });
    const documents = this.$site.pages;
    this.lunr = lunr(function() {
      this.ref("key");
      this.field("title");
      this.field("headers");
      this.field("synopsis");
      this.metadataWhitelist = ["position"];
      documents.forEach(function(doc) {
        this.add({
          key: doc.key,
          title: doc.title,
          headers: doc.headers && doc.headers.map(h => h.title).join(" "),
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
      if (item.path != this.$page.path) {
        const header = this.resultHeader(item);
        const fragment =
          header && header[0]
            ? "#" +
              header[0]
                .split(" ")
                .map(h => h.toLowerCase())
                .join("-")
            : "";
        this.$router.push(`${item.path}${fragment}`);
      }
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
      return path
        .map(p => p.title)
        .slice(0, -1)
        .pop();
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
    },
    resultHeader(result) {
      if (!result.headers) return;
      return result.headers
        .map(h => {
          if (h.title.match(new RegExp(this.searchQuery, "gi"))) {
            return h.title;
          }
        })
        .filter(e => e);
    }
  }
};
</script>