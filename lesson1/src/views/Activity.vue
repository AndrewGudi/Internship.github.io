<template lang="pug">
clean-page
  .activity__body
    .activity__column
      .activity__day Today
      activity-post(v-for="post of posts" v-bind:post="post" :key="posts.id")/
      .activity__row
        .item-post__icon
        .activity__images
          activity-images(v-for="image of images" v-bind:image="image" :key="image.id" @imageId='imageId')/
        .item-post__time
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ActivityImages from '@/components/Layout/Content/Activity/ActivityImages.vue'
import ActivityPost from '@/components/Layout/Content/Activity/ActivityPost.vue'
import { mapMutations, mapState } from 'vuex'
import CleanPage from '@/components/Layout/Content/CleanPage.vue'
export default defineComponent({
  components: {
    CleanPage,
    ActivityPost,
    ActivityImages
  },
  data () {
    return {
      idNotification: { id: 3 }
    }
  },
  computed: {
    ...mapState(['notification', 'images', 'posts'])
  },
  methods: {
    ...mapMutations(['loadNotification']),
    imageId (id: number) {
      this.idNotification.id = id
    }
  },
  created () {
    this.loadNotification(this.idNotification)
  }
})
</script>
<style src="../assets/css/activity.css"/>
