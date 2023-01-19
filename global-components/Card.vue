<template lang="pug">
    .card(v-bind:style="this.imageUrl ? {'background-image': `url(${$withBase(this.imageUrl)})`} : {}" :class="bigCard && '_big-card'")
        .card__content(:class="!this.imageUrl ? 'card__content__small' : ''")
            slot
</template>

<script>
export default {
    props: ['imageUrl', 'mobileImageUrl', 'bigCard'],
}
</script>

<style lang="stylus" scoped>

    .card
        border-radius 20px
        background-color var(--background-color-secondary)
        background-repeat no-repeat
        background-position right
        background-size auto 120%
        padding var(--spacing-8)
        display flex
        &._big-card
            padding var(--spacing-10)

        &__image
            display none

        &__content
            width 60%

            &__small
                width 100%

    @media screen and (max-width: 480px)
        .card
            padding 24px
            flex-direction column
            background-position bottom
            background-size auto 70%

            &__image
                display block
                margin -24px
                border-bottom-left-radius 20px
                border-bottom-right-radius 20px

            &__content
                padding-bottom 400px
                width 100%

                &__small
                    padding-bottom 0px

    @media screen and (min-width: 481px) and (max-width: 1024px)
        .card
            background-size auto 100%


    @media screen and (min-width: 481px) and (max-width: 732px)
        .card
            background-size auto 50%
</style>