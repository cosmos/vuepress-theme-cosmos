<template lang="pug">
  div
    .container(v-if="$themeConfig && $themeConfig.gutter")
      .wrapper
        .title(v-if="$themeConfig.gutter.title") {{$themeConfig.gutter.title}}
        .links
          a(:href="$themeConfig.gutter.chat.title" target="_blank" rel="noreferrer noopener" :style="{'--bg': $themeConfig.gutter.chat.bg}").links__item.links__item__chat
            tm-logo-riot.links__item__logo
            div(v-html="md($themeConfig.gutter.chat.title)").links__item__title
            div(v-html="md($themeConfig.gutter.chat.text)").links__item__text
          a(:href="$themeConfig.gutter.forum.url" target="_blank" rel="noreferrer noopener" :style="{'--bg': $themeConfig.gutter.forum.bg}").links__item.links__item__forum
            component(:is="`tm-logo-${$themeConfig.gutter.forum.logo}`").links__item__logo
            div(v-html="md($themeConfig.gutter.forum.title)").links__item__title
            div(v-html="md($themeConfig.gutter.forum.text)").links__item__text
          a(:href="editLink" target="_blank" rel="noreferrer noopener").links__item.links__item__regular
            tm-icon-paper-pen(fill="var(--accent-color").links__item__logo
            div(v-html="md($themeConfig.gutter.github.title)").links__item__title
            div(v-html="md($themeConfig.gutter.github.text)" style="color: rgba(22, 25, 49, 0.65)").links__item__text
</template>

<style lang="stylus" scoped>

/deep/
  a[href]
    color var(--accent-color)
  
  strong
    font-weight 600

strong
  font-weight 500

.container
  background var(--sidebar-bg)
  padding 3.5rem 1.5rem

.wrapper
  max-width 1050px
  margin 0 auto

.title
  font-size 1.5rem
  color #161931
  margin 1.5rem .5rem
  font-weight 600

.links
  margin-left .5rem
  margin-right .5rem
  display grid
  gap 2rem
  grid-template-columns repeat(auto-fit, minmax(250px, 1fr))

  &__item
    display flex
    flex-direction column
    align-items center
    box-shadow 0px 2px 4px rgba(22, 25, 49, 0.05), 0px 0px 1px rgba(22, 25, 49, 0.2), 0px 0.5px 0px rgba(22, 25, 49, 0.05)
    text-align center
    border-radius .5rem
    padding 2rem
    line-height 20px
    background var(--bg)

    &__title
      margin-top 1.5rem
      margin-bottom 1rem
      font-weight 600

a.links__item
  color white

a.links__item__regular
  color #161931

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