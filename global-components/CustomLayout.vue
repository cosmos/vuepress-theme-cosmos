<template lang="pug">
    div.custom__layout
        .mode-switch-container
            .mode-switch-container__wrapper
                tm-mode-switch
        custom-header
        .custom__layout__content
            slot

        .custom__layout__footer
            tm-footer(full="true")
</template>

<style lang="stylus" scoped>
    .mode-switch-container
        position absolute
        padding-top 1rem
        top 3rem
        left 50%
        margin-inline auto

        &__wrapper
            position relative
            left -50%

    .custom__layout

        &__footer
            padding-inline 128px
            max-width var(--content-max-width) 
            margin auto

            @media screen and (max-width: 480px)
                padding-inline 24px
            
            @media screen and (min-width: 480px) and (max-width: 1024px)
                padding-inline 48px

        &__content
            padding-inline 128px
            margin auto

            @media screen and (max-width: 480px)
                padding-inline 24px
            
            @media screen and (min-width: 480px) and (max-width: 1024px)
                padding-inline 48px
        
            &__intro

                &__title
                    margin-block 10px

                &__desc
                    margin-top 20px

                &__link
                    display flex
                    font-weight 500
                    color var(--color-text-strong)
                    margin-top 20px
                    cursor pointer

                    &__icon
                        margin-block auto
                        margin-left 5px
                        width 15px
                        height 15px

            &__support

                &__title
                    margin-block 10px

                &__desc
                    margin-top 20px

                &__action
                    background var(--color-text)
                    font-weight 500
                    color var(--background-color-primary)
                    margin-top 40px
                    border-radius 10px
                    padding-block 20px
                    padding-inline 60px
                    width fit-content
                    
                    a
                        display flex

                        svg
                            fill var(--background-color-primary)
                            width 10px
                            height 10px

    .tutorials
        display flex

        @media screen and (max-width: 480px)
            flex-direction column

        &__item
            &__small
                width 25vw
                flex-grow 0

                &__title
                    margin-block 20px

                &__desc
                    margin-bottom 20px

                .card
                    margin-top 32px

                @media screen and (min-width: 481px) and (max-width: 1024px)
                    width 50%
                    margin-right: 16px

                @media screen and (max-width: 480px)
                    width 100%

            &__large
                flex-grow 1
                border-radius 20px
                background-color var(--background-color-secondary)
                background-repeat no-repeat
                background-position right
                background-size cover
                padding 48px
                margin-left: 32px
                display flex
                flex-direction column
                justify-content end
                margin-top 32px

                @media screen and (min-width: 481px) and (max-width: 1024px)
                    width 50%
                    margin-left: 16px

                @media screen and (max-width: 480px)
                    width 100%
                    margin-left: 0px
                    padding 24px
                    padding-top 192px

    .tools
        margin-top 32px
        display flex
        flex-wrap wrap
        width 100%

        &__item
            padding 10px
            width 50%

            @media screen and (max-width: 480px)
                width 100%
            
            &__container
                border-bottom 1px solid var(--semi-transparent-color-2)
                display flex
                height 100%
                margin-block 10px

                @media screen and (max-width: 1024px)
                    flex-direction column

            &__icon
                margin-right 20px
                margin-bottom 10px

                img
                    width 50px
                    height 50px
                    margin 0
                    filter var(--img-filter)
            
            &__content

                &__title
                    margin-bottom 10px

                &__description
                    margin-bottom 20px

                &__links
                    display flex

    .articles
        padding-top: 32px
        display flex
        overflow hidden
        overflow-x auto
        -ms-overflow-style none
        scrollbar-width none
        width 100vw
        margin-left calc(50% - 50vw)
        padding-inline calc(50vw - 50%)

        &::-webkit-scrollbar
            display none

        &__item
            padding-inline 15px

            &:last-child
                padding-right 0px
            
            &:first-child
                padding-left 0px

            &__container
                background var(--background-color-secondary)
                border-radius 20px
                display flex
                flex-direction column
                height 100%
                width 25vw

                @media screen and (min-width: 481px) and (max-width: 1024px)
                    width 40vw

                @media screen and (max-width: 480px)
                    width 80vw

            &__image
                height 200px
                flex-grow 0
                background-size cover
                border-top-left-radius 20px
                border-top-right-radius 20px

            &__content
                padding 48px
                flex-grow 1
                display flex
                flex-direction column
                justify-content space-between

                @media screen and (min-width: 481px) and (max-width: 1024px)
                    padding 32px

                @media screen and (max-width: 480px)
                    padding 24px

                &__title
                    margin-block 20px

    .link
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
    
    .tools__wrapper
        margin-top 50px

    .tutorials__wrapper
        margin-top 50px

    .articles__wrapper
        margin-top 50px

        &__title
            display flex
            justify-content space-between

        .link
            margin-right 0px

</style>