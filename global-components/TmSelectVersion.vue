<template lang="pug">
  div
    .container
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
select
  border none
  background none
  letter-spacing 0.03em
  font-weight 600
  font-size 0.875rem
  line-height 1.25rem
  color rgba(0, 0, 0, 0.667)

  &:focus
    outline none

  &:hover
    cursor pointer

.select
  padding 0.5rem 0
  background-color transparent
  width fit-content
</style>
