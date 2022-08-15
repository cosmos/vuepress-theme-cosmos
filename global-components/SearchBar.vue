<template lang="pug">
    div
        .searchbar__wrapper
            tm-breadcrumbs.searchbar__title
            .search.tm-lh-title.tm-rf-1.tm-medium(@click="searchPanel = true")
                .search__icon
                    icon-search
                .search__text Search
        tm-sidebar(:visible="searchPanel" @visible="searchPanel = $event" max-width="100vw" width="480px" side="right" box-shadow="0 0 50px 10px rgba(0,0,0,.1)" background-color="rgba(0,0,0,0)").sheet__sidebar
            section-search(@visible="searchPanel = $event" :base="$site.base" @cancel="searchPanel = false" :algoliaConfig="algoliaConfig" @select="searchSelect($event)" :query="searchQuery" @query="searchQuery = $event" :site="$site")
</template>

<style lang="stylus" scoped>
    .sheet__sidebar
        color black
        
    .searchbar

        &__wrapper
            display flex
            justify-content flex-end
    
        &__title
            color var(--color-text-strong)
            width 100%

    .search
        display flex
        align-items center
        color var(--link)
        cursor pointer
        transition color .15s ease-out

        &:hover
            color var(--link-hover)

        &__container
            visibility hidden
            display flex
            justify-content flex-end
            margin-top 1rem
            margin-bottom 1rem

        &__text
            margin-left 0.5rem

        &__icon
            width 1.5rem
            height 1.5rem
            fill #aaa
            transition fill .15s ease-out

        &:hover &__icon
            fill var(--color-text, black)

    @media screen and (max-width: 480px)
        .searchbar__wrapper
            margin-top: 16px
            
        .search

            &__text
                display none

</style>

<script>

import {
  find
} from "lodash";
import { SectionSearch } from "@cosmos-ui/vue";

export default {
    data: function() {
        return {
            searchPanel: null,
            searchQuery: null
        };
    },
    components: {
        SectionSearch
    },
    computed: {
        algoliaConfig() {
            const algolia = this.$themeConfig.algolia;
            return algolia ? algolia : {};
        },
    },
    methods: {
        searchSelect(e) {
            if (e.id) {
                const page = find(this.$site.pages, ["key", e.id]);
                if (page && page.regularPath) {
                if (this.$page.regularPath != page.regularPath) {
                    this.$router.push(page.regularPath);
                    this.searchPanel = false;
                }
                }
            } else if (e.url) {
                window.location.assign(e.url);
            }
        },
    }
}
</script>
