<template lang="pug">
  div(style="width: 100%")
    .container
      h1 {{$page.title}}
      .synopsis(v-if="$frontmatter.synopsis")
        .synopsis__title Synopsis
        .synopsis__body(v-html="md($frontmatter.synopsis)")
      slot(name="content")
      tm-content-cards(v-if="$frontmatter.cards")
</template>

<style lang="stylus" scoped>
.synopsis
  padding 1.5rem 2rem
  background-color rgba(176, 180, 207, 0.09)
  border-radius .5rem

  &__title
    color rgba(22, 25, 49, 0.65)
    text-transform uppercase
    font-size .75rem
    margin-bottom .5rem
    letter-spacing 0.2em

  &__body
    color rgba(22, 25, 49, 0.9)
    font-size .875rem
    line-height 20px

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
  .content__default h1
    display none

  [prereq]
    display none
    
  .content__default
    width 100%

  h1,h2,h3,h4
    font-weight 600

  .content__container
    img 
      max-width 100%

  .term
    text-decoration underline

  img
    width 100%

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
    font-size 2.5rem
    font-weight 600
    margin-bottom 3rem

  h2
    font-size 2rem
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

  ul, ol
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

  [class*='language-']
    overflow-x hidden
    width 100%

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
    overflow-x hidden
    width 100%

  .highlight-lines
    position absolute
    width 100%
    padding-top .9rem
    padding-bottom 1rem
    font-size inherit

    .highlighted
      background rgba(0,0,0,.25)

  p code, ul code, ol code
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
    // const onIntersection = items => {
    //   if (items && items[0].isIntersecting) this.$emit("selected", items);
    // };
    // let observer = new IntersectionObserver(onIntersection, {
    //   rootMargin: "0px"
    // });
    // const searchForHeaders = () => {
    //   const headers = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    //   if (headers && headers.length > 0) {
    //     headers.forEach(header => {
    //       if (header) observer.observe(header);
    //     });
    //   } else {
    //     setTimeout(() => {
    //       searchForHeaders();
    //     }, 1000);
    //   }
    // };
    // searchForHeaders();
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