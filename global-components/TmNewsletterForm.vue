<template lang="pug">
  form(action="https://app.mailerlite.com/webforms/submit/u7o3l7" data-code="u7o3l7" method="POST" target="_blank" rel="noreferrer noopener").newsletter__form__component__internal
    .newsletter__desc
      .newsletter__desc__h1
        h4(for="newsletter-email-input") Get Cosmos updates
      .info-label Unsubscribe at any time. Privacy Policy
    .newsletter__input
      .newsletter__input__input
        input(type="email" required name="fields[email]" id="newsletter-email-input" placeholder="Enter your email").newsletter__input__input__el
        button(type="submit").newsletter__input__input__button →
        input(type="hidden" name="ml-submit" value="1")
</template>

<style lang="stylus" scoped>
.newsletter__form__component__internal
  display flex
  align-items center
  justify-content space-between
  background-color var(--background-color-primary)
  border-bottom 1px solid var(--semi-transparent-color-2)
  margin-inline -24px
  padding-block 64px

  @media screen and (min-width: 832px)
    padding-inline 100px

  @media screen and (max-width: 480px)
    flex-direction column
    padding-block 24px


.newsletter

  &__input
    width 50%
    padding-inline 24px
    margin-block 32px

    &__input
      background var(--background-color-secondary)
      padding-inline 16px
      padding-block 10px
      border-radius 8px
      color var(--color-text-strong)
      opacity 0.6
      display flex

      &__button
        color var(--color-text-strong)
        cursor pointer
        background none
        border none

      &__el
        border none
        width 100%
        outline none
        padding .5rem
        background none
        color var(--color-text-strong)

  &__desc
    width 50%

@media screen and (max-width: 480px)
  .info-label
    text-align center
  
  .newsletter

    &__input
      width 100%

    &__desc
      width 100%

      &__h1
        text-align center
      
</style>
