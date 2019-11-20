<template lang="pug">
  div
    a(href="https://cosmos.network/goz" target="_blank" rel="noreferrer noopener")
      img(src="./images/goz.jpg").aside__image
    div(v-if="prereq.length > 0")
      .aside__title Pre-requisite reading
    client-only
      router-link(v-for="item in prereq" :to="item.href").prereq__item {{item.text}}
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

.prereq__item
  box-shadow 0px 2px 4px rgba(22, 25, 49, 0.05), 0px 0px 1px rgba(22, 25, 49, 0.2), 0px 0.5px 0px rgba(22, 25, 49, 0.05)
  padding 1rem
  border-radius .5rem
  color #161931
  font-size .875rem
  font-weight 500
  line-height 20px
  margin 1rem 0
  display block
</style>

<script>
export default {
  props: ["selected"],
  data: function() {
    return {
      prereq: []
    };
  },
  mounted() {
    const searchForPrereq = i => {
      let index = i || 0;
      if (index > 10) return;
      const prereq = document.querySelectorAll("[prereq]");
      if (prereq.length > 0) {
        this.prereq = [...prereq].map(e => {
          const link = e.querySelector("[href]");
          return {
            href: link.getAttribute("href"),
            text: link.innerText
          };
        });
      } else {
        setTimeout(() => searchForPrereq(index + 1), 100);
      }
    };
    searchForPrereq();
  }
};
</script>