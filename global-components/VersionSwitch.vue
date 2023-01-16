<template lang="pug">
    .versions__wrapper(v-if="versions && versions.length > 0")
        .versions__header(@click="toggleContent()")
            icon-arrow.versions__header__icon(type="bottom" :fill="!showContent ? 'var(--semi-transparent-color-3)' : 'var(--color-text-strong)'" :class="showContent ? 'versions__header__icon__collapsed' : 'versions__header__icon__expanded'")
            .versions__header__label {{currentVersion}}
        .versions__content(v-if="showContent")
            .versions__item(v-for="version in versionsItems")
                .versions__item__link(@click="changeVersion(version)") {{version}}
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
            getCurrentVersion() {
                const path = this.$route.path?.split('/') || null;

                let version = "master";

                if (path && path.length > 0) {
                    const matched = this.versions.find(item => item === path[1]) || null;
                    if (matched) version = matched;
                }

                return version;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .versions
        &__wrapper
            margin auto
            margin-inline var(--spacing-8)
            position relative
            padding-inline var(--spacing-4)
            padding-block var(--spacing-2)

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
</style>
