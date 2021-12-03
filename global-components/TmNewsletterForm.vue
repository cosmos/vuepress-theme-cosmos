<template lang="pug">
  .wizard
    .wizard__inner
      transition(name="fade")
        // Step 0
        div(v-if='step === 0' ref='step0' key='step0').tm-grid-base
          .wizard-col
            h4
              label(for='field-email') Get Cosmos updates
            p.mt-3.tm-lh-title.tm-rf-1.tm-medium.tm-muted Unsubscribe at any time.
              | 
              a.tm-link.tm-link-external(href='https://v1.cosmos.network/privacy' target="_blank")
                span Privacy Policy

          .wizard-col
            .form.tm-center
              .form__input
                input#field-email.form__input__input.tm-rf0.tm-lh-copy.tm-title(v-model='email' name='fields[email]' type='email' placeholder='Enter your email' required='required' @keypress.enter='actionSubmitEmail')
                button.form__input__button(type='submit' :disabled='emailInvalid' @click.prevent='actionSubmitEmail')
                  span.sr-only Next
                  icon-arrow(type="right").newsletter__input__input__button__icon

        // Step 1
        div(v-if='step === 1' ref='step1' key='step1').tm-grid-base
          .wizard-col._top
            h4
              | Almost there!
              br
              | Confirm your email
            img.success-graphics(src='/success-mails.svg')
          .wizard-col._top
            p.tm-rf0.tm-lh-copy.tm-title
              | You should get a confirmation email for each of your selected
              | interests. Open it up and click
              span ‘Confirm your email’
              | so we can keep you updated.
            p.tm-rf-1.tm-lh-title.tm-text
              | Don&rsquo;t see the confirmation email yet?
            p.tm-rf-1.tm-lh-title.tm-muted
              | It might be in your spam folder.
              br
              | If so, make sure to mark it as &quot;not spam&quot;.
</template>

<script>
import querystring from 'querystring'
import validateEmail from 'email-validator'

export default {
  data() {
    return {
      step: 0,
      email: null,
      requestURL: 'https://app.mailerlite.com/webforms/submit/n7t4w7',
      callback: 'jQuery18301604647979314595_1638523133802',
      _: '1638523153680',
      commonFormData: {
        'ml-submit': '1',
        ajax: '1',
        guid: '35feb5b5-09a6-3e6f-0a82-237790847108',
      },
    }
  },
  computed: {
    emailInvalid() {
      return !validateEmail.validate(this.email)
    },
  },
  methods: {
    actionGoForwards() {
      this.step += 1
    },
    actionGoBackwards() {
      this.step -= 1
    },
    actionSubmitEmail() {
      if (!this.emailInvalid) {
        this.actionSubscribe()
        this.step = 1
      }
    },
    async actionSubscribe() {
      this.subscribe({
        requestURL: this.requestURL,
        callback: this.callback,
        _: '1638523153680',
      })
      this.actionGoForwards()
    },
    async subscribe(body) {
      const options = {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.stringify({
          'fields[email]': this.email,
          'fields[website]': 'Developer Portal',
          ...this.commonFormData,
          ...body,
        }),
      }
      await fetch(this.requestURL, options)
    },
  }
};
</script>

<style lang="stylus" scoped>
.fade-enter-active
  transition all .4s ease-out

.fade-leave-active
  position absolute
  top 0
  left 0
  width 100%
  transition all .2s ease-out

.fade-enter
  opacity 0
  transform translateY(.5rem)

.fade-enter-to
  opacity 1
  transform translateY(0)

.fade-leave
  opacity 1
  transform scale(1)

.fade-leave-to
  opacity 0
  transform scale(.96)

.wizard
  position relative
  margin-top var(--spacing-10)
  padding-top var(--spacing-9)
  padding-bottom var(--spacing-9)
  border-bottom 1px solid var(--semi-transparent-color-2)
  &__inner
    position relative
    max-width 48.5rem
    margin auto

.wizard-col
  position relative
  z-index 1
  display flex
  flex-direction: column
  justify-content center
  height 100%
  grid-column 1/-1
  @media screen and (min-width: 768px)
    grid-column span 4
  @media screen and (min-width: 1200px)
    grid-column: span 6
  &._top
    justify-content flex-start

.title-short
  max-width 42rem
  @media $breakpoint-xl
    max-width 45rem

.title
  max-width 55rem

.form
  width 100%
  margin-top var(--spacing-6)
  @media screen and (min-width: 768px)
    margin-top 0
  &__group
    position relative
  &__input
    display flex
    position relative
    align-items center
    justify-content center
    &__button
      position absolute
      display flex
      align-items center
      justify-content center
      right 0
      width 2.5rem
      appearance none
      background none
      border none
      padding var(--spacing-5)
      border-radius .5rem
      cursor pointer
      outline none
      opacity .8
      transition opacity .15s ease-out, transform .15s ease-out
      @media screen and (min-width: 768px)
        width 3.5rem
      &:hover,
      &:focus
        opacity 1
        transform scale(1.05)
      &:disabled
        opacity 0.65
        pointer-events none
    &__input
      outline none
      width 100%
      height 3rem
      border none
      border-radius .5rem
      padding var(--spacing-3) 4rem var(--spacing-3) var(--spacing-5)
      transition color 0.15s ease-out, background 0.15s ease-out
      background var(--background-color-secondary)
      &::placeholder
        color var(--semi-transparent-color-2)
        transition color 0.15s ease-out
      &:hover
        &:not(:focus)::placeholder
          color var(--semi-transparent-color-3)

.signup-graphics
  position relative
  z-index -1
  margin-top: -6rem

.success-graphics
  position relative
  position relative
  margin-top -2rem

.card-checkbox
  position relative
  overflow hidden
  display block
  background-color var(--background-color-secondary)
  border-radius 1.25rem
  padding 1.95rem
  padding-right 3.45rem
  user-select none
  cursor pointer
  transform none
  transition background-color 0.25s, border-color 0.25s,
    box-shadow 0.15s ease-out, transform 0.15s ease-out
  box-sizing border-box
  outline none
  &:hover
    transform translateY(-2px)
  &:hover,
  &:focus
    box-shadow 0px 12px 24px rgba(0, 0, 0, 0.07), 0px 4px 8px rgba(0, 0, 0, 0.05), 0px 1px 0px rgba(0, 0, 0, 0.05)
    .card-checkbox
      &__icon
        border-color var(--title)
  input
    position absolute
    right 0
    top 0
    width 0
    height 0
    opacity 0
    &:checked
      opacity .1
      ~ .card-checkbox
        &__icon
          border-color var(--muted)
          background-color var(--muted)
          &:after
            opacity 1
  &__icon
    position absolute
    top 1.95rem
    right 1.95rem
    width: 1.5rem
    height: 1.5rem
    border 1px solid var(--muted)
    border-radius 100%
    transition background-color 0.25s, border-color 0.25s
    &:after
      content ''
      position absolute
      opacity 0
      top 0.3rem
      left 0.25rem
      width .8rem
      height .5rem
      border-left 2px solid var(--background-color-secondary)
      border-bottom 2px solid var(--background-color-secondary)
      transition opacity 0.25s
      transform rotate(-45deg)
</style>
