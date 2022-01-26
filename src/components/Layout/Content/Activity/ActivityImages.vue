<template lang="pug">
img(:src='`/images/${image.src}`' class='activity__images-photo' alt='#' @click='imageId')
</template>0

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ImageInterface } from '@/types/image.interface.ts'
export default defineComponent({
  props: {
    image: {
      type: Object as PropType<ImageInterface>,
      required: true
    }
  },
  setup (props, context) {
    const imageId = () => {
      context.emit('imageId', props.image.id)
    }
    return {
      imageId
    }
  }
})
</script>
<style></style>
