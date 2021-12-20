<template lang="pug">
    .faq__wrapper(v-on:click="toggleContent" :class="[expanded && 'faq__wrapper__expanded']")
        .faq__icon
            img(src="./images/faq-icon-dash.svg" v-if="expanded")
            img(src="./images/faq-icon-plus.svg" v-if="!expanded")
        .faq__title.tm-bold(:class="expanded ? 'tm-title' : 'tm-muted'") {{title}}
        .faq__desc(v-if="expanded" v-html="description")
</template>

<script>
    export default {
        props: ['title', 'description'],
        data() {
            return {
                expanded: false
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
.faq
    &__wrapper
        cursor pointer
        padding-top 32px
        padding-bottom 16px
        border-bottom 1px solid var(--semi-transparent-color-2)
        position relative

        &:hover
            border-bottom 1px solid var(--color-text-strong)

            .faq__title
                color var(--color-text-strong)


        &__expanded
            border-bottom 1px solid var(--color-text-strong)

    &__title
        margin-right 24px

    &__desc
        margin-top 16px

    &__icon
        position absolute
        right 0
        filter var(--img-filter)

        img
            margin-block 0px

</style>