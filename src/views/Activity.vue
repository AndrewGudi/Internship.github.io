<template lang="pug">
clean-page
  .activity__body
    .activity__column
      .activity__day Today
      activity-post(v-for="post of posts" :post="post" :key="post.id")/
      .activity__row
        .item-post__icon
        .activity__images
          activity-images(v-for="image of images" :image="image" :key="image.id" @imageId="imageId")/
        .item-post__time
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import ActivityImages from '@/components/Layout/Content/Activity/ActivityImages.vue'
import ActivityPost from '@/components/Layout/Content/Activity/ActivityPost.vue'
import { useStore } from 'vuex'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
export default defineComponent({
  components: {
    CleanPage,
    ActivityPost,
    ActivityImages
  },
  setup () {
    const store = useStore()
    return {
      notification: computed(() => store.state.notification),
      images: computed(() => store.state.images),
      posts: computed(() => store.state.posts),
      imageId: (id: number) => store.dispatch('loadNotification', id)
    }
  }
})
</script>
<style src="../assets/css/activity.css"/>
