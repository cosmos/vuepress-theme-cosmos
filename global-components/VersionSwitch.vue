<template lang="pug">
.versions
    .versions__wrapper(v-if="versions && versions.length > 0")
        .versions__header(@click="toggleContent()")
            icon-arrow.versions__header__icon(type="bottom" :fill="!showContent ? 'var(--semi-transparent-color-3)' : 'var(--color-text-strong)'" :class="showContent ? 'versions__header__icon__collapsed' : 'versions__header__icon__expanded'")
            .versions__header__label {{currentVersion}}
            .versions__header__question(@click.stop="navigateToVersionsPage") ?
                
        .versions__content(v-if="showContent")
            .versions__item(v-for="version in versionsItems")
                .versions__item__link(@click="changeVersion(version)") {{version}}
    .versions__banner.tm-rf-1(v-if="currentVersion != 'main'" @click="changeVersion('main')")
        img.icon-image.no-zoom(v-bind:src="$withBase('/hi-warn-icon.svg')")
        .versions__banner__text You are viewing an older version of the content, click here to switch to the current version
</template>

<script>
    export default {
        props: ['versions'],
        data: function() {
            return {
                showContent: false,
                currentVersion: this.getCurrentVersion()
            }
        },
        mounted() {
            this.currentVersion = this.getCurrentVersion();
            this.$nextTick(function () {
                this.currentVersion = this.getCurrentVersion();
            });
        },
        computed: {
            versionsItems() {
                return ["main", ...this.versions];
            }
        },
        methods: {
            toggleContent() {
                this.showContent = !this.showContent;
            },
            changeVersion(version) {
                const versionPart = version === "main" ? "" : `/${version}`;
                const pathPart = this.$route.path?.replace(`/${this.currentVersion}`, "");
                window.location.href = window.location.origin + versionPart + pathPart;
            },
            navigateToVersionsPage() {
                window.location.href = window.location.origin + "/versions.html";
            },
            getCurrentVersion() {
                let version = "main";

                if (this.$site?.base && typeof this.versions !== 'undefined') {
                    const matched = this.versions.find(item => `/${item}/` === this.$site.base) || null;
                    if (matched) version = matched;
                }

                return version;
            }
        }
    }
</script>

<style lang="stylus">
    /* global styles */

    @media screen and (max-width: 480px)
        .global__layout__content
            margin-top 10rem
</style>

<style lang="stylus" scoped>
    .versions
        margin auto

        &__wrapper
            cursor pointer
            margin auto
            margin-inline var(--spacing-8)
            position relative
            padding-inline var(--spacing-4)
            padding-block var(--spacing-2)

        &__banner
            position absolute
            top 4rem
            left 50%
            transform translateX(-50%)
            text-align center
            border-radius 16px
            background-color var(--background-color-secondary)
            padding-inline var(--spacing-4)
            padding-block var(--spacing-2)
            cursor pointer
            z-index 99
            display flex
            align-items center
            min-height 40px
            background linear-gradient(78.06deg, #f46800 1.14%, #f24cf4 98.88%)
            color #e3e3e3

            &__text
                padding-left 10px
            

        &__item
            cursor pointer
            margin-right var(--spacing-2)
            width max-content

            &__link
                &:hover
                    color var(--color-text-strong)

        &__content
            padding-inline var(--spacing-4)
            padding-block var(--spacing-2)
            position absolute
            z-index 9999
            top 0
            left calc(15px+var(--spacing-4))
            background-color var(--background-color-primary)
            border-radius 8px

        &__header
            display flex

            &__label
                width max-content

            &__question
                width 1rem
                height 0.8rem
                fill #aaa
                transition fill .15s ease-out
                margin-left var(--spacing-6)

                &:hover
                    fill var(--color-text, black)

                svg
                    height 100%

            &__icon
                width 15px
                height 15px
                margin auto
                margin-right var(--spacing-4)

                &__expanded 
                    transform rotate(180deg)
                    -webkit-transform rotate(180deg)
                    -ms-transform rotate(180deg)
                    transition transform 0.2s linear

                &__collapsed
                    transform rotate(0deg)
                    -webkit-transform rotate(0deg)
                    -ms-transform rotate(0deg)
                    transition transform 0.2s linear

    @media screen and (max-width: 480px)
        .versions
            &__wrapper
                position absolute
                z-index 100
                top 10rem
                left 0

            &__banner
                top 13rem
                right 24px
                left 24px
                transform none

</style>
