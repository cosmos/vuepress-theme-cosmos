<template lang="pug">
    a.card__wrapper(:href="singleLink" :class="{'card__single': singleState}")
        .card__header(v-bind:style="image && !singleStateEnabled() ? {'background-image': `url(${image})`} : {}")
            .card__header__overline
                .tm-overline.tm-rf-1.tm-lh-title.tm-medium.tm-muted Getting started
                .card__header__overline__tag(v-if="badge" v-bind:style="{'background': badge.color || ''}") {{badge.label || ''}}
            h3.card__header__title(v-if="titleText" :class="{'tm-link': singleState, 'tm-link-disclosure': singleState}") {{titleText}}
        .card__body
            .card__body__description(v-if="descriptionText" v-html="descriptionText")
            .card__body__links__wrapper
                .card__body__links(v-for="item of items" v-if="items && items.length > 1")
                    a.card__body__links__item(:href="item.url" v-if="item.title && item.url") {{item.title}}
        .card__footer(v-if="!singleStateEnabled()")
            .tm-link.tm-link-disclosure Learn more

</template>

<script>
    /**
     * Card component to link one or many pages. 
     * If a path is passed and it matches with a page in the site, the component pulls the data such as title, description and image from its frontmatter
     * @param {string} image image url to display at the top
     * @param {string} title
     * @param {string} description
     * @param {string} tag
     * @param {array(string | Object)} links list of internal or external links
     * * each item should be an url (String) or an object (containing title, description, path) 
     * * If only one item is provided the component's layout switches to "single" (title, description)
     */
    export default {
        props: ['image', 'title', 'description', 'tag', 'links'],
        data() {
            return {
                titleText: this.title,
                descriptionText: this.description,
                singleLink: null,
                singleState: false
            }
        },
        computed: {
            items() {
                let items = [];

                if (this.links && !this.singleStateEnabled()) {
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
            },
            badge() {
                return this.tag ? this.$themeConfig.tags[this.tag] : null;
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

                this.titleText = this.title ? this.title : item.title;
                this.descriptionText = this.description ? this.description : item.description;
                this.singleLink = item.url;
                this.singleState = true;
            },
            singleStateEnabled() {
                return this.links?.length == 1;
            }
        }
    }
</script>

<style lang="stylus" scoped>
    .card__single
        &:hover,
        &:focus
            .tm-link-disclosure:after
                transform translateX(10%)

        .card
            &__body__description
                flex-wrap nowrap
                max-width none
                width 100%
                margin-right 0
            
            &__header__title
                max-width 70%

    .card

        &__wrapper
            display flex
            flex-grow 1
            flex-direction column
            padding 2.5rem
            border-radius 20px
            background var(--background-color-secondary)
                

        &__header
            background-repeat no-repeat
            background-position right
            background-size auto 100%

            @media screen and (min-width: 481px)
                margin-block -3rem
                padding-block 3rem

            &__overline
                display flex
                align-items center
                justify-content space-between
                margin-bottom 1rem

                &__tag
                    border-radius 8px
                    padding 8px
                    flex-shrink 0
                    height fit-content
                    margin-left 1rem
                    margin-block auto
                    color white
            
            &__title
                margin-block 2.5rem
                flex-grow 1
                max-width 50%

        &__body
            display flex
            flex-wrap wrap
            justify-content space-between
            align-items center
            padding-block 1rem
            flex-direction row
            
            &__description
                margin-right 1rem
                max-width 25%

            &__links
                padding-bottom 1rem

                &__wrapper
                    max-width 70%
                    flex-grow 1
                    display flex
                    flex-direction column

                &__item
                    color var(--semi-transparent-color-3)
                    transition color .2s ease-out

                    &:hover,
                    &:focus
                        color var(--title)

        &__footer
            border-top 1px solid var(--semi-transparent-color-2)
            padding-top 1rem
        
    .tm-link-disclosure
        width fit-content
        padding-right 0

    @media screen and (max-width: 832px)
        .card
            
            &__body
                flex-direction column
                
                &__description
                    max-width none
                    width 100%
                    margin-right 0

                &__links__wrapper
                    max-width none
                    width 100%
                    padding-block 1rem

        .card__single
            .card
                &__header__title
                    max-width none

    
            
</style>