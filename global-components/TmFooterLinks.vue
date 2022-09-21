<template lang="pug">
  div
    .links
      .links__wrapper.links__wrapper__previous
        .tm-overline.tm-rf-1.tm-lh-title.tm-medium.tm-muted(v-if="$page.frontmatter.prev || (linkPrevNext && linkPrevNext.prev && ((linkPrevNext.prev.frontmatter && linkPrevNext.prev.frontmatter.order !== false) || linkPrevNext.prev.path))") previous
        .links__content(v-if="$page.frontmatter.prev || (linkPrevNext && linkPrevNext.prev && ((linkPrevNext.prev.frontmatter && linkPrevNext.prev.frontmatter.order !== false) || linkPrevNext.prev.path))")
          router-link.links__item(:to="$page.frontmatter.prev || linkPrevNext.prev.regularPath || linkPrevNext.prev.path")
            .links__item__icon.links__item__icon__previous
              icon-arrow(type="right")
            h5 {{$page.frontmatter.prev || linkPrevNext.prev.title}}
      .links__wrapper
        .tm-overline.tm-rf-1.tm-lh-title.tm-medium.tm-muted(v-if="$page.frontmatter.next || (linkPrevNext && linkPrevNext.next && ((linkPrevNext.next.frontmatter && linkPrevNext.next.frontmatter.order !== false) || linkPrevNext.next.path))") up next
        .links__content(v-if="$page.frontmatter.next || (linkPrevNext && linkPrevNext.next && ((linkPrevNext.next.frontmatter && linkPrevNext.next.frontmatter.order !== false) || linkPrevNext.next.path))")
          router-link.links__item(:to="$page.frontmatter.next || linkPrevNext.next.regularPath || linkPrevNext.next.path")
            h5 {{$page.frontmatter.next || linkPrevNext.next.title}}
            .links__item__icon
              icon-arrow(type="right")
</template>

<style lang="stylus" scoped>
.links
  display flex

  &__wrapper
    display flex
    flex-direction column
    width 100%
    margin-bottom 2rem
    text-align right
    justify-content space-between

    &:first-child
      margin-right 32px

    &__previous 
      text-align left

  &__content
    width 100%
    height 100%
    display flex
    flex-direction column

  &__item
    height 100%
    margin-top 1rem
    padding-inline 24px
    padding-block 48px
    background var(--background-color-secondary)
    border-radius 8px
    display flex
    align-items: center
    justify-content space-between
    transition box-shadow 0.25s ease-out, transform 0.25s ease-out, opacity 0.4s ease-out

    h5
      width 100%

    &:hover:not(:active)
      transform translateY(-2px)
      transition-duration 0.1s

    &__icon
      margin-block auto
      margin-left 32px
      width 20px
      height 20px

      &__previous
        transform rotate(180deg)
        margin-right 32px
        margin-left 0px

@media screen and (max-width: 480px)
  .links
    flex-direction column


</style>

<script>
import { findIndex, find } from "lodash";
import { isIDAMode } from "../utils/helpers";

export default {
  props: ["tree"],
  methods: {
    shorten(string) {
      let str = string.split(" ");
      str =
        str.length > 20 ? str.slice(0, 20).join(" ") + "..." : str.join(" ");
      return this.md(str);
    },
    findNotConsecutiveLinks(window, list, i) {
      if (!window.prev) {
        const prevItem = list[i - 1];
        if (prevItem?.children) {
          window.prev = prevItem.children[prevItem.children.length - 1];
        } else if (prevItem?.path) {
          window.prev = prevItem;
        }
      }
      if (!window.next) {
        const nextItem = list[i + 1];
        if (nextItem?.children) {
          window.next = nextItem.children[0];
        } else if (nextItem?.path) {
          window.next = nextItem;
        }
      }
      return window;
    },
    getPrevNextFromConfig(list) {
      let index = findIndex(list, ["path", this.$page.path]);

      if (index < 0) { // not found yet
        for (let i = 0; i < list.length; i++) {
          if (list[i].children) {
            let window = this.getPrevNextFromConfig(list[i].children);
            if (window?.current) {
              return this.findNotConsecutiveLinks(window, list, i);
            }
          }
        }
      }

      return {
        prev: list[index - 1] || null,
        current: list[index],
        next: list[index + 1] || null
      }
    },
  },
  computed: {
    linkPrevNext() {
      if (this.$themeConfig.isIDAMode === true) {
        return this.getPrevNextFromConfig(this.$themeConfig.sidebar.nav);
      }
      if (!this.tree) return;
      let result = {};
      const search = tree => {
        return tree.forEach((item, i) => {
          const children = item.children;
          if (children) {
            const index = findIndex(children, ["regularPath", this.$page.path]);
            if (index >= 0 && children[index - 1]) {
              result.prev = children[index - 1];
            }
            const sortedTree = tree.sort((a, b) => a.title.localeCompare(b.title));
            if (index >= 0 && children[index + 1]) {
              result.next = children[index + 1];
            } else if (index >= 0 && sortedTree[i + 1] && sortedTree[i + 1].children) {
              result.next = find(sortedTree[i + 1].children, x => {
                return x.frontmatter && x.frontmatter.order !== false;
              });
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
