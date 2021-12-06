<template lang="pug">
    .resource__container(:class="[large && 'large']")
        .resource__icon
            img(:src="image" :alt="title")
        .resource__content
            h5.resource__title {{title}}
            .resource__description {{description}}
            .resource__links
                a(v-for="link in links" :href="link.url" target="_blank").tm-link.tm-link-external.tm-medium
                    span {{link.name}}
</template>

<script>
export default {
    props:['title', 'description', 'links', 'image', 'large']
}
</script>

<style lang="stylus" scoped>

.resource
    &__container
        padding 32px
        display flex
        flex-direction column
        justify-content space-between
        border-radius 16px
        background var(--background-color-secondary)
        height 100%

        &.large
            flex-direction row

    &__content
        display flex
        flex-direction column
        justify-content space-between
        height 100%


    &__icon
        margin-right 20px
        margin-bottom 10px
        flex-shrink 0

        img
            width 50px
            height 50px
            margin 0
            filter var(--img-filter)

    &__title
        margin-bottom 10px

    &__description
        margin-bottom 20px

    &__links
        display flex

        &__item
            margin-block auto
            margin-right 20px
            cursor pointer
            font-weight 500
            color var(--color-text-strong)
            display flex

            &__icon
                margin-left 5px
                width 10px
                height 10px

@media screen and (max-width: 480px)
    .resource
        &__container
            &.large
                flex-direction column


</style>