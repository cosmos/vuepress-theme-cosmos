<template lang="pug">
  div
    router-link(to="/").item {{$site.title || 'Home'}}
    router-link(:to="item.path" v-for="item in breadcrumbs").item {{item.title}}
</template>

<style lang="stylus" scoped>
.item
  display inline-block
  font-size .8125rem

  &:after
    content "/"
    padding-left .25rem
    padding-right .25rem

  &:last-child
    opacity .5

    &:after
      content ""
</style>

<script>
import { find, without, last } from "lodash";

export default {
  computed: {
    breadcrumbs() {
      let crumbs = this.$page.path
        .split("/")
        .filter(item => item !== "")
        .map((currentValue, index, array) => {
          let path = array.slice(0, index + 1).join("/");
          return "/" + path;
        })
        .map(item => {
          return /\.html$/.test(item) ? item : `${item}/`;
        });
      crumbs = crumbs.map(item => {
        const found = find(this.$site.pages, page => {
          return page.regularPath === item;
        });
        const noIndex = {
          title: last(item.split("/").filter(e => e !== "")),
          path: ""
        };
        return found ? found : noIndex;
      });
      return crumbs;
    }
  }
};
</script>