<template lang="pug">
  div
    tm-layout(:aside="false")
      template(v-slot:content)
        .intro
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
        .sections__wrapper
          .h2 Explore the SDK
          div Get familiar with the SDK and explore its main concepts:
          .sections
            router-link.sections__item(tag="a" :to="section.url" v-for="section in $frontmatter.sections")
              component(:is="`tm-icon-${section.icon}`").sections__item__icon
              .sections__item__wrapper
                .sections__item__title {{section.title}}
                .sections__item__desc {{section.desc}}
        .h2 Explore the Cosmos stack
        .p__alt Check out the docs for the various parts of the Cosmos stack:
        .stack
          a.stack__item(:href="item.url" v-for="item in $frontmatter.stack" :style="{'--accent': item.color, '--opacity': '5%'}")
            .stack__item__wrapper
              component(:is="`tm-logo-${item.label}`" :color="item.color" height="100px").stack__item__logo
              svg(width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg").stack__item__icon
                path(d="M1.07239 14.4697C0.779499 14.7626 0.779499 15.2374 1.07239 15.5303C1.36529 15.8232 1.84016 15.8232 2.13305 15.5303L1.07239 14.4697ZM15.7088 1.95457C16.0017 1.66168 16.0017 1.18681 15.7088 0.893912C15.4159 0.601019 14.941 0.601019 14.6482 0.893912L15.7088 1.95457ZM15.6027 1H16.3527C16.3527 0.585786 16.0169 0.25 15.6027 0.25V1ZM5.4209 0.25C5.00669 0.25 4.6709 0.585786 4.6709 1C4.6709 1.41421 5.00669 1.75 5.4209 1.75V0.25ZM14.8527 11.1818C14.8527 11.596 15.1885 11.9318 15.6027 11.9318C16.0169 11.9318 16.3527 11.596 16.3527 11.1818H14.8527ZM2.13305 15.5303L15.7088 1.95457L14.6482 0.893912L1.07239 14.4697L2.13305 15.5303ZM15.6027 0.25H5.4209V1.75H15.6027V0.25ZM16.3527 11.1818V1H14.8527V11.1818H16.3527Z" fill="#DADCE6")
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
  grid-template-columns repeat(auto-fit, minmax(300px, 1fr))
  gap 1.5rem
  margin-bottom 4rem

  &__item
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
    box-shadow 0px 2px 4px rgba(22, 25, 49, 0.05), 0px 0px 1px rgba(22, 25, 49, 0.2), 0px 0.5px 0px rgba(22, 25, 49, 0.05)
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
  background linear-gradient(110.88deg, #161831 0%, #2E3148 100%)
  color white

.dark .features__item__desc
  color rgba(255, 255, 255, 0.8)

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
    border-radius .5rem
    padding 1.5rem 1.5rem 1.5rem 4.5rem
    box-shadow: 0px 2px 4px rgba(22, 25, 49, 0.05), 0px 0px 1px rgba(22, 25, 49, 0.2), 0px 0.5px 0px rgba(22, 25, 49, 0.05)

    &__icon
      position absolute
      top 1rem
      left 1rem
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
    background white
    
    &__icon
      position absolute
      top 0
      right 0
      padding 1rem

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

    &:before
      position absolute
      top 0
      left 0
      content ''
      width 50%
      height 100%
      background linear-gradient(to right, var(--accent), rgba(255,255,255,0))
      border-radius .5rem
      opacity .1

    &__logo
      height 72px
      width auto

@media screen and (max-width: 500px)
  .dark .features__item__image
    transform none
    padding-top 1rem
    padding-bottom 1rem

  .features
    margin-bottom 2rem
    grid-template-columns repeat(auto-fill, minmax(240px, 1fr))

    &__item
      gap 0
      box-shadow none
      grid-template-columns 1fr
      padding 0 2rem 2rem

      &__image
        transform translateY(-1.5rem) scale(1.2)

      &__text
        padding-top 0

      &__desc
        margin-bottom 1.5rem

      &__label
        position relative
        bottom inherit

      &:after
        content ''
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        border-radius .5rem
        box-shadow  0px 24px 40px rgba(22, 25, 49, 0.1), 0px 10px 16px rgba(22, 25, 49, 0.08), 0px 1px 0px rgba(22, 25, 49, 0.05)
        z-index -1

  .sections
    gap .5rem
    margin-bottom 0
    margin-top 2rem
    grid-template-columns repeat(auto-fit, minmax(220px, 1fr))

    &__item
      margin-bottom 0
      padding-left 4rem
      box-shadow none
      padding-bottom 0

      &__icon
        top 1rem
        left .75rem

      &__wrapper
        padding-bottom 1.5rem
        border-bottom 1px solid rgba(140, 145, 177, 0.32)

      &:last-child .sections__item__wrapper
        border-bottom none

    &__wrapper
      position relative
      padding .1px 1rem
      background white
      border-radius .5rem

      &:after
        position absolute
        content ""
        top 0
        left 0
        right 0
        bottom 0
        z-index -1
        border-radius .5rem
        box-shadow 0px 24px 40px rgba(22, 25, 49, 0.1), 0px 10px 16px rgba(22, 25, 49, 0.08), 0px 1px 0px rgba(22, 25, 49, 0.05)

  .stack
    gap .5rem
    grid-template-columns repeat(auto-fill, minmax(240px, 1fr))

    &__item

      &:after
        position absolute
        content ""
        top 0
        left 0
        right 0
        bottom 0
        z-index -1
        border-radius .5rem
        box-shadow 0px 24px 40px rgba(22, 25, 49, 0.1), 0px 10px 16px rgba(22, 25, 49, 0.08), 0px 1px 0px rgba(22, 25, 49, 0.05)

</style>