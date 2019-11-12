<template lang="pug">
  div
    .container
      .content(:class="{noAside}")
        .content__container(:class="{noAside}")
          slot(name="content")
          tm-content-cards(v-if="$frontmatter.cards")
          .links
            div
              div(v-if="$page.frontmatter.prev || (linkPrevNext && linkPrevNext.prev && linkPrevNext.prev.frontmatter && linkPrevNext.prev.frontmatter.order !== false)")
                router-link(:to="$page.frontmatter.prev" v-if="$page.frontmatter.prev") ← {{$page.frontmatter.prev}}
                router-link(:to="linkPrevNext.prev.regularPath" v-else-if="linkPrevNext.prev && linkPrevNext.prev.regularPath") ← {{linkPrevNext.prev.title}}
            div
              div(v-if="$page.frontmatter.next || (linkPrevNext && linkPrevNext.next && linkPrevNext.next.frontmatter && linkPrevNext.next.frontmatter.order !== false)")
                router-link(:to="$page.frontmatter.next" v-if="$page.frontmatter.next") {{$page.frontmatter.next}} →
                router-link(:to="linkPrevNext.next.regularPath" v-else-if="linkPrevNext.next && linkPrevNext.next.regularPath") {{linkPrevNext.next.title}} →
</template>

<style lang="stylus" scoped>
.links
  display flex
  justify-content space-between
  margin-top 4rem

  a
    box-shadow none
    color var(--accent-color)

.container
  position relative
  min-height 100vh
  width 100%

.content
  padding-right var(--sidebar-width)
  width 100%
  position relative

  &.noAside
    padding-right 0

  &__container
    width 100%
    padding-left 4rem
    padding-right 2rem

    &.noAside
      max-width initial

/deep/
  h1,h2,h3,h4
    font-weight 600

  .content__container
    img 
      max-width 100%

  .term
    text-decoration underline

  .tooltip
    h1
      font-size 0.875rem
      font-weight 500
      margin-bottom 0

    p
      margin-top 0
      margin-bottom 0
      line-height 1.5

  a
    color var(--accent-color)
    box-shadow inset 0 -1px #ddd

  strong
    font-weight 600

  em
    font-style italic

  h1
    font-size 2.25rem
    font-weight 600
    margin-bottom 2rem

  h2
    font-size 1.5rem
    font-weight 600
    margin-top 2rem
    margin-bottom 1.5rem

  h3
    font-size 1.25rem
    font-weight 600
    margin-top 2rem
    margin-bottom 1.5rem

  p
    margin-top 1rem
    margin-bottom 1rem
    line-height 1.75rem

  ul
    line-height 1.5
    margin-top 1rem

  li
    padding-left 2rem
    list-style none
    margin-bottom 1rem
    position relative
  
    &:before
      content ''
      width 1rem
      height 1rem
      background url('./images/bullet-list.svg') no-repeat top left
      position absolute
      top 0.35rem
      left 0

  :not(pre) > code[class*="language-"], pre[class*="language-"]
    background rgba(0,0,0,0)

  :not(pre) > div[class*='language-']
    background #2e3148
    border-radius 0.25rem
    font-size 0.875rem
    font-family 'Menlo', monospace
    position relative
    line-height 1.5

  pre[class*='language-']
    position relative
    z-index 1
    line-height 1.5

  .highlight-lines
    position absolute
    width 100%
    padding-top .9rem
    padding-bottom 1rem
    font-size inherit

    .highlighted
      background rgba(0,0,0,.25)

  p code, ul code
    font-family 'Menlo', 'Monaco', 'DejaVuSans Mono', monospace
    font-size .875rem
    background rgba(0,0,0,.05)
    padding .2rem
    border-radius .25rem

@media screen and (max-width: 1024px)
  .content
    padding-right 0

    &__container
      padding-left 2rem
</style>

<script>
import { findIndex, sortBy } from "lodash";

export default {
  props: {
    aside: {
      type: Boolean,
      default: true
    },
    tree: {
      type: Array
    }
  },

  mounted() {
    const onIntersection = items => {
      if (items && items[0].isIntersecting) this.$emit("selected", items);
    };
    let observer = new IntersectionObserver(onIntersection, {
      rootMargin: "0px"
    });
    const searchForHeaders = () => {
      const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      if (headers && headers.length > 0) {
        headers.forEach(header => {
          if (header) observer.observe(header);
        });
      } else {
        setTimeout(() => {
          searchForHeaders();
        }, 1000);
      }
    };
    searchForHeaders();
  },
  computed: {
    noAside() {
      return !this.aside;
    },
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