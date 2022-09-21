<template lang="pug">
    .module__wrapper(v-on:click="toggleContent")
        .module
            .module__number.tm-overline.tm-rf-1.tm-lh-title.tm-medium.tm-muted.mt-2(v-if="main") {{this.weekly === true ? "week" : "module"}} {{this.module.number}}
            .module__content__wrapper(:class="[main && 'module__content__wrapper__main']")
                .module__content(v-if="main")
                    h4.module__content__title {{this.module.title}}
                    .module__content__desc {{this.module.description}}
                .module__actions(:class="main && 'module__actions__main'" v-if="main")
                    .module__actions__toggle
                        .module__actions__toggle__label {{submodules.length}} pages
                        icon-arrow(type="bottom" :class="expanded ? 'hide-icon' : 'show-icon'").module__actions__toggle__icon
                    a.module__actions__start.tm-button(:href="this.module.url" v-on:click="toggleContent")
                        .tm-link.tm-link-disclosure
                            span Start here
                .module__submodules(v-show="expanded" :class="[main && 'module__submodules__main']")
                    a.module__submodules__item(v-for="submodule in submodules" :href="submodule.url" v-on:click="toggleContent")
                        .module__submodules__item__content
                            h5.module__submodules__item__content__title
                                span {{submodule.title}}
                            .module__submodules__item__content__desc {{submodule.description}}
                        .module__submodules__item__badges.mb-4(v-if="submodule.tags && isBadgeVisible()" v-for="tag in submodule.tags")
                            .module__submodules__item__badges__item(v-if="$themeConfig.tags[tag]" v-bind:style="{'background': $themeConfig.tags[tag].color || ''}") {{$themeConfig.tags[tag].label || ''}}
                        .module__submodules__item__start
                            .module__submodules__item__start__icon
                                icon-arrow(type="right")
                            .module__submodules__item__start__label.tm-link.tm-link-disclosure
                                span Start here
</template>

<script>
    import { isIDAMode } from "../utils/helpers";
    export default {
        props: ['module', 'main', 'weekly'],
        data() {
            return {
                expanded: !this.main || false
            };
        },
        computed: {
            submodules() {
                if (this.main) {
                    return this.module.submodules.filter(item => item.url != this.$page.path);
                } else {
                    return this.getSubmodules(this.$site.pages, this.$page.path);
                }
            }
        },
        methods: {
            isBadgeVisible() {
                return !this.$themeConfig.isIDAMode;
            },
            toggleContent() {
                this.expanded = !this.expanded;
            },
            getSubmodules(sitePages, pagePath) {
                const path = pagePath.split("/").filter(item => item !== "")[1];
                const submodules = sitePages
                    .filter(page => page.path.includes(path) && (page.path != pagePath))
                    .sort((a, b) => a.frontmatter.order - b.frontmatter.order)
                    .map((item) => {
                        return {
                            url: item.path,
                            title: item.frontmatter.title,
                            description: item.frontmatter.description,
                            tag: item.frontmatter.tag
                        }
                    });
                return submodules;
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
            transition all 0.2s linear

            &__main
                margin-top 48px
                border-top 1px solid var(--semi-transparent-color-2)

            &__item
                display flex
                justify-content space-between
                padding-block 32px
                border-bottom 1px solid var(--semi-transparent-color-2)

                &:last-child
                    border-bottom none

                &__main
                    &:last-child
                        border-bottom 1px solid var(--semi-transparent-color-2)

                &__badges
                    display flex
                    margin-block auto
                    margin-right 16px
                    flex-shrink 0

                    &__item
                        border-radius 8px
                        padding 8px
                        flex-shrink 0
                        height fit-content
                        
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
                margin-block auto
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
            max-width 60%

            &__wrapper
                flex-grow 1
                display flex
                flex-wrap wrap
                justify-content space-between

                &__main
                    margin-left 48px

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
                max-width 100%

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
                max-width 100%
                &__wrapper
                    margin-top 24px
                    margin-left 0px

            &__actions
                margin-top 24px
                width 100%

            &__submodules__item__badge
                margin-inline 24px

</style>
