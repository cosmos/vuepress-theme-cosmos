<template lang="pug">
  div
    cookie-banner
    tm-top-banner(v-bind="{topBanner}")
    div
      component(:is="layout" :key="$route.path")
        Content
    script(v-if="shouldIncludeScript" src="https://www.bugherd.com/sidebarv2.js?apikey=ur38l8q2fpx6bfcgubgodw" async="true")
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
    shouldIncludeScript() {
      return (typeof window !== 'undefined') && ((window.location.origin.includes("http://preview-5bxuue6kafu5ocp5.b9lab.com/") || window.location.origin.includes("localhost:") || window.location.origin.includes("127.0.0.1"));
    }
  }
};
</script>
