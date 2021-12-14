<template lang="pug">
    img(:src="resizedSrc" :data-zoom-src="zoomSrc")
</template>

<script>
export default {
    props: ['src'],
    computed: {
        resizedSrc() {
            if (this.isAbsoluteUrl(this.src)) return this.src;

            const windowWidth = (typeof window !== 'undefined') ? window.innerWidth : null;
            const breakpoint = this.getBreakpoint(windowWidth);
            return '/resized-images/' + breakpoint + this.src;
        },
        zoomSrc() {
            if (this.isAbsoluteUrl(this.src)) return this.src;
            return this.src;
        }
    },
    methods: {
        isAbsoluteUrl(src) {
            var absoluteRe = /^https?:\/\//i;
            return absoluteRe.test(src);
        },
        getBreakpoint(width) {
            var breakpoint = ''; // default

            if (width && this.$themeConfig?.imageBreakpoints) {
                for (var item of this.$themeConfig.imageBreakpoints) {
                    if (width <= item) {
                        breakpoint = item;
                        break;
                    }
                }
            }

            return breakpoint;
        }
    }
}
</script>
