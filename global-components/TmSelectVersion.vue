<template lang="pug">
  div
    .container
      .select(v-if="versions.length > 1")
        select(@input="select")
          option(v-for="item in versions" :value="item") {{item}}
</template>

<script>
export default {
  computed: {
    versions() {
      return this.$themeConfig.versions;
    }
  },
  methods: {
    select(e) {
      this.$router.push({ path: `/${e.target.value}` })
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

.select
  padding 0.5rem 0
  background-color transparent
  width fit-content
</style>
