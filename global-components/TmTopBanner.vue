<template lang="pug">
  div
    .container
      .banner(v-if="show")
        .banner__content(v-html="md(topBanner.content)")
        .banner__icon(@click="close")
          svg(width='16', height='16', viewBox='0 0 14 14', fill='none', xmlns='http://www.w3.org/2000/svg')
            g(opacity="0.4")
              path(d='M1.66669 1.66669L12.3334 12.3334M12.3334 1.66669L1.66664 12.3334', stroke='black', stroke-width='1.5', stroke-linecap='round')
</template>

<script>
import * as Cookie from "tiny-cookie"

export default {
  props: ["topBanner"],
  data() {
    return {
      show: true,
      // uncomment for local testing
      // content: "Prepare for <a href='https://stargate.cosmos.network?utm_source=docs' target='blank_' rel='noreferrer noopener'>Stargate tesnet</a>, coming soon &#8594;"
    }
  },
  mounted () {
    if (Cookie.get("top-banner-hidden", false)) this.show = false
    else this.show = true
  },
  methods: {
    close() {
      this.show = false
      // reset every 7 days
      Cookie.set("top-banner-hidden", true, { expires: '7D' })
    },
  }
}
</script>

<style lang="stylus" scoped>
/deep/
  a[href]
    color var(--color-link)
    font-weight 700

.banner
  display flex
  align-items center
  justify-content center
  position relative
  width 100%
  height 36px
  background-color #F8F9FC
  transform-origin top center
  transition transform 200ms linear

.banner__content
  font-size 0.875rem
  line-height 1.25rem
  letter-spacing 0.01em
  color #000000
  text-align center
  display flex
  align-items center
  justify-content center
  position relative

.banner__icon
  position absolute
  right 0
  padding-left 1rem
  padding-right 1rem
  cursor pointer

@media screen and (max-width: 414px)
  .banner
    padding-left 16px
    padding-top 8px
    padding-bottom 8px
    height auto

  .banner__content
    text-align start

  .banner__icon
    position relative

@media screen and (max-width: 320px)
  .banner__content
    font-size 13px
    line-height 18px

  .banner__icon
    display flex
    justify-content center
    align-items center
    flex 0 0 35px
    flex-direction column
    padding 0
</style>