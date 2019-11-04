import pageComponents from "@internal/page-components";
import { Tooltip } from "@cosmos-ui/vue";

export default ({ Vue }) => {
  Vue.component("df", Tooltip);
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component);
  }
  require("./styles/palette.styl");
};
