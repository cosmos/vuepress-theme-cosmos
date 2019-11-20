<template lang="pug">
  div
    .container(@scroll.stop="(e) => e.preventDefault()")
      .search-box
        .search-box__icon
          icon-search
        .search-box__input
          input(type="text" placeholder="Search" @input="search($event)").search-box__input__input
        a.search-box__button(@click="$emit('visible', false)") Cancel
      .search__results
        .search__result__item(v-for="result in searchResults" v-if="searchResults" @click="itemClick(result)")
          .search__result__item__title {{itemByKey(result.ref).title}}
          .search__result__item__desc(v-html="itemSynopsis(result)")
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
  padding 1.5rem 2rem
  grid-template-columns 1.5rem 1fr
  gap 1rem

  &__input

    &__input
      border none
      background none
      outline none
      font-size 1.25rem
      width 100%

      &::-webkit-input-placeholder
        color rgba(14, 33, 37, 0.26)
  
  &__button
    text-transform uppercase
    color var(--accent-color)
    font-weight 500
    cursor pointer

.search__result

  &__item
    padding 1rem 2rem
    cursor pointer

    &__title
      color var(--accent-color)

    &__desc
      text-overflow ellipsis
      white-space nowrap
      overflow hidden
</style>

<script>
import lunr from "lunr";
import { find } from "lodash";

export default {
  data: function() {
    return {
      lunr: null,
      searchResults: null
    };
  },
  mounted() {
    console.log("mount");
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
      this.searchResults = this.lunr.search(e.target.value);
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
      this.$router.push(this.itemByKey(item.ref).path);
    }
  }
};
</script>