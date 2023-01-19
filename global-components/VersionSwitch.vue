<template lang="pug">
.versions
    .versions__wrapper(v-if="versions && versions.length > 0")
        .versions__header(@click="toggleContent()")
            icon-arrow.versions__header__icon(type="bottom" :fill="!showContent ? 'var(--semi-transparent-color-3)' : 'var(--color-text-strong)'" :class="showContent ? 'versions__header__icon__collapsed' : 'versions__header__icon__expanded'")
            .versions__header__label {{currentVersion}}
            .versions__header__question(@click.stop="navigateToVersionsPage")
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M96 96c-17.7 0-32 14.3-32 32s-14.3 32-32 32s-32-14.3-32-32C0 75 43 32 96 32h97c70.1 0 127 56.9 127 127c0 52.4-32.2 99.4-81 118.4l-63 24.5 0 18.1c0 17.7-14.3 32-32 32s-32-14.3-32-32V301.9c0-26.4 16.2-50.1 40.8-59.6l63-24.5C240 208.3 256 185 256 159c0-34.8-28.2-63-63-63H96zm48 384c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40z"/></svg>
        .versions__content(v-if="showContent")
            .versions__item(v-for="version in versionsItems")
                .versions__item__link(@click="changeVersion(version)") {{version}}
    .versions__banner.tm-rf-1(v-if="currentVersion != 'master'" @click="changeVersion('master')") You are viewing an older version of the content, click here to switch to the current version
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
                return ["master", ...this.versions];
            }
        },
        methods: {
            toggleContent() {
                this.showContent = !this.showContent;
            },
            changeVersion(version) {
                const versionPart = version === "master" ? "" : `/${version}`;
                const pathPart = this.$route.path?.replace(`/${this.currentVersion}`, "");
                window.location.href = window.location.origin + versionPart + pathPart;
            },
            navigateToVersionsPage() {
                window.location.href = window.location.origin + "/versions";
            },
            getCurrentVersion() {
                let version = "master";

                if (this.$site?.base) {
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
            margin-top var(--spacing-12)
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
                height 1rem
                fill #aaa
                transition fill .15s ease-out
                margin-left var(--spacing-6)

                &:hover
                    fill var(--color-text, black)

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
                z-index 9999
                top 10rem
                left 0

            &__banner
                top 10rem
                right 24px
                width 60%
                left auto
                transform none

</style>
