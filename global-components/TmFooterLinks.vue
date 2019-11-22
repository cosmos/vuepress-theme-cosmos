<template lang="pug">
  div
    .links
        .links__container(style="grid-column-start: 1" v-if="$page.frontmatter.prev || (linkPrevNext && linkPrevNext.prev && linkPrevNext.prev.frontmatter && linkPrevNext.prev.frontmatter.order !== false)")
          .links__label Previous
          router-link.links__item(:to="$page.frontmatter.prev || linkPrevNext.prev.regularPath")
            .links__item__title {{$page.frontmatter.prev || linkPrevNext.prev.title}}
            .links__item__desc(v-if="linkPrevNext.prev.frontmatter.synopsis") {{linkPrevNext.prev.frontmatter.synopsis}}
        .links__container(style="grid-column-start: 2" v-if="$page.frontmatter.next || (linkPrevNext && linkPrevNext.next && linkPrevNext.next.frontmatter && linkPrevNext.next.frontmatter.order !== false)")
          .links__label Next
          router-link.links__item(:to="$page.frontmatter.next || linkPrevNext.next.regularPath")
            .links__item__title {{$page.frontmatter.next || linkPrevNext.next.title}}
            .links__item__desc(v-if="linkPrevNext.next.frontmatter.synopsis") {{linkPrevNext.next.frontmatter.synopsis}}
</template>

<style lang="stylus" scoped>
.links
  background white
  display grid
  grid-template-columns 50% 50%
  gap 1rem
  padding-bottom 2rem

  &__container
    display flex
    flex-direction column

  &__item
    margin-top 1rem
    padding 2rem
    box-shadow 0px 2px 4px rgba(22, 25, 49, 0.05), 0px 0px 1px rgba(22, 25, 49, 0.2), 0px 0.5px 0px rgba(22, 25, 49, 0.05)
    border-radius .5rem
    display block
    flex-grow 1
    overflow-x hidden

    &__title
      font-weight 500
      font-size 1.25rem
    
    &__desc
      color rgba(22, 25, 49, 0.65)
      margin-top .5rem
      font-size .875rem
      line-height 20px

  &__label
    color rgba(22, 25, 49, 0.9)
    text-transform uppercase
    font-size .75rem
    letter-spacing .2rem

</style>

<script>
import { findIndex } from "lodash";

export default {
  props: ["tree"],
  computed: {
    linkPrevNext() {
      if (!this.tree) return;
      let result = {};
      const search = tree => {
        return tree.forEach(item => {
          const children = item.children;
          if (children) {
            const index = findIndex(children, ["regularPath", this.$page.path]);
            if (index >= 0 && children[index - 1]) {
              result.prev = children[index - 1];
            }
            if (index >= 0 && children[index + 1]) {
              result.next = children[index + 1];
            }
            return search(item.children);
          }
        });
      };
      search(this.tree);
      return result;
    }
  }
};
</script>