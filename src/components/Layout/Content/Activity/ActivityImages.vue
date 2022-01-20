<template lang="pug">
img(:src='`/images/${image.src}`' class='activity__images-photo' alt='#' @click='imageId')
</template>0

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ImageInterface } from '@/types/image.interface.ts'
import clickEmit from '@/composables/clickEmit'
export default defineComponent({
  props: {
    image: {
      type: Object as PropType<ImageInterface>,
      required: true
    }
  },
  setup (props, context) {
    const { imageId } = clickEmit(props, context)
    return {
      imageId
    }
  }
})
</script>
<style></style>
