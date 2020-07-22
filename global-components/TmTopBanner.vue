<template lang="pug">
  div
    .container
      //- .banner {{ topBanner.content }}
      .banner(v-html="md(this.content)")
</template>

<script>
export default {
  props: ["topBanner", "topBannerUrl"],
  data() {
    return {
      content: "Prepare for [Stargate tesnet](https://stargate.cosmos.network), coming soon &#8594;"
    }
  }
}
</script>

<style lang="stylus" scoped>
.banner
  color red
  font-size 1rem
</style>