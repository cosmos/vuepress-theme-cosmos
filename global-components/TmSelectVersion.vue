<template lang="pug">
  div
    .container
      .select(v-if="versions.length > 1")
        select(@input="select")
          option(v-for="item in versions" :value="item") {{item}}
</template>

<style lang="stylus" scoped>
.container
  padding-left 0.75rem

select
  border none
  background none
  letter-spacing 0.03em
  font-weight 600
  font-size 0.875rem

.select
  border 2px solid rgba(140, 145, 177, 0.32)
  padding 0.25rem 0.5rem
  border-radius 6px
  background-color transparent
  width fit-content
</style>

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
