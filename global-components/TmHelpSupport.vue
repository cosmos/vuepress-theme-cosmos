<template lang="pug">
  div
    .container(v-if="$themeConfig && $themeConfig.gutter")
      .title(v-if="$themeConfig.gutter.title") {{$themeConfig.gutter.title}}
      .links(v-if="$themeConfig.gutter.children")
        .links__item(v-for="item in $themeConfig.gutter.children")
          div
            .links__item__title(v-if="item.title") {{item.title}}
            .links__item__desc {{item.text}}
          .links__item__indicator {{item.highlighted}}
        .links__item.links__item__featured(v-if="$themeConfig.gutter.editLink")
          div
            .links__item__title Found an Issue?
            .links__item__desc Help us improve this page by suggesting edits on GitHub.
          a(:href="editLink" target="_blank" rel="noreferrer noopener").links__item__button
            tm-icon-edit.links__item__button__icon
            a(:href="editLink" target="_blank") Edit this page
</template>

<style lang="stylus" scoped>
a
  color var(--accent-color)

strong
  font-weight 500

.container
  background var(--sidebar-bg)
  padding 3.5rem 1.5rem

.title
  font-size 1.5rem
  color #161931
  margin 1.5rem
  font-weight 600

.links
  display grid
  grid-template-columns repeat(auto-fit, minmax(250px, 1fr))

  &__item
    margin-right 2rem
    padding 1.5rem
    display flex
    flex-direction column
    justify-content space-between

    &__featured
      background white
      border-radius 0.5rem
      box-shadow inset 0 0 0 1px #f2f3f8

    &__title
      color #161931
      font-size 1.25rem
      margin-bottom 1rem
      font-weight 500

    &__desc
      margin-bottom 1.5rem
      font-size 0.875rem
      line-height 1.25rem

    &__indicator
      box-shadow inset 4px 0 0 var(--accent-color)
      padding-top 0.5rem
      padding-bottom 0.5rem
      padding-left 1rem

    &__button
      display flex
      align-items center
      font-weight 500
      font-size 0.875rem
      text-transform uppercase
      letter-spacing 0.02em
      margin-top 0.5rem
      margin-bottom 0.5rem

      &__icon
        margin-right 0.75rem
</style>

<script>
const endingSlashRE = /\/$/;
const outboundRE = /^[a-z]+:/i;

export default {
  computed: {
    editLink() {
      if (this.$page.frontmatter.editLink === false) {
        return;
      }
      const {
        repo,
        editLinks,
        docsDir = "",
        docsBranch = "master",
        docsRepo = repo
      } = this.$site.themeConfig;
      if (docsRepo && editLinks && this.$page.relativePath) {
        return this.createEditLink(
          repo,
          docsRepo,
          docsDir,
          docsBranch,
          this.$page.relativePath
        );
      }
    },
    editLinkText() {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      );
    }
  },
  methods: {
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }
      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;
      return (
        base.replace(endingSlashRE, "") +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path
      );
    }
  }
};
</script>