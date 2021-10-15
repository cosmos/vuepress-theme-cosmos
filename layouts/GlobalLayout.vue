<template lang="pug">
  div
    cookie-banner
    tm-top-banner(v-bind="{topBanner}")
    .layout__main__content__body__wrapper
      component(:is="layout" :key="$route.path" @prereq="prereq = $event")
        Content
</template>

<script>
import { CookieBanner } from "@cosmos-ui/vue";
import axios from "axios";

export default {
  components: {
    CookieBanner
  },
  data: function() {
    return {
      prereq: null,
      topBannerUrl: "https://v1.cosmos.network/top-banner",
      topBanner: null
    };
  },
  beforeMount() {
    const fetchTopBanner = axios.get(`${this.topBannerUrl}/index.json`)
      .then(response => response.data)
      .catch(() => console.log(`Error in fetching data from ${this.topBannerUrl}`))

    Promise.all([fetchTopBanner]).then(responses => {
      this.topBanner = responses[0]
    })
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
  },
  props: {
    aside: {
      type: Boolean,
      default: true
    },
    search: {
      type: Boolean,
      default: false
    }
  }
};
</script>
