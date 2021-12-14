<template lang="pug">
    img(:src="resizedSrc" :data-zoom-src="zoomSrc")
</template>

<script>
export default {
    props: ['src'],
    computed: {
        resizedSrc() {
            const width = this.$parent.$el.clientWidth;
            return this.getResizedSrc(width);
        },
        zoomSrc() {
            const width = (typeof window !== 'undefined') ? window.innerWidth : null;
            return this.getResizedSrc(width);
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
        },
        getResizedSrc(width) {
            if (this.isAbsoluteUrl(this.src)) return this.src;
            
            const breakpoint = this.getBreakpoint(width);
            return '/resized-images/' + breakpoint + this.src;
        }
    }
}
</script>
