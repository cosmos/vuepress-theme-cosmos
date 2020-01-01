<template lang="pug">
  div(style="width: 100%")
    .container
      slot
      tm-content-cards(v-if="$frontmatter.cards")
</template>

<style lang="stylus" scoped>
.footer__links
  padding-top 5rem
  padding-bottom 1rem
  border-top 1px solid rgba(176, 180, 207, 0.2)
  margin-top 5rem

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
  [synopsis]
    padding 1.5rem 2rem
    background-color rgba(176, 180, 207, 0.09)
    border-radius 0.5rem
    margin-top 3rem
    margin-bottom 3rem
    letter-spacing 0.01em
    color rgba(22, 25, 49, 0.9)
    font-size 0.875rem
    line-height 20px

    &:before
      content "Synopsis"
      display block
      color rgba(22, 25, 49, 0.65)
      text-transform uppercase
      font-size 0.75rem
      margin-bottom 0.5rem
      letter-spacing 0.2em

  [synopsis]
    & a
      box-shadow none

    & a:hover
      box-shadow none

    & a code
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px #f8f8fb

    & a:hover code
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 1), 0 0 0 3px #f8f8fb

    & a:active code
      color rgba(80, 100, 251, 0.6)
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px #f8f8fb

  a[target='_blank']:after
    content url('./images/icon-outbound.svg')
    padding-left 3px

  .icon.outbound
    display none

  table
    width 100%
    line-height 24px
    margin-top 2rem
    margin-bottom 2rem

  td
    word-break break-word

  th
    text-align left
    font-weight 600
    font-size 0.875rem

  td, th
    padding 0.75rem
    border-bottom 1px solid rgba(140, 145, 177, 0.32)

  tr:last-child td
    border-bottom none

  .code-block__container
    margin-top 2rem
    margin-bottom 2rem

  [prereq]
    display none

  .content__default
    width 100%

  h1, h2, h3, h4
    font-weight 600

  h1 code, h2 code, h3 code
    font-weight normal

  .content__container
    img
      max-width 100%

  .term
    text-decoration underline

  img
    width 100%
    height auto
    display block

  .tooltip
    h1
      font-size 0.875rem
      font-weight 500
      margin-bottom 0

    p
      margin-top 0
      margin-bottom 0
      line-height 1.5

  strong
    font-weight 600

  em
    font-style italic

  h1
    font-size 2.5rem
    font-weight 600
    margin-bottom 3rem
    line-height 3.25rem
    letter-spacing -0.03em

  h2
    font-size 1.5rem
    font-weight 600
    margin-top 3rem
    margin-bottom 1.5rem
    line-height 2rem
    letter-spacing -0.01em

  h3
    font-size 1.25rem
    font-weight 600
    margin-top 2rem
    margin-bottom 1rem
    letter-spacing -0.01em

  p
    margin-top 1rem
    margin-bottom 1rem
    line-height 1.5rem

  ul, ol
    line-height 1.5
    margin-top 1rem
    padding-left 0.75rem
    margin-bottom 1.5rem

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

  code
    background-color rgba(176, 180, 207, 0.2)
    border 1px solid rgba(176, 180, 207, 0.09)
    border-radius 0.25rem
    padding-left 0.25rem
    padding-right 0.25rem
    font-size 0.8125rem
    font-family 'Menlo', 'Monaco', 'Fira Code', monospace
    color #46509F
    margin-top 3rem

  h1, h2, h3, h4, h5, h6
    code
      font-size inherit

  p, ul, ol
    a
      color var(--accent-color)
      box-shadow inset 0 -0.5px 0 rgba(80, 100, 251, 0.7)
      outline none

    a:focus
      box-shadow 0 0 0 3px rgba(102, 161, 255, 0.7)
      border-radius 0.25rem

    a:visited
      color rgba(146, 20, 177, 1)

    a:visited:hover
      color var(--accent-color)

    a:hover
      box-shadow inset 0 -1px 0 rgba(80, 100, 251, 1)

    a:active
      color rgba(80, 100, 251, 0.6)
      border-radius 0
      box-shadow inset 0 -0.5px 0 rgba(80, 100, 251, 0.3)

    a code
      border-bottom none
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px white
      color rgba(80, 100, 251, 1)

    a:hover code
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 1), 0 0 0 3px white

    a:active code
      color rgba(80, 100, 251, 0.6)
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px white
      background-color rgba(176, 180, 207, 0.1)
      border 1px solid rgba(176, 180, 207, 0.045)
      border-bottom none
      border-radius 0.25rem

    a:focus code
      box-shadow 0 1px 0 0 rgba(80, 100, 251, 0.3), 0 0 0 3px rgba(102, 161, 255, 0.7)

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
    if (window.location.hash) {
      const elementId = document.querySelector(window.location.hash);
      if (elementId) elementId.scrollIntoView();
    }
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
