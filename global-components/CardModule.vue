<template lang="pug">
    .module__wrapper(v-on:click="toggleContent")
        .module
            .module__number.tm-overline.tm-rf-1.tm-lh-title.tm-medium.tm-muted.mt-2 module {{this.module.number}}
            .module__content
                h4.module__content__title {{this.module.title}}
                .module__content__desc {{this.module.description}}
            .module__actions
                .module__actions__toggle
                    .module__actions__toggle__label(v-text="expanded ? 'Hide contents' : 'Show contents'")
                    icon-arrow(type="right" :class="expanded ? 'hide-icon' : 'show-icon'")
                a.module__actions__start.tm-button(:href="this.module.url" v-on:click="toggleContent")
                    .tm-link.tm-link-disclosure
                        span Start here
        .module__submodules(v-show="expanded")
            a.module__submodules__item(v-for="submodule in this.module.submodules" v-if="!$page.path.includes(submodule.url)" :href="submodule.url" v-on:click="toggleContent")
                .module__submodules__item__content
                    h5.module__submodules__item__content__title
                        span {{submodule.title}}
                    .module__submodules__item__content__desc {{submodule.description}}
                .module__submodules__item__badge.mb-4(v-if="submodule.tag && $themeConfig.tags[submodule.tag]" v-bind:style="{'background': $themeConfig.tags[submodule.tag].color || ''}") {{$themeConfig.tags[submodule.tag].label || ''}}
                .module__submodules__item__start
                    .module__submodules__item__start__icon
                        icon-arrow(type="right")
                    .module__submodules__item__start__label.tm-link.tm-link-disclosure
                        span Start here
</template>

<script>
    export default {
        props: ['module', 'startExpanded'],
        data() {
            return {
                expanded: this.startExpanded || false
            };
        },
        methods: {
            toggleContent(event) {
                this.expanded = !this.expanded;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .start-icon
        margin-left 5px
        width 15px
        height 15px

    .module
        display flex
        justify-content space-between

        &__wrapper
            display flex
            flex-direction column
            cursor pointer

        &__number
            width 128px

        &__submodules
            display flex
            flex-direction column
            margin-top 48px
            margin-bottom 32px
            margin-left 144px
            border-top 1px solid var(--semi-transparent-color-2)

            &__item
                display flex
                justify-content space-between
                padding-block 32px
                border-bottom 1px solid var(--semi-transparent-color-2)

                &__badge
                    border-radius 8px
                    padding 8px
                    flex-shrink 0
                    height fit-content
                    margin-inline 40px
                    margin-block auto

                &__content
                    display flex
                    flex-grow 1
                    flex-direction column

                    &__title
                        margin-bottom 4px
                        width fit-content

                &__start
                    flex-shrink 0
                    margin-block auto

                    &__label
                        display none

                    &__icon
                        display block
                        width 27px
                        height 27px

        &__actions
            display flex
            align-items center
            justify-content space-between
            color var(--color-text-strong)

            &__toggle
                display flex
                height fit-content
                cursor pointer

                .show-icon
                    margin-block auto
                    margin-left 5px
                    margin-right 16px
                    width 15px
                    height 15px
                    transform rotate(90deg)
                    -webkit-transform rotate(90deg)
                    -ms-transform rotate(90deg)
                    transition: transform 0.2s linear;
                
                .hide-icon
                    margin-block auto
                    margin-left 5px
                    margin-right 16px
                    width 15px
                    height 15px
                    transform rotate(-90deg)
                    -webkit-transform rotate(-90deg)
                    -ms-transform rotate(-90deg)
                    transition: transform 0.2s linear;

            &__start
                border 1px solid var(--color-text-strong)
                border-radius 6px
                padding 24px 48px
                background none
                color var(--color-text-strong)

        &__content
            flex-grow 1
            margin-left 16px

            &__desc
                margin-top 4px
                font-size 21px

    @media screen and (max-width: 480px)
        .module
            flex-direction column

            &__number
                width 100%

            &__submodules
                margin-left 0px

                &__item
                    flex-direction column

                    &__content
                        order 2
                        margin-block 24px

                    &__badge
                        margin-inline 0px
                        order 1
                        width fit-content

                    &__start
                        order 3

                        &__label
                            display block
                            width fit-content

                        &__icon
                            display none

            &__content
                margin-left 0px
                margin-top 16px

                &__title
                    margin-block 8px

            &__actions
                margin-top 24px

                &__toggle
                    .hide-icon
                        margin-right 8px
                    .show-icon
                        margin-right 8px


</style>