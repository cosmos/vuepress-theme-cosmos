<template lang="pug">
div
    .feedback__wrapper 
        .feedback__title Rate this Page
        .feedback__container(v-show="showFeedbackContainer && !showCaptcha")
            button.feedback__rating(v-on:click="showFeedbackForm('good')")
                .feedback__rating__icon__box(:class="[rating == 'good' && 'feedback__rating__icon__box__selected']")
                    img.feedback__rating__icon(src="./images/feedback-icon-good.svg" alt="icon smile")
            button.feedback__rating(v-on:click="showFeedbackForm('medium')")
                .feedback__rating__icon__box(:class="[rating == 'medium' && 'feedback__rating__icon__box__selected']")
                    img.feedback__rating__icon(src="./images/feedback-icon-medium.svg" alt="icon meh")
            button.feedback__rating(v-on:click="showFeedbackForm('bad')")
                .feedback__rating__icon__box(:class="[rating == 'bad' && 'feedback__rating__icon__box__selected']")
                    img.feedback__rating__icon(src="./images/feedback-icon-bad.svg" alt="icon frown")

        .feedback__form(id="feedback_form" v-show="showForm")
            form(ref="form" id="page_rating_form" method="POST")
                .feedback__form__content(v-show="!showCaptcha")
                    .feedback__form__content__control
                        div Would you like to add a message?
                        textarea.feedback__form__content__control__textarea(name="f_message")
                    .feedback__form__content__control
                        .feedback__form__content__control__submit.tm-button.mt-4(v-on:click="submitFeedbackForm") Submit
                    input(type="hidden" name="f_page" :value="page")
                    input(type="hidden" name="f_rating" :value="rating")
                .feedback__form__captcha(id="g-recaptcha")

        .feedback__success(v-show="isSubmitted") Thank you for your Feedback!

    client-only
        script(src="https://www.google.com/recaptcha/api.js" async defer)

</template>

<style lang="stylus" scoped>

    .feedback

        &__success
            margin-top 32px

        &__wrapper
            text-align center
            margin-bottom 60px

        &__container
            display flex
            width 180px
            margin-inline auto
            margin-block 32px

        &__rating
            background none
            border none
            padding 0
            cursor pointer

            &__icon
                width 30px
                filter var(--img-filter)
                margin-block 0px

                &__box
                    padding 16px

                    &__selected
                        background var(--background-color-secondary)
                        border-radius 16px

                    &:hover:not(:active)
                        transform translateY(-2px)
                        transition-duration 0.1s

        &__form

            &__captcha
                margin-top 32px
                margin-inline auto
                display table

            &__content

                &__control
                    margin-top 16px
                    width 70%
                    display flex
                    flex-direction column
                    justify-content center
                    margin-inline auto

                    &__textarea
                        height 100px
                        margin-top 32px
                        background var(--background-color-secondary)
                        padding-inline 16px
                        padding-block 10px
                        border-radius 8px
                        color var(--color-text-strong)
                        border none
                        overflow auto
                        outline none
                        -webkit-box-shadow none
                        -moz-box-shadow none
                        box-shadow none
                        resize none
                        font-family inherit

                        &:hover:not(:active)
                            transform translateY(-2px)
                            transition-duration 0.1s

                    &__submit
                        width fit-content
                        margin-inline auto

    @media screen and (max-width: 480px)
        .feedback__form__content__control
            width 100%

</style>

<script>
    export default {
        data() {
            return {
                showFeedbackContainer: true,
                showCaptcha: false,
                showForm: false,
                isSubmitted: false,
                rating: "",
                page: "",
                message: ""
            }
        },
        updated() {
            this.$nextTick(function () {
                if (this.showCaptcha) {
                    this.renderCaptchaBox();
                }
            });
        },
        methods: {
            showFeedbackForm(rating) {
                this.showForm = true;
                this.rating = rating;
                this.page = window?.location.href;
            },
            submitFeedbackForm() {
                this.showCaptcha = true;
            },
            renderCaptchaBox() {
                if (window && window.grecaptcha) {
                    window.grecaptcha.render(
                        'g-recaptcha', 
                        {
                            'sitekey': this.$themeConfig.feedback.captchaSiteKey,
                            'callback': (response) => {
                                this.sendFeedback();
                            }
                        }
                    );
                }
            },
            sendFeedback() {
                const form = this.$refs.form;
                const endpoint = "https://formspree.io/f/" + this.$themeConfig.feedback.formId;

                var formData = new FormData(form);

                const fetchOptions = {
                    method: "POST",
                    headers: {
                        "Accept": "application/json"
                    },
                    body: formData
                }

                fetch(endpoint, fetchOptions)
                .then(response => response.json())
                .then(_ => {
                    this.isSubmitted = true;
                    this.showForm = false;
                    this.showFeedbackContainer = false;
                    this.showCaptcha = false;
                });
            }
        }
    }
</script>