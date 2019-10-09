<template lang="pug">
  div
    .container
      .search
        input(placeholder="Search" @input="$emit('input', $event.target.value)").search__input
</template>

<style lang="stylus" scoped>
.container
  margin-top 2rem
  margin-bottom 2rem

.search
  &__input
    border 1px solid rgba(176, 180, 207, 0.09)
    font-family inherit
    font-size inherit
    padding .5rem 1.5rem
    width 100%
    background rgba(176, 180, 207, 0.09)
    border-radius 10000px
    outline none

    &:focus
      border 1px solid #66A1FF
      background white
</style>

<script>
export default {
  props: ["value"]
};
</script>