// import pageComponents from "@internal/page-components";
import { Tooltip, CookieBanner } from "@cosmos-ui/vue";
import MarkdownIt from "markdown-it";

export default ({ Vue }) => {
  Vue.component("df", Tooltip);
  Vue.component("df", CookieBanner);
  // for (const [name, component] of Object.entries(pageComponents)) {
  //   Vue.component(name, component);
  // }
  Vue.mixin({
    methods: {
      md: string => {
        const md = new MarkdownIt({ html: true, linkify: true });
        return `<div>${md.renderInline(string)}</div>`;
      },
    }
  })
  require("./styles/palette.styl");
};