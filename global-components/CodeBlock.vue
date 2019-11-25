<template lang="pug">
  div
    .container
      .body__container
        .icons
          .icons__item
            svg(width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="copy(value)").icons__item__icon
              path(fill-rule="evenodd" clip-rule="evenodd" d="M11 0.25C10.0335 0.25 9.25 1.0335 9.25 2V4.5H10.75V2C10.75 1.86193 10.8619 1.75 11 1.75H21C21.1381 1.75 21.25 1.86193 21.25 2V16C21.25 16.1381 21.1381 16.25 21 16.25H16.5V17.75H21C21.9665 17.75 22.75 16.9665 22.75 16V2C22.75 1.0335 21.9665 0.25 21 0.25H11ZM3 6.25C2.0335 6.25 1.25 7.0335 1.25 8V22C1.25 22.9665 2.0335 23.75 3 23.75H13C13.9665 23.75 14.75 22.9665 14.75 22V8C14.75 7.0335 13.9665 6.25 13 6.25H3ZM2.75 8C2.75 7.86193 2.86193 7.75 3 7.75H13C13.1381 7.75 13.25 7.86193 13.25 8V22C13.25 22.1381 13.1381 22.25 13 22.25H3C2.86193 22.25 2.75 22.1381 2.75 22V8Z")
            .icons__item__tooltip {{copied ? 'Copied!' : 'Copy to clipboard'}}
        .body(:class="[`body__hasfooter__${!!url}`, `body__expanded__${!!expanded}`]" :style="{'--max-height': maxHeight}" ref="body")
          .body__wrapper
            pre(v-html="highlighted(value)")
          transition(name="fade")
            .expand(v-if="!expanded")
              .expand__item(@click="expanded = true")
                span Expand
                svg(width="100%" height="100%" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg").expand__item__icon
                  path(d="M7.25 0.99998C7.25 0.585766 7.58578 0.24998 8 0.24998C8.41421 0.24998 8.75 0.585766 8.75 0.99998L7.25 0.99998ZM8 14.8333L8.53033 15.3636L8 15.894L7.46967 15.3636L8 14.8333ZM2.46967 10.3636C2.17678 10.0708 2.17678 9.59588 2.46967 9.30298C2.76256 9.01009 3.23744 9.01009 3.53033 9.30298L2.46967 10.3636ZM12.4697 9.30298C12.7626 9.01009 13.2374 9.01009 13.5303 9.30298C13.8232 9.59587 13.8232 10.0707 13.5303 10.3636L12.4697 9.30298ZM8.75 0.99998L8.75 14.8333L7.25 14.8333L7.25 0.99998L8.75 0.99998ZM7.46967 15.3636L2.46967 10.3636L3.53033 9.30298L8.53033 14.303L7.46967 15.3636ZM13.5303 10.3636L8.53033 15.3636L7.46967 14.303L12.4697 9.30298L13.5303 10.3636Z" fill="black")
      .footer(v-if="url")
        .footer__filename {{filename(url)}}
        a(:href="url" target="_blank" rel="noreferrer noopener").footer__source
          span View source
          svg(width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg").footer__source__icon
            path(d="M5 2.5L10.5 8L5 13.5" stroke-width="1.5" stroke-linecap="round")
</template>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
  transition opacity .2s

.fade-enter, .fade-leave-to
  opacity 0

.fade-enter-to, .fade-leave
  opacity 1

.container
  margin-top 1rem
  margin-bottom 1rem

.body__container
  position relative

  &:hover .icons
    opacity 1

.body
  background-color #2E3148
  border-radius .5rem
  color rgba(255, 255, 255, 0.8)
  position relative
  line-height 1.75
  max-height 300px
  transition max-height 1s ease-out
  overflow-y hidden

  &__expanded__true
    max-height var(--max-height)

  &__wrapper
    font-family "Menlo", "Monaco", "DejaVu Sans Mono", monospace
    font-size .785rem
    margin 1rem

  &.body__hasfooter__true
    border-bottom-left-radius 0
    border-bottom-right-radius 0


.expand
  padding-top 1.5rem
  padding-bottom 1.5rem
  position absolute
  bottom 0
  display flex
  justify-content center
  width 100%
  color #161931
  background linear-gradient(to top, rgba(46, 49, 72, 1), rgba(46, 49, 72, 0))

  &__item
    text-transform uppercase
    background-color #DADCE6
    display grid
    grid-auto-flow column
    gap .5rem
    align-items center
    font-weight 500
    padding .625rem 1rem
    line-height 1
    letter-spacing 0.02em
    font-size .875rem
    cursor pointer
    border-radius 1000px
    box-shadow 0px 16px 32px rgba(22, 25, 49, 0.08), 0px 8px 12px rgba(22, 25, 49, 0.06), 0px 1px 0px rgba(22, 25, 49, 0.05)

    &__icon
      height 1em
      width auto

.icons
  transition all .1s
  position absolute
  z-index 1000
  top 0
  right 0
  padding .5rem
  opacity 0

  &__item
    cursor pointer
    border-radius .25rem
    position relative

    &:hover &__tooltip
      opacity 1

      &:hover
        opacity 0

    &__tooltip
      transition all .25s .5s
      position absolute
      opacity 0
      top -2rem
      left 50%
      z-index 100000000000
      white-space pre
      font-size .8125rem
      background #161931
      color white
      transform translateX(-50%)
      border-radius .25rem
      padding .5rem .75rem
      line-height 1

      &:after
        content "◥◤"
        color #161931
        position absolute
        top 70%
        font-size 1rem
        transform translateX(-50%)
        left 50%

    &__icon
      fill white
      padding .75rem
      display block

    &:hover
      fill #66A1FF
      background rgba(255, 255, 255, 0.1)

.footer
  background-color #161931
  color white
  display flex
  justify-content space-between
  padding .75rem 1rem
  border-bottom-left-radius .5rem
  border-bottom-right-radius .5rem
  font-size .8125rem
  line-height 1
  
  &__source
    color #66A1FF
    font-weight 500
    stroke #66A1FF
    align-items center
    display flex
    box-shadow none

    &__icon
      margin-left .5rem
</style>

<script>
import Prism from "prismjs";
import copy from "clipboard-copy";

export default {
  props: ["url", "value", "arg"],
  data: function() {
    return {
      expanded: null,
      maxHeight: null,
      copied: null
    };
  },
  computed: {
    out() {
      return this.$slots.default;
    }
  },
  mounted() {
    this.expanded = this.$refs.body.scrollHeight - 300 < 100;
    this.maxHeight = this.$refs.body.scrollHeight + "px";
  },
  methods: {
    filename(url) {
      return url
        .split("/")
        .slice(-1)[0]
        .replace(/\#.*$/, "");
    },
    copy(value) {
      this.copied = true;
      copy(value);
      setTimeout(() => {
        this.copied = false;
      }, 2000);
    },
    highlighted(value) {
      return Prism.highlight(value, Prism.languages.javascript, "javascript");
    }
  }
};
</script>