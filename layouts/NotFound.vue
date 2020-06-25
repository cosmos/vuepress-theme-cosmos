<template lang="pug">
  div
    .h1 Page Not Found
    .p The page you visited either does not exist or has been moved. We're sorry for the inconvenience.
    .p Use menu in the sidebar to navigate to a different page or visit the #[a(href="/") main page].
</template>

<style lang="stylus" scoped>
a
  color var(--color-link)

.h1
  font-size 2.25rem
  font-weight 700
  margin-bottom 1.5rem

.h2
  font-size 1.5rem
  font-weight 700
  margin-top 2.5rem
  margin-bottom 2rem

.p
  font-size 1.25rem
  line-height 1.75rem
  margin-bottom 1rem
</style>