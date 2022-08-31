<template lang="pug">
    .card__wrapper
        tm-image.card__image(:src="image")
        h4.card__title(v-if="titleText" :class="{'tm-link': singleState, 'tm-link-disclosure': singleState}") {{titleText}}
        .card__description(v-if="descriptionText" v-html="descriptionText")
        .card__link(v-for="item of items" v-if="items && items.length > 1")
            ul
                li
                    a.card__link__title(:href="item.url" v-if="item.title && item.url") {{item.title}}
</template>

<script>
    /**
     * Card component to link one or many pages. 
     * If a path is passed and it matches with a page in the site, the component pulls the data such as title, description and image from its frontmatter
     * @param {string} image image url to display at the top
     * @param {string} title
     * @param {string} description
     * @param {array(string | Object)} links list of internal or external links
     * * each item should be an url (String) or an object (containing title, description, path) 
     * * If only one item is provided the component's layout switches to "single" (title, description)
     */
    export default {
        props: ['image', 'title', 'description', 'links'],
        data() {
            return {
                titleText: this.title,
                descriptionText: this.description,
                singleState: false
            }
        },
        computed: {
            items() {
                let items = [];

                if (this.links && this.links.length > 1) {
                    for (var link of this.links) {
                        let item = link;
                        if (typeof link != 'Object') {
                            item = this.getPageData(link);
                        }

                        if (item) items.push(this.formatData(item));
                    }
                } else {
                    this.handleSingleState(this.links[0] || null);
                }

                return items;
            }
        },
        methods: {
            getPageData(path) {
                return this.$site.pages.find(item => item.path === path || item.regularPath === path || item.relativePath === path) || null;
            },
            formatData(item) {
                return {
                    title: item.frontmatter?.title || item.title, 
                    description: item.frontmatter?.description || item.description,
                    url: item.path
                }
            },
            handleSingleState(link) {
                if (!link) return;

                let item = link;

                if (typeof link != 'Object') {
                    item = this.getPageData(link);
                }

                item = this.formatData(item);

                this.titleText = item.title;
                this.descriptionText = item.description;
                this.singleState = true;
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
    
    .tm-link-disclosure
        width fit-content
        padding-right 0
</style>