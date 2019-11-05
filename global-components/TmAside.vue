<template lang="pug">
  div
    div
      a(href="https://cosmos.network/goz" target="_blank" rel="noreferrer noopener")
        img(src="./images/goz.jpg").aside__image
    div(v-if="$page.headers && $page.headers.length > 0")
      .aside__title On this page
      .aside__link(v-for="link in $page.headers")
        a(:href="`${$page.regularPath}#${link.slug}`" :class="{selected: link.slug == selected}").aside__link__href.header-anchor {{link.title}}
</template>

<style lang="stylus" scoped>
.selected
  font-weight 600

.aside
  &__image
    width 100%
    border-radius .25rem

  &__title
    font-size 0.75rem
    text-transform uppercase
    letter-spacing 0.2em
    color #666
    margin-top 3rem

  &__link
    color rgba(22, 25, 49, 0.65)
    margin-top 0.75rem
    margin-bottom 0.75rem
    font-size 0.875rem

    &__href
      color rgba(22, 25, 49, 0.65)
</style>

<script>
export default {
  props: ["selected"]
};
</script>