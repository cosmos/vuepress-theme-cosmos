<template lang="pug">
    .card(v-bind:style="this.imageUrl ? {'background-image': `url(${this.imageUrl})`} : {}")
        .card__content(:class="this.imageUrl ? 'card__content__small' : ''")
            slot
        img(v-if="this.mobileImageUrl" :src="this.mobileImageUrl").card__image
</template>

<script>
export default {
    props: ['imageUrl', 'mobileImageUrl'],
}
</script>

<style lang="stylus" scoped>

    .card
        border-radius 20px
        background-color var(--background-color-secondary)
        background-repeat no-repeat
        background-position right
        background-size cover
        padding 48px
        margin-top 50px
        display flex

        &__image
            display none

        @media screen and (max-width: 480px)
            padding 24px
            flex-direction column
            background-image none !important

            &__image
                display block
                margin -24px
                border-bottom-left-radius 20px
                border-bottom-right-radius 20px

        &__content

            &__small
                width 60%

                @media screen and (max-width: 480px)
                    width 100%

</style>