<template lang="pug">
  .switch__wrapper(v-on:click="toggleTheme")
    .switch__item.switch__item__light(v-if="userTheme == 'light-theme'")
      .switch__item__icon
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z" stroke="black" stroke-opacity="0.6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 1V3" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 21V23" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.21973 4.21997L5.63973 5.63997" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.3604 18.3601L19.7804 19.7801" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1 12H3" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12H23" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4.21973 19.7801L5.63973 18.3601" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18.3604 5.63997L19.7804 4.21997" stroke="black" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      .switch__item__label.tm-muted.tm-rf-1.tm-medium Light mode
    .switch__item.switch__item__dark(v-if="userTheme == 'dark-theme'")
      .switch__item__icon
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18.9999 10.79C18.8426 12.4922 18.2038 14.1144 17.1581 15.4668C16.1125 16.8192 14.7034 17.8458 13.0956 18.4265C11.4878 19.0073 9.74789 19.1181 8.0794 18.7461C6.41092 18.3741 4.8829 17.5345 3.67413 16.3258C2.46536 15.117 1.62584 13.589 1.25381 11.9205C0.881777 10.252 0.992617 8.51208 1.57336 6.9043C2.15411 5.29651 3.18073 3.88737 4.53311 2.84175C5.8855 1.79614 7.5077 1.15731 9.2099 1C8.21331 2.34827 7.73375 4.00945 7.85843 5.68141C7.98312 7.35338 8.70376 8.92506 9.8893 10.1106C11.0748 11.2961 12.6465 12.0168 14.3185 12.1415C15.9905 12.2662 17.6516 11.7866 18.9999 10.79Z" stroke="white" stroke-opacity="0.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      .switch__item__label.tm-muted.tm-rf-1.tm-medium Dark mode
</template>

<script>
  export default {
    mounted() {
      let userThemeMode = localStorage.getItem("vuepress-theme-cosmos-user-theme");
      if (!userThemeMode) {
        userThemeMode = this.getMediaPreference();
      }
      this.setThemeMode(userThemeMode);
    },
    data() {
      return {
        userTheme: "dark-theme",
      };
    },
    methods: {
      toggleTheme() {
        const activeTheme = localStorage.getItem("vuepress-theme-cosmos-user-theme");
        if (activeTheme === "light-theme") {
          this.setThemeMode("dark-theme");
        } else {
          this.setThemeMode("light-theme");
        }
      },
      setThemeMode(theme) {
        localStorage.setItem("vuepress-theme-cosmos-user-theme", theme);
        this.userTheme = theme;
        document.documentElement.className = theme;
      },
      getMediaPreference() {
        return "dark-theme";
        // const hasDarkPreference = window.matchMedia(
        //   "(prefers-color-scheme: dark)"
        // ).matches;
        // if (hasDarkPreference) {
        //   return "dark-theme";
        // } else {
        //   return "light-theme";
        // }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .switch
    &__wrapper
      cursor pointer
      &:hover
        .switch__item
          &__icon
            svg
              path
                stroke-opacity 1
          &__label
            color var(--color-text-strong)
    &__item
      display flex

      &__icon
        display flex
        margin-right 8px

      &__label
        margin auto
      

</style>
