<template lang="pug">
clean-page
  .file-component
    .file-component__body
      .file-component__header
        .file-component__name {{"FILES"}}
      .file-component__content
        .file-component__column
          .file-component__block-name Images files name:
          .item(v-for="(image, index) in imagesList")
            | {{`${index + 1}: ${image.name}`}}
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
import ComingSoon from '@/components/Layout/Content/ComingSoon.vue'
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    ComingSoon,
    CleanPage
  },
  setup () {
    const store = useStore()
    const images = store.state.images
    const imagesList = ref(images)
    return {
      images: computed(() => images),
      imagesList
    }
  }
})
</script>
<style scoped lang="scss">
.file-component{
  width: 100%;
  &__body{
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    height: 100%;
    width: 100%;
  }
  &__header{
    height: 81px;
    width: 100%;
  }
  &__name{
    opacity: 0.5;
    font-size: 14px;
    text-transform: uppercase;
    margin: 35px 0 32px 0;
  }
  &__content{
    height: 100%;
    width: 100%;
  }
  &__column{
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;
  }
  &__block-name{
    opacity: 0.5;
    font-size: 14px;
    margin: 0px 0 15px 0;
  }
}
.item{
  margin-bottom: 10px;
}
</style>
