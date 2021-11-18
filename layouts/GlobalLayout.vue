<template lang="pug">
div
  cookie-banner.banner
  //- tm-top-banner(v-bind="{topBanner}").banner
  .custom__layout
    //- .mode-switch-container
    //-     .mode-switch-container__wrapper
    //-         tm-mode-switch
    custom-header(@mobileSidebar="handleMobileSidebar($event)" :hideMobileMenu="!isContentPage")

    .custom__layout__content.content-padding
      component(:is="layout", :key="$route.path" ref="contentLayout")
        Content

    .custom__layout__footer.mt-10.content-padding
      tm-footer(full="true")
  client-only
    tm-script(
      src="https://www.bugherd.com/sidebarv2.js?apikey=ur38l8q2fpx6bfcgubgodw",
      async="true"
    )
</template>

<style lang="stylus" scoped>
.banner {
  color: black;
}

.mode-switch-container {
  position: absolute;
  padding-top: 1rem;
  top: 3rem;
  left: 50%;
  margin-inline: auto;

  &__wrapper {
    position: relative;
    left: -50%;
  }
}

.custom__layout {
  &__footer {
    max-width: var(--content-small-max-width);
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

<script>
import { CookieBanner } from "@cosmos-ui/vue";
import axios from "axios";

export default {
  components: {
    CookieBanner,
  },
  data: function () {
    return {
      topBannerUrl: "https://v1.cosmos.network/top-banner",
      topBanner: null,
      mobileSidebarVisible: true
    };
  },
  beforeMount() {
    const fetchTopBanner = axios
      .get(`${this.topBannerUrl}/index.json`)
      .then((response) => response.data)
      .catch(() =>
        console.log(`Error in fetching data from ${this.topBannerUrl}`)
      );

    Promise.all([fetchTopBanner]).then((responses) => {
      this.topBanner = responses[0];
    });
  },
  computed: {
    layout() {
      if (this.$page.path) {
        if (this.$frontmatter.layout) {
          // You can also check whether layout exists first as the default global layout does.
          return this.$frontmatter.layout;
        }
        return "LayoutDefault";
      }
      return "NotFound";
    },
    hasLocales() {
      return (
        this.$site.locales && Object.entries(this.$site.locales).length > 1
      );
    },
    isContentPage() {
      return this.$page.path && (!this.$frontmatter.layout || this.$frontmatter.layout == "LayoutDefault")
    }
  },
  methods: {
    handleMobileSidebar(value) {
      if (this.$refs.contentLayout.setSidebarVisible) {
        this.$refs.contentLayout.setSidebarVisible(value);
      }
    }
  }
};
</script>
