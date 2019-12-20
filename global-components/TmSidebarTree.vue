<template lang="pug">
  div
    div(v-for="item in value")
      component(:style="{'--vline': level < 1 ? 0 : 1, '--vline-color': (iconActive(item) || iconExpanded(item)) && !iconExpanded(item) ? 'var(--accent-color)' : 'rgba(176, 180, 207, 0.2)' }" :is="componentName(item)" v-if="!hide(item)" :to="item.path" :target="outboundLink(item.path) && '_blank'" :href="(outboundLink(item.path) || item.static) && item.path" @click="!outboundLink(item.path) && revealChild(item.title)" :class="{'item__dir': !item.path}").item
        tm-icon-hex(v-if="iconExpanded(item) && level < 1" style="fill: var(--accent-color, black)").item__icon
        tm-icon-hex(v-if="iconCollapsed(item) && level < 1" style="fill: #ccc").item__icon
        tm-icon-outbound(v-else-if="outboundLink(item.path) || item.static").item__icon
        div(:style="{'padding-left': `${1*level}rem`}" :class="{'item__selected': iconActive(item) || iconExpanded(item), 'item__selected__dir': iconCollapsed(item), 'item__selected__alt': iconExpanded(item)}" v-html="md(titleText(item))")
      div(v-if="item.children || directoryChildren(item) || []")
        transition(name="reveal" v-on:enter="setHeight" v-on:leave="setHeight")
          tm-sidebar-tree(:level="level+1" :value="item.children || directoryChildren(item) || []" v-show="item.title == show" v-if="!hide(item)" :title="item.title" @active="revealParent($event)")
</template>

<style lang="stylus" scoped>
.item
  position relative
  padding-left 1.25rem
  display block
  padding-top .35rem
  padding-bottom .35rem
  cursor pointer
  font-size .875rem
  letter-spacing 0.01em

  &:after
    content ''
    width 2px
    height 100%
    opacity var(--vline)
    background var(--vline-color, black)
    position absolute
    top 0
    left 5px

  &__selected
    font-weight 500
    color var(--accent-color)

    &__dir
      font-weight 400
  
    &__alt
      color initial
      font-weight 500

  &__dir
    font-weight 500

  &__icon
    position absolute
    top .5rem
    left 0

.reveal-enter-active, .reveal-leave-active
  transition all 0.25s
  overflow hidden

.reveal-enter, .reveal-leave-to
  max-height 0
  opacity 0

.reveal-enter-to, .reveal-leave
  max-height var(--max-height)
  opacity 1
</style>

<script>
import { sortBy, find } from "lodash";

export default {
  name: "tm-sidebar-tree",
  props: ["value", "title", "tree", "level"],
  data: function() {
    return {
      show: null
    };
  },
  mounted() {
    const active = find(this.value, ["key", this.$page.key]);
    if (active) {
      this.$emit("active", this.title);
    }
  },
  watch: {
    $route(to, from) {
      const found = find(this.value, ["key", to.name]);
      if (found) {
        this.revealParent(this.title);
      }
    }
  },
  methods: {
    hide(item) {
      const index = this.indexFile(item);
      const fileHide = item.frontmatter && item.frontmatter.order === false;
      const dirHide =
        index &&
        index.frontmatter &&
        index.frontmatter.parent &&
        index.frontmatter.parent.order === false;
      return dirHide || fileHide;
    },
    iconCollapsed(item) {
      if (item.directory && !this.iconExpanded(item)) return true;
      return (
        !item.path &&
        (this.show != item.title && (item.children || item.directory))
      );
    },
    iconExpanded(item) {
      return this.show == item.title && !item.key;
    },
    iconActive(item) {
      if (this.$page.path === "") return false; // Workaround for 404 page
      if (item.path == this.$page.path) return true;
      return item.key == this.$page.key;
    },
    outboundLink(path) {
      return /^[a-z]+:/i.test(path);
    },
    componentName(item) {
      if (
        item.path &&
        !item.directory &&
        !item.static &&
        !this.outboundLink(item.path)
      )
        return "router-link";
      if ((item.path && this.outboundLink(item.path)) || item.static) {
        return "a";
      }
      return "div";
    },
    indexFile(item) {
      if (!item.children) return false;
      return find(item.children, page => {
        const path = page.relativePath;
        if (!path) return false;
        return (
          path.toLowerCase().match(/index.md$/i) ||
          path.toLowerCase().match(/readme.md$/i)
        );
      });
    },
    setHeight(el) {
      el.style.setProperty("--max-height", el.scrollHeight + "px");
    },
    titleText(item) {
      const index = this.indexFile(item);
      const parentTitle =
        index &&
        index.frontmatter &&
        index.frontmatter.parent &&
        index.frontmatter.parent.title;
      return parentTitle || (index && index.title) || item.title;
    },
    revealChild(title) {
      this.show = this.show == title ? null : title;
    },
    revealParent(title) {
      this.show = title;
      this.$emit("active", this.title);
    },
    directoryChildren(item) {
      if (item.directory === true) {
        let result = item.path && item.path.split("/").filter(i => i != "");
        result = result.reduce((acc, cur) => {
          return find(acc.children || acc, ["title", cur]);
        }, this.tree);
        return result.children || [];
      }
      return [];
    }
  }
};
</script>