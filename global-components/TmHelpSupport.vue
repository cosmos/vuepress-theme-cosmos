<template lang="pug">
  div
    .container(v-if="$themeConfig && $themeConfig.gutter")
      .wrapper
        .title(v-if="$themeConfig.gutter.title") {{$themeConfig.gutter.title}}
        .links
          a(:href="$themeConfig.gutter.chat.url" target="_blank" rel="noreferrer noopener" :style="{'--bg': $themeConfig.gutter.chat.bg}").links__item.links__item__chat
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
      .newsletter(v-if="$themeConfig.label == 'sdk'")
        .newsletter__image
          .newsletter__image__item(v-for="(item, index) in range(15)" :class="[`letter__${index}`]")
            image-letter
        form(action="https://zcs1.maillist-manage.com/campaigns/weboptin.zc" method="POST" target="_blank" rel="noreferrer noopener").newsletter__form
          .newsletter__desc
            .newsletter__desc__h1 Get SDK updates
            .newsletter__desc__p You’ll be notified with Cosmos updates, news and announcements.
          .newsletter__input
            .newsletter__input__input
              input(type="email" name="CONTACT_EMAIL" id="newsletter-email-input" placeholder="Your email").newsletter__input__input__el
              button(type="submit").newsletter__input__input__button Sign up
              input#submitType(type="hidden" name="submitType" value="optinCustomView")
              input#lD(type="hidden" name="lD" value="16352f88325b24db")
              input#emailReportId(type="hidden" name="emailReportId" value="")
              input#cmpZuid(type="hidden" name="zx" value="127fec298")
              input(type="hidden" name="zcvers" value="2.0")
              input#allCheckedListIds(type="hidden" name="oldListIds" value="")
              input#mode(type="hidden" name="mode" value="OptinCreateView")
              input#zcld(type="hidden" name="zcld" value="16352f88325b24db")
              input#document_domain(type="hidden" value="zoho.com")
              input#zc_Url(type="hidden" value="zcs1.maillist-manage.com")
              input#new_optin_response_in(type="hidden" value="1")
              input#duplicate_optin_response_in(type="hidden" value="1")
              input#zc_formIx(type="hidden" name="zc_formIx" value="4ef47fbb86ab6668436a999521baa5557461b395c6e88487")
              input#scriptless(type="hidden" name="scriptless" value="yes")
            .newsletter__input__p You can unsubscribe at any time.
</template>

<style lang="stylus" scoped>
.newsletter
  box-shadow 0px 2px 4px rgba(22, 25, 49, 0.05), 0px 0px 1px rgba(22, 25, 49, 0.2), 0px 0.5px 0px rgba(22, 25, 49, 0.05)
  margin-top 4rem
  margin-bottom 1rem
  overflow hidden
  height 200px
  border-radius .5rem
  position relative
  display flex
  align-items center
  justify-content flex-end

  &:hover &__image__item
    opacity .25
    transform scale(.98)

  &:hover &__image__item.letter__10
    transform scale(1.5) rotate(25deg)
    opacity 1

  &__image
    transform translate(-125px, -35px) rotate(-25deg)
    display grid
    width 300px
    gap 1rem
    grid-template-columns repeat(4, 1fr)
    position absolute
    left 0
    top 0

    &__item
      opacity .5
      transition all .5s

      &.letter__10
        opacity 1
        background white
        z-index 1000

  &__form
    display grid
    grid-template-columns 50% 50%
    width 100%
    margin-left 250px
    padding 30px
    align-items flex-end
    background-color white
    z-index 1000

  &__desc
    padding-right 1.5rem

    &__h1
      color #161931
      font-size 1.25rem
      font-weight 600
      margin-bottom .75rem
    
    &__p
      color rgba(22, 25, 49, 0.65)
      font-size .875rem
      line-height 20px

  &__input

    &__input
      border 1px solid rgba(140, 145, 177, 0.32)
      display grid
      grid-template-columns 1fr auto
      align-items center
      padding .5rem
      border-radius .25rem

      &__button
        padding .5rem
        text-transform uppercase
        color var(--accent-color)
        font-weight 500
        cursor pointer
        background none
        border none

      &__el
        border none
        width 100%
        outline none
        padding .5rem
    
    &__p
      margin-top .25rem
      color rgba(22, 25, 49, 0.65)
      font-size .8125rem

/deep/
  a[href]
    color var(--accent-color)
  
  strong
    font-weight 600

strong
  font-weight 500

.container
  background var(--sidebar-bg)
  padding 0 3rem 2rem

.wrapper
  max-width calc(1400px - var(--sidebar-width))
  margin 0 auto
  // padding-left 4rem
  // padding-right 2rem

.title
  font-size 1.5rem
  color #161931
  padding 1.5rem 0
  font-weight 600

.links
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
  background white

@media screen and (max-width: 1024px)
  .container
    padding-left 1.5rem
    padding-right 1.5rem

@media screen and (max-width: 832px)
  .newsletter
    height initial

    &__form
      margin-top 200px
      margin-left initial
      grid-template-columns 1fr

    &__desc
      padding-right 0
      padding-bottom 1rem
</style>

<script>
import { range } from "lodash";

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
    },
    range
  }
};
</script>