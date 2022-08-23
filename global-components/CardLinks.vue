<template lang="pug">
    .card__wrapper
        tm-image.card__image(:src="image")
        h4.card__title(v-if="title") {{title}}
        .card__description(v-if="description" v-html="description")
        .card__link(v-for="item of items" v-if="items && items.length > 0")
            ul
                li
                    a.card__link__title(:href="item.url" v-if="item.title && item.url") {{item.title}}
</template>

<script>
    export default {
        props: ['image', 'title', 'description', 'links'],
        computed: {
            items() {
                let items = [];

                if (this.links && this.links.length > 0) {
                    for (var link of this.links) {
                        let item = link;
                        if (typeof link != 'Object') {
                            item = this.getPageData(link);
                        }

                        if (item) items.push(this.formatItem(item));
                    }
                }

                return items;
            }
        },
        methods: {
            getPageData(path) {
                return this.$site.pages.find(item => item.path === path || item.regularPath === path || item.relativePath === path) || null;
            },
            formatItem(item) {
                return {
                    title: item.frontmatter?.title || item.title, 
                    description: item.frontmatter?.description || item.description,
                    url: item.path
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .card

        &__wrapper
            display flex
            flex-direction column
        
        &__image
            max-height 30vh
            width fit-content
            margin-bottom 0
            margin-inline auto
        
        &__title
            margin-bottom 1rem
</style>