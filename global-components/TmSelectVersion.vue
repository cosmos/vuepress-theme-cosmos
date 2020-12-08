<template lang="pug">
  div
    .container
      span.sr-only Docs Version Switcher
      .select(v-if="versions")
        select(@input="versionChange($event.target.value)")
          option(value="" selected disabled hidden) Version
          option(v-for="item in versions" :value="item.key") {{ item.label }}
</template>

<script>
export default {
  computed: {
    versions() {
      return this.$themeConfig.versions;
    }
  },
  methods: {
    versionChange(version) {
      // vue router won't work because of the generated path prefix in makefile
      // this.$router.push({ path: `/${version.key}` }, () => {})
      // to fix urls with path prefixes: https://docs.staging-cosmos.network/master/master
      // window.open(`${window.location.origin}/${version}`)
      window.location.href = `${window.location.origin}/${version}`
    }
  }
};
</script>

<style lang="stylus" scoped>
// Accessible/SEO friendly CSS hiding
.sr-only
  position absolute
  height 1px
  width 1px
  overflow hidden
  clip rect(1px, 1px, 1px, 1px)

select
  border none
  letter-spacing 0.03em
  font-weight 600
  font-size 0.875rem
  line-height 1.25rem
  color rgba(0, 0, 0, 0.667)
  padding 0.5rem 0
  max-width 100%
  box-sizing border-box
  appearance none
  background none
  background-image url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 5L8 10.5L13.5 5' stroke='black' stroke-opacity='0.667' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E%0A")
  background-repeat no-repeat, repeat
  background-position right .7em top 50%, 0 0
  background-size .75em auto, 100%
  padding-right 1.75rem

  &:focus
    outline none

  &:hover
    cursor pointer

.select
  background-color transparent
  width fit-content
</style>
