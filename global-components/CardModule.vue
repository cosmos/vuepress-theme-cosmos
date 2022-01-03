<template lang="pug">
    .module__wrapper(v-on:click="toggleContent")
        .module
            .module__number.tm-overline.tm-rf-1.tm-lh-title.tm-medium.tm-muted.mt-2 module {{this.module.number}}
            .module__content__wrapper
                .module__content
                    h4.module__content__title {{this.module.title}}
                    .module__content__desc {{this.module.description}}
                .module__actions(:class="$frontmatter.main && 'module__actions__main'")
                    .module__actions__toggle
                        .module__actions__toggle__label {{submodules.length}} pages
                        icon-arrow(type="bottom" :class="expanded ? 'hide-icon' : 'show-icon'").module__actions__toggle__icon
                    a.module__actions__start.tm-button(:href="this.module.url" v-on:click="toggleContent")
                        .tm-link.tm-link-disclosure
                            span Start here
                .module__submodules(v-show="expanded")
                    a.module__submodules__item(v-for="submodule in submodules" :href="submodule.url" v-on:click="toggleContent")
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
        computed: {
            submodules() {
                return this.module.submodules.filter(item => item.url != this.$page.path);
            }
        },
        methods: {
            toggleContent(event) {
                this.expanded = !this.expanded;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .module
        display flex
        justify-content space-between

        &__wrapper
            display flex
            flex-direction column
            cursor pointer

        &__number
            flex-shrink 0

        &__submodules
            flex-grow 1
            width 100%
            display flex
            flex-direction column
            margin-top 48px
            border-top 1px solid var(--semi-transparent-color-2)
            transition: all 0.2s linear;

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
                    color white

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
                        width 24px
                        height 24px

        &__actions
            display flex
            align-items center
            justify-content space-between
            color var(--color-text-strong)
            margin-top 24px
            width 100%

            &__main
                margin-top auto
                width auto

            &__toggle
                display flex
                height fit-content
                cursor pointer
                align-items center

                &__icon
                    margin-block auto
                    margin-left 12px
                    margin-right 32px
                    width 15px
                    height 15px
                    transition: transform 0.2s linear;


                .show-icon
                    padding-top 4px
                    transform rotate(0deg)
                    -webkit-transform rotate(0deg)
                    -ms-transform rotate(0deg)
                
                .hide-icon
                    transform rotate(180deg)
                    -webkit-transform rotate(180deg)
                    -ms-transform rotate(180deg)

            &__start
                border 1px solid var(--color-text-strong)
                border-radius 6px
                padding 24px 48px
                background none
                color var(--color-text-strong)

        &__content
            flex-grow 1

            &__wrapper
                flex-grow 1
                margin-left 48px
                display flex
                flex-wrap wrap

            &__title
                margin-top 0px

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
                        margin-bottom 24px

                    &__badge
                        margin-inline 0px
                        order 1
                        width fit-content
                        margin-bottom 24px

                    &__start
                        order 3

                        &__label
                            display block
                            width fit-content

                        &__icon
                            display none

            &__content

                &__wrapper
                    flex-direction column
                    margin-top 24px
                    margin-left 0px

                &__title
                    margin-block 8px

            &__actions
                margin-top 24px
                flex-direction row-reverse

                &__toggle
                    &__icon
                        margin-left 8px
                        margin-right 0px

    @media screen and (min-width: 481px) and (max-width: 1024px)
        .module
            flex-direction column

            &__content
                &__wrapper
                    margin-top 24px
                    margin-left 0px

            &__actions
                margin-top 24px
                width 100%

            &__submodules__item__badge
                margin-inline 24px

</style>