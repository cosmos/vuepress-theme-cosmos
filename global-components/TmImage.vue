<template lang="pug">
    img(:src="resizedSrc" :data-zoom-src="zoomSrc")
</template>

<script>
export default {
    props: ['src'],
    data() {
        const parentWidth = this.$parent.$el?.clientWidth || 0;
        const windowWidth = (typeof window !== 'undefined') ? window.innerWidth : 0;
        return {
            resizedSrc: this.getResizedSrc(parentWidth),
            zoomSrc: this.getResizedSrc(windowWidth)
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.resizedSrc = this.getResizedSrc(this.$parent.$el?.clientWidth || 0);
            this.zoomSrc = this.getResizedSrc(window?.innerWidth || 0);
        })
    },
    methods: {
        isAbsoluteUrl(src) {
            var absoluteRe = /^https?:\/\//i;
            return absoluteRe.test(src);
        },
        getBreakpoint(width) {
            var breakpoint = null;

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
            if (!breakpoint) return this.src;

            return '/resized-images/' + breakpoint + this.src;
        }
    }
}
</script>
