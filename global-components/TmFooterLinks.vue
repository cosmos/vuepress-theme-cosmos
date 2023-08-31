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
import { findIndex, find, cloneDeep } from "lodash";

export default {
  props: ["tree"],
  methods: {
    shorten(string) {
      let str = string.split(" ");
      str =
        str.length > 20 ? str.slice(0, 20).join(" ") + "..." : str.join(" ");
      return this.md(str);
    },
    findChildrenFromTree(path) {
      let list = [];

      const search = tree => {
        return tree.forEach((item, i) => {
          const children = item.children;
          if (children) {
            const index = findIndex(children, ["regularPath", path]);
            if (index >= 0) list = children;
            return search(children);
          }
        });
      };

      if (this.tree) search(this.tree);

      return list;
    },
    getPrevNextFromConfig(list, current, prev, next) {
      let currentItem = current;
      let prevItem = prev;
      let nextItem = next;

      if (list?.length) {
        let item = null;
        for (let index in list) {
          item = list[index];

          if (item?.path === this.$page.path) {
            currentItem = item;
          } else {
            if (!currentItem && !item?.children && item) {
              prevItem = item;
              }
            if (currentItem) nextItem = (item?.children?.length > 0) ? item.children[0] : item;
          }

          if (item?.children) {
            const subWindow = this.getPrevNextFromConfig(item.children, currentItem, prevItem, nextItem);
            if (subWindow?.current) {
              currentItem = subWindow.current;
            }
            if (subWindow?.next && currentItem) nextItem = subWindow.next;
            if (subWindow?.prev) {
              prevItem = subWindow.prev;
            }
          }

          if (currentItem && nextItem) break;
        }
      }
      
      return {
        current: currentItem,
        prev: prevItem,
        next: nextItem
      }
    },
    getPrevNextFromTree() {
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
    },

  },
  computed: {
    linkPrevNext() {
      const childrenMap = item => {
        const clone = cloneDeep(item);
        if (clone.children) {
          clone.children = clone.children.map(childrenMap);
        } else if (clone.directory == true) {
          clone.children = this.findChildrenFromTree(clone.path);
        }
        return clone;
      }

      const checkedList = this.$themeConfig.sidebar.nav.slice().map(childrenMap);

      let currentItem = null;
      let prevItem = null;
      let nextItem = null;

      return this.getPrevNextFromConfig(checkedList, currentItem, prevItem, nextItem);
    }
  }
};
</script>
