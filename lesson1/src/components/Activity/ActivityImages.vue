<template>
  <img
        :src="`/images/${image.src}`"
        class="activity__images-photo"
        alt="#"
        @click="imageId"
  />
</template>

<script>

export default ({
  props: {
    image: {
      type: Object,
      required: true
    }
  },
  methods: {
    imageId () {
      this.$emit('imageId', this.image.id)
    }
  }
})
</script>
<style></style>
