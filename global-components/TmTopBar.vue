<template lang="pug">
  div
    .container
      .menu
        .menu__icon(@click="$emit('sidebar', true)")
          tm-icon-menu
      .logo
        .logo__wrapper
          router-link(to="/" tag="div").logo__image
            component(:is="`tm-logo-${$themeConfig.label}`")
          .logo__text {{$site.title}}
      .toolbar
        .toolbar__item(@click="$emit('search', true)")
          .toolbar__item__icon
            icon-search(fill="#aaa")
          .toolbar__item__text.toolbar__item__text__search Search
</template>

<style lang="stylus" scoped>
.container
  padding 2rem 3rem 0 3rem
  display grid
  grid-template-columns auto 1fr auto
  align-items center

.menu

  &__icon
    visibility hidden
    height 1.5rem
    width 1.5rem
    cursor pointer

.logo

  &__wrapper
    display grid
    grid-auto-flow column
    justify-content center
    gap .5rem
    align-items center
    visibility hidden

  &__image
    width 2rem
    height 2rem
    fill var(--accent-color)

  &__text
    font-weight 500

.toolbar
  grid-column-start -2
  display flex
  justify-content flex-end

  &__item
    cursor pointer
    display flex
    flex-direction row
    align-items center
    padding .75rem

    &__icon
      height 1.5rem
      width 1.5rem
      margin-right .5rem

    &__text
      color rgba(22, 25, 49, 0.65)

@media screen and (max-width: 752px)
  .container
    padding-left 1.5rem
    padding-right 1.5rem

  .menu

    &__icon
      visibility visible

  .toolbar__item__text__search
    display none

  .logo__wrapper
    visibility visible
</style>