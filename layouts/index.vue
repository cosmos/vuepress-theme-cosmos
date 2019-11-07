<template lang="pug">
  div
    tm-layout(:aside="false")
      template(v-slot:content)
        .intro
          .h1 {{$frontmatter.title}}
          .p {{$frontmatter.description}}
        .h2 Getting Started
        .p__alt Read all about the SDK or dive straight into the code with a tutorial.
        .features
          a(:href="feature.url" v-for="feature in $frontmatter.features" :class="[feature.special]" target="_blank" rel="noreferrer noopener").features__item
            .features__item__image
              component(:is="`tm-image-${feature.image}`").features__item__image__img
            .features__item__text
              .features__item__cta {{feature.cta}}
              .features__item__title {{feature.title}}
              .features__item__desc {{feature.desc}}
              .features__item__label
                .features__item__label__text(v-if="!feature.h3") {{feature.label}}
                .features__item__label__text__alt(v-if="feature.h3") {{feature.h3}}
        .h2 Explore the SDK
        div Get familiar with the SDK and explore its main concepts:
        .sections
          router-link.sections__item(tag="a" :to="section.url" v-for="section in $frontmatter.sections")
            component(:is="`tm-icon-${section.icon}`").sections__item__icon
            .sections__item__title {{section.title}}
            .sections__item__desc {{section.desc}}
        .h2 Explore the Cosmos stack
        .p__alt Check out the docs for the various parts of the Cosmos stack:
        .stack
          a.stack__item(:href="item.url" v-for="item in $frontmatter.stack" :style="{'--accent': item.color, '--opacity': '5%'}")
            .stack__item__wrapper
              component(:is="`tm-logo-${item.label}`" :color="item.color" height="100px").stack__item__logo
              div
                .stack__item__h1 {{item.title}}
                .stack__item__p {{item.desc}}
</template>

<style lang="stylus" scoped>

.intro
  width 100%
  max-width 800px

.h1
  font-size 2.25rem
  font-weight 600
  margin-bottom 1.5rem

.h2
  font-size 1.5rem
  font-weight 600
  margin-top 2.5rem
  margin-bottom 1rem

.p
  font-size 1.25rem
  line-height 28px

  &__alt
    margin-top .75rem
    margin-bottom 2rem

.features
  display grid
  grid-template-columns repeat(auto-fill, minmax(400px, 1fr))
  gap 1.5rem
  margin-bottom 4rem

  &__item
    border 1px solid rgba(140, 145, 177, 0.32)
    border-radius 0.5rem
    position relative
    padding-left 1rem
    padding-right 1rem
    color inherit
    box-shadow none
    display grid
    grid-template-columns 30% 1fr
    gap 1rem
    min-height 200px
    background linear-gradient(to right, rgba(235,237,255,1), white 50%)

    &__text
      padding-top 2rem

    &__image
      align-items center
      display grid

      &__img
        width 100%

    &__cta
      text-transform uppercase
      font-size 0.75rem
      letter-spacing 0.2em

    &__title
      font-weight 600
      font-size 1.25rem
      line-height 28px
      margin-bottom 0.5rem

    &__desc
      font-size 0.875rem
      line-height 20px

    &__label
      position absolute
      bottom 1.5rem

      &__text
        display inline-block
        background rgba(176, 180, 207, 0.2)
        border-radius 0.25rem
        padding 0.25rem 0.5rem
        font-size 0.8125rem

        &__alt
          text-transform uppercase
          font-weight 600

.dark
  background rgba(22, 25, 49, 0.9)
  color white

.sections
  display grid
  margin-top 3rem
  margin-bottom 4rem
  grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
  gap 1.5rem

  &__item
    padding-left 4rem
    position relative
    color initial
    box-shadow none
    margin-bottom 2rem

    &__icon
      position absolute
      top 0
      left 0
      font-size 1.5rem
      display flex
      align-items center
      justify-content center
      width 2.5rem
      height 2.5rem

    &__title
      font-weight 600
      margin-bottom 0.5rem

    &__desc
      font-size .875rem
      color rgba(22, 25, 49, 0.65)

.stack
  display grid
  gap 1.5rem
  grid-template-columns repeat(auto-fit, minmax(300px, 1fr))

  &__item
    position relative
    min-height 120px
    display flex
    align-items center
    padding 2rem 1rem
    border-radius .5rem
    box-shadow inset 0 0 0 1px rgba(176, 180, 207, 0.2)
    color #161931

    &__h1
      font-size 1.25rem
      margin-bottom .75rem
      font-weight 500

    &__p
      font-size .875rem
      color rgba(22, 25, 49, 0.65)
      line-height 1.25rem
      
    &__wrapper
      display grid
      grid-auto-flow column
      grid-template-columns 30% 1fr
      gap 1rem

    &::before
      position absolute
      top 0
      left 0
      content ''
      width 50%
      height 100%
      background linear-gradient(to right, var(--accent), rgba(0,0,0,0))
      border-radius .5rem
      opacity var(--opacity)

    &__logo
      height 72px
      width auto

</style>