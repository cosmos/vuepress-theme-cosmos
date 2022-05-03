<template lang="pug">
    .header
        .header__nav
            .header__nav__logo
                a(href="/" rel="noreferrer noopener" tag="div").logo__image
                    img(src="./images/ida-logo.svg" v-if="showIDALogo")
                    component(:is="`logo-${$themeConfig.label}-text`" v-else-if="$themeConfig.label" fill="black")
                    img(:src="logoSrc" v-else-if="$themeConfig.custom")
            .header__search
                search-bar
            .header__nav__links
            .header__nav__mobile__menu(@click="toggleSidebar" v-if="!hideMobileMenu")
                icon-menu
        .header__search__mobile
            search-bar
</template>

<style lang="stylus" scoped>
    .tm-title
        margin-block 0px
        font-size var(--font-size-2)

    .header-compact
        position fixed
        top 0
        left 0
        z-index 99
        width 100%
        background var(--background-color-primary)
    
    .logo__image
        margin-block auto
        svg
            max-width 6.140625rem
            height auto

    .header
        display flex
        transition all .25s linear
            
        &__nav
            display flex
            justify-content space-between
            align-items center
            padding-inline 64px
            width 100%
            max-width var(--content-max-width-big)
            margin-inline auto

            @media screen and (max-width: 480px)
                padding-inline 24px
            
            @media screen and (min-width: 480px) and (max-width: 1024px)
                padding-inline 48px

            &__logo
                filter var(--img-filter)
                height 100%
                display flex
                padding-top 8px

            &__links
                display flex
                white-space nowrap

            &__actions
                display flex
                justify-content center
                width 100%

                &__item
                    padding-inline 16px
                    margin-block auto

            &__mobile__menu
                display none

        &__search
            flex-grow 1
            margin-left 32px
            padding-block 16px

            &__mobile
                display none

    @media screen and (max-width: 480px)
        .header
            flex-direction column

            &__nav
                padding-block 24px
                border-bottom 1px solid var(--semi-transparent-color-2)

            &__search
                display none

                &__mobile
                    display block
                    padding-inline 24px
        
            &__nav

                &__actions
                    display none
                    
                &__links
                    margin-block auto

                &__mobile__menu
                    display flex
</style>

<script>
import { isIDAMode } from "../utils/helpers";
export default {
    props: ["hideMobileMenu"],
    data() {
        return {
            sidebarOpened: false,
            navItems: [
                {
                    name: 'Learn',
                    url: '/'
                },
                {
                    name: 'Explore',
                    url: '/'
                },
                {
                    name: 'Build',
                    url: '/'
                }
            ] 
        }
    },
    computed: {
        showIDALogo() {
            return isIDAMode(this.$themeConfig.allowedIDAOrigins);
        }
    },
    methods: {
        toggleSidebar() {
            this.$emit('mobileSidebar', true);
        }
    }
}
</script>