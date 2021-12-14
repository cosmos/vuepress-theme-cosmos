<template lang="pug">
    img(:src="resizedSrc" :data-zoom-src="zoomSrc")
</template>

<script>
export default {
    props: ['src'],
    computed: {
        resizedSrc() {
            const slot = (typeof window !== 'undefined' && window.innerWidth > 1080) ? 'big' : 'small';
            return '/resized-images/' + slot + this.src;
        },
        zoomSrc() {
            return '' + this.src;
        }
    }
}
</script>
