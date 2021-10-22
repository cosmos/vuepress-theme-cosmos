<template lang="pug">
    .header
        .header__nav
            .header__nav__logo
                a(:href="$themeConfig.footer.textLink.url" target="_blank" rel="noreferrer noopener" tag="div").logo__image
                    component(:is="`logo-${$themeConfig.label}-text`" v-if="$themeConfig.label" fill="black")
                    img(:src="$themeConfig.footer.logo" v-else-if="$themeConfig.custom")
            .header__nav__actions
                .header__nav__actions__item(v-for="item in $frontmatter.nav.items")
                    a.overline-label(:href="item.url") {{item.name}}
            .header__nav__links
                a.overline-label Get ATOM
                icon-arrow(type="right").header__nav__links__icon
            .header__nav__mobile__menu
                icon-menu
        .header__search
            search-bar
</template>

<style lang="stylus" scoped>
    .header
            
        &__nav
            display flex
            justify-content space-between
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
                margin-block auto

                &__icon
                    margin-block auto
                    margin-left 5px
                    width 15px
                    height 15px

                .overline-label
                    text-transform none
                    color var(--color-text-strong)
                    width max-content

            &__actions
                display flex
                justify-content center
                width 100%

                &__item
                    padding-inline 16px
                    margin-block auto

                .overline-label
                    text-transform none
                    color var(--color-text-strong)

            &__mobile__menu
                display none

        &__search
            padding-inline 128px

            @media screen and (max-width: 480px)
                padding-inline 24px
            
            @media screen and (min-width: 480px) and (max-width: 1024px)
                padding-inline 48px

    @media screen and (max-width: 480px)
        .header__nav

            &__actions
                display none
                
            &__links
                display none

            &__mobile__menu
                display flex
</style>