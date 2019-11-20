<template lang="pug">
  div
    .container
      .item(@click="$emit('search', true)")
        icon-search.item__icon
        .item__text Search
</template>

<style lang="stylus" scoped>
.container
  padding 2rem 3rem 0 3rem
  display flex
  justify-content flex-end

.item
  display grid
  grid-auto-flow column
  align-items center
  gap .5rem
  cursor pointer

  &__icon
    height 1.5rem
    width 1.5rem

  &__text
    color rgba(22, 25, 49, 0.65)
</style>