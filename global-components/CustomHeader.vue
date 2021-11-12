<template lang="pug">
    .header
        .header__nav
            .header__nav__logo
                a(:href="$themeConfig.footer.textLink.url" target="_blank" rel="noreferrer noopener" tag="div").logo__image
                    component(:is="`logo-${$themeConfig.label}-text`" v-if="$themeConfig.label" fill="black")
                    img(:src="$themeConfig.footer.logo" v-else-if="$themeConfig.custom")
            .header__nav__actions
                h4.tm-title.tm-rf2.tm-lh-title.tm-medium Cosmos Academy
                //- .header__nav__actions__item(v-for="item in navItems")
                //-     a.tm-overline.tm-rf-1.tm-lh-title.tm-medium.tm-muted(:href="item.url") {{item.name}}
            .header__nav__links
                a.tm-link.tm-rf-1(href="https://cosmos.network/learn/get-atom/" target="_blank")
                    span Get ATOM
                    icon-arrow(type="right").icon-external
            .header__nav__mobile__menu(@click="toggleSidebar" v-if="!hideMobileMenu")
                icon-menu
        .header__search
            search-bar
</template>

<style lang="stylus" scoped>
    .tm-title
        margin-block 0px

    .header-compact
        position fixed
        top 0
        left 0
        z-index 999999
        width 100%
        background var(--background-color-primary)
    
    .logo__image
        svg
            max-width 6.140625rem
            height auto

    .header
            
        &__nav
            display flex
            justify-content space-between
            align-items baseline
            border-bottom 1px solid var(--semi-transparent-color-2)
            padding-inline 128px
            padding-block 24px

            @media screen and (max-width: 480px)
                padding-inline 24px
            
            @media screen and (min-width: 480px) and (max-width: 1024px)
                padding-inline 48px

            &__logo
                filter var(--img-filter)

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
            padding-block 8px
            padding-inline 128px
            transition all .25s linear

            @media screen and (max-width: 480px)
                padding-inline 24px
            
            @media screen and (min-width: 480px) and (max-width: 1024px)
                padding-inline 48px

    @media screen and (max-width: 480px)
        .header__nav

            &__actions
                display none
                
            &__links
                margin-block auto

            &__mobile__menu
                display flex
</style>

<script>
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
    methods: {
        toggleSidebar() {
            this.$emit('mobileSidebar', true);
        }
    }
}
</script>