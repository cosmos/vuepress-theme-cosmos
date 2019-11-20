<template lang="pug">
  div
    .container
      .search-box
        .search-box__icon
          icon-search
        .search-box__input
          input(type="text" placeholder="Search").search-box__input__input
        a.search-box__button(@click="$emit('visible', false)") Cancel
</template>

<style lang="stylus" scoped>
.search-box
  display grid
  grid-auto-flow column
  align-items center
  box-shadow inset 0 -1px 0 0 rgba(176, 180, 207, 0.2)
  padding 1.5rem 2rem
  grid-template-columns 1.5rem 1fr
  gap 1rem

  &__input

    &__input
      border none
      background none
      outline none
      font-size 1.25rem
      width 100%

      &::-webkit-input-placeholder
        color rgba(14, 33, 37, 0.26)
  
  &__button
    text-transform uppercase
    color var(--accent-color)
    font-weight 500
    cursor pointer
</style>