<template lang="pug">
    .tag__wrapper(:style="{'--tag-color': color}")
        .tag__large(v-if="!compact" :class="{'tag__large__active': active, 'tag__large__active__bright': (active && bright)}") {{label}}
        .tag__compact(v-if="compact" :tag-content="label")
</template>

<script>
    export default {
        props: ['label', 'color', 'active', 'compact', 'bright']
    }
</script>

<style lang="stylus" scoped>
    .tag
        &__wrapper
            position relative

        &__large
            border-radius 8px
            padding 8px
            flex-shrink 0
            height fit-content
            margin-block auto
            border 1px solid var(--semi-transparent-color-3)
            background none
            color var(--semi-transparent-color-3)
            font-size var(--font-size--1)
            cursor pointer
            border 1px solid var(--tag-color)
            color var(--tag-color)
            width max-content

            &__active
                background var(--tag-color)
                border-color var(--tag-color)
                color white !important

                &__bright
                    color black !important

        &__compact
            width 8px
            height 8px
            margin-block auto
            border-radius 4px
            background var(--tag-color)
            position relative

            &:hover:after
                display block
            &:hover:before
                display block

            &:after
                content attr(tag-content)
                border-radius 0.25rem
                max-width 6rem
                color black
                position absolute
                top -2rem
                left 50%
                padding 7px 4px
                white-space nowrap
                transform translateX(-50%)
                font-size 0.8125rem
                line-height 1
                letter-spacing 0
                background white
                display none
            
            &::before
                content ''
                background-image url("data:image/svg+xml,  <svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 24 24'><path fill='white' d='M12 21l-12-18h24z'/></svg>")
                position absolute
                width 8px
                height 8px
                top -0.4rem
                left 50%
                font-size 0.5rem
                transform translateX(-50%)
                display none
            
</style>