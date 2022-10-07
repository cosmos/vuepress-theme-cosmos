<template lang="pug">
  div
    .container
      .crumbs.tm-title.tm-lh-title
        .crumbs__item
          router-link(to="/").crumbs__link.tm-link {{$site.title || 'Home'}}
        .crumbs__item(v-for="item in breadcrumbs" v-if="item.title")
          router-link(:to="item.path").crumbs__link.tm-link {{item.title}}
      .menu
        .menu__item(:style="{visibility: $page.headers && $page.headers.length > 0 ? 'visible' : 'hidden'}")
          svg(:class="[`menu__item__icon__active__${tocShow}`]" width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="click").menu__item__icon
            path(fill-rule="evenodd" clip-rule="evenodd" d="M0.25 2C0.25 1.58579 0.585786 1.25 1 1.25H6C6.41421 1.25 6.75 1.58579 6.75 2C6.75 2.41421 6.41421 2.75 6 2.75H1C0.585786 2.75 0.25 2.41421 0.25 2ZM17.53 22.7803L16.9997 22.25L17.53 22.7803L17.5301 22.7802L17.5305 22.7798L17.5322 22.7781L17.5388 22.7715L17.5647 22.7456L17.6647 22.6456L18.0367 22.2737L19.2978 21.0126L22.53 17.7803C22.8229 17.4874 22.8229 17.0126 22.53 16.7197C22.2371 16.4268 21.7622 16.4268 21.4693 16.7197L18.2371 19.9519L17.7497 20.4393V8.5C17.7497 6.34186 17.0721 4.51182 15.7802 3.21983C14.4882 1.92783 12.6581 1.25031 10.5 1.25031C10.0858 1.25031 9.75 1.5861 9.75 2.00031C9.75 2.41453 10.0858 2.75031 10.5 2.75031C12.3419 2.75031 13.7617 3.32264 14.7195 4.28049C15.6773 5.23834 16.2497 6.65814 16.2497 8.5L16.2497 20.4393L12.53 16.7197C12.2371 16.4268 11.7622 16.4268 11.4693 16.7197C11.1764 17.0126 11.1764 17.4874 11.4693 17.7803L16.4693 22.7803L16.9997 23.3107L17.53 22.7803ZM1 6.25C0.585786 6.25 0.25 6.58579 0.25 7C0.25 7.41421 0.585786 7.75 1 7.75H10C10.4142 7.75 10.75 7.41421 10.75 7C10.75 6.58579 10.4142 6.25 10 6.25H1ZM0.25 12C0.25 11.5858 0.585786 11.25 1 11.25H12C12.4142 11.25 12.75 11.5858 12.75 12C12.75 12.4142 12.4142 12.75 12 12.75H1C0.585786 12.75 0.25 12.4142 0.25 12ZM1 16.25C0.585786 16.25 0.25 16.5858 0.25 17C0.25 17.4142 0.585786 17.75 1 17.75H8C8.41421 17.75 8.75 17.4142 8.75 17C8.75 16.5858 8.41421 16.25 8 16.25H1Z")
          transition(name="fade")
            .menu__item__modal(v-if="tocShow")
              tm-toc-menu(@toc="tocShow = false")
</template>

<style lang="stylus" scoped>
.fade-enter-active, .fade-leave-active
  transition all 0.25s
  transform-origin top right

.fade-enter
  transform scale(0.75)
  opacity 0

.fade-enter-to
  transform scale(1)
  opacity 1

.fade-leave
  transform scale(1)
  opacity 1

.fade-leave-to
  transform scale(1)
  opacity 0

.container
  display grid
  grid-auto-flow column
  justify-content space-between
  align-items center

.crumbs

  &__item
    display inline-block

    &:after
      content '/'
      padding-left 0.25rem
      padding-right 0.25rem
      color var(--muted)

    &:last-child
      .crumbs__link
        color var(--muted)

      &:after
        content ''

    &:first-child
      .crumbs__link
        color var(--color-text-strong)

  &__link
    outline-color var(--color-primary, blue)

.menu
  height 3rem

  &__item
    position relative
    display none
    padding 14px

    &__icon
      cursor pointer
      width 1.5rem
      height 1.5rem
      border-radius 0.25rem
      fill var(--color-text)

      &:active
        fill var(--color-text-strong)
      
      &:hover
        fill var(--color-text-strong)

    &__modal
      position absolute
      width 16rem
      z-index 1000
      right 0
      border-radius 16px
      background-color var(--background-color-secondary)


@media screen and (max-width: 732px)
  .menu__item
    display block

</style>

<script>
export default {
  data: function() {
    return {
      tocShow: false
    };
  },
  mounted() {
    if (window) {
      window.addEventListener('scroll', this.handleScroll);
    }
  },
  destroyed() {
    if (window) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  },
  computed: {
    breadcrumbs() {

      let crumbs = [];

      this.$themeConfig.sidebar.nav
        .forEach(item => {
          item.children.sort((a, b) => a.order - b.order).forEach(subItem => {
            if (
              this.$page.path.includes(subItem.path) && 
              (subItem.path != "/" && this.$page.path != "/")  && 
              !crumbs.find(crumbItem => crumbItem.path == item.children[0]?.path)
            ) {
              crumbs.push({
                title: item.title,
                path: item.children[0]?.path || ""
              });
            }
          });
        });

      return crumbs;
    }
  },
  methods: {
    click(e) {
      this.tocShow = !this.tocShow;
      if (window.innerWidth < 832) this.$emit("visible", true);
    },
    handleScroll (event) {
      if (window?.innerWidth < 480) return;
      this.tocShow = false;
    }
  }
};
</script>
