<template lang="pug">
    a.card__wrapper(v-if="(!singleState && items && items.length > 0) || (singleState && href && filterByTags(this))" :href="singleLink" :class="{'card__single': singleState}")
        .card__header(v-bind:style="image && !singleStateEnabled() ? {'background-image': `url(${image})`} : {}")
            .card__header__overline
                .tm-overline.tm-rf-1.tm-lh-title.tm-medium.tm-muted {{ overline || "Getting started"}}
                .card__header__overline__tags__wrapper(v-if="badges")
                    tag.card__header__overline__tags__item(v-for="badge of badges" :label="badge.label" :color="badge.color" :active="true" :bright="badge.isBright")
            a(:href="href")
                h3.card__header__title(v-if="titleText" :class="{'tm-link': singleState, 'tm-link-disclosure': singleState}") {{titleText}}
        .card__body
            .card__body__description(v-if="descriptionText" v-html="descriptionText")
            .card__body__links__wrapper
                .card__body__links(v-for="item of items" v-if="items && items.length > 0")
                    a.card__body__links__item(:href="item.url" v-if="item.title && item.url") 
                        .card__body__links__item__tags(v-if="$themeConfig.tags && item.tags" v-on:click.prevent)
                            .card__body__links__item__tags__item(v-for="tag in item.tags")
                                tag.card__body__links__item__tags__item__dot(
                                    v-if="tag && $themeConfig.tags[tag]" 
                                    :color="$themeConfig.tags[tag].color" 
                                    :label="$themeConfig.tags[tag].label"
                                    :compact="true"
                                )
                        .card__body__links__item__text {{item.title}}
        .card__footer(v-if="!singleStateEnabled()")
            a.tm-link.tm-link-disclosure(:href="href") Learn more

</template>

<script>
    /**
     * Card component to link one or many pages. 
     * If a path is passed and it matches with a page in the site, the component pulls the data such as title, description and image from its frontmatter
     * @param {string} image image url to display at the top
     * @param {string} title
     * @param {string} description
     * @param {string} tags
     * @param {string} href
     * @param {string} overline
     * @param {array(string | Object)} links list of internal or external links
     * * each item should be an url (String) or an object (containing title, description, path) 
     * * If not provided or empty the component's layout switches to "single" (title, description)
     */
    export default {
        props: ['image', 'title', 'description', 'tags', 'href', 'overline', 'links', 'filterTags'],
        data() {
            return {
                titleText: this.title,
                descriptionText: this.description,
                singleLink: null,
                singleState: false,
                displayedTags: this.tags
            }
        },
        computed: {
            items() {
                let items = [];

                if (!this.singleStateEnabled()) {
                    for (var link of this.links) {
                        let item = this.getPageData(link.title, link.description, link.tags, link.path);
                        if (item) items.push(item);
                    }
                } else {
                    this.handleSingleState();
                }

                return items.filter(this.filterByTags);
            },
            badges() {
                return this.displayedTags ? this.displayedTags.map(tag => this.$themeConfig.tags[tag]) : null;
            }
        },
        methods: {
            getPageData(title, description, tags, path) {
                let page;

                if (!title || !description || !tags) {
                    page = this.$site.pages.find(
                        item => item.path === path || item.regularPath === path || item.relativePath === path
                    ) || null;
                }

                if (!page) page = {
                    path
                };

                if (title) page.title = title;
                if (description) page.description = description;
                if (tags) page.tags = tags;

                return this.formatData(page);
            },
            formatData(item) {
                return {
                    title: item?.title || item?.frontmatter?.title, 
                    description: item?.description || item?.frontmatter?.description,
                    tags: item?.tags || item?.frontmatter?.tags,
                    url: item?.path
                }
            },
            handleSingleState() {
                if (!this.href) return;

                let item = this.getPageData(this.title, this.description, this.tags, this.href);

                this.titleText = item.title;
                this.descriptionText = item.description;
                this.singleLink = item.url;
                this.singleState = true;
                this.displayedTags = item.tags;
            },
            singleStateEnabled() {
                return !this.links || this.links?.length == 0;
            },
            filterByTags(item) {
                var tagPresent = true;

                if (this.filterTags && this.filterTags.length > 0) {
                    tagPresent = false;

                    for (var tag of this.filterTags) {
                        if ((item.tags && item.tags.includes(tag)) || (item.displayedTags && item.displayedTags.includes(tag))) {
                            tagPresent = true;
                            break;
                        }
                    }
                }
                
                return tagPresent;
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
            height 100%
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

                &__tags

                    &__wrapper
                        display flex
                        justify-content flex-end
                    
                    &__item
                        margin-right var(--spacing-2)
            
            &__title
                margin-block 2.5rem
                flex-grow 1
                max-width 50%

        &__body
            display flex
            flex-wrap wrap
            flex-grow 1
            justify-content space-between
            align-items center
            padding-block 1rem
            flex-direction column
            
            &__description
                max-width none
                width 100%

            &__links
                padding-bottom 1rem
                -webkit-tap-highlight-color: transparent;

                &__wrapper
                    flex-grow 1
                    display flex
                    flex-direction column
                    max-width none
                    width 100%
                    padding-block 1rem

                &__item
                    color var(--semi-transparent-color-3)
                    transition color .2s ease-out
                    display flex

                    &:hover,
                    &:focus
                        color var(--title)

                    &__text
                        width 90%

                    &__tags
                        display flex
                        justify-content flex-end
                        margin-block auto
                        padding-right var(--spacing-4)
                        position relative

                        &:hover
                            .card__body__links__item__tags__item__dot
                                margin-right var(--spacing-2)

                        &__item__dot
                            margin-right -5px
                            transition: all .2s;

        &__footer
            border-top 1px solid var(--semi-transparent-color-2)
            padding-top 1rem
        
    .tm-link-disclosure
        width fit-content
        padding-right 0

    @media screen and (max-width: 832px)
        .card__single
            .card
                &__header__title
                    max-width none

        .card 
            &__body__links__item__tags
                margin-bottom auto
                margin-top var(--spacing-5)
                padding-right var(--spacing-6)
    
            
</style>